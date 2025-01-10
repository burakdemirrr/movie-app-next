'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie App",
  description: "Browse and search movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <nav className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link 
                href="/" 
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-500 transition-all"
              >
                MovieApp
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <div className="flex space-x-1 mr-4">
                  <Link
                    href="/categories/popular"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Popular
                  </Link>
                  <Link
                    href="/categories/top_rated"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Top Rated
                  </Link>
                  <Link
                    href="/categories/upcoming"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Upcoming
                  </Link>
                  <Link
                    href="/categories/now_playing"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Now Playing
                  </Link>
                </div>
                <Link
                  href="/search"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/categories/popular"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                >
                  Popular
                </Link>
                <Link
                  href="/categories/top_rated"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                >
                  Top Rated
                </Link>
                <Link
                  href="/categories/upcoming"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                >
                  Upcoming
                </Link>
                <Link
                  href="/categories/now_playing"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                >
                  Now Playing
                </Link>
                <Link
                  href="/search"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </Link>
              </div>
            </div>
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
