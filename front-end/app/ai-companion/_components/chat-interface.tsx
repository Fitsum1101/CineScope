"use client";

import { useState } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { SuggestionCards } from "./suggestion-cards";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI movie companion. I can help you discover new movies, get recommendations based on your mood, explain plots, and answer questions about films. What would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your interest, I'd recommend checking out some great sci-fi films. Would you like suggestions for mind-bending plots or action-packed adventures?",
        "That's a great question! I can help you find movies by genre, mood, or even compare films. What aspect interests you most?",
        "I see you're interested in that! Let me suggest some related movies you might enjoy. Would you like recommendations from similar genres?",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        type: "ai",
        content:
          "Hello! I'm your AI movie companion. I can help you discover new movies, get recommendations based on your mood, explain plots, and answer questions about films. What would you like to explore today?",
        timestamp: new Date(),
      },
    ]);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="space-y-6">
      {/* Chat Container */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto bg-background/50 p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card border border-border text-foreground rounded-bl-none"
                }`}
              >
                {message.type === "ai" && (
                  <Sparkles size={16} className="inline mr-2 text-primary" />
                )}
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border px-4 py-3 rounded-lg rounded-bl-none">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me anything about movies..."
              className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-primary text-primary-foreground p-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-hover"
            >
              <Send size={20} />
            </button>
            <button
              onClick={handleClearChat}
              className="bg-destructive/20 text-destructive p-2 rounded-lg hover:bg-destructive/30 transition-all"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion Cards */}
      <SuggestionCards onSuggestionClick={handleSuggestion} />
    </div>
  );
}
