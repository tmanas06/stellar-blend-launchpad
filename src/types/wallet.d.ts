import { WalletAdapter } from '../services/wallet/types';

declare module '../services/wallet/walletService' {
  export interface WalletService {
    initialize(walletType: import('../services/wallet/walletService').WalletType): Promise<void>;
    connect(): Promise<string>;
    disconnect(): Promise<void>;
    signTransaction(xdr: string): Promise<string>;
    isConnected(): Promise<boolean>;
    getWalletType(): import('../services/wallet/walletService').WalletType | null;
    setNetwork(network: 'PUBLIC' | 'TESTNET'): void;
    getNetwork(): 'PUBLIC' | 'TESTNET';
  }

  export const walletService: WalletService;
  export { WalletType } from '../services/wallet/walletService';
}
