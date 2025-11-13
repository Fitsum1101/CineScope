"use client";

import { useRouter } from "next/navigation";
import { ChatInterface } from "./_components/chat-interface";

export default function AiCompanionPage() {
  const router = useRouter();

  if (false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center glow mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-xl">C</span>
          </div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header with background */}
      <div className="relative h-48 overflow-hidden border-b border-card">
        <img
          src="/futuristic-sci-fi-movie-poster.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              AI <span className="text-primary">Companion</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Get personalized movie recommendations and insights
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ChatInterface />
      </main>
    </>
  );
}
