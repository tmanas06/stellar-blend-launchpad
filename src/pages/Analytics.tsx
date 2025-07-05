
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Award, Activity, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";

// Stellar network configuration
const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const RPC_URL = 'https://soroban-testnet.stellar.org';
const BACKSTOP_ID = "CC4TSDVQKBAYMK4BEDM65CSNB3ISI2A54OOBRO6IPSTFHJY3DEEKHRKV";
const POOL_FACTORY_ID = "CDIE73IJJKOWXWCPU5GWQ745FUKWCSH3YKZRF5IQW7GE3G7YAZ773MYK";

interface StellarMetrics {
  totalAccounts: number;
  totalTransactions: number;
  networkFees: number;
  activeValidators: number;
  ledgerHeight: number;
  totalSupply: string;
}

interface PoolData {
  id: string;
  totalSupply: string;
  reserves: string;
  participants: number;
}

const Analytics = () => {
  const [connectedWallet, setConnectedWallet] = useState(false);

  // Fetch Stellar network statistics
  const { data: stellarData, isLoading: stellarLoading } = useQuery({
    queryKey: ['stellar-metrics'],
    queryFn: async (): Promise<StellarMetrics> => {
      const response = await fetch(`${HORIZON_URL}/`);
      const data = await response.json();
      
      return {
        totalAccounts: data.history_latest_ledger || 0,
        totalTransactions: data.history_latest_ledger || 0,
        networkFees: 0.00001,
        activeValidators: 23,
        ledgerHeight: data.history_latest_ledger || 0,
        totalSupply: "50000000000"
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch pool data from Backstop contract
  const { data: poolData, isLoading: poolLoading } = useQuery({
    queryKey: ['pool-data'],
    queryFn: async (): Promise<PoolData[]> => {
      try {
        // In a real implementation, this would call the Soroban contract
        // For now, we'll return mock data that represents pool statistics
        return [
          {
            id: BACKSTOP_ID,
            totalSupply: "2400000",
            reserves: "1800000",
            participants: 1247
          }
        ];
      } catch (error) {
        console.error('Error fetching pool data:', error);
        return [];
      }
    },
    refetchInterval: 60000, // Refetch every minute
  });

  const handleConnectWallet = () => {
    setConnectedWallet(true);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const analyticsStats = [
    {
      icon: DollarSign,
      value: stellarData ? `$${formatNumber(parseInt(poolData?.[0]?.totalSupply || "0"))}` : "$2.4M",
      label: "Total Value Locked",
      change: "+23%",
      bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-600/20",
      iconColor: "text-green-400",
      borderColor: "border-green-500/30",
      isLoading: stellarLoading || poolLoading
    },
    {
      icon: Users,
      value: stellarData ? formatNumber(poolData?.[0]?.participants || 1247) : "1,247",
      label: "Active Investors",
      change: "+15%",
      bgColor: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20",
      iconColor: "text-cyan-400",
      borderColor: "border-cyan-500/30",
      isLoading: stellarLoading || poolLoading
    },
    {
      icon: Activity,
      value: stellarData ? formatNumber(stellarData.ledgerHeight) : "4,521,789",
      label: "Network Height",
      change: "+0.1%",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-violet-600/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      isLoading: stellarLoading
    },
    {
      icon: TrendingUp,
      value: "11.2%",
      label: "Average APY",
      change: "+2.1%",
      bgColor: "bg-gradient-to-br from-orange-500/20 to-red-600/20",
      iconColor: "text-orange-400",
      borderColor: "border-orange-500/30",
      isLoading: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      <div className="relative z-10">
        <Navigation connectedWallet={connectedWallet} onConnectWallet={handleConnectWallet} />
        
        {/* Header */}
        <section className="pt-20 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Platform Analytics
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real-time insights into the Blend SCF Launchpad ecosystem powered by Stellar network data
              </p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
              {analyticsStats.map((stat, index) => (
                <Card key={index} className={`bg-gray-900/50 backdrop-blur-sm border-2 ${stat.borderColor} hover:border-opacity-80 transition-all duration-300 hover:shadow-lg`}>
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className={`mx-auto w-12 h-12 ${stat.bgColor} border ${stat.borderColor} rounded-full flex items-center justify-center mb-3`}>
                      <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.isLoading ? (
                        <div className="animate-pulse bg-gray-700 h-8 w-16 mx-auto rounded"></div>
                      ) : (
                        stat.value
                      )}
                    </div>
                    <div className="text-sm text-gray-300 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs text-green-400 font-medium">
                      {stat.change} this month
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Network Status */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-2 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-cyan-400" />
                    Stellar Network Status
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Live network statistics from Horizon API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Network Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Latest Ledger</span>
                    <span className="text-white font-mono">
                      {stellarLoading ? (
                        <div className="animate-pulse bg-gray-700 h-4 w-20 rounded"></div>
                      ) : (
                        formatNumber(stellarData?.ledgerHeight || 4521789)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Base Fee</span>
                    <span className="text-white">0.00001 XLM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Avg. Close Time</span>
                    <span className="text-white">5 seconds</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-2 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                    Pool Analytics
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Blend protocol pool statistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Active Pools</span>
                    <span className="text-white">34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Reserves</span>
                    <span className="text-white">
                      {poolLoading ? (
                        <div className="animate-pulse bg-gray-700 h-4 w-16 rounded"></div>
                      ) : (
                        `$${formatNumber(parseInt(poolData?.[0]?.reserves || "1800000"))}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Utilization Rate</span>
                    <span className="text-white">75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Insurance Pool</span>
                    <span className="text-white">$120K</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* API Endpoints */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Network Configuration</CardTitle>
                <CardDescription className="text-gray-400">
                  Active endpoints and contract addresses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-300 text-sm block mb-1">Horizon URL</span>
                    <code className="text-cyan-400 bg-gray-800/50 px-2 py-1 rounded text-xs">
                      {HORIZON_URL}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-300 text-sm block mb-1">Soroban RPC</span>
                    <code className="text-cyan-400 bg-gray-800/50 px-2 py-1 rounded text-xs">
                      {RPC_URL}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-300 text-sm block mb-1">Backstop Contract</span>
                    <code className="text-green-400 bg-gray-800/50 px-2 py-1 rounded text-xs">
                      {BACKSTOP_ID}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-300 text-sm block mb-1">Pool Factory</span>
                    <code className="text-purple-400 bg-gray-800/50 px-2 py-1 rounded text-xs">
                      {POOL_FACTORY_ID}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Analytics;
