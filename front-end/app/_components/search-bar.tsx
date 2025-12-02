"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const genres = [
    "All",
    "Action",
    "Drama",
    "Sci-Fi",
    "Horror",
    "Comedy",
    "Thriller",
  ];

  return (
    <section className="bg-card border-b border-secondary py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Find Your Next Watch
          </h2>
          <p className="text-muted-foreground">
            Search by title, genre, or mood
          </p>
        </div>

        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary"
            size={20}
          />
          <input
            type="text"
            placeholder="Search movies, genres, or moods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-background border border-secondary rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300"
          />
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedFilter(genre.toLowerCase())}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedFilter === genre.toLowerCase()
                  ? "bg-primary text-primary-foreground glow"
                  : "bg-background border border-secondary text-foreground hover:border-primary"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
