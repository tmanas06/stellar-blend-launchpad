// src/components/WalletConnect.tsx
import React, { useState, useEffect } from 'react';
import { useFreighter } from '../hooks/useFreighter';
import { useNetwork } from '../contexts/NetworkContext';
import { Button } from './ui/button';
import { Wallet, Power, Copy, Check, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const WalletConnect: React.FC<{
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}> = ({ className, variant = 'default', size = 'default' }) => {
  const {
    isConnected,
    publicKey,
    isLoading,
    error,
    connect,
    disconnect,
  } = useFreighter();
  
  const { network } = useNetwork();
  
  // Always use the network from our NetworkContext
  const networkName = network === 'mainnet' ? 'MAINNET' : 'TESTNET';
  
  // Debug log to help track network values
  useEffect(() => {
    console.log('Current Network:', network);
  }, [network]);

  const [copied, setCopied] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleConnect = async () => {
    setShowError(false);
    await connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  // Helper to get the address string from publicKey (handles both string and object formats)
  const getAddressString = (key: any): string => {
    if (!key) return '';
    if (typeof key === 'string') return key;
    if (typeof key === 'object' && key !== null && 'address' in key) {
      return key.address;
    }
    console.warn('Unexpected public key format:', key);
    return '';
  };

  const copyToClipboard = () => {
    const address = getAddressString(publicKey);
    if (!address) {
      console.error('No public key available to copy');
      return;
    }
    console.log('Copying public key:', address);
    try {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const formatAddress = (key: any) => {
    const address = getAddressString(key);
    if (!address) return '';
    if (address.length <= 10) return address; // Return as is if too short to format
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Show error message for 5 seconds
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (isConnected) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>{networkName}</span>
        </div>
        
        <Button
          variant={variant}
          size={size}
          onClick={copyToClipboard}
          className="gap-2"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {publicKey && formatAddress(publicKey)}
        </Button>
        
        <Button
          variant="outline"
          size={size}
          onClick={handleDisconnect}
          disabled={isLoading}
          className="gap-2"
        >
          <Power className="w-4 h-4" />
          <span className="sr-only">Disconnect</span>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Button
        variant={variant}
        size={size}
        onClick={handleConnect}
        disabled={isLoading}
        className="gap-2"
      >
        <Wallet className="w-4 h-4" />
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </Button>

      {showError && error && (
        <div className="absolute left-0 z-50 w-64 p-2 mt-2 text-sm text-red-600 bg-red-100 border border-red-200 rounded-md shadow-lg top-full">
          <div className="flex items-start gap-2">
            <AlertCircle className="flex-shrink-0 w-4 h-4 mt-0.5" />
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;