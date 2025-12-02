"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";

import { Movie } from "@/types/movie";
import { useTradingMoviesQueryOptionsQuery } from "@/services/moveSlice";

export default function TrendingCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const { data, error, isLoading } = useTradingMoviesQueryOptionsQuery();

  if (!data) {
    return;
  }

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("carousel");
    if (container) {
      const scrollAmount = 300;
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="px-4 py-12 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Trending Now
            </h2>
            <p className="text-muted-foreground">
              The hottest movies everyone's talking about
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 transition-all duration-300 border rounded-lg bg-card border-secondary hover:border-primary text-primary glow-hover"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 transition-all duration-300 border rounded-lg bg-card border-secondary hover:border-primary text-primary glow-hover"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          id="carousel"
          className="flex gap-4 pb-4 overflow-x-auto scroll-smooth"
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
        >
          {data.map((movie: Movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="flex-shrink-0 w-48 cursor-pointer group">
                <div className="relative overflow-hidden transition-all duration-500 transform rounded-lg glow hover:scale-105">
                  <img
                    src={
                      `https://image.tmdb.org/t/p/w500/${movie.poster_path}` ||
                      "/placeholder.svg"
                    }
                    alt={movie.title}
                    className="object-cover w-full h-80"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-background/80 to-transparent group-hover:opacity-100">
                    <h3 className="text-lg font-bold text-foreground">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">
                        {movie.release_date}
                      </span>
                      <div className="flex items-center gap-1 text-primary">
                        <Star size={16} fill="currentColor" />
                        <span className="font-semibold">
                          {Math.round(movie.vote_average)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
