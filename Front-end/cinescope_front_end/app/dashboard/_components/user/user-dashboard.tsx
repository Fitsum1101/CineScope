"use client";

import { ActivityChart } from "./activity-chart";
import { GenreChart } from "./genre-chart";
import { QuickLinks } from "./quick-links";
import { RecentActivity } from "./recent-activity";
import { StatsCards } from "./stats-cards";
import { UserProfile } from "./user-profile";

export default function DashboardPage() {
  return (
    <div>
      {/* Header with background */}
      <div className="relative h-48 overflow-hidden border-b border-card">
        <img
          src="/cinematic-space-landscape.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-6">
          <h1 className="text-4xl font-bold text-foreground">
            My <span className="text-primary">Dashboard</span>
          </h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        <UserProfile />

        {/* Stats Cards */}
        <StatsCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <GenreChart />
          <ActivityChart />
        </div>

        {/* Recent Activity and Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <QuickLinks />
          </div>
        </div>
      </main>
    </div>
  );
}
