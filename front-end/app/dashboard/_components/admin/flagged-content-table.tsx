"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function FlaggedContentTable() {
  const [flaggedItems, setFlaggedItems] = useState([
    {
      id: 1,
      type: "Review",
      content: "Inappropriate language in review for 'The Dark Knight'",
      reporter: "User #4521",
      date: "2024-03-15",
      severity: "high",
    },
    {
      id: 2,
      type: "Comment",
      content: "Spam link posted in discussion thread",
      reporter: "User #3892",
      date: "2024-03-14",
      severity: "medium",
    },
    {
      id: 3,
      type: "Profile",
      content: "Offensive username detected",
      reporter: "Auto-Moderator",
      date: "2024-03-13",
      severity: "low",
    },
  ]);

  const handleResolve = (itemId: number) => {
    setFlaggedItems(flaggedItems.filter((item) => item.id !== itemId));
  };

  const handleDismiss = (itemId: number) => {
    setFlaggedItems(flaggedItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="mb-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Flagged <span className="text-primary">Content</span>
        </h2>

        <div className="space-y-4">
          {flaggedItems.map((item) => (
            <div
              key={item.id}
              className="bg-secondary/30 border border-border rounded-lg p-4 hover:shadow-lg hover:shadow-primary/10 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <AlertTriangle
                    className={`w-5 h-5 mt-1 ${
                      item.severity === "high"
                        ? "text-red-400"
                        : item.severity === "medium"
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-foreground font-medium">
                        {item.type}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          item.severity === "high"
                            ? "bg-red-500/20 text-red-400"
                            : item.severity === "medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-foreground mb-2">{item.content}</p>
                    <p className="text-sm text-muted-foreground">
                      Reported by {item.reporter} • {item.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"
                  onClick={() => handleResolve(item.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Resolve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-muted-foreground/30 text-muted-foreground hover:bg-muted/10 bg-transparent"
                  onClick={() => handleDismiss(item.id)}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Dismiss
                </Button>
              </div>
            </div>
          ))}

          {flaggedItems.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                No flagged content to review
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
