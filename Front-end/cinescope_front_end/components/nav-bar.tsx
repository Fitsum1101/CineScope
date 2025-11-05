"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import PrimaryButton from "./custom/button/PrimaryButton";

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
    <nav className="sticky top-0 z-50 mb-5 border-b bg-background border-card backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary glow">
              <span className="text-lg font-bold text-primary-foreground">
                C
              </span>
            </div>
            <span className="hidden text-xl font-bold sm:inline text-primary">
              CineScope
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium transition-colors duration-300 text-foreground hover:text-primary"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <PrimaryButton
              title="Login"
              type="button"
              className="cursor-pointer "
              size="lg"
            />
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
          <div className="pb-4 space-y-3 md:hidden animate-in fade-in">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="block transition-colors text-foreground hover:text-primary"
              >
                {item}
              </Link>
            ))}
            {/* <PrimaryButton
              title="login"
              type="button"
              className="cursor-pointer bg-amber-700"
            /> */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
