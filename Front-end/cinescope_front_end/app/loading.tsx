"use client";

import { CinematicSpinner } from "@/ui/cinematic-spinner";

export default function Loading() {
  return (
    <div className="flex  items-center justify-center min-h-screen bg-background">
      <CinematicSpinner size="lg" variant="default" showText={true} />
    </div>
  );
}
