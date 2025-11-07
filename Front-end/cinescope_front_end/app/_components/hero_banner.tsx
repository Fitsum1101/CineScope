"use client";

import { createQueryOptions } from "@/utils/createQueryOptions";
import { getPublicAbsoluteURL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import ImageSlideshow from "./image-slidershow";
import { tmdbApi } from "@/lib/axios/tmdbApi";
import { Play, Sparkles } from "lucide-react";

export default function HeroBanner() {
  const { data, error, isLoading } = useQuery(
    createQueryOptions(
      ["heroBanner"],
      () => tmdbApi.get("/movie/popular?language=en-US&page=1"),
      {
        select: (response: any) => {
          console.log({ response });
          return response?.data;
        },
      }
    )
  );

  return (
    <section className="relative w-full h-screen overflow-hidden ">
      {/* Background with gradient overlay */}
      {/* */}
      <div
        className="absolute inset-0 bg-linear-to-r from-background via-background to-muted"
        style={{
          backgroundImage: `${getPublicAbsoluteURL(
            "assets/images/erik-mclean-7sgU1jV8-iw-unsplash.png"
          )}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-background/90 to-background/40" />
        <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex items-center justify-between h-full px-4 mx-auto sm:px-8 lg:px-16 max-w-7xl">
        {/* Movie Poster */}
        <div className="hidden w-1/3 h-[70vh]  lg:block">
          <ImageSlideshow moves={data?.results ? data?.results : []} />
        </div>

        {/* Text Content */}
        <div className="flex-1 lg:ml-12 slide-in">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-primary md:text-base">
              <Sparkles size={16} />
              AI-Powered Discovery
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl text-foreground">
              Discover Your Next Favorite Film
            </h1>
          </div>

          <p className="max-w-md text-lg md:text-xl text-muted-foreground">
            "An immersive cinematic experience curated just for you, where
            artificial intelligence understands your taste and reveals hidden
            gems."
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="flex items-center gap-2 px-8 py-3 font-semibold transition-all duration-300 rounded-lg bg-primary text-primary-foreground hover:shadow-lg glow-hover">
              <Play size={20} />
              Watch Trailer
            </button>
            <button className="px-8 py-3 font-semibold transition-all duration-300 border-2 rounded-lg border-primary text-primary hover:bg-primary/10">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8">
            <div>
              <p className="text-3xl font-bold text-primary">50K+</p>
              <p className="text-sm text-muted-foreground">Movies Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">1M+</p>
              <p className="text-sm text-muted-foreground">Happy Explorers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
