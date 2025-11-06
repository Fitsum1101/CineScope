"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function GenreChart() {
  const data = [
    { name: "Sci-Fi", value: 35, color: "#66FCF1" },
    { name: "Action", value: 28, color: "#45f0df" },
    { name: "Drama", value: 20, color: "#0fadcf" },
    { name: "Thriller", value: 12, color: "#1f2833" },
    { name: "Comedy", value: 5, color: "#16213e" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 glow-hover">
      <h3 className="text-xl font-bold text-foreground mb-4">
        Favorite Genres
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={({ name, percent }: { name: string; percent: number }) =>
            //   `${name} ${(percent * 100).toFixed(0)}%`
            // }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2833",
              border: "1px solid #66FCF1",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
