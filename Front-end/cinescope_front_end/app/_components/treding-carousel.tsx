"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";

import { Movie } from "@/types/movie";
import { tradingMoviesQueryOptions } from "@/utils/queryOptions";

export default function TrendingCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const { data, error, isLoading } = useQuery(tradingMoviesQueryOptions());

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
    <section className="bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Trending Now
            </h2>
            <p className="text-muted-foreground">
              The hottest movies everyone's talking about
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-card border border-secondary hover:border-primary rounded-lg text-primary transition-all duration-300 glow-hover"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-card border border-secondary hover:border-primary rounded-lg text-primary transition-all duration-300 glow-hover"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          id="carousel"
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
        >
          {data.map((movie: Movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="flex-shrink-0 w-48 group cursor-pointer">
                <div className="relative rounded-lg overflow-hidden glow transition-all duration-500 transform hover:scale-105">
                  <img
                    src={
                      `https://image.tmdb.org/t/p/w500/${movie.poster_path}` ||
                      "/placeholder.svg"
                    }
                    alt={movie.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
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
