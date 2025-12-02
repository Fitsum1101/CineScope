import React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface PrimaryButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
  type: "submit" | "reset" | "button";
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onClick,
  className,
  type,
  isLoading = false,
  isDisabled = false,
  variant = "default",
  size = "default",
}) => {
  return (
    <Button
      disabled={isLoading || isDisabled}
      type={type}
      onClick={onClick}
      className={cn(
        buttonVariants({ variant, size }),
        "px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg glow-hover transition-all duration-300",
        className
      )}
    >
      {title}
      {isLoading && <Loader className="w-3 h-3 ml-1 animate-spin" />}
    </Button>
  );
};

export default PrimaryButton;
