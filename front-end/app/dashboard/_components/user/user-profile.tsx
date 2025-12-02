"use client";

import { User, Edit } from "lucide-react";

export function UserProfile() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8 glow-hover">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-chart-4 flex items-center justify-center glow">
            <User size={48} className="text-primary-foreground" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            <Edit size={16} className="text-primary-foreground" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Alex Johnson
          </h2>
          <p className="text-muted-foreground mb-3">
            Movie Enthusiast • Member since 2024
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="px-3 py-1 bg-secondary rounded-full text-xs text-secondary-foreground border border-primary/30">
              Sci-Fi Fan
            </span>
            <span className="px-3 py-1 bg-secondary rounded-full text-xs text-secondary-foreground border border-primary/30">
              Action Lover
            </span>
            <span className="px-3 py-1 bg-secondary rounded-full text-xs text-secondary-foreground border border-primary/30">
              Drama Enthusiast
            </span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg glow-hover transition-all duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
