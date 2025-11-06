"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface DiscoveryFiltersProps {
  onFilterChange: (
    query: string,
    genre: string,
    range: [number, number]
  ) => void;
  currentSearch: string;
  currentGenre: string;
  currentYearRange: [number, number];
}

export default function DiscoveryFilters({
  onFilterChange,
  currentSearch,
  currentGenre,
  currentYearRange,
}: DiscoveryFiltersProps) {
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [selectedGenre, setSelectedGenre] = useState(currentGenre);
  const [yearMin, setYearMin] = useState(currentYearRange[0]);
  const [yearMax, setYearMax] = useState(currentYearRange[1]);

  const genres = [
    "All",
    "Sci-Fi",
    "Action",
    "Drama",
    "Thriller",
    "Comedy",
    "Horror",
    "Animation",
  ];

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    onFilterChange(value, selectedGenre, [yearMin, yearMax]);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    onFilterChange(searchInput, genre, [yearMin, yearMax]);
  };

  const handleYearChange = (min: number, max: number) => {
    setYearMin(min);
    setYearMax(max);
    onFilterChange(searchInput, selectedGenre, [min, max]);
  };

  const handleReset = () => {
    setSearchInput("");
    setSelectedGenre("All");
    setYearMin(1990);
    setYearMax(2024);
    onFilterChange("", "All", [1990, 2024]);
  };

  return (
    <div className="sticky top-28 max-h-[calc(100vh-120px)] overflow-y-auto bg-secondary border border-secondary/50 rounded-lg p-6 space-y-6 shadow-lg">
      {/* Search Filter */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Search
        </label>
        <div className="relative group">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Movie title or director..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-background text-foreground rounded-lg border border-secondary/50 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/30"
          />
          {searchInput && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-secondary/50"></div>

      {/* Genre Filter */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Genre
        </label>
        <div className="space-y-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                selectedGenre === genre
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/40"
                  : "bg-background text-foreground hover:bg-background/80 hover:shadow-md hover:shadow-primary/20 border border-secondary/30"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-secondary/50"></div>

      {/* Year Range Filter */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Release Year
        </label>
        <div className="bg-background rounded-lg p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>Min Year</span>
              <span className="text-primary font-bold">{yearMin}</span>
            </div>
            <input
              type="range"
              min="1980"
              max="2024"
              value={yearMin}
              onChange={(e) =>
                handleYearChange(
                  Math.min(Number.parseInt(e.target.value), yearMax),
                  yearMax
                )
              }
              className="w-full accent-primary cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>Max Year</span>
              <span className="text-primary font-bold">{yearMax}</span>
            </div>
            <input
              type="range"
              min="1980"
              max="2024"
              value={yearMax}
              onChange={(e) =>
                handleYearChange(
                  yearMin,
                  Math.max(Number.parseInt(e.target.value), yearMin)
                )
              }
              className="w-full accent-primary cursor-pointer"
            />
          </div>
          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-secondary/30">
            {yearMin} - {yearMax}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-secondary/50"></div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full px-4 py-2.5 bg-background text-foreground rounded-lg border border-secondary/30 hover:bg-background/80 hover:shadow-md hover:shadow-primary/20 transition-all duration-300 text-sm font-medium"
      >
        Reset Filters
      </button>
    </div>
  );
}
