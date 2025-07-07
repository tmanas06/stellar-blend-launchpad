import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNetwork } from "@/contexts/NetworkContext";
import { useWallet } from '@/hooks/useWallet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { network, setNetwork } = useNetwork();
  const { toast } = useToast();
  const { connect, disconnect } = useWallet();
  const hasInitialized = useRef(false);

  // Handle network from URL or location state
  useEffect(() => {
    // Only run this effect once on component mount
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Disconnect wallet on mount to ensure clean state
    const initialize = async () => {
      await disconnect();

      // Check for network in location state
      const state = location.state as { network?: 'testnet' | 'mainnet' } | undefined;
      if (state?.network && ['testnet', 'mainnet'].includes(state.network)) {
        setNetwork(state.network);
        // Clear the state to avoid reapplying on back/forward navigation
        navigate(location.pathname, { replace: true, state: {} });
      }
    };

    initialize();
  }, [location.state, location.pathname, navigate, setNetwork, disconnect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/70"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
            Stellar Launchpad
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Discover and invest in the next generation of Stellar projects. Launch, fund, and grow your decentralized applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              <Link to="/projects">
                Explore Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <section className="py-20 px-4 bg-black/20 backdrop-blur-sm border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Why Choose Stellar Launchpad</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Vetted Projects',
                description: 'All projects go through a rigorous vetting process to ensure quality and potential.',
                icon: '✅'
              },
              {
                title: 'Secure & Transparent',
                description: 'Built on the Stellar blockchain for secure and transparent transactions.',
                icon: '🔒'
              },
              {
                title: 'Community Driven',
                description: 'Join a growing community of investors and developers.',
                icon: '🌐'
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black/20 backdrop-blur-sm border-y border-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Launch Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8">Join the Stellar Launchpad and connect with investors from around the world.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
            >
              <Link to="/projects">
                Get Started
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm py-12 px-4 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-cyan-400">Explore</Link></li>
                <li><Link to="/how-it-works" className="hover:text-cyan-400">How It Works</Link></li>
                <li><Link to="/blog" className="hover:text-cyan-400">Blog</Link></li>
                <li><Link to="/about" className="hover:text-cyan-400">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">For Projects</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/apply" className="hover:text-cyan-400">Apply for Funding</Link></li>
                <li><Link to="/guidelines" className="hover:text-cyan-400">Project Guidelines</Link></li>
                <li><Link to="/success" className="hover:text-cyan-400">Success Stories</Link></li>
                <li><Link to="/resources" className="hover:text-cyan-400">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">For Investors</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/getting-started" className="hover:text-cyan-400">Getting Started</Link></li>
                <li><Link to="/guide" className="hover:text-cyan-400">Investment Guide</Link></li>
                <li><Link to="/portfolio" className="hover:text-cyan-400">Portfolio</Link></li>
                <li><Link to="/faq" className="hover:text-cyan-400">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/terms" className="hover:text-cyan-400">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-cyan-400">Privacy Policy</Link></li>
                <li><Link to="/risk" className="hover:text-cyan-400">Risk Disclosure</Link></li>
                <li><Link to="/compliance" className="hover:text-cyan-400">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Stellar Launchpad. Built on Stellar.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
