
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Users, Heart, Star, ExternalLink, Github, Twitter, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";

const Community = () => {
  const [connectedWallet, setConnectedWallet] = useState(false);

  const handleConnectWallet = () => {
    setConnectedWallet(true);
  };

  const communityStats = [
    {
      icon: Users,
      value: "2,847",
      label: "Community Members",
      color: "cyan"
    },
    {
      icon: MessageSquare,
      value: "1,203",
      label: "Monthly Discussions",
      color: "purple"
    },
    {
      icon: Heart,
      value: "34",
      label: "Projects Supported",
      color: "pink"
    },
    {
      icon: Star,
      value: "4.8",
      label: "Community Rating",
      color: "yellow"
    }
  ];

  const topContributors = [
    {
      name: "Alex Chen",
      role: "DeFi Analyst",
      contributions: 47,
      avatar: "AC",
      badge: "Top Reviewer"
    },
    {
      name: "Maria Santos",
      role: "Stellar Developer",
      contributions: 35,
      avatar: "MS",
      badge: "Technical Expert"
    },
    {
      name: "David Kim",
      role: "Investment Advisor", 
      contributions: 28,
      avatar: "DK",
      badge: "Community Leader"
    },
    {
      name: "Sarah Wilson",
      role: "Risk Analyst",
      contributions: 23,
      avatar: "SW",
      badge: "Risk Expert"
    }
  ];

  const recentDiscussions = [
    {
      title: "Analysis: Q4 2024 SCF Project Performance",
      author: "Alex Chen",
      replies: 23,
      likes: 45,
      time: "2 hours ago",
      category: "Analysis"
    },
    {
      title: "New Blend Protocol Update - What It Means for Investors",
      author: "Maria Santos",
      replies: 18,
      likes: 32,
      time: "5 hours ago",
      category: "Technical"
    },
    {
      title: "Risk Assessment: Gaming Projects in SCF Round 17",
      author: "Sarah Wilson",
      replies: 15,
      likes: 28,
      time: "1 day ago",
      category: "Risk Analysis"
    },
    {
      title: "Investment Strategy: Diversifying Across SCF Categories",
      author: "David Kim",
      replies: 31,
      likes: 67,
      time: "2 days ago",
      category: "Strategy"
    }
  ];

  const resources = [
    {
      title: "Stellar Community Fund Hub",
      description: "Official SCF portal with voting, proposals, and results",
      url: "https://communityfund.stellar.org",
      icon: Globe,
      category: "Official"
    },
    {
      title: "Blend Protocol Documentation",
      description: "Technical documentation for the Blend lending protocol",
      url: "https://blend.capital",
      icon: Github,
      category: "Technical"
    },
    {
      title: "Stellar Developer Discord",
      description: "Join the official Stellar developer community",
      url: "https://discord.gg/stellar",
      icon: MessageSquare,
      category: "Community"
    },
    {
      title: "SCF Twitter Updates",
      description: "Latest news and announcements from the SCF team",
      url: "https://twitter.com/StellarOrg",
      icon: Twitter,
      category: "News"
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
              Community Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Connect with fellow investors, share insights, and stay updated on the latest SCF developments
            </p>
          </div>
        </section>

        {/* Community Stats */}
        <section className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {communityStats.map((stat, index) => (
                <Card key={index} className={`bg-gray-900/50 backdrop-blur-sm border-2 border-${stat.color}-500/30 hover:border-${stat.color}-500/50 transition-all duration-300`}>
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className={`mx-auto w-12 h-12 bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20 border border-${stat.color}-500/30 rounded-full flex items-center justify-center mb-3`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Discussions */}
              <div className="lg:col-span-2">
                <Card className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 mb-8">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-cyan-400" />
                      Recent Discussions
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Latest conversations from the community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentDiscussions.map((discussion, index) => (
                      <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-500/30 transition-colors">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-cyan-500/20 text-cyan-400 text-xs">
                              {discussion.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                                {discussion.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{discussion.time}</span>
                            </div>
                            <h4 className="text-white font-medium mb-1 hover:text-cyan-400 cursor-pointer">
                              {discussion.title}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>by {discussion.author}</span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {discussion.replies}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {discussion.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* External Resources */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-green-400" />
                      External Resources
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Helpful links and resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resources.map((resource, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500/30 transition-colors group cursor-pointer">
                        <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                          <resource.icon className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium group-hover:text-green-400 transition-colors">
                            {resource.title}
                          </h4>
                          <p className="text-sm text-gray-400">{resource.description}</p>
                        </div>
                        <Badge className="bg-gray-700 text-gray-300 text-xs">
                          {resource.category}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div>
                {/* Top Contributors */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 mb-8">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      Top Contributors
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Most active community members
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topContributors.map((contributor, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                            {contributor.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-white font-medium">{contributor.name}</div>
                          <div className="text-sm text-gray-400">{contributor.role}</div>
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs mt-1">
                            {contributor.badge}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-cyan-400 font-bold">{contributor.contributions}</div>
                          <div className="text-xs text-gray-500">contributions</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Join Community CTA */}
                <Card className="bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border-2 border-cyan-500/30">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Join Our Community</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Connect with fellow investors and get exclusive insights
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold"
                    >
                      Join Discord
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Community;
