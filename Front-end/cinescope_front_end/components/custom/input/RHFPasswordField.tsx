"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface IProps {
  name: string;
  label: string;
  isRequired?: boolean;
  isOptionalCaptionVisible?: boolean;
  isRequiredAstrictCaptionVisible?: boolean;
}

const RHFPasswordField = ({
  name,
  isRequired = true,
  isOptionalCaptionVisible = true,
  isRequiredAstrictCaptionVisible = true,
  label,
  ...other
}: IProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={name}>
        {label}
        {isRequired ? (
          <span className="text-red-500 align-middle">{" *"}</span>
        ) : (
          <span className="text-[#929292] font-normal text-[10px]">{`(optional)`}</span>
        )}
      </Label>
      <div className="relative">
        <Input
          id={name}
          onChange={(e) => {}}
          type={showPassword ? "text" : "password"}
          className={`w-full px-4 py-2 transition-all border rounded-lg bg-input border-primary/30 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
          {...other}
        />
        <span
          onClick={togglePasswordVisibility}
          className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
    </div>
  );
};

export default RHFPasswordField;
//   {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
