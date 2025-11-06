export function OverviewSection({ overview }: { overview: string }) {
  return (
    <section className="fade-in">
      <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-accent">
        <div className="w-1 h-6 rounded-full bg-accent" />
        Overview
      </h2>
      <div className="p-6 border rounded-lg bg-card border-border glow-hover">
        <p className="text-lg leading-relaxed text-foreground">{overview}</p>
      </div>
    </section>
  );
}
