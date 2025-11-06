"use client";

import Link from "next/link";
import { Star } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string;
  year: number;
  rating: number;
  director: string;
}

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <div className="group cursor-pointer h-full">
            <div className="relative mb-4 overflow-hidden rounded-lg glow-hover">
              {/* Poster Image */}
              <img
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="space-y-2">
                  <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Movie Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {movie.title}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {movie.year}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {movie.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs bg-secondary text-primary px-3 py-1 rounded-full">
                  {movie.genre}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {movie.director}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
