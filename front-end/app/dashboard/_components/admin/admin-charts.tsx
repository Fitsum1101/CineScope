"use client";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const userGrowthData = [
  { month: "Jan", users: 8420 },
  { month: "Feb", users: 9150 },
  { month: "Mar", users: 10200 },
  { month: "Apr", users: 11100 },
  { month: "May", users: 11850 },
  { month: "Jun", users: 12458 },
];

const aiUsageData = [
  { feature: "Recommendations", usage: 15420 },
  { feature: "Summaries", usage: 12350 },
  { feature: "Search", usage: 10890 },
  { feature: "Reviews", usage: 7232 },
];

export function AdminCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* User Growth Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">
          User <span className="text-primary">Growth</span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2833" />
            <XAxis dataKey="month" stroke="#a8a9ac" />
            <YAxis stroke="#a8a9ac" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2833",
                border: "1px solid #66fcf1",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#66fcf1" }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#66fcf1"
              strokeWidth={2}
              dot={{ fill: "#66fcf1" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Usage Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">
          AI <span className="text-primary">Usage</span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={aiUsageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2833" />
            <XAxis dataKey="feature" stroke="#a8a9ac" />
            <YAxis stroke="#a8a9ac" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2833",
                border: "1px solid #66fcf1",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#66fcf1" }}
            />
            <Bar dataKey="usage" fill="#66fcf1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
