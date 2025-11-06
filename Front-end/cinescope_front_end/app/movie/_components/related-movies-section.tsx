"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface RelatedMovie {
  id: number;
  title: string;
  poster: string;
}

export function RelatedMoviesSection({ movies }: { movies: RelatedMovie[] }) {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const scrollAmount = 300;
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 fade-in">
      <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-accent">
        <div className="w-1 h-6 rounded-full bg-accent" />
        Related Movies
      </h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 p-2 transition-all -translate-x-6 -translate-y-1/2 rounded-full top-1/2 bg-secondary hover:bg-accent text-accent hover:text-accent-foreground"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          ref={scrollContainer}
          className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-40 transition-transform duration-300 cursor-pointer group hover:scale-105"
            >
              <div className="h-64 overflow-hidden border rounded-lg glow-hover border-accent/30">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="object-cover w-full h-full transition-all group-hover:brightness-110"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-center truncate text-foreground">
                {movie.title}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 p-2 transition-all translate-x-6 -translate-y-1/2 rounded-full top-1/2 bg-secondary hover:bg-accent text-accent hover:text-accent-foreground"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
