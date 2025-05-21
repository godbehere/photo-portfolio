'use client';

import { useState } from "react";
import { Aperture, Menu, X } from "lucide-react";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
// import { cn } from "@/lib/utils"; // Utility for conditional classNames (optional)

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = (
    <>
      <Link href="/portfolio" className="block px-4 py-2 hover:underline">
        Portfolio
      </Link>
      <Link href="/booking" className="block px-4 py-2 hover:underline">
        Book
      </Link>
      <Link href="/shop" className="block px-4 py-2 hover:underline">
        Shop
      </Link>
      <Link href="/about" className="block px-4 py-2 hover:underline">
        About
      </Link>
      <Link href="/contact" className="block px-4 py-2 hover:underline">
        Contact
      </Link>
    </>
  );

  return (
    <header className="border-b dark:bg-gray-950 dark:text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold flex items-center space-x-2">
                <Aperture className="w-6 h-6" />
                <span>Lost Light Photography</span>
            </Link>
            <ModeToggle />
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-4">
                {navLinks}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
        <div className="md:hidden px-4 pb-4 animate-in slide-in-from-top">
            <nav className="flex flex-col rounded-md border bg-white/70 dark:bg-gray-800/70 shadow-lg backdrop-blur-md">
                <Link href="/portfolio" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:underline">Portfolio</Link>
                <Link href="/booking" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:underline">Book</Link>
                <Link href="/shop" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:underline">Shop</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:underline">About</Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:underline">Contact</Link>
            </nav>
        </div>
        )}

    </header>
  );
}
