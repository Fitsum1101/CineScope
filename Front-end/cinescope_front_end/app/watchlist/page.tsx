"use client";

import { useState } from "react";
import Link from "next/link";

import { Trash2, Share2, CheckCircle2 } from "lucide-react";

interface WatchlistMovie {
  id: string;
  title: string;
  poster: string;
  year: number;
  rating: number;
  addedDate: string;
}

export default function WatchlistPage() {
  const [watchlistMovies, setWatchlistMovies] = useState<WatchlistMovie[]>([
    {
      id: "1",
      title: "Inception",
      poster: "/futuristic-sci-fi-movie-poster.jpg",
      year: 2010,
      rating: 8.8,
      addedDate: "2025-01-15",
    },
    {
      id: "2",
      title: "The Matrix",
      poster: "/cyberpunk-matrix-style-movie.jpg",
      year: 1999,
      rating: 8.7,
      addedDate: "2025-01-10",
    },
    {
      id: "3",
      title: "Interstellar",
      poster: "/space-exploration-cinematic-poster.jpg",
      year: 2014,
      rating: 8.6,
      addedDate: "2025-01-05",
    },
    {
      id: "4",
      title: "Blade Runner 2049",
      poster: "/dystopian-sci-fi-neon-lights.jpg",
      year: 2017,
      rating: 8.0,
      addedDate: "2024-12-28",
    },
    {
      id: "5",
      title: "The Dark Knight",
      poster: "/dark-batman-cinematic-thriller.jpg",
      year: 2008,
      rating: 9.0,
      addedDate: "2024-12-20",
    },
    {
      id: "6",
      title: "Tenet",
      poster: "/high-tech-action-thriller-poster.jpg",
      year: 2020,
      rating: 7.3,
      addedDate: "2024-12-15",
    },
  ]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [watched, setWatched] = useState<Set<string>>(new Set());

  const handleRemove = (id: string) => {
    setWatchlistMovies((movies) => movies.filter((m) => m.id !== id));
  };

  const handleMarkWatched = (id: string) => {
    setWatched((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleShare = (movie: WatchlistMovie) => {
    const text = `Check out "${movie.title}" (${movie.year}) on CineScope - Rating: ${movie.rating}/10`;
    if (navigator.share) {
      navigator.share({
        title: "CineScope",
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Movie copied to clipboard!");
    }
  };

  return (
    <>
      <main className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl text-foreground">
            My Watchlist
          </h1>
          <p className="text-muted-foreground">
            {watchlistMovies.length}{" "}
            {watchlistMovies.length === 1 ? "movie" : "movies"} saved
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground glow-hover"
                  : "bg-card text-foreground hover:bg-secondary"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground glow-hover"
                  : "bg-card text-foreground hover:bg-secondary"
              }`}
            >
              List View
            </button>
          </div>
          <div className="text-sm text-muted-foreground">
            {watched.size} marked as watched
          </div>
        </div>

        {/* Empty State */}
        {watchlistMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-secondary">
              <svg
                className="w-10 h-10 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16m10-16v16"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">
              Your watchlist is empty
            </h2>
            <p className="max-w-md mb-6 text-muted-foreground">
              Start discovering amazing movies and add them to your watchlist to
              keep track of what you want to watch.
            </p>
            <Link
              href="/discover"
              className="px-6 py-3 font-semibold transition-all duration-300 rounded-lg bg-primary text-primary-foreground hover:shadow-lg glow-hover"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
                {watchlistMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative overflow-hidden transition-all duration-300 border rounded-lg group bg-card border-secondary hover:border-primary glow-hover"
                  >
                    {/* Movie Poster */}
                    <div className="relative overflow-hidden h-80">
                      <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      {watched.has(movie.id) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <CheckCircle2 className="w-12 h-12 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Movie Info */}
                    <div className="p-4">
                      <h3 className="mb-1 text-lg font-semibold text-foreground line-clamp-2">
                        {movie.title}
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">
                          {movie.year}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-primary">
                            {movie.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            /10
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleMarkWatched(movie.id)}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            watched.has(movie.id)
                              ? "bg-primary/20 text-primary border border-primary"
                              : "bg-secondary text-foreground hover:bg-secondary/80"
                          }`}
                        >
                          <CheckCircle2 className="inline w-4 h-4 mr-1" />
                          Watched
                        </button>
                        <button
                          onClick={() => handleShare(movie)}
                          className="flex-1 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg bg-secondary text-foreground hover:bg-secondary/80"
                        >
                          <Share2 className="inline w-4 h-4 mr-1" />
                          Share
                        </button>
                        <button
                          onClick={() => handleRemove(movie.id)}
                          className="flex-1 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"
                        >
                          <Trash2 className="inline w-4 h-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-3">
                {watchlistMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex flex-col items-start gap-4 p-4 transition-all duration-300 border rounded-lg sm:flex-row bg-card border-secondary hover:border-primary glow-hover sm:items-center"
                  >
                    {/* Thumbnail */}
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="flex-shrink-0 object-cover w-24 h-32 rounded-lg"
                    />

                    {/* Movie Details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="mb-1 text-lg font-semibold text-foreground">
                        {movie.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-3 text-sm text-muted-foreground">
                        <span>{movie.year}</span>
                        <span className="font-semibold text-primary">
                          {movie.rating}/10
                        </span>
                        <span>
                          Added {new Date(movie.addedDate).toLocaleDateString()}
                        </span>
                        {watched.has(movie.id) && (
                          <span className="flex items-center gap-1 text-primary">
                            <CheckCircle2 className="w-4 h-4" />
                            Watched
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap w-full gap-2 sm:w-auto sm:flex-nowrap">
                      <button
                        onClick={() => handleMarkWatched(movie.id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                          watched.has(movie.id)
                            ? "bg-primary/20 text-primary border border-primary"
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        }`}
                      >
                        <CheckCircle2 className="inline w-4 h-4 mr-1" />
                        Watched
                      </button>
                      <button
                        onClick={() => handleShare(movie)}
                        className="px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 whitespace-nowrap"
                      >
                        <Share2 className="inline w-4 h-4 mr-1" />
                        Share
                      </button>
                      <button
                        onClick={() => handleRemove(movie.id)}
                        className="px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 whitespace-nowrap"
                      >
                        <Trash2 className="inline w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
