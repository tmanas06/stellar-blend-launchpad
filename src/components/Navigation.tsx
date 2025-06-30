
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Search, Bell } from "lucide-react";

interface NavigationProps {
  connectedWallet: boolean;
  onConnectWallet: () => void;
}

const Navigation = ({ connectedWallet, onConnectWallet }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blend SCF</h1>
              <p className="text-xs text-gray-500 -mt-1">Launchpad</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Projects
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              How it Works
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Analytics
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Community
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {connectedWallet && (
              <>
                <Button variant="ghost" size="sm" className="relative">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500"></Badge>
                </Button>
                <div className="flex items-center space-x-3 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">GDAI...X7K9</span>
                </div>
              </>
            )}
            {!connectedWallet && (
              <Button 
                onClick={onConnectWallet}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                Projects
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                How it Works
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                Analytics
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                Community
              </a>
              {!connectedWallet && (
                <Button 
                  onClick={onConnectWallet}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold mx-2 mt-4"
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
