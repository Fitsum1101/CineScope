"use client";

import { Sparkles, Flame, Heart, Lightbulb } from "lucide-react";

interface SuggestionCardsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function SuggestionCards({ onSuggestionClick }: SuggestionCardsProps) {
  const suggestions = [
    {
      icon: Sparkles,
      title: "Recommend Movies",
      description:
        "Get personalized movie recommendations based on your preferences",
      prompt: "Can you recommend some great movies for me?",
    },
    {
      icon: Flame,
      title: "Trending Now",
      description: "What are the trending movies right now?",
      prompt: "What are the most trending movies this week?",
    },
    {
      icon: Heart,
      title: "Find by Mood",
      description: "Discover movies based on how you're feeling",
      prompt:
        "I'm in the mood for a thrilling, mind-bending film. What do you suggest?",
    },
    {
      icon: Lightbulb,
      title: "Movie Insights",
      description: "Get interesting facts and details about movies",
      prompt: "Tell me some interesting facts about famous directors",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {suggestions.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.prompt)}
            className="bg-card border border-border hover:border-primary rounded-lg p-4 text-left transition-all hover:shadow-lg hover:shadow-primary/20 group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/40 transition-colors">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {suggestion.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
