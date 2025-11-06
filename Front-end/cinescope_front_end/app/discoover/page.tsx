"use client";

import { useState } from "react";
import DiscoveryFilters from "./_components/discovery-filter";
import MovieGrid from "./_components/movie-grid";

// Sample movie data
const sampleMovies = [
  {
    id: 1,
    title: "Inception",
    poster: "/futuristic-sci-fi-movie-poster.jpg",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
    director: "Christopher Nolan",
  },
  {
    id: 2,
    title: "The Matrix",
    poster: "/cyberpunk-matrix-style-movie.jpg",
    genre: "Sci-Fi",
    year: 1999,
    rating: 8.7,
    director: "Wachowski Brothers",
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "/space-exploration-cinematic-poster.jpg",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.6,
    director: "Christopher Nolan",
  },
  {
    id: 4,
    title: "Blade Runner 2049",
    poster: "/dystopian-sci-fi-neon-lights.jpg",
    genre: "Sci-Fi",
    year: 2017,
    rating: 8.0,
    director: "Denis Villeneuve",
  },
  {
    id: 5,
    title: "The Dark Knight",
    poster: "/dark-batman-cinematic-thriller.jpg",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    director: "Christopher Nolan",
  },
  {
    id: 6,
    title: "Nolan's Tenet",
    poster: "/high-tech-action-thriller-poster.jpg",
    genre: "Action",
    year: 2020,
    rating: 7.4,
    director: "Christopher Nolan",
  },
  {
    id: 7,
    title: "Dune",
    poster: "/epic-sci-fi-desert-landscape.jpg",
    genre: "Sci-Fi",
    year: 2021,
    rating: 8.0,
    director: "Denis Villeneuve",
  },
  {
    id: 8,
    title: "Oppenheimer",
    poster: "/historical-drama-biographical-film.jpg",
    genre: "Drama",
    year: 2023,
    rating: 8.3,
    director: "Christopher Nolan",
  },
];

export default function DiscoverPage() {
  const [filteredMovies, setFilteredMovies] = useState(sampleMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [yearRange, setYearRange] = useState<[number, number]>([1990, 2024]);

  const handleFilterChange = (
    query: string,
    genre: string,
    range: [number, number]
  ) => {
    setSearchQuery(query);
    setSelectedGenre(genre);
    setYearRange(range);

    let results = sampleMovies;

    // Filter by search query
    if (query) {
      results = results.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.director.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by genre
    if (genre !== "All") {
      results = results.filter((movie) => movie.genre === genre);
    }

    // Filter by year range
    results = results.filter(
      (movie) => movie.year >= range[0] && movie.year <= range[1]
    );

    setFilteredMovies(results);
  };

  return (
    <>
      <main className="pt-24 pb-20">
        {/* Page Header */}
        <section className="px-4 md:px-8 py-8 border-b border-secondary">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground slide-in">
              Discover Movies
            </h1>
            <p className="text-muted-foreground">
              Explore our collection and find your next favorite film
            </p>
          </div>
        </section>

        {/* Filters and Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <DiscoveryFilters
                onFilterChange={handleFilterChange}
                currentSearch={searchQuery}
                currentGenre={selectedGenre}
                currentYearRange={yearRange}
              />
            </aside>

            {/* Movie Grid */}
            <div className="lg:col-span-3">
              {filteredMovies.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    Found {filteredMovies.length} movie
                    {filteredMovies.length !== 1 ? "s" : ""}
                  </p>
                  <MovieGrid movies={filteredMovies} />
                </>
              ) : (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <p className="text-xl text-muted-foreground mb-4">
                      No movies found
                    </p>
                    <button
                      onClick={() =>
                        handleFilterChange("", "All", [1990, 2024])
                      }
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
