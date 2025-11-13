import { moiveCastQueryOptions } from "@/utils/queryOptions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export interface CastMember {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

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

export function CastCrewSection() {
  const { id } = useParams();

  const { data } = useQuery(moiveCastQueryOptions(id));

  if (!data) {
    return;
  }
  console.log(data);
  return (
    <section className="space-y-8fade-in">
      {/* Cast */}
      <div>
        <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-accent">
          <div className="w-1 h-6 rounded-full bg-accent" />
          Cast
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {data.cast.slice(0, 3).map((member: CastMember) => (
            <div
              key={member.name}
              className="overflow-hidden transition-transform duration-300 border rounded-lg bg-card border-border glow-hover hover:scale-105"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                alt={member.name}
                className="object-cover w-full shadow-md rounded-xl h-44"
              />
              <div className="p-3">
                <p className="text-sm font-semibold text-foreground">
                  {member.name}
                </p>
                <p className="text-xs text-accent">
                  {member.known_for_department}
                </p>
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
          {data.crew.slice(0, 3).map((member: CastMember) => (
            <div
              key={member.name}
              className="flex items-center justify-between p-4 border rounded-lg bg-card border-border glow-hover"
            >
              <p className="font-semibold text-foreground">{member.name}</p>
              <p className="text-sm font-medium text-accent">
                {member.known_for_department}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
