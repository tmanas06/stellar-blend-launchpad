import { Horizon, Networks, Transaction } from '@stellar/stellar-sdk';
import { WalletBalance } from './wallet/types';
import { walletService, WalletType } from './wallet/walletService';

export class StellarService {
  private server: Horizon.Server;
  private networkPassphrase: string;
  private static instance: StellarService;

  private constructor(networkPassphrase: string = Networks.TESTNET) {
    this.networkPassphrase = networkPassphrase;
    this.server = this.createHorizonServer(networkPassphrase);
  }

  public static getInstance(): StellarService {
    if (!StellarService.instance) {
      StellarService.instance = new StellarService();
    }
    return StellarService.instance;
  }

  private createHorizonServer(networkPassphrase: string): Horizon.Server {
    const horizonUrl = networkPassphrase === Networks.PUBLIC
      ? 'https://horizon.stellar.org'
      : 'https://horizon-testnet.stellar.org';
    
    return new Horizon.Server(horizonUrl, { allowHttp: networkPassphrase !== Networks.PUBLIC });
  }

  /**
   * Initialize the wallet service with the specified wallet type
   */
  async initializeWallet(walletType: WalletType = 'freighter'): Promise<void> {
    await walletService.initialize(walletType);
  }

  /**
   * Connect to the wallet
   */
  async connectWallet(): Promise<string> {
    return walletService.connect();
  }

  /**
   * Disconnect the wallet
   */
  async disconnectWallet(): Promise<void> {
    await walletService.disconnect();
  }

  /**
   * Update the network (testnet/mainnet)
   */
  updateNetwork(networkPassphrase: string): void {
    this.networkPassphrase = networkPassphrase;
    this.server = this.createHorizonServer(networkPassphrase);
    
    // Update wallet network setting
    const networkType: 'PUBLIC' | 'TESTNET' = 
      networkPassphrase === Networks.PUBLIC ? 'PUBLIC' : 'TESTNET';
    walletService.setNetwork(networkType);
  }

  /**
   * Get the current network
   */
  getNetwork(): string {
    return this.networkPassphrase;
  }

  /**
   * Check if wallet is connected
   */
  async isConnected(): Promise<boolean> {
    return walletService.isConnected();
  }

  /**
   * Fetch all balances for a given public key
   */
  async getAccountBalances(publicKey: string): Promise<WalletBalance[]> {
    try {
      const account = await this.server.loadAccount(publicKey);
      
      return account.balances.map((balance) => ({
        asset: balance.asset_type === 'native' ? 'XLM' : balance.asset_code || 'UNKNOWN',
        balance: balance.balance?.toString() ?? '0',
        limit: balance.limit ? parseFloat(balance.limit) : null,
      }));
    } catch (error) {
      console.error('Error fetching account balances:', error);
      throw new Error('Failed to fetch account balances. Please check the account address and network connection.');
    }
  }

  /**
   * Sign a transaction XDR
   */
  async signTransactionXdr(xdr: string): Promise<string> {
    try {
      return await walletService.signTransaction(xdr);
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw new Error('Transaction signing failed. Please make sure your wallet is connected and try again.');
    }
  }

  /**
   * Submit a signed transaction XDR to the network
   */
  async submitTransaction(signedXdr: string): Promise<Horizon.HorizonApi.SubmitTransactionResponse> {
    try {
      const transaction = new Transaction(signedXdr, this.networkPassphrase);
      const result = await this.server.submitTransaction(transaction);
      return result;
    } catch (error) {
      console.error('Error submitting transaction:', error);
      throw this.parseHorizonError(error);
    }
  }

  /**
   * Helper to parse Horizon errors
   */
  private parseHorizonError(error: any): Error {
    if (error.response) {
      const result = error.response.data;
      const message = result.extras?.result_codes?.operations?.join(', ') || 
                     result.detail || 
                     'Transaction failed';
      return new Error(`Transaction failed: ${message}`);
    }
    return error;
  }
}

// Export singleton
export const stellarService = StellarService.getInstance();
