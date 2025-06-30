
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Award } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: DollarSign,
      value: "$2.4M",
      label: "Total Value Locked",
      change: "+23%",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Users,
      value: "1,247",
      label: "Active Investors",
      change: "+15%",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Award,
      value: "34",
      label: "SCF Projects Funded",
      change: "+8%",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: TrendingUp,
      value: "11.2%",
      label: "Average APY",
      change: "+2.1%",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-4 md:p-6 text-center">
            <div className={`mx-auto w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mb-3`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {stat.label}
            </div>
            <div className="text-xs text-green-600 font-medium">
              {stat.change} this month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSection;
