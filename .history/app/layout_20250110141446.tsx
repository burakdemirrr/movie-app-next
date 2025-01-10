import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
        <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link 
                href="/" 
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-500 transition-all"
              >
                MovieApp
              </Link>
              <div className="hidden md:flex space-x-1">
                <Link
                  href="/categories/popular"
                  className="px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Popular
                </Link>
                <Link
                  href="/categories/top_rated"
                  className="px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Top Rated
                </Link>
                <Link
                  href="/categories/upcoming"
                  className="px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Upcoming
                </Link>
                <Link
                  href="/categories/now_playing"
                  className="px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Now Playing
                </Link>
                <Link
                  href="/search"
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
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
