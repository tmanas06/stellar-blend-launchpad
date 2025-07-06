
// Freighter wallet integration for Stellar
export interface FreighterWalletState {
  isConnected: boolean;
  publicKey: string | null;
  isFreighterInstalled: boolean;
}

declare global {
  interface Window {
    freighter: {
      isConnected(): Promise<boolean>;
      getPublicKey(): Promise<string>;
      signTransaction(xdr: string, network?: string): Promise<string>;
      requestAccess(): Promise<string>;
      isAllowed(): Promise<boolean>;
    };
  }
}

let walletState: FreighterWalletState = {
  isConnected: false,
  publicKey: null,
  isFreighterInstalled: false
};

export const checkFreighterInstalled = (): boolean => {
  const isInstalled = typeof window !== 'undefined' && !!window.freighter;
  walletState.isFreighterInstalled = isInstalled;
  return isInstalled;
};

export const connectFreighterWallet = async (): Promise<string | null> => {
  try {
    if (!checkFreighterInstalled()) {
      throw new Error('Freighter wallet is not installed. Please install it from https://www.freighter.app/');
    }

    console.log('Requesting Freighter wallet access...');
    const publicKey = await window.freighter.requestAccess();
    
    if (publicKey) {
      walletState.isConnected = true;
      walletState.publicKey = publicKey;
      console.log('Freighter wallet connected:', publicKey);
      return publicKey;
    }
    
    throw new Error('Failed to get public key from Freighter');
  } catch (error) {
    console.error('Failed to connect Freighter wallet:', error);
    walletState.isConnected = false;
    walletState.publicKey = null;
    throw error;
  }
};

export const disconnectFreighterWallet = (): void => {
  walletState.isConnected = false;
  walletState.publicKey = null;
  console.log('Freighter wallet disconnected');
};

export const getFreighterPublicKey = async (): Promise<string | null> => {
  try {
    if (!checkFreighterInstalled()) {
      return null;
    }

    const isConnected = await window.freighter.isConnected();
    if (isConnected) {
      const publicKey = await window.freighter.getPublicKey();
      walletState.isConnected = true;
      walletState.publicKey = publicKey;
      return publicKey;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting Freighter public key:', error);
    return null;
  }
};

export const isFreighterConnected = (): boolean => {
  return walletState.isConnected;
};

export const getWalletState = (): FreighterWalletState => {
  return { ...walletState };
};

// Check connection on load
if (typeof window !== 'undefined') {
  checkFreighterInstalled();
  getFreighterPublicKey();
}
