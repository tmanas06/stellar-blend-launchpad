import { Toaster } from "sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NetworkProvider } from "./contexts/NetworkContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import HowItWorks from "./pages/HowItWorks";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import BlendServices from "./pages/BlendServices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NetworkProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/testnet" element={<Navigate to="/" replace state={{ network: 'testnet' }} />} />
                <Route path="/mainnet" element={<Navigate to="/" replace state={{ network: 'mainnet' }} />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blend-services" element={<BlendServices />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile/:publicKey" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </NetworkProvider>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;