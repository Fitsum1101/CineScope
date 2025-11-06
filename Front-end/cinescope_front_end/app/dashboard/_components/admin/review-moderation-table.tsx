"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Flag } from "lucide-react";

export function ReviewModerationTable() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Alex Johnson",
      movie: "Inception",
      rating: 5,
      comment: "Absolutely mind-blowing! Best sci-fi movie ever made.",
      date: "2024-03-15",
      status: "pending",
    },
    {
      id: 2,
      user: "Sarah Chen",
      movie: "The Matrix",
      rating: 4,
      comment: "Great movie but some parts feel dated now.",
      date: "2024-03-14",
      status: "pending",
    },
    {
      id: 3,
      user: "Mike Wilson",
      movie: "Interstellar",
      rating: 1,
      comment: "This contains inappropriate content that violates guidelines.",
      date: "2024-03-13",
      status: "flagged",
    },
  ]);

  const handleApprove = (reviewId: number) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  const handleReject = (reviewId: number) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  return (
    <div className="mb-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Review <span className="text-primary">Moderation</span>
        </h2>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-secondary/30 border rounded-lg p-4 hover:shadow-lg hover:shadow-primary/10 transition-all ${
                review.status === "flagged"
                  ? "border-red-500/50"
                  : "border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-foreground font-medium">
                      {review.user}
                    </h3>
                    {review.status === "flagged" && (
                      <Flag className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.movie} • {review.date}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < review.rating
                          ? "text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-foreground mb-4">{review.comment}</p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                  onClick={() => handleApprove(review.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                  onClick={() => handleReject(review.id)}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                All reviews have been moderated
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
