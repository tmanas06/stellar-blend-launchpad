import { SignClient } from '@walletconnect/sign-client';
import { SessionTypes } from '@walletconnect/types';

export interface WalletConnectState {
  signClient: InstanceType<typeof SignClient> | null;
  session: SessionTypes.Struct | null;
  accounts: string[];
  isConnected: boolean;
}

let walletConnectState: WalletConnectState = {
  signClient: null,
  session: null,
  accounts: [],
  isConnected: false
};

const PROJECT_ID = '0f34d3af4c10a27af4a8b4a282dba79a33b4566bf';

export const initializeWalletConnect = async (): Promise<InstanceType<typeof SignClient>> => {
  // Prevent multiple initializations
  if (walletConnectState.signClient) {
    console.log('WalletConnect already initialized, returning existing client');
    return walletConnectState.signClient;
  }

  try {
    console.log('Initializing WalletConnect with project ID:', PROJECT_ID);
    
    const signClient = await SignClient.init({
      projectId: PROJECT_ID,
      metadata: {
        name: 'Blend SCF Launchpad',
        description: 'Invest in vetted Stellar Community Fund projects',
        url: window.location.origin,
        icons: [`${window.location.origin}/favicon.ico`]
      }
    });

    walletConnectState.signClient = signClient;
    console.log('WalletConnect initialized successfully');
    return signClient;
  } catch (error) {
    console.error('Failed to initialize WalletConnect:', error);
    throw error;
  }
};

export const connectWallet = async (): Promise<string | null> => {
  try {
    const signClient = await initializeWalletConnect();
    
    console.log('Starting wallet connection...');
    
    const { uri, approval } = await signClient.connect({
      requiredNamespaces: {},
      optionalNamespaces: {
        stellar: {
          methods: ['stellar_signTransaction', 'stellar_signMessage'],
          chains: ['stellar:pubnet'],
          events: ['accountsChanged', 'chainChanged']
        }
      }
    });

    if (uri) {
      console.log('WalletConnect URI generated:', uri);
      
      // Show the URI to the user - they can scan it with their wallet
      const shouldOpenWallet = window.confirm(
        'Please scan the QR code with your Stellar wallet or copy the connection URI. Click OK to continue.'
      );
      
      if (shouldOpenWallet) {
        // Try to open wallet apps directly
        const walletConnectUri = `wc:${uri.split('wc:')[1]}`;
        
        // Try different wallet deep links
        const walletUrls = [
          `lobstr://wc?uri=${encodeURIComponent(walletConnectUri)}`, // Lobstr
          `stellarterm://wc?uri=${encodeURIComponent(walletConnectUri)}`, // StellarTerm
          `freighter://wc?uri=${encodeURIComponent(walletConnectUri)}` // Freighter
        ];
        
        // Try opening each wallet
        for (const walletUrl of walletUrls) {
          try {
            window.open(walletUrl, '_blank');
            await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between attempts
          } catch (e) {
            console.log('Could not open wallet:', walletUrl);
          }
        }
        
        console.log('Connection URI for manual use:', uri);
      }
    }

    console.log('Waiting for wallet approval...');
    const session = await approval();
    
    walletConnectState.session = session;
    walletConnectState.accounts = session.namespaces.stellar?.accounts || [];
    walletConnectState.isConnected = true;

    // Extract public key from account (format: stellar:pubnet:PUBLICKEY)
    const publicKey = walletConnectState.accounts[0]?.split(':')[2];
    console.log('Wallet connected successfully. Public key:', publicKey);
    
    return publicKey || null;
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    
    // Reset state on error
    walletConnectState.session = null;
    walletConnectState.accounts = [];
    walletConnectState.isConnected = false;
    
    throw new Error('Failed to connect to wallet. Please make sure you have a Stellar wallet installed and try again.');
  }
};

export const disconnectWallet = async (): Promise<void> => {
  try {
    if (walletConnectState.signClient && walletConnectState.session) {
      await walletConnectState.signClient.disconnect({
        topic: walletConnectState.session.topic,
        reason: {
          code: 6000,
          message: 'User disconnected'
        }
      });
    }
    
    walletConnectState.session = null;
    walletConnectState.accounts = [];
    walletConnectState.isConnected = false;
  } catch (error) {
    console.error('Failed to disconnect wallet:', error);
  }
};

export const getConnectedAccount = (): string | null => {
  if (walletConnectState.isConnected && walletConnectState.accounts.length > 0) {
    return walletConnectState.accounts[0].split(':')[2];
  }
  return null;
};

export const isWalletConnected = (): boolean => {
  return walletConnectState.isConnected;
};
