import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Shield, TrendingUp, Users, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import StatsSection from "@/components/StatsSection";
import { connectWallet } from "@/utils/walletConnect";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [userRole, setUserRole] = useState<"investor" | "developer">("investor");
  const [walletPublicKey, setWalletPublicKey] = useState<string>("");
  const { toast } = useToast();

  // Empty projects array - will be populated via add project functionality
  const featuredProjects: any[] = [];

  const handleConnectWallet = async () => {
    try {
      const publicKey = await connectWallet();
      if (publicKey) {
        setConnectedWallet(true);
        setWalletPublicKey(publicKey);
        toast({
          title: "Wallet Connected!",
          description: `Connected to ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`,
        });
        console.log('Wallet connected with public key:', publicKey);
      }
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive"
      });
    }
  };

  const handleWalletConnect = (publicKey: string) => {
    setConnectedWallet(true);
    setWalletPublicKey(publicKey);
    console.log('Wallet connected with public key:', publicKey);
  };

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
        <Navigation connectedWallet={connectedWallet} onConnectWallet={handleWalletConnect} />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Fund the Future of
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse"> Stellar Innovation</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Invest in vetted Stellar Community Fund projects and earn competitive yields while supporting groundbreaking blockchain innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 border border-cyan-400/30"
                  onClick={handleConnectWallet}
                >
                  Start Investing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"
                >
                  Explore Projects
                </Button>
              </div>
            </div>
            
            <StatsSection />
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 px-4 bg-black/20 backdrop-blur-sm border-y border-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose Blend SCF Launchpad</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The most transparent and accessible way to invest in Stellar's most promising projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 border-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-cyan-400" />
                  </div>
                  <CardTitle className="text-xl text-white">Vetted Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    All projects are pre-screened through the Stellar Community Fund process, ensuring quality and legitimacy.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-green-400" />
                  </div>
                  <CardTitle className="text-xl text-white">Competitive Yields</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    Earn 8-15% APY on your investments while supporting innovative Stellar ecosystem projects.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-purple-500/30 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl text-white">Micro Investments</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    Start investing with as little as $1, thanks to Stellar's ultra-low transaction fees.
                  </CardDescription>
                </CardContent>
                </Card>

              <Card className="text-center p-6 border-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-orange-400" />
                  </div>
                  <CardTitle className="text-xl text-white">Community Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    Join a community of investors supporting the next generation of blockchain innovation.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-900/80 to-purple-900/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Featured Investment Opportunities</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover high-potential projects from the Stellar Community Fund
              </p>
            </div>
            
            {featuredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} userRole={userRole} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-6">No projects available yet.</p>
                <p className="text-gray-500">Be the first to add a project and start the revolution!</p>
              </div>
            )}
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 px-8 py-3 font-semibold rounded-xl backdrop-blur-sm"
              >
                View All Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-cyan-600/80 to-purple-600/80 backdrop-blur-sm border-t border-gray-800/50">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Investing?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of investors funding the future of the Stellar ecosystem
            </p>
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleConnectWallet}
            >
              Connect Your Wallet
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-black border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Blend SCF Launchpad</h3>
                <p className="text-gray-400">
                  Democratizing access to Stellar ecosystem investments through transparent, secure DeFi lending.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Projects</li>
                  <li>How it Works</li>
                  <li>Risk Management</li>
                  <li>Insurance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Documentation</li>
                  <li>API Reference</li>
                  <li>Community</li>
                  <li>Support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Risk Disclosure</li>
                  <li>Compliance</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Blend SCF Launchpad. Built on Stellar.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
