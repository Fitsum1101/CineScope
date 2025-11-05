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
      className={`${className}`}
    >
      {title}
      {isLoading && <Loader className="ml-1 h-3 w-3 animate-spin" />}
    </Button>
  );
};

export default PrimaryButton;
