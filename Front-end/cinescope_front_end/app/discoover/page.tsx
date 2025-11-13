"use client";

import { useReducer, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { initialSearchState, searchReducer } from "@/reducers/searchReducer";
import DiscoveryFilters from "./_components/discovery-filter";
import MovieGrid from "./_components/movie-grid";
import { genres } from "@/constants/genres";

export default function DiscoverPage() {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);
  const [genere, setGenre] = useState(genres[0]);
  const [searchedMoves, setSearchedMoves] = useState([]);

  return (
    <>
      <main className="pt-24 pb-20">
        <section className="px-4 py-8 border-b md:px-8 border-secondary">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-2 text-4xl font-bold md:text-5xl text-foreground slide-in">
              Discover Movies
            </h1>
            <p className="text-muted-foreground">
              Explore our collection and find your next favorite film
            </p>
          </div>
        </section>
        <div className="px-4 mx-auto my-10 max-w-7xl md:px-8">
          <div className="grid grid-cols-1 gap-8 align-baseline lg:grid-cols-4">
            <aside className="lg:col-span-1 ">
              <DiscoveryFilters
                genere={genere}
                handleGenere={setGenre}
                dispatch={dispatch}
                state={state}
              />
            </aside>
            <div className="lg:col-span-3">
              {state.query.length > 0 && (
                <div className="flex items-center justify-between gap-3 mb-5 mx-7">
                  <p className="text-primary">page = {state.page}</p>
                  <div className="flex gap-5">
                    <button
                      disabled={state.page === 1}
                      className={`p-2 transition-all duration-300 border rounded-lg  bg-card border-secondary text-primary glow-hover
    ${
      state.page === 1
        ? "opacity-40 cursor-not-allowed hover:border-secondary hover:shadow-none"
        : "hover:border-primary hover:shadow-lg cursor-pointer"
    }`}
                      onClick={() =>
                        dispatch({ type: "SET_PAGE", payload: state.page - 1 })
                      }
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button
                      onClick={() =>
                        dispatch({ type: "SET_PAGE", payload: state.page + 1 })
                      }
                      disabled={searchedMoves.length < 20}
                      className={`p-2 ${
                        searchedMoves.length < 20
                          ? "opacity-40 cursor-not-allowed hover:border-secondary hover:shadow-none"
                          : "hover:border-primary hover:shadow-lg cursor-pointer"
                      }  transition-all duration-300 border rounded-lg  bg-card border-secondary hover:border-primary text-primary glow-hover`}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              )}
              <MovieGrid
                handledSearchedMovies={(movies: any) =>
                  setSearchedMoves(movies)
                }
                genere={genere}
                state={state}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
