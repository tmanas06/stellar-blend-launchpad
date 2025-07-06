import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WalletConnect } from './WalletConnect';
import { NetworkSwitcher } from '@/components/ui/network-switcher';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/testnet' },
    { name: 'Projects', path: '/projects' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Community', path: '/community' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm shadow-sm">
      <div className="container flex h-full max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-1 lg:space-x-2">
          <Link to="/testnet" className="mr-4">
            <span className="text-lg font-bold text-foreground">Stellar Launchpad</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                asChild
                variant="ghost"
                className={cn(
                  'text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  location.pathname === item.path ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                <Link to={item.path}>
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <NetworkSwitcher />
          <div className="hidden sm:block w-px h-6 bg-border" />
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
