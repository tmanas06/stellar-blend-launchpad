
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

const PROJECT_ID = '00cf7cc876a27af4a8b4a282dba59d20';

export const initializeWalletConnect = async (): Promise<InstanceType<typeof SignClient>> => {
  if (walletConnectState.signClient) {
    return walletConnectState.signClient;
  }

  const signClient = await SignClient.init({
    projectId: PROJECT_ID,
    metadata: {
      name: 'Blend SCF Launchpad',
      description: 'Invest in vetted Stellar Community Fund projects',
      url: window.location.origin,
      icons: ['https://walletconnect.com/walletconnect-logo.png']
    }
  });

  walletConnectState.signClient = signClient;
  return signClient;
};

export const connectWallet = async (): Promise<string | null> => {
  try {
    const signClient = await initializeWalletConnect();
    
    const { uri, approval } = await signClient.connect({
      requiredNamespaces: {
        stellar: {
          methods: ['stellar_signTransaction', 'stellar_signMessage'],
          chains: ['stellar:pubnet'],
          events: ['accountsChanged', 'chainChanged']
        }
      }
    });

    if (uri) {
      // Open WalletConnect modal or redirect to wallet
      const walletConnectUrl = `https://walletconnect.com/qr?uri=${encodeURIComponent(uri)}`;
      window.open(walletConnectUrl, '_blank');
    }

    const session = await approval();
    walletConnectState.session = session;
    walletConnectState.accounts = session.namespaces.stellar?.accounts || [];
    walletConnectState.isConnected = true;

    // Extract public key from account (format: stellar:pubnet:PUBLICKEY)
    const publicKey = walletConnectState.accounts[0]?.split(':')[2];
    console.log('Connected to wallet:', publicKey);
    
    return publicKey || null;
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw new Error('Failed to connect to wallet. Please try again.');
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
