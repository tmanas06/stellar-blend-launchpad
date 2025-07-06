
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Upload, RefreshCw, ExternalLink, Wallet, Activity, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { fetchAccountData, fetchAccountTransactions, formatAssetCode, formatBalance, StellarAccount, StellarTransaction } from "@/utils/stellarApi";
import { uploadToIPFS } from "@/utils/ipfsStorage";

const Profile = () => {
  const { publicKey } = useParams<{ publicKey: string }>();
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [walletPublicKey, setWalletPublicKey] = useState("");
  const [accountData, setAccountData] = useState<StellarAccount | null>(null);
  const [transactions, setTransactions] = useState<StellarTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (publicKey) {
      setConnectedWallet(true);
      setWalletPublicKey(publicKey);
      loadAccountData(publicKey);
    }
  }, [publicKey]);

  const loadAccountData = async (address: string) => {
    setLoading(true);
    try {
      const [account, txs] = await Promise.all([
        fetchAccountData(address),
        fetchAccountTransactions(address, 20)
      ]);
      
      setAccountData(account);
      setTransactions(txs);
    } catch (error) {
      console.error('Error loading account data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load wallet information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!publicKey) return;
    setRefreshing(true);
    await loadAccountData(publicKey);
    setRefreshing(false);
    toast({
      title: "Data Refreshed",
      description: "Wallet information has been updated",
    });
  };

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const result = await uploadToIPFS(file, `profile-${publicKey}`);
      const imageUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
      setProfileImage(imageUrl);
      
      toast({
        title: "Image Uploaded",
        description: "Profile image updated successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleConnectWallet = (pubKey: string) => {
    setConnectedWallet(true);
    setWalletPublicKey(pubKey);
  };

  const handleDisconnectWallet = () => {
    setConnectedWallet(false);
    setWalletPublicKey("");
  };

  if (!publicKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <Navigation 
          connectedWallet={connectedWallet} 
          walletPublicKey={walletPublicKey}
          onConnectWallet={handleConnectWallet}
          onDisconnectWallet={handleDisconnectWallet}
        />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <Card className="bg-gray-900/50 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Invalid Profile</CardTitle>
              <CardDescription>No wallet address provided</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <Navigation 
        connectedWallet={connectedWallet} 
        walletPublicKey={walletPublicKey}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-cyan-500/50">
                    <AvatarImage src={profileImage} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-600 text-white text-2xl font-bold">
                      {publicKey.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="profile-upload" className="absolute -bottom-2 -right-2 bg-cyan-500 hover:bg-cyan-400 text-white p-2 rounded-full cursor-pointer transition-colors">
                    <Upload className="h-4 w-4" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl text-white">Stellar Wallet Profile</CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Connected
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <code className="bg-gray-800/50 px-3 py-1 rounded text-cyan-400 text-sm font-mono">
                      {publicKey.slice(0, 8)}...{publicKey.slice(-8)}
                    </code>
                    <Button size="sm" variant="ghost" onClick={handleCopyAddress} className="text-gray-400 hover:text-cyan-400">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleRefresh} disabled={refreshing} className="text-gray-400 hover:text-cyan-400">
                      <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>

                  {accountData && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        <div className="text-lg font-bold text-blue-400">{accountData.balances.length}</div>
                        <div className="text-xs text-gray-400">Assets</div>
                      </div>
                      <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                        <div className="text-lg font-bold text-green-400">{accountData.subentry_count}</div>
                        <div className="text-xs text-gray-400">Subentries</div>
                      </div>
                      <div className="text-center p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                        <div className="text-lg font-bold text-purple-400">{transactions.length}</div>
                        <div className="text-xs text-gray-400">Recent TXs</div>
                      </div>
                      <div className="text-center p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                        <div className="text-lg font-bold text-orange-400">{accountData.signers.length}</div>
                        <div className="text-xs text-gray-400">Signers</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Profile Content */}
          <Tabs defaultValue="assets" className="space-y-6">
            <TabsList className="bg-gray-800/50 border-gray-700">
              <TabsTrigger value="assets" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                <Wallet className="h-4 w-4 mr-2" />
                Assets
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                <Activity className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="nfts" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                <Image className="h-4 w-4 mr-2" />
                NFTs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assets">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Wallet Assets</CardTitle>
                  <CardDescription>Your Stellar asset balances</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8 text-gray-400">Loading assets...</div>
                  ) : accountData?.balances.length ? (
                    <div className="space-y-3">
                      {accountData.balances.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-full flex items-center justify-center">
                              <span className="text-cyan-400 font-bold text-sm">{formatAssetCode(asset).slice(0, 3)}</span>
                            </div>
                            <div>
                              <div className="font-semibold text-white">{formatAssetCode(asset)}</div>
                              {asset.asset_issuer && (
                                <div className="text-xs text-gray-400 font-mono">
                                  {asset.asset_issuer.slice(0, 8)}...{asset.asset_issuer.slice(-8)}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">{formatBalance(asset.balance)}</div>
                            <div className="text-xs text-gray-400">{formatAssetCode(asset)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">No assets found</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Transactions</CardTitle>
                  <CardDescription>Your latest Stellar transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8 text-gray-400">Loading transactions...</div>
                  ) : transactions.length ? (
                    <div className="space-y-3">
                      {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <code className="text-xs text-cyan-400 font-mono bg-gray-800/50 px-2 py-1 rounded">
                                {tx.hash.slice(0, 8)}...{tx.hash.slice(-8)}
                              </code>
                              <Badge variant="secondary" className="text-xs">
                                {tx.operation_count} ops
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(tx.created_at).toLocaleDateString()} {new Date(tx.created_at).toLocaleTimeString()}
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" asChild className="text-gray-400 hover:text-cyan-400">
                            <a href={`https://stellar.expert/explorer/public/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">No transactions found</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nfts">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">NFTs & Collectibles</CardTitle>
                  <CardDescription>Your Stellar NFTs and unique assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-400">
                    NFT support coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
