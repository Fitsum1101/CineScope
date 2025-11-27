import { apiSlice } from "@/store/apiSlice";
import { Movie } from "@/types/movie";

export const moveSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    relatedMoves: builder.query<Movie[], number>({
      query: (page) => ({
        url: `/movie/${page}/recommendations`,
        method: "GET",
      }),
    }),
    reivewQueryOptions: builder.query<Movie[], number>({
      query: (page) => ({
        url: `/movie/${page}/reviews`,
        method: "GET",
      }),
    }),
    tradingMoviesQueryOptions: builder.query<Movie[], void>({
      query: () => ({
        url: `/movie/now_playing?language=en-US&page=1`,
        method: "GET",
      }),
    }),
    movietailQueryOptions: builder.query<Movie, number>({
      query: (id) => ({
        url: `/movie/${id}`,
        method: "GET",
      }),
    }),
    searchMovieQueryOptions: builder.query<Movie[], string>({
      query: (params) => ({
        url: `/search/movie`,
        method: "GET",
        params,
      }),
    }),
    moiveCastQueryOptions: builder.query<any, number>({
      query: (id) => ({
        url: `/movie/${id}/credits`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRelatedMovesQuery,
  useReivewQueryOptionsQuery,
  useSearchMovieQueryOptionsQuery,
  useMoiveCastQueryOptionsQuery,
  useMovietailQueryOptionsQuery,
  useTradingMoviesQueryOptionsQuery,
} = moveSlice;
