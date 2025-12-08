"use client";

import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";

export default function ImageSlideshow({ moves }: { moves: Movie[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        return prevIndex < moves.length - 1 ? prevIndex + 1 : 0;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [moves]);

  return (
    <div className="slideshow">
      {moves?.map((move, index: number) => (
        <img
          key={index}
          src={`https://image.tmdb.org/t/p/w500/${move.poster_path}`}
          className={index === currentImageIndex ? "active" : ""}
          alt={move.title}
        />
      ))}
    </div>
  );
}
