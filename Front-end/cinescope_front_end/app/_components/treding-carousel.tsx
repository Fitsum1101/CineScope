"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "@/lib/axios/tmdbApi";
import { createQueryOptions } from "@/utils/createQueryOptions";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function TrendingCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const trendingMovies = [
    {
      id: 1,
      title: "Neon Horizons",
      year: 2024,
      rating: 8.9,
      image: "/sci-fi-movie-poster-cyberpunk.jpg",
    },
    {
      id: 2,
      title: "Digital Minds",
      year: 2024,
      rating: 8.7,
      image: "/ai-thriller-movie-poster.jpg",
    },
    {
      id: 3,
      title: "The Last Signal",
      year: 2023,
      rating: 8.5,
      image: "/dark-sci-fi-movie-poster.jpg",
    },
    {
      id: 4,
      title: "Quantum Echo",
      year: 2024,
      rating: 9.1,
      image: "/futuristic-movie-poster.png",
    },
    {
      id: 5,
      title: "Chrome Dreams",
      year: 2023,
      rating: 8.3,
      image: "/cyberpunk-neon-movie-poster.jpg",
    },
    {
      id: 6,
      title: "Void Genesis",
      year: 2024,
      rating: 8.8,
      image: "/space-opera-dark-poster.jpg",
    },
  ];

  const { data, error, isLoading } = useQuery(
    createQueryOptions(
      ["trendingMovies"],
      () => tmdbApi.get("/movie/now_playing?language=en-US&page=1"),
      {
        select: (response: any) => response?.data,
      }
    )
  );

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
          {data?.results.map((movie: Movie) => (
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
