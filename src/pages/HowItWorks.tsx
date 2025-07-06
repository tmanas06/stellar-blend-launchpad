
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Users, Zap, CheckCircle, AlertTriangle, Info, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";

const HowItWorks = () => {
  const [connectedWallet, setConnectedWallet] = useState(false);

  const handleConnectWallet = () => {
    setConnectedWallet(true);
  };

  const steps = [
    {
      number: "01",
      title: "Project Submission",
      description: "SCF projects submit their funding requirements through our platform",
      details: "Projects that have been approved or are in the process of SCF evaluation can create lending pools with customized terms.",
      icon: Users,
      color: "cyan"
    },
    {
      number: "02", 
      title: "Due Diligence",
      description: "Our risk assessment team evaluates each project thoroughly",
      details: "We analyze team credentials, technical feasibility, market potential, and integration with SCF metrics.",
      icon: Shield,
      color: "green"
    },
    {
      number: "03",
      title: "Pool Creation",
      description: "Approved projects get their own Blend protocol lending pools",
      details: "Smart contracts are deployed on Stellar with automated fund distribution and repayment mechanisms.",
      icon: Zap,
      color: "purple"
    },
    {
      number: "04",
      title: "Investment Period",
      description: "Investors can fund projects starting from just $1",
      details: "Real-time funding progress, transparent terms, and instant investment execution through Stellar's fast network.",
      icon: TrendingUp,
      color: "orange"
    }
  ];

  const benefits = [
    {
      title: "Low Barrier to Entry",
      description: "Start investing with as little as $1 thanks to Stellar's ultra-low fees",
      icon: DollarSign,
      highlight: "$1 minimum",
      color: "cyan"
    },
    {
      title: "Vetted Projects",
      description: "All projects go through rigorous SCF evaluation process",
      icon: Shield,
      highlight: "100% SCF verified",
      color: "green"
    },
    {
      title: "Competitive Returns",
      description: "Earn 8-15% APY while supporting innovation",
      icon: TrendingUp,
      highlight: "8-15% APY",
      color: "orange"
    },
    {
      title: "Fast & Cheap",
      description: "Stellar network ensures instant transactions for pennies",
      icon: Zap,
      highlight: "<5 seconds"
    }
  ];

  const riskFactors = [
    {
      level: "Low Risk",
      description: "Established teams with proven track records",
      color: "green",
      examples: ["Infrastructure projects", "Well-funded teams", "Clear revenue models"]
    },
    {
      level: "Medium Risk", 
      description: "Innovative projects with solid fundamentals",
      color: "yellow",
      examples: ["New DeFi protocols", "Gaming platforms", "Cross-chain solutions"]
    },
    {
      level: "High Risk",
      description: "Early-stage projects with high potential",
      color: "red",
      examples: ["Experimental protocols", "New market segments", "Cutting-edge technology"]
    }
  ];

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
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Learn how Blend SCF Launchpad connects investors with innovative Stellar projects
            </p>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-2 text-lg">
              Powered by Stellar & Blend Protocol
            </Badge>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 px-4 bg-black/20 backdrop-blur-sm border-y border-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Investment Process</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className={`bg-gray-900/50 backdrop-blur-sm border-2 border-${step.color}-500/30 hover:border-${step.color}-500/50 transition-all duration-300`}>
                  <CardHeader className="text-center">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-br from-${step.color}-500/20 to-${step.color}-600/20 border border-${step.color}-500/30 rounded-full flex items-center justify-center mb-4`}>
                      <step.icon className={`h-8 w-8 text-${step.color}-400`} />
                    </div>
                    <div className={`text-3xl font-bold text-${step.color}-400 mb-2`}>{step.number}</div>
                    <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 mb-3">
                      {step.description}
                    </CardDescription>
                    <p className="text-sm text-gray-500">
                      {step.details}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Our Platform</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{benefit.description}</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {benefit.highlight}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Risk Management */}
        <section className="py-16 px-4 bg-black/20 backdrop-blur-sm border-y border-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Risk Management</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {riskFactors.map((risk, index) => (
                <Card key={index} className={`bg-gray-900/50 backdrop-blur-sm border-2 border-${risk.color}-500/30`}>
                  <CardHeader>
                    <CardTitle className={`text-${risk.color}-400 flex items-center gap-2`}>
                      <AlertTriangle className="h-5 w-5" />
                      {risk.level}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {risk.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {risk.examples.map((example, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-gray-500" />
                          {example}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Insurance Protection</h3>
                  <p className="text-gray-300 mb-4">
                    All investments are protected by the Blend Protocol's Backstop module, providing first-loss capital protection of up to 10% of pool value.
                  </p>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    5-10% Coverage Ratio
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect your wallet and start investing in the future of Stellar
            </p>
            <Button 
              size="lg"
              onClick={handleConnectWallet}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 border border-cyan-400/30"
            >
              Connect Wallet & Explore Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;
