"use client";
import { Users, Activity, Flag, TrendingUp } from "lucide-react";

export function AdminStats() {
  const stats = [
    {
      title: "Total Users",
      value: "12,458",
      change: "+12.5%",
      icon: Users,
      trend: "up",
    },
    {
      title: "AI Usage (Month)",
      value: "45,892",
      change: "+23.1%",
      icon: Activity,
      trend: "up",
    },
    {
      title: "Flagged Content",
      value: "23",
      change: "-8.3%",
      icon: Flag,
      trend: "down",
    },
    {
      title: "Active Sessions",
      value: "3,421",
      change: "+5.2%",
      icon: TrendingUp,
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 glow-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <Icon className="w-8 h-8 text-primary" />
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-400" : "text-red-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
