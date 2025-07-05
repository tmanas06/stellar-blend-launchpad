import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, SortAsc, Plus, Users, Code } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import AddProjectForm from "@/components/AddProjectForm";

const Projects = () => {
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [userRole, setUserRole] = useState<"investor" | "developer">("investor");
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const allProjects = [
    {
      id: 1,
      name: "StellarPay Pro",
      description: "Next-generation payment infrastructure for Stellar ecosystem with advanced smart contract capabilities",
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
      description: "Advanced blockchain analytics and reporting tools for the Stellar network",
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
      description: "Decentralized gaming platform with NFT integration and play-to-earn mechanics",
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
    },
    {
      id: 4,
      name: "StellarBridge",
      description: "Cross-chain bridge connecting Stellar to major blockchain networks",
      category: "Infrastructure",
      targetAmount: 400000,
      currentAmount: 280000,
      apy: 13.2,
      riskLevel: "Medium",
      daysRemaining: 12,
      minInvestment: 50,
      lenders: 178,
      scfRound: 17,
      teamSize: 6
    },
    {
      id: 5,
      name: "Community Hub",
      description: "Social platform for Stellar developers and community members",
      category: "Social",
      targetAmount: 100000,
      currentAmount: 65000,
      apy: 9.5,
      riskLevel: "Low",
      daysRemaining: 30,
      minInvestment: 5,
      lenders: 145,
      scfRound: 16,
      teamSize: 4
    },
    {
      id: 6,
      name: "DeFi Yield Optimizer",
      description: "Automated yield farming and optimization protocol for Stellar DeFi",
      category: "DeFi",
      targetAmount: 300000,
      currentAmount: 45000,
      apy: 16.7,
      riskLevel: "High",
      daysRemaining: 45,
      minInvestment: 100,
      lenders: 67,
      scfRound: 17,
      teamSize: 7
    }
  ];

  const handleConnectWallet = () => {
    setConnectedWallet(true);
  };

  const filteredProjects = allProjects
    .filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(project => 
      categoryFilter === "all" || project.category.toLowerCase() === categoryFilter.toLowerCase()
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "apy": return b.apy - a.apy;
        case "funded": return b.currentAmount - a.currentAmount;
        case "ending": return a.daysRemaining - b.daysRemaining;
        default: return b.id - a.id;
      }
    });

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
                Investment Projects
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover and invest in vetted Stellar Community Fund projects
              </p>
            </div>

            {/* Role Selection */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-2 flex">
                <Button
                  variant={userRole === "investor" ? "default" : "ghost"}
                  onClick={() => setUserRole("investor")}
                  className={`flex items-center gap-2 ${
                    userRole === "investor" 
                      ? "bg-cyan-500 hover:bg-cyan-600 text-white" 
                      : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Investor
                </Button>
                <Button
                  variant={userRole === "developer" ? "default" : "ghost"}
                  onClick={() => setUserRole("developer")}
                  className={`flex items-center gap-2 ${
                    userRole === "developer" 
                      ? "bg-purple-500 hover:bg-purple-600 text-white" 
                      : "text-gray-300 hover:text-purple-400 hover:bg-gray-800/50"
                  }`}
                >
                  <Code className="h-4 w-4" />
                  Developer
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="defi">DeFi</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="apy">Highest APY</SelectItem>
                    <SelectItem value="funded">Most Funded</SelectItem>
                    <SelectItem value="ending">Ending Soon</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  {userRole === "developer" && (
                    <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold shadow-md shadow-purple-500/25">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Project
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-white">Create New Project</DialogTitle>
                        </DialogHeader>
                        <AddProjectForm onClose={() => setIsAddProjectOpen(false)} />
                      </DialogContent>
                    </Dialog>
                  )}
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {filteredProjects.length} Projects
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} userRole={userRole} />
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
