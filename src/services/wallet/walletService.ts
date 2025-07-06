// Types and interfaces for the wallet service
import { WalletAdapter } from './types';
import type { WalletBalance } from '../../types';
import { stellarBlendAdapter } from './freighterAdapter';

// Re-export WalletBalance for use in other files
export type { WalletBalance };

type NetworkType = 'PUBLIC' | 'TESTNET';
export type WalletType = 'freighter' | 'walletConnect';

// Wallet Service Interface
export interface IWalletService {
  // Connection management
  initialize(walletType: WalletType): Promise<void>;
  connect(): Promise<string>;
  disconnect(): Promise<void>;
  isConnected(): Promise<boolean>;
  
  // Account information
  getPublicKey(): Promise<string | null>;
  getBalances(publicKey: string): Promise<WalletBalance[]>;
  
  // Transaction handling
  signTransaction(xdr: string): Promise<string>;
  
  // Network management
  setNetwork(network: NetworkType): void;
  getNetwork(): NetworkType;
  
  // Wallet information
  getWalletType(): WalletType | null;
}

// Implementation of the wallet service
class WalletService implements IWalletService {
  private static instance: IWalletService | null = null;
  private adapter: WalletAdapter | null = null;
  private walletType: WalletType | null = null;
  private network: NetworkType = 'TESTNET';
  private static WALLET_STORAGE_KEY = 'blend_wallet_type';
  
  // Private constructor to enforce singleton pattern
  private constructor() {
    // Initialize with the last used wallet type if available
    const savedWalletType = localStorage.getItem(WalletService.WALLET_STORAGE_KEY);
    if (savedWalletType && (savedWalletType === 'freighter' || savedWalletType === 'walletConnect')) {
      this.initialize(savedWalletType as WalletType).catch(console.error);
    }
  }

  /**
   * Get the singleton instance of WalletService
   */
  public static getInstance(): IWalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  // IWalletService implementation
  public async initialize(walletType: WalletType = 'freighter'): Promise<void> {
    this.walletType = walletType;
    
    // Initialize the appropriate adapter based on wallet type
    switch (walletType) {
      case 'freighter':
        this.adapter = stellarBlendAdapter;
        break;
      case 'walletConnect':
        throw new Error('WalletConnect is not yet implemented');
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }
    
    // Set the initial network
    if (this.adapter) {
      this.adapter.setNetwork(this.network);
    }
    
    // Save the wallet type to localStorage
    localStorage.setItem(WalletService.WALLET_STORAGE_KEY, walletType);
  }

  public async connect(): Promise<string> {
    if (!this.adapter) {
      throw new Error('Wallet service not initialized. Call initialize() first.');
    }

    try {
      const publicKey = await this.adapter.connect();
      return publicKey;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.adapter?.disconnect) {
      await this.adapter.disconnect();
    }
    this.adapter = null;
    this.walletType = null;
    localStorage.removeItem(WalletService.WALLET_STORAGE_KEY);
  }
  
  public async isConnected(): Promise<boolean> {
    if (!this.adapter) return false;
    
    try {
      // First try isConnected if available
      if (typeof this.adapter.isConnected === 'function') {
        return await this.adapter.isConnected();
      }
      
      // Fall back to isAvailable if isConnected is not available
      return await this.adapter.isAvailable();
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      return false;
    }
  }
  
  public async getPublicKey(): Promise<string | null> {
    if (!this.adapter) return null;
    
    try {
      // Use the adapter's getPublicKey if available
      if (typeof this.adapter.getPublicKey === 'function') {
        return await this.adapter.getPublicKey();
      }
      
      // Fallback to connect() if getPublicKey is not available
      return await this.adapter.connect();
    } catch (error) {
      console.error('Error getting public key:', error);
      return null;
    }
  }
  
  public async getBalances(publicKey: string): Promise<WalletBalance[]> {
    if (!publicKey) return [];
    
    try {
      // Determine the appropriate Horizon server URL based on network
      const horizonUrl = this.network === 'PUBLIC'
        ? 'https://horizon.stellar.org'
        : 'https://horizon-testnet.stellar.org';
      
      // Fetch account data from Horizon
      const response = await fetch(`${horizonUrl}/accounts/${publicKey}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch account data: ${response.statusText}`);
      }
      
      const account = await response.json();
      
      // Transform the balances to our WalletBalance format
      return account.balances.map((balance: any) => ({
        asset: balance.asset_code || 'XLM', // Native XLM doesn't have asset_code
        balance: balance.balance,
        limit: balance.limit || null,
      }));
    } catch (error) {
      console.error('Error fetching balances:', error);
      throw new Error('Failed to fetch account balances');
    }
  }

  public async signTransaction(xdr: string): Promise<string> {
    if (!this.adapter) {
      throw new Error('Wallet not initialized');
    }
    return this.adapter.sign(xdr, this.network);
  }
  
  public setNetwork(network: NetworkType): void {
    this.network = network;
    if (this.adapter) {
      this.adapter.setNetwork(network);
    }
  }
  
  public getNetwork(): NetworkType {
    return this.network;
  }
  
  public getWalletType(): WalletType | null {
    return this.walletType;
  }
}

// Create and export the singleton instance
const walletService: IWalletService = WalletService.getInstance();

export { walletService, WalletService };
