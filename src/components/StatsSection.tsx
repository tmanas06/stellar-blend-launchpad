
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Award } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: DollarSign,
      value: "$2.4M",
      label: "Total Value Locked",
      change: "+23%",
      bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-600/20",
      iconColor: "text-green-400",
      borderColor: "border-green-500/30"
    },
    {
      icon: Users,
      value: "1,247",
      label: "Active Investors",
      change: "+15%",
      bgColor: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20",
      iconColor: "text-cyan-400",
      borderColor: "border-cyan-500/30"
    },
    {
      icon: Award,
      value: "34",
      label: "SCF Projects Funded",
      change: "+8%",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-violet-600/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/30"
    },
    {
      icon: TrendingUp,
      value: "11.2%",
      label: "Average APY",
      change: "+2.1%",
      bgColor: "bg-gradient-to-br from-orange-500/20 to-red-600/20",
      iconColor: "text-orange-400",
      borderColor: "border-orange-500/30"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-gray-900/50 backdrop-blur-sm border-2 ${stat.borderColor} hover:border-opacity-80 transition-all duration-300 hover:shadow-lg hover:shadow-${stat.iconColor.split('-')[1]}-500/20`}>
          <CardContent className="p-4 md:p-6 text-center">
            <div className={`mx-auto w-12 h-12 ${stat.bgColor} border ${stat.borderColor} rounded-full flex items-center justify-center mb-3`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-300 mb-2">
              {stat.label}
            </div>
            <div className="text-xs text-green-400 font-medium">
              {stat.change} this month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSection;
