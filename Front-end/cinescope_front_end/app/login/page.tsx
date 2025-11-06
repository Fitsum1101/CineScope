"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import RHFTextField from "@/components/custom/input/RHFTextField";
import RHFPasswordField from "@/components/custom/input/RHFPasswordField";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //   const { user, isLoading, login } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  //   useEffect(() => {
  //     if (user) {
  //       router.push(user.role === "admin" ? "/admin" : "/dashboard");
  //     }
  //   }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      //   await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="bg-background flex h-[calc(100vh-30px)] items-center justify-center px-4">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-primary/5 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="p-8 border bg-card border-primary/20 rounded-xl backdrop-blur-sm glow">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary glow">
                <span className="text-xl font-bold text-primary-foreground">
                  C
                </span>
              </div>
              <span className="text-2xl font-bold text-primary">CineScope</span>
            </Link>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-center text-foreground">
            Welcome Back
          </h1>
          <p className="mb-8 text-center text-muted-foreground">
            Sign in to access your cinematic experience
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <RHFTextField
              placeholder="your@gmail.com"
              label="email"
              name="emial"
            />
            <RHFPasswordField label="password" name="password" />
            {/* Error Message */}
            {error && (
              <div className="p-3 text-sm border rounded-lg bg-destructive/20 border-destructive/50 text-destructive">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              //   disabled={isLoading}
              className="w-full py-2 font-semibold transition-all duration-300 rounded-lg bg-primary text-primary-foreground hover:shadow-lg glow-hover disabled:opacity-50"
            >
              Sign in
              {/* {isLoading ? "Signing in..." : "Sign In"} */}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-sm text-center text-muted-foreground">
            New to CineScope?{" "}
            <Link
              href="/"
              className="font-semibold text-primary hover:underline"
            >
              Go to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
