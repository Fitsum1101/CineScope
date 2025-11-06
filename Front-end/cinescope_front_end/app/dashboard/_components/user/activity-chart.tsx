"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ActivityChart() {
  const data = [
    { month: "Jan", movies: 18 },
    { month: "Feb", movies: 22 },
    { month: "Mar", movies: 25 },
    { month: "Apr", movies: 20 },
    { month: "May", movies: 28 },
    { month: "Jun", movies: 24 },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 glow-hover">
      <h3 className="text-xl font-bold text-foreground mb-4">
        Monthly Activity
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2833" />
          <XAxis dataKey="month" stroke="#a8a9ac" />
          <YAxis stroke="#a8a9ac" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2833",
              border: "1px solid #66FCF1",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          />
          <Bar dataKey="movies" fill="#66FCF1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
