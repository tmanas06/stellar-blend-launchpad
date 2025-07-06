
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Users, Clock, Shield, HandHeart } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    category: string;
    targetAmount: number;
    currentAmount: number;
    apy: number;
    riskLevel: string;
    daysRemaining: number;
    minInvestment: number;
    lenders: number;
    scfRound: number;
    teamSize: number;
  };
  userRole: "investor" | "developer";
}

const ProjectCard = ({ project, userRole }: ProjectCardProps) => {
  const progressPercentage = (project.currentAmount / project.targetAmount) * 100;
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "High": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-cyan-400/50 transform hover:scale-105 bg-gray-900/50 backdrop-blur-sm border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-medium border-cyan-400/30 text-cyan-400">
                SCF Round {project.scfRound}
              </Badge>
              <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30">
                {project.category}
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {project.name}
            </CardTitle>
            <p className="text-gray-300 text-sm mt-2 line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Funding Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Funding Progress</span>
            <span className="text-sm font-bold text-gray-900">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {formatCurrency(project.currentAmount)} raised
            </span>
            <span className="font-medium text-gray-900">
              {formatCurrency(project.targetAmount)} goal
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{project.apy}%</div>
            <div className="text-xs text-gray-600">APY</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{project.daysRemaining}</div>
            <div className="text-xs text-gray-600">Days Left</div>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span>{project.lenders} lenders</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{project.teamSize} team members</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Risk Level:</span>
            </div>
            <Badge className={`text-xs font-medium border ${getRiskColor(project.riskLevel)}`}>
              {project.riskLevel}
            </Badge>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Min. Investment:</span>
            <span className="font-medium text-gray-900">{formatCurrency(project.minInvestment)}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className={`w-full font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
            userRole === "investor" 
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
              : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white"
          }`}
        >
          {userRole === "investor" ? (
            <>
              Invest Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          ) : (
            <>
              Collaborate
              <HandHeart className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
