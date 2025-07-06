import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Network = 'mainnet' | 'testnet';

interface NetworkContextType {
  network: Network;
  networkPassphrase: string;
  horizonUrl: string;
  setNetwork: (network: Network) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [network, setNetwork] = useState<Network>('testnet');
  
  const getNetworkConfig = (network: Network) => {
    switch (network) {
      case 'mainnet':
        return {
          passphrase: 'Public Global Stellar Network ; September 2015',
          horizonUrl: 'https://horizon.stellar.org',
        };
      case 'testnet':
      default:
        return {
          passphrase: 'Test SDF Network ; September 2015',
          horizonUrl: 'https://horizon-testnet.stellar.org',
        };
    }
  };

  const config = getNetworkConfig(network);
  const [networkPassphrase, setNetworkPassphrase] = useState(config.passphrase);
  const [horizonUrl, setHorizonUrl] = useState(config.horizonUrl);

  useEffect(() => {
    const config = getNetworkConfig(network);
    setNetworkPassphrase(config.passphrase);
    setHorizonUrl(config.horizonUrl);
    
    // Only update URL if we're not already on the root path
    if (window.location.pathname !== '/') {
      window.history.replaceState({}, '', '/');
    }
  }, [network]);

  return (
    <NetworkContext.Provider value={{ network, networkPassphrase, horizonUrl, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};
