"use client";

import { Search, X } from "lucide-react";
import { genres } from "@/constants/genres";
import { DiscoveryFiltersProps } from "@/types/genere";
import { Input } from "@/components/ui/input";

let isNotTyping = true;

export default function DiscoveryFilters({
  dispatch,
  state,
  genere,
  handleGenere,
}: DiscoveryFiltersProps) {
  return (
    <div className="sticky element top-28 max-h-[calc(100vh-120px)] overflow-y-auto bg-secondary border border-b-cyan-400 rounded-lg p-6 space-y-6 shadow-lg">
      {/* Search Filter */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Search
        </label>
        <div className="relative group">
          <Search className="absolute w-5 h-5 transition-colors pointer-events-none left-3 top-3 text-muted-foreground group-focus-within:text-primary" />
          <Input
            type="text"
            placeholder="Movie title or director..."
            value={isNotTyping ? "" : state.query}
            onChange={(e) => {
              isNotTyping = false;
              dispatch({
                type: "SET_QUERY",
                payload: e.target.value,
              });
            }}
            className="w-full pl-10 pr-10 py-2.5 bg-background text-foreground rounded-lg border border-secondary/50 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/30"
          />
          {state.query && (
            <button
              onClick={() => dispatch({ type: "SET_QUERY", payload: "" })}
              className="absolute transition-colors right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
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
          {genres.map((gen) => (
            <button
              key={gen.id}
              onClick={() => handleGenere(gen)}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                genere.name === gen.name
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/40"
                  : "bg-background text-foreground hover:bg-background/80 hover:shadow-md hover:shadow-primary/20 border border-secondary/30"
              }`}
            >
              {gen.name}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-secondary/50"></div>
      <button
        // onClick={handleReset}
        className="w-full px-4 py-2.5 bg-background text-foreground rounded-lg border border-secondary/30 hover:bg-background/80 hover:shadow-md hover:shadow-primary/20 transition-all duration-300 text-sm font-medium"
      >
        Reset Filters
      </button>
    </div>
  );
}
