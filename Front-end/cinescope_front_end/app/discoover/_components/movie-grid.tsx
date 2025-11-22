"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  discoverMoviesQueryOptions,
  movietailQueryOptions,
  tradingMoviesQueryOptions,
} from "@/utils/queryOptions";
import { CinematicSpinner } from "@/ui/cinematic-spinner";
import { SearchState } from "@/reducers/searchReducer";
import { Movie } from "@/types/movie";

import { genere } from "@/types/genere";
import { genres } from "@/constants/genres";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function MovieGrid({
  state,
  genere,
  handledSearchedMovies,
}: {
  state: SearchState;
  genere: genere;
  handledSearchedMovies: (movies: Movie[]) => void;
}) {
  const { data, isLoading, isSuccess } = useQuery(
    state.query.length > 1
      ? discoverMoviesQueryOptions(state)
      : tradingMoviesQueryOptions()
  );

  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSuccess && data) {
      handledSearchedMovies(data);
    }
  }, [isSuccess, data]);

  const moveData = data?.filter((mov: Movie) => {
    if (genere.name === "All" && mov.vote_average > 2) {
      return true;
    }
    return mov.genre_ids.includes(genere.id) && mov.vote_average > 2;
  });

  const handleClick = async (id: number) => {
    setLoading(true);
    try {
      await queryClient.prefetchQuery(movietailQueryOptions(id));

      router.push(`/movie/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // if (loading)
  //   return (
  //     <div className="absolute inset-0 flex justify-center items-center bg-amber-500 bg-background/70">
  //       <CinematicSpinner size="lg" />
  //     </div>
  //   );

  if (genere.name !== "All" && moveData.length === 0) {
    return <MovesNotFound />;
  }

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {moveData?.map((movie: Movie) => (
          // <Link key={movie.id} href={`/movie/${movie.id}`}>
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => handleClick(movie.id)}
          >
            <div className="h-full cursor-pointer group">
              <div className="relative mb-4 overflow-hidden rounded-lg glow-hover">
                {/* Poster Image */}
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={movie.title}
                  className="object-cover w-full transition-transform duration-500 h-96 group-hover:scale-110"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-background via-transparent to-transparent group-hover:opacity-100">
                  <div className="space-y-2">
                    <button className="w-full py-2 text-sm font-medium transition-all duration-300 rounded-lg bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50">
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Movie Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold transition-colors duration-300 text-foreground group-hover:text-primary line-clamp-2">
                  {movie.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {movie.release_date}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {movie.vote_average}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-xs rounded-full bg-secondary text-primary">
                    {
                      genres.find((gen) => movie.genre_ids.includes(gen.id))
                        ?.name
                    }
                  </span>
                  <span className="text-xs truncate text-muted-foreground">
                    unknown
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center h-screen bg-background/70 ">
          <CinematicSpinner size="lg" />
        </div>
      )}
    </>
  );
}

export function MovesNotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-24 min-h-[50vh] bg-background text-foreground">
        {/* Container with cinematic spacing and centered content */}
        <div className="max-w-md text-center">
          <p className="mb-6 text-2xl font-semibold text-card-foreground">
            No movies found 😢
          </p>
          <p className="mb-8 text-card-foreground/70">
            Try adjusting your filters or search for another movie to discover
            amazing titles!
          </p>

          <button
            // onClick={() => resetFilters()} // Hook up your filter reset function
            className="px-6 py-3 font-semibold transition-all duration-300 rounded-lg shadow-lg bg-primary text-background shadow-primary/50 hover:scale-105 hover:shadow-xl hover:shadow-primary/70"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
}
