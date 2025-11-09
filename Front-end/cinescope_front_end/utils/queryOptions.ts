import { tmdbApi } from "@/lib/axios/tmdbApi";
import { createQueryOptions } from "./createQueryOptions";
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";

// we need to fix the any type

export function relatedMovieQueryOptions(id: any) {
  return createQueryOptions(
    ["moveRelatedSection", id],
    ({ queryKey }) => tmdbApi.get(`/movie/${queryKey[1]}/recommendations`),
    {
      select: (res: any): Movie[] => res?.data.results,
    }
  );
}

export function reivewQueryOptions(id: any) {
  return createQueryOptions(
    ["recomdations", id],
    ({ queryKey }) => tmdbApi.get(`/movie/${queryKey[1]}/reviews`),
    {
      select: (res: any): Review[] => res?.data.results,
    }
  );
}

export function tradingMoviesQueryOptions() {
  return createQueryOptions(
    ["trendingMovies"],
    () => tmdbApi.get("/movie/now_playing?language=en-US&page=1"),
    {
      select: (response: any) => response.data.results,
    }
  );
}

export function movietailQueryOptions(id: any) {
  return createQueryOptions(
    ["move detail", id],
    ({ queryKey }) => tmdbApi.get(`/movie/${queryKey[1]}`),
    {
      select: (res: any): Movie => res?.data,
    }
  );
}
