// Common types used across the application

export interface Position {
  id: string;
  // Add other position properties as needed
  [key: string]: any;
}

export interface WalletBalance {
  asset: string;
  balance: string;
  limit: number | null;
}

export interface WalletState {
  publicKey: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  balances: WalletBalance[];
  positions: Position[];
  isLoadingPositions: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refresh: () => Promise<void>;
}
