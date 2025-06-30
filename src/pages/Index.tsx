
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Shield, TrendingUp, Users, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  const [connectedWallet, setConnectedWallet] = useState(false);

  const featuredProjects = [
    {
      id: 1,
      name: "StellarPay Pro",
      description: "Next-generation payment infrastructure for Stellar ecosystem",
      category: "DeFi",
      targetAmount: 250000,
      currentAmount: 180000,
      apy: 12.5,
      riskLevel: "Medium",
      daysRemaining: 15,
      minInvestment: 10,
      lenders: 156,
      scfRound: 17,
      teamSize: 5
    },
    {
      id: 2,
      name: "Luminary Analytics",
      description: "Advanced blockchain analytics and reporting tools",
      category: "Infrastructure",
      targetAmount: 150000,
      currentAmount: 95000,
      apy: 10.2,
      riskLevel: "Low",
      daysRemaining: 8,
      minInvestment: 1,
      lenders: 203,
      scfRound: 16,
      teamSize: 3
    },
    {
      id: 3,
      name: "AstroVault Gaming",
      description: "Decentralized gaming platform with NFT integration",
      category: "Gaming",
      targetAmount: 500000,
      currentAmount: 125000,
      apy: 15.8,
      riskLevel: "High",
      daysRemaining: 22,
      minInvestment: 25,
      lenders: 89,
      scfRound: 17,
      teamSize: 8
    }
  ];

  const handleConnectWallet = () => {
    setConnectedWallet(true);
    // In a real implementation, this would connect to Freighter/Albedo/xBull
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation connectedWallet={connectedWallet} onConnectWallet={handleConnectWallet} />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Fund the Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Stellar Innovation</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Invest in vetted Stellar Community Fund projects and earn competitive yields while supporting groundbreaking blockchain innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleConnectWallet}
              >
                Start Investing <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Explore Projects
              </Button>
            </div>
          </div>
          
          <StatsSection />
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Blend SCF Launchpad</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most transparent and accessible way to invest in Stellar's most promising projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Vetted Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  All projects are pre-screened through the Stellar Community Fund process, ensuring quality and legitimacy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Competitive Yields</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Earn 8-15% APY on your investments while supporting innovative Stellar ecosystem projects.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Micro Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Start investing with as little as $1, thanks to Stellar's ultra-low transaction fees.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Join a community of investors supporting the next generation of blockchain innovation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Investment Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover high-potential projects from the Stellar Community Fund
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 font-semibold rounded-xl"
            >
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Investing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of investors funding the future of the Stellar ecosystem
          </p>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={handleConnectWallet}
          >
            Connect Your Wallet
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Blend SCF Launchpad</h3>
              <p className="text-gray-400">
                Democratizing access to Stellar ecosystem investments through transparent, secure DeFi lending.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Projects</li>
                <li>How it Works</li>
                <li>Risk Management</li>
                <li>Insurance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Community</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
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
  );
};

export default Index;
