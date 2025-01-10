import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie App',
  description: 'Browse and search movies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold">
                MovieApp
              </Link>
              <div className="flex space-x-4">
                <Link
                  href="/categories/popular"
                  className="hover:text-blue-200 transition-colors"
                >
                  Popular
                </Link>
                <Link
                  href="/categories/top_rated"
                  className="hover:text-blue-200 transition-colors"
                >
                  Top Rated
                </Link>
                <Link
                  href="/categories/upcoming"
                  className="hover:text-blue-200 transition-colors"
                >
                  Upcoming
                </Link>
                <Link
                  href="/categories/now_playing"
                  className="hover:text-blue-200 transition-colors"
                >
                  Now Playing
                </Link>
                <Link
                  href="/search"
                  className="hover:text-blue-200 transition-colors"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
} 