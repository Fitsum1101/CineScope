"use client";

import { Zap } from "lucide-react";
import Link from "next/link";

export default function RecommendedSection() {
  const recommendations = [
    {
      id: 1,
      title: "Synthetic Emotions",
      rating: 8.6,
      image: "/drama-movie-poster-dark.jpg",
    },
    {
      id: 2,
      title: "The Algorithm",
      rating: 8.4,
      image: "/thriller-ai-movie-poster.jpg",
    },
    {
      id: 3,
      title: "Midnight Protocol",
      rating: 8.2,
      image: "/noir-cyberpunk-movie-poster.jpg",
    },
    {
      id: 4,
      title: "Binary Hearts",
      rating: 7.9,
      image: "/sci-fi-romance-movie-poster.jpg",
    },
    {
      id: 5,
      title: "The Remnant",
      rating: 8.7,
      image: "/post-apocalyptic-movie-poster.png",
    },
    {
      id: 6,
      title: "Neural Codes",
      rating: 8.5,
      image: "/futuristic-thriller-poster.jpg",
    },
  ];

  return (
    <section className="bg-card py-16 px-4 border-t border-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="text-primary" size={28} />
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Recommended for You
            </h2>
            <p className="text-muted-foreground mt-1">
              AI-curated picks based on your taste
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recommendations.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="group cursor-pointer">
                <div className="relative rounded-lg overflow-hidden glow transition-all duration-500 transform hover:scale-110">
                  <img
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="text-sm font-bold text-foreground line-clamp-2">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-1 text-primary mt-1">
                      <span className="text-xs font-semibold">
                        ⭐ {movie.rating}
                      </span>
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
