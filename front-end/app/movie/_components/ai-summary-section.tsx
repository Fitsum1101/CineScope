import { Sparkles } from "lucide-react";

export function AISummarySection({ aiSummary }: { aiSummary: string }) {
  return (
    <section className="fade-in">
      <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-accent">
        <Sparkles className="w-5 h-5" />
        AI Analysis
      </h2>
      <div className="relative p-6 overflow-hidden border rounded-lg bg-gradient-to-br from-secondary/50 to-secondary/20 border-accent/20 glow-hover">
        <div className="absolute top-0 right-0 w-20 h-20 -mt-8 -mr-8 rounded-full bg-accent/10 blur-3xl" />
        <p className="relative z-10 text-lg leading-relaxed text-foreground">
          {aiSummary}
        </p>
      </div>
    </section>
  );
}
