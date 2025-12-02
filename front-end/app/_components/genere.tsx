"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GenreGrid() {
  const genres = [
    { name: "Action", icon: "⚡", color: "from-red-900 to-red-700" },
    { name: "Drama", icon: "🎭", color: "from-purple-900 to-purple-700" },
    { name: "Sci-Fi", icon: "🚀", color: "from-blue-900 to-blue-700" },
    { name: "Horror", icon: "👻", color: "from-gray-900 to-gray-700" },
    { name: "Comedy", icon: "😂", color: "from-yellow-900 to-yellow-700" },
    { name: "Thriller", icon: "🔪", color: "from-orange-900 to-orange-700" },
    { name: "Romance", icon: "💕", color: "from-pink-900 to-pink-700" },
    { name: "Animation", icon: "🎬", color: "from-green-900 to-green-700" },
  ];

  return (
    <section className="bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Explore by Genre
        </h2>
        <p className="text-muted-foreground mb-12">
          Dive into your favorite categories
        </p>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.name}
              href={`/genre/${genre.name.toLowerCase()}`}
              className={`group relative rounded-lg overflow-hidden h-40 bg-gradient-to-br ${genre.color} border border-secondary hover:border-primary transition-all duration-300 glow-hover cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-background/0 via-background/30 to-background/70" />
              <div className="relative h-full flex flex-col justify-between p-6">
                <div className="text-4xl">{genre.icon}</div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">
                    {genre.name}
                  </h3>
                  <ArrowRight
                    size={20}
                    className="text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
