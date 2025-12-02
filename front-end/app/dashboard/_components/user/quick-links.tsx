"use client";

import { Bookmark, Sparkles, Film, TrendingUp } from "lucide-react";
import Link from "next/link";

export function QuickLinks() {
  const links = [
    {
      icon: Bookmark,
      label: "My Watchlist",
      description: "38 movies",
      href: "/watchlist",
      color: "text-primary",
    },
    {
      icon: Sparkles,
      label: "AI Companion",
      description: "Get recommendations",
      href: "/ai-companion",
      color: "text-chart-4",
    },
    {
      icon: Film,
      label: "Discover",
      description: "Find new movies",
      href: "/discover",
      color: "text-chart-5",
    },
    {
      icon: TrendingUp,
      label: "Trending",
      description: "Popular now",
      href: "/",
      color: "text-primary",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 glow-hover">
      <h3 className="text-xl font-bold text-foreground mb-4">Quick Links</h3>
      <div className="space-y-3">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary hover:border-primary/50 border border-transparent transition-all duration-300 group"
          >
            <div
              className={`${link.color} group-hover:scale-110 transition-transform`}
            >
              <link.icon size={24} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {link.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
