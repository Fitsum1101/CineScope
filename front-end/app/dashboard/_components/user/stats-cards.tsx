"use client";

import { Film, Heart, Star, TrendingUp } from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      icon: Film,
      label: "Movies Watched",
      value: "247",
      change: "+12 this month",
      color: "text-primary",
    },
    {
      icon: Heart,
      label: "Watchlist",
      value: "38",
      change: "+5 this week",
      color: "text-chart-4",
    },
    {
      icon: Star,
      label: "Average Rating",
      value: "8.2",
      change: "Out of 10",
      color: "text-chart-5",
    },
    {
      icon: TrendingUp,
      label: "Watch Time",
      value: "412h",
      change: "Total hours",
      color: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 glow-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <stat.icon className={`${stat.color}`} size={32} />
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-1">
            {stat.value}
          </h3>
          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
          <p className="text-xs text-primary">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}
