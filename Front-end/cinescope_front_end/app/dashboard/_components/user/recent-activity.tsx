"use client";

import { Clock, Star } from "lucide-react";
import Link from "next/link";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "watched",
      movie: "Inception",
      rating: 9,
      time: "2 hours ago",
      poster: "/futuristic-sci-fi-movie-poster.jpg",
    },
    {
      id: 2,
      type: "added",
      movie: "The Matrix",
      time: "5 hours ago",
      poster: "/cyberpunk-matrix-style-movie.jpg",
    },
    {
      id: 3,
      type: "watched",
      movie: "Interstellar",
      rating: 10,
      time: "1 day ago",
      poster: "/space-exploration-cinematic-poster.jpg",
    },
    {
      id: 4,
      type: "watched",
      movie: "Blade Runner 2049",
      rating: 8,
      time: "2 days ago",
      poster: "/dystopian-sci-fi-neon-lights.jpg",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 glow-hover">
      <h3 className="text-xl font-bold text-foreground mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
          >
            <img
              src={activity.poster || "/placeholder.svg"}
              alt={activity.movie}
              className="w-16 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <Link
                href={`/movie/${activity.id}`}
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                {activity.movie}
              </Link>
              <div className="flex items-center gap-2 mt-1">
                {activity.type === "watched" ? (
                  <div className="flex items-center gap-1 text-primary text-sm">
                    <Star size={14} fill="#66FCF1" />
                    <span>Rated {activity.rating}/10</span>
                  </div>
                ) : (
                  <span className="text-chart-4 text-sm">
                    Added to Watchlist
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                <Clock size={12} />
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
