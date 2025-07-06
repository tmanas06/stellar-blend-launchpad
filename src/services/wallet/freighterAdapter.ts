import { WalletAdapter, NetworkType } from './types';

declare global {
  interface Window {
    freighter?: {
      isConnected(): Promise<{ isConnected: boolean }>;
      getPublicKey(): Promise<string>;
      signTransaction(xdr: string, network?: string): Promise<string>;
      isConnected(): Promise<{ isConnected: boolean }>;
    };
  }
}

export class FreighterAdapter implements WalletAdapter {
  private network: NetworkType = 'TESTNET';
  private publicKey: string | null = null;

  async isAvailable(): Promise<boolean> {
    return typeof window !== 'undefined' && !!window.freighter;
  }

  async connect(): Promise<string> {
    if (!(await this.isAvailable())) {
      throw new Error('Freighter wallet is not installed. Please install it from https://www.freighter.app/');
    }

    try {
      const { isConnected } = await window.freighter!.isConnected();
      
      if (!isConnected) {
        // Request access if not already connected
        this.publicKey = await window.freighter!.getPublicKey();
      } else {
        // Get the current public key if already connected
        this.publicKey = await window.freighter!.getPublicKey();
      }

      if (!this.publicKey) {
        throw new Error('Failed to get public key from Freighter');
      }

      return this.publicKey;
    } catch (error) {
      console.error('Freighter connection error:', error);
      throw new Error('Failed to connect to Freighter wallet');
    }
  }

  async sign(xdr: string, network: NetworkType = this.network): Promise<string> {
    if (!(await this.isAvailable())) {
      throw new Error('Freighter wallet is not available');
    }

    if (!this.publicKey) {
      throw new Error('No wallet connected');
    }

    try {
      const signedXdr = await window.freighter!.signTransaction(xdr, network === 'PUBLIC' ? 'PUBLIC' : 'TESTNET');
      return signedXdr;
    } catch (error) {
      console.error('Error signing transaction with Freighter:', error);
      throw new Error('Transaction signing was rejected');
    }
  }

  getNetwork(): NetworkType {
    return this.network;
  }

  setNetwork(network: NetworkType): void {
    this.network = network;
  }
}

// Singleton instance
export const freighterAdapter = new FreighterAdapter();

export const stellarBlendAdapter = freighterAdapter; // For backward compatibility