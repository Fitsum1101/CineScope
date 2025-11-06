interface CastMember {
  name: string;
  role: string;
  image: string;
}

interface CrewMember {
  name: string;
  role: string;
}

interface CastCrewProps {
  cast: CastMember[];
  crew: CrewMember[];
}

export function CastCrewSection({ cast, crew }: CastCrewProps) {
  return (
    <section className="space-y-8 fade-in">
      {/* Cast */}
      <div>
        <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-accent">
          <div className="w-1 h-6 rounded-full bg-accent" />
          Cast
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {cast.map((member) => (
            <div
              key={member.name}
              className="overflow-hidden transition-transform duration-300 border rounded-lg bg-card border-border glow-hover hover:scale-105"
            >
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="object-cover w-full h-40"
              />
              <div className="p-3">
                <p className="text-sm font-semibold text-foreground">
                  {member.name}
                </p>
                <p className="text-xs text-accent">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crew */}
      <div>
        <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-accent">
          <div className="w-1 h-6 rounded-full bg-accent" />
          Crew
        </h2>
        <div className="space-y-3">
          {crew.map((member) => (
            <div
              key={member.name}
              className="flex items-center justify-between p-4 border rounded-lg bg-card border-border glow-hover"
            >
              <p className="font-semibold text-foreground">{member.name}</p>
              <p className="text-sm font-medium text-accent">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
