'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useNetwork } from '@/contexts/NetworkContext';

export function NetworkSwitcher({ className }: { className?: string }) {
  const { network, setNetwork } = useNetwork();

  return (
    <div className={cn("flex items-center space-x-1 bg-muted p-1 rounded-md", className)}>
      <Button
        variant={network === 'testnet' ? 'default' : 'ghost'}
        size="sm"
        className={cn(
          'px-3 font-medium',
          network === 'testnet' 
            ? 'bg-background shadow-sm text-foreground' 
            : 'text-muted-foreground hover:bg-transparent hover:text-foreground'
        )}
        onClick={() => setNetwork('testnet')}
      >
        Testnet
      </Button>
      <Button
        variant={network === 'mainnet' ? 'default' : 'ghost'}
        size="sm"
        className={cn(
          'px-3 font-medium',
          network === 'mainnet' 
            ? 'bg-background shadow-sm text-foreground' 
            : 'text-muted-foreground hover:bg-transparent hover:text-foreground'
        )}
        onClick={() => setNetwork('mainnet')}
      >
        Mainnet
      </Button>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
