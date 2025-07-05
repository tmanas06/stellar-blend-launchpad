
// Freighter wallet connection utility
export interface FreighterWalletAPI {
  isConnected: () => Promise<boolean>;
  getPublicKey: () => Promise<string>;
  signTransaction: (xdr: string, opts?: any) => Promise<string>;
  getNetwork: () => Promise<string>;
  getNetworkDetails: () => Promise<any>;
}

declare global {
  interface Window {
    freighterApi?: FreighterWalletAPI;
  }
}

export const connectFreighterWallet = async (): Promise<string | null> => {
  try {
    // Check if Freighter is installed
    if (!window.freighterApi) {
      throw new Error('Freighter wallet is not installed. Please install it from the Chrome Web Store.');
    }

    // Check if already connected
    const isConnected = await window.freighterApi.isConnected();
    
    if (!isConnected) {
      // Request connection
      await window.freighterApi.getPublicKey();
    }

    // Get public key
    const publicKey = await window.freighterApi.getPublicKey();
    console.log('Connected to Freighter wallet:', publicKey);
    
    return publicKey;
  } catch (error) {
    console.error('Failed to connect to Freighter wallet:', error);
    throw error;
  }
};

export const getFreighterPublicKey = async (): Promise<string | null> => {
  try {
    if (!window.freighterApi) {
      return null;
    }

    const isConnected = await window.freighterApi.isConnected();
    if (!isConnected) {
      return null;
    }

    return await window.freighterApi.getPublicKey();
  } catch (error) {
    console.error('Error getting Freighter public key:', error);
    return null;
  }
};

export const isFreighterInstalled = (): boolean => {
  return typeof window !== 'undefined' && !!window.freighterApi;
};
