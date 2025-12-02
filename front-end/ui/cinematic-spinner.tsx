"use client";

import { cn } from "@/lib/utils";

interface CinematicSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "compact";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

export function CinematicSpinner({
  size = "md",
  variant = "default",
  showText = true,
  className,
}: CinematicSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      <div className={cn(sizeClasses[size], "relative")}>
        <svg
          className="absolute inset-0 animate-spin"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ring with neon cyan */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(102, 252, 241, 0.2)"
            strokeWidth="2"
          />

          {/* Animated cyan arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#cyanGradient)"
            strokeWidth="3"
            strokeDasharray="141 282"
            strokeLinecap="round"
          />

          {/* Red accent arc */}
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke="url(#redGradient)"
            strokeWidth="2"
            strokeDasharray="88 176"
            strokeLinecap="round"
            opacity="0.7"
          />

          <defs>
            <linearGradient
              id="cyanGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#66FCF1" />
              <stop offset="100%" stopColor="#45f0df" />
            </linearGradient>
            <linearGradient
              id="redGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#e94b3c" />
              <stop offset="100%" stopColor="#c23a2f" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center pulse effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
      </div>

      {showText && (
        <div className="text-center">
          <p className="text-sm text-foreground/80 font-medium">Loading...</p>
          <p className="text-xs text-foreground/50 mt-1">
            {variant === "default" ? "Discovering your next favorite" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
