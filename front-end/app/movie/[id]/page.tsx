"use client";

import { useState } from "react";
import { useParams } from "next/navigation.js";

import {
  CastCrewSection,
  OverviewSection,
} from "../_components/overview-section.tsx.js";
import { PosterBanner } from "../_components/poster-banner.js";
import { RelatedMoviesSection } from "../_components/related-movies-section.js";
import { ReviewsSection } from "../_components/reviews-section.js";

// import { formatRuntime } from "@/utils/lema";
import { CinematicSpinner } from "@/ui/cinematic-spinner";
import { useMovietailQueryOptionsQuery } from "@/services/moveSlice.js";

export default function MovieDetailsPage() {
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [rating, setRating] = useState(0);

  const { id } = useParams();

  const movieId = id && typeof id === "string" ? +id : 0;

  const { data, isLoading } = useMovietailQueryOptionsQuery(movieId);

  return (
    <>
      <main className="bg-background">
        {isLoading && <CinematicSpinner size="lg" />}
        {!isLoading && data && (
          <>
            <PosterBanner
              movie={data}
              onAddWatchlist={() => setIsWatchlisted(!isWatchlisted)}
              onMarkWatched={() => setIsWatched(!isWatched)}
              onRate={(value) => setRating(value)}
              isWatchlisted={isWatchlisted}
              isWatched={isWatched}
              rating={rating}
            />
            <div className="container max-w-6xl px-4 py-12 mx-auto md:py-16">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                  <OverviewSection overview={data?.overview} />
                  <CastCrewSection />
                </div>

                <div className="space-y-6">
                  <div className="p-6 border rounded-lg bg-card border-border glow-hover">
                    <h3 className="mb-4 text-lg font-bold text-accent">
                      Movie Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Release Year
                        </span>
                        <span className="font-medium text-foreground">
                          {data.release_date}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium text-foreground">
                          {data.runtime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          IMDB Rating
                        </span>
                        <span className="font-bold text-accent">
                          {data.vote_average}/10
                        </span>
                      </div>
                      <div className="pt-3 border-t border-border">
                        <span className="block mb-2 text-muted-foreground">
                          Genres
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {data.genres.map((g) => (
                            <span
                              key={g.id}
                              className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                            >
                              {g.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <RelatedMoviesSection />
              <ReviewsSection />
            </div>
          </>
        )}
      </main>
    </>
  );
}
