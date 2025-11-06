"use client";

import { Shield } from "lucide-react";
import { AdminStats } from "./admin-stats";
import { AdminCharts } from "./admin-charts";
import { UserManagementTable } from "./user-management-table";
import { ReviewModerationTable } from "./review-moderation-table";
import { FlaggedContentTable } from "./flagged-content-table";

export default function AdminDashboard() {
  return (
    <>
      {/* Header with background */}
      <div className="relative h-48 overflow-hidden border-b border-card">
        <img
          src="/cinematic-space-landscape.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-6">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Stats */}
        <AdminStats />

        {/* Charts Section */}
        <AdminCharts />

        {/* User Management */}
        <UserManagementTable />

        {/* Review Moderation */}
        <ReviewModerationTable />

        {/* Flagged Content */}
        <FlaggedContentTable />
      </main>
    </>
  );
}
