
// Stellar API utilities for fetching wallet data
const STELLAR_HORIZON_URL = 'https://horizon.stellar.org';

export interface StellarAsset {
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  balance: string;
  buying_liabilities: string;
  selling_liabilities: string;
}

export interface StellarAccount {
  id: string;
  account_id: string;
  sequence: string;
  subentry_count: number;
  balances: StellarAsset[];
  signers: any[];
  data: any;
  flags: any;
  thresholds: any;
}

export interface StellarTransaction {
  id: string;
  hash: string;
  created_at: string;
  source_account: string;
  fee_charged: string;
  operation_count: number;
  memo?: string;
}

export const fetchAccountData = async (publicKey: string): Promise<StellarAccount | null> => {
  try {
    console.log('Fetching account data for:', publicKey);
    const response = await fetch(`${STELLAR_HORIZON_URL}/accounts/${publicKey}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log('Account not found on Stellar network');
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const accountData = await response.json();
    console.log('Account data fetched:', accountData);
    return accountData;
  } catch (error) {
    console.error('Error fetching account data:', error);
    return null;
  }
};

export const fetchAccountTransactions = async (publicKey: string, limit: number = 10): Promise<StellarTransaction[]> => {
  try {
    console.log('Fetching transactions for:', publicKey);
    const response = await fetch(`${STELLAR_HORIZON_URL}/accounts/${publicKey}/transactions?order=desc&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Transactions fetched:', data.records);
    return data.records || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const formatAssetCode = (asset: StellarAsset): string => {
  if (asset.asset_type === 'native') {
    return 'XLM';
  }
  return asset.asset_code || 'Unknown';
};

export const formatBalance = (balance: string): string => {
  const num = parseFloat(balance);
  if (num === 0) return '0';
  if (num < 0.0001) return num.toFixed(7);
  if (num < 1) return num.toFixed(4);
  return num.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 4 
  });
};
