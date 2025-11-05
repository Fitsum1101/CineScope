"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    "Home",
    "Discover",
    "Watchlist",
    "AI Companion",
    "Dashboard",
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-card backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow">
              <span className="text-primary-foreground font-bold text-lg">
                C
              </span>
            </div>
            <span className="hidden sm:inline text-xl font-bold text-primary">
              CineScope
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg glow-hover transition-all duration-300">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-in fade-in">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="block text-foreground hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold">
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
