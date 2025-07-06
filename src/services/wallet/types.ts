// Network types
export type NetworkType = 'PUBLIC' | 'TESTNET';

// Base interface for all wallet adapters
export interface WalletAdapter {
  // Core methods
  connect(): Promise<string>; // Returns public key
  sign(xdr: string, network: NetworkType): Promise<string>; // Returns signed XDR
  
  // Connection status
  isAvailable(): boolean | Promise<boolean>; // Check if wallet is available
  isConnected?(): boolean | Promise<boolean>; // Check if wallet is currently connected
  disconnect?(): Promise<void>; // Disconnect the wallet
  
  // Network management
  getNetwork(): NetworkType;
  setNetwork(network: NetworkType): void;
  
  // Optional methods
  getPublicKey?(): Promise<string | null>; // Get public key without connecting
}

// Common interface for wallet balance
export interface WalletBalance {
  asset: string;      // Asset code or 'XLM' for native
  balance: string;    // Current balance as a string
  limit: number | null; // Trustline limit if applicable
}
