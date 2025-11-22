"use client";

import { Heart, Check, Star } from "lucide-react";
import { useState } from "react";

import { Movie } from "@/types/movie";
import { formatRuntime } from "@/utils/lema";

interface PosterBannerProps {
  movie: Movie;
  onAddWatchlist: () => void;
  onMarkWatched: () => void;
  onRate: (value: number) => void;
  isWatchlisted: boolean;
  isWatched: boolean;
  rating: number;
}

export function PosterBanner({
  movie,
  onAddWatchlist,
  onMarkWatched,
  onRate,
  isWatchlisted,
  isWatched,
  rating,
}: PosterBannerProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="relative h-screen max-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.currentTarget.src = "/cinematic-space-landscape.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>

      <div className="relative flex items-end h-full">
        <div className="w-full px-4 pb-8 md:px-8 md:pb-12">
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div className="flex-shrink-0 hidden md:block slide-in">
              <div className="w-40 overflow-hidden border rounded-lg glow-hover border-accent/30">
                <img
                  src={
                    `https://image.tmdb.org/t/p/w500/${movie.poster_path}` ||
                    "/placeholder.svg"
                  }
                  alt={movie.title}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="flex-1 slide-in">
              <div className="space-y-4">
                <div>
                  <h1 className="mb-2 text-4xl font-bold md:text-5xl text-foreground text-balance">
                    {movie.title}
                  </h1>
                  <p className="text-lg font-semibold text-accent">
                    ({movie.release_date})
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm md:text-base">
                  <span className="flex items-center gap-1 font-bold text-accent">
                    <Star className="w-4 h-4" />
                    {movie.vote_average}/10
                  </span>
                  <span className="text-muted-foreground">
                    {formatRuntime(movie.runtime)}
                  </span>
                  <div className="flex gap-2">
                    {movie.genres.map((g) => (
                      <span
                        key={g.id}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={onAddWatchlist}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isWatchlisted
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-accent/30"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWatchlisted ? "fill-current" : ""
                      }`}
                    />
                    {isWatchlisted ? "Saved" : "Add to Watchlist"}
                  </button>

                  <button
                    onClick={onMarkWatched}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isWatched
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-accent/30"
                    }`}
                  >
                    <Check
                      className={`w-5 h-5 ${isWatched ? "fill-current" : ""}`}
                    />
                    {isWatched ? "Watched" : "Mark as Watched"}
                  </button>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-2 px-4 py-3 border rounded-lg bg-secondary text-secondary-foreground border-accent/30">
                    <span className="text-xs font-medium">Rate:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                        <button
                          key={star}
                          onClick={() => onRate(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className={`w-6 h-6 rounded-full transition-all duration-200 ${
                            star <= (hoverRating || rating)
                              ? "bg-accent scale-110"
                              : "bg-muted hover:bg-accent/50"
                          }`}
                          aria-label={`Rate ${star} stars`}
                        />
                      ))}
                    </div>
                    {rating > 0 && (
                      <span className="text-sm font-bold text-accent">
                        {rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
