import { useState, useEffect, useCallback } from 'react';
import {
  isConnected as isFreighterConnected,
  isAllowed,
  setAllowed,
  requestAccess,
  getAddress,
  getNetwork,
  getNetworkDetails as getFreighterNetworkDetails,
  signTransaction as freighterSignTransaction,
  addToken as freighterAddToken,
  NetworkDetails
} from '@stellar/freighter-api';
import { Server } from 'soroban-client';

// Configuration values
const SOROBAN_RPC = 'https://soroban-testnet.stellar.org';
const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const DEFAULT_NETWORK = 'TESTNET';
const DEFAULT_NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';

export interface FreighterKit {
  server: Server;
  networkPassphrase: string;
  horizonUrl: string;
}

export interface UseFreighterResult {
  isConnected: boolean;
  publicKey: string | null;
  network: string | null;
  networkPassphrase: string | null;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  signTransaction: (transactionXdr: string) => Promise<string>;
  getNetworkDetails: () => Promise<NetworkDetails>;
  addToken: (contractId: string) => Promise<string>;
  checkConnection: () => Promise<boolean>;
  kit: FreighterKit | null;
}

export const useFreighter = (): UseFreighterResult => {
  const [isConnectedState, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [networkPassphrase, setNetworkPassphrase] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kit, setKit] = useState<FreighterKit | null>(null);

  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      const result = await isFreighterConnected();
      return result;
    } catch (err) {
      console.error('Error checking Freighter connection:', err);
      return false;
    }
  }, []);

  const connect = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Check if Freighter is installed and connected
      const connected = await checkConnection();
      if (!connected) {
        setError('Freighter wallet is not installed. Please install it from https://www.freighter.app/');
        return false;
      }

      // Check if the app is allowed to access Freighter
      const allowed = await isAllowed();
      if (!allowed) {
        const allowedSet = await setAllowed();
        if (!allowedSet) {
          setError('Permission denied. Please allow this app to access Freighter.');
          return false;
        }
      }

      // Request access to the wallet
      const accessResult = await requestAccess();
      if (!accessResult) {
        setError('Could not get address from Freighter.');
        return false;
      }

      setPublicKey(accessResult);

      // Get network details and ensure consistent format
      const networkResult = await getNetwork() as string | { network: string } | undefined;
      let networkValue = 'testnet';
      
      if (typeof networkResult === 'string') {
        networkValue = networkResult.toLowerCase();
      } else if (networkResult && typeof networkResult === 'object' && 'network' in networkResult) {
        networkValue = networkResult.network.toLowerCase();
      }
      
      // Map 'public' to 'mainnet' for consistency
      const normalizedNetwork = networkValue === 'public' ? 'mainnet' : networkValue;
      setNetwork(normalizedNetwork);
      setNetworkPassphrase(DEFAULT_NETWORK_PASSPHRASE);

      setIsConnected(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to connect to Freighter wallet');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [checkConnection]);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setPublicKey(null);
    setNetwork(null);
    setNetworkPassphrase(null);
    setError(null);
  }, []);

  const signTransaction = useCallback(async (transactionXdr: string): Promise<string> => {
    if (!isConnectedState) throw new Error('Wallet not connected');
    try {
      const result = await freighterSignTransaction(transactionXdr, {
        networkPassphrase: networkPassphrase || DEFAULT_NETWORK_PASSPHRASE,
      });
      return result;
    } catch (err: any) {
      throw new Error(`Transaction signing failed: ${err.message}`);
    }
  }, [isConnectedState, networkPassphrase]);

  const getNetworkDetails = useCallback(async (): Promise<NetworkDetails> => {
    if (!isConnectedState) throw new Error('Wallet not connected');
    try {
      return await getFreighterNetworkDetails();
    } catch (err: any) {
      throw new Error(`Failed to get network details: ${err.message}`);
    }
  }, [isConnectedState]);

  const addToken = useCallback(async (contractId: string): Promise<string> => {
    if (!isConnectedState) throw new Error('Wallet not connected');
    try {
      await freighterAddToken(contractId, networkPassphrase || DEFAULT_NETWORK_PASSPHRASE);
      return contractId;
    } catch (err: any) {
      throw new Error(`Failed to add token: ${err.message}`);
    }
  }, [isConnectedState, networkPassphrase]);

  // Initialize connection on mount
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        const connected = await checkConnection();
        if (connected) {
          const allowed = await isAllowed();
          if (allowed) {
            const address = await getAddress();
            if (address) {
              setPublicKey(address);
              setIsConnected(true);
              const networkResult = await getNetwork() as string | { network: string } | undefined;
              let networkValue = 'testnet';
              
              if (typeof networkResult === 'string') {
                networkValue = networkResult.toLowerCase();
              } else if (networkResult && typeof networkResult === 'object' && 'network' in networkResult) {
                networkValue = networkResult.network.toLowerCase();
              }
              
              // Map 'public' to 'mainnet' for consistency
              const normalizedNetwork = networkValue === 'public' ? 'mainnet' : networkValue;
              setNetwork(normalizedNetwork);
              setNetworkPassphrase(DEFAULT_NETWORK_PASSPHRASE);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing Freighter connection:', error);
      }
    };

    initializeConnection();
  }, [checkConnection]);

  // Initialize Soroban client when connected
  useEffect(() => {
    if (isConnectedState && publicKey && network) {
      const server = new Server(SOROBAN_RPC, { allowHttp: true });
      setKit({
        server,
        networkPassphrase: networkPassphrase || DEFAULT_NETWORK_PASSPHRASE,
        horizonUrl: HORIZON_URL,
      });
    } else {
      setKit(null);
    }
  }, [isConnectedState, publicKey, network, networkPassphrase]);

  return {
    isConnected: isConnectedState,
    publicKey,
    network,
    networkPassphrase,
    isLoading,
    error,
    connect,
    disconnect,
    signTransaction,
    getNetworkDetails,
    addToken,
    checkConnection,
    kit,
  };
};