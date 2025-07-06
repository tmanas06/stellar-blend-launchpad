import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNetwork } from '@/contexts/NetworkContext';
import { useFreighter } from '@/hooks/useFreighter';
import { Wallet } from 'lucide-react';

export default function BlendServices() {
  const { network } = useNetwork();
  const { publicKey, isConnected, isLoading, connect } = useFreighter();

  const services = [
    {
      title: 'Liquidity Pools',
      description: 'Provide liquidity to earn trading fees and rewards',
      action: 'Add Liquidity',
      disabled: false,
    },
    {
      title: 'Yield Farming',
      description: 'Stake your LP tokens to earn additional rewards',
      action: 'Stake LP Tokens',
      disabled: true,
    },
    {
      title: 'Lending & Borrowing',
      description: 'Lend your assets to earn interest or borrow against your collateral',
      action: 'Coming Soon',
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 mb-6">
            Blend Protocol Services
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Access DeFi services on the Stellar network
          </p>
          <div className="mt-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-purple-200 border border-white/10">
              {network.toUpperCase()} Network
            </span>
          </div>
        </div>

        {!isConnected ? (
          <Card className="text-center p-8 bg-white/5 backdrop-blur-sm border-white/10 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-900/30 flex items-center justify-center">
              <Wallet className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Connect Your Wallet</h3>
            <p className="text-gray-300 mb-6">
              Connect your wallet to access Blend Protocol services
            </p>
            <Button 
              onClick={connect} 
              disabled={isLoading}
              className="px-8 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="h-full flex flex-col bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-300">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button 
                    variant={service.disabled ? "outline" : "default"}
                    className={`w-full ${!service.disabled ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' : ''}`}
                    disabled={service.disabled}
                  >
                    {service.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
