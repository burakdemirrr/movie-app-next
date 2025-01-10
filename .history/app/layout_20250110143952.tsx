'use client'

import { Sora } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sora = Sora({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${sora.className} bg-gray-900 text-white min-h-screen`}>
        <nav className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-16">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/categories/popular"
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Popular
                </Link>
                <Link
                  href="/categories/top_rated"
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Top Rated
                </Link>
                <Link
                  href="/categories/upcoming"
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Upcoming
                </Link>
                <Link
                  href="/categories/now_playing"
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Now Playing
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link
                      href="/"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/categories/popular"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Popular
                    </Link>
                    <Link
                      href="/categories/top_rated"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Top Rated
                    </Link>
                    <Link
                      href="/categories/upcoming"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Upcoming
                    </Link>
                    <Link
                      href="/categories/now_playing"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Now Playing
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <main className="min-h-screen pb-8">{children}</main>

        <footer className="bg-gray-800 border-t border-gray-700 py-6">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© 2024 MovieApp. Powered by TMDB</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
