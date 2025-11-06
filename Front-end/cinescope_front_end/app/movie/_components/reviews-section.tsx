import { Star } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="py-8 fade-in">
      <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-accent">
        <Star className="w-5 h-5" />
        User Reviews
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex flex-col p-6 border rounded-lg bg-card border-border glow-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground">{review.author}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-accent text-accent-foreground">
                {review.rating}
              </div>
            </div>
            <p className="flex-1 leading-relaxed text-foreground">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
