
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Search, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  connectedWallet: boolean;
  onConnectWallet: () => void;
}

const Navigation = ({ connectedWallet, onConnectWallet }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/projects", label: "Projects" },
    { path: "/how-it-works", label: "How it Works" },
    { path: "/analytics", label: "Analytics" },
    { path: "/community", label: "Community" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Blend SCF</h1>
              <p className="text-xs text-gray-400 -mt-1">Launchpad</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {connectedWallet && (
              <>
                <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500"></Badge>
                </Button>
                <div className="flex items-center space-x-3 px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/30 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-400">GDAI...X7K9</span>
                </div>
              </>
            )}
            {!connectedWallet && (
              <Button 
                onClick={onConnectWallet}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md shadow-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 border border-cyan-400/30"
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
              className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800/50 py-4 bg-black/90 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium px-2 py-1 transition-colors ${
                    isActive(link.path)
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!connectedWallet && (
                <Button 
                  onClick={onConnectWallet}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold mx-2 mt-4 shadow-md shadow-cyan-500/25"
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
