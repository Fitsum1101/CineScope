"use client";

import { useState } from "react";
import { PosterBanner } from "../_components/poster-banner";
import { OverviewSection } from "../_components/overview-section.tsx";
import { AISummarySection } from "../_components/ai-summary-section";
import { CastCrewSection } from "../_components/cast-crew-section";
import { RelatedMoviesSection } from "../_components/related-movies-section";
import { ReviewsSection } from "../_components/reviews-section";

export default function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [rating, setRating] = useState(0);

  // Mock movie data - replace with actual API call
  const movie = {
    id: params.id,
    title: "Cosmic Horizons",
    year: 2024,
    rating: 8.5,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    duration: "2h 28m",
    poster: "/futuristic-sci-fi-movie-poster.jpg",
    backdrop: "/cinematic-space-landscape.jpg",
    overview:
      "In a distant future, humanity discovers a gateway to parallel universes. A team of elite explorers must navigate through dimensions of impossible physics and ancient civilizations to save their reality from collapse.",
    aiSummary:
      "An AI analysis suggests this film masterfully blends hard sci-fi concepts with intimate human storytelling. The exploration of parallel universes serves as a metaphor for the divergence of human choices and destiny.",
    cast: [
      {
        name: "Emma Stone",
        role: "Dr. Sarah Chen",
        image: "/actress-portrait.jpg",
      },
      {
        name: "Oscar Isaac",
        role: "Commander James Vale",
        image: "/actor-portrait.jpg",
      },
      {
        name: "Tilda Swinton",
        role: "The Observer",
        image: "/actress-elegant-portrait.jpg",
      },
    ],
    crew: [
      { name: "Denis Villeneuve", role: "Director" },
      { name: "Hans Zimmer", role: "Composer" },
      { name: "Roger Deakins", role: "Cinematographer" },
    ],
    reviews: [
      {
        author: "Alex Chen",
        rating: 9,
        text: "A visually stunning masterpiece that explores the depths of human consciousness.",
        date: "2024-01-15",
      },
      {
        author: "Maya Patel",
        rating: 8,
        text: "Incredible world-building with characters that truly resonate with the audience.",
        date: "2024-01-14",
      },
      {
        author: "James Wilson",
        rating: 7,
        text: "Ambitious and bold. Some pacing issues but ultimately rewarding.",
        date: "2024-01-13",
      },
    ],
    relatedMovies: [
      { id: 1, title: "Inception", poster: "/inception-movie-poster.jpg" },
      {
        id: 2,
        title: "Interstellar",
        poster: "/interstellar-movie-poster.jpg",
      },
      { id: 3, title: "Dune", poster: "/dune-movie-poster.jpg" },
      {
        id: 4,
        title: "Blade Runner 2049",
        poster: "/blade-runner-2049-movie-poster.jpg",
      },
      { id: 5, title: "The Matrix", poster: "/the-matrix-movie-poster.jpg" },
      { id: 6, title: "Arrival", poster: "/arrival-movie-poster.jpg" },
    ],
  };

  return (
    <>
      <main className="bg-background">
        <PosterBanner
          movie={movie}
          onAddWatchlist={() => setIsWatchlisted(!isWatchlisted)}
          onMarkWatched={() => setIsWatched(!isWatched)}
          onRate={(value) => setRating(value)}
          isWatchlisted={isWatchlisted}
          isWatched={isWatched}
          rating={rating}
        />

        <div className="container max-w-6xl px-4 py-12 mx-auto md:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="space-y-8 lg:col-span-2">
              <OverviewSection overview={movie.overview} />
              <AISummarySection aiSummary={movie.aiSummary} />
              <CastCrewSection cast={movie.cast} crew={movie.crew} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 border rounded-lg bg-card border-border glow-hover">
                <h3 className="mb-4 text-lg font-bold text-accent">
                  Movie Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Release Year</span>
                    <span className="font-medium text-foreground">
                      {movie.year}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium text-foreground">
                      {movie.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IMDB Rating</span>
                    <span className="font-bold text-accent">
                      {movie.rating}/10
                    </span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <span className="block mb-2 text-muted-foreground">
                      Genres
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {movie.genre.map((g) => (
                        <span
                          key={g}
                          className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RelatedMoviesSection movies={movie.relatedMovies} />
          <ReviewsSection reviews={movie.reviews} />
        </div>
      </main>
    </>
  );
}
