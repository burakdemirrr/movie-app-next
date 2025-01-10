'use client';

import MovieCard from '@/components/MovieCard';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import { movieService } from '@/services/movieService';
import { Movie } from '@/lib/tmdb';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      try {
        if (debouncedSearch) {
          const results = await movieService.searchMovies(debouncedSearch);
          setMovies(results.results);
          setTotalResults(results.total_results);
          // Update URL with search query
          router.push(`/?q=${encodeURIComponent(debouncedSearch)}`, { scroll: false });
        } else {
          const results = await movieService.getPopularMovies();
          setMovies(results.results);
          setTotalResults(results.total_results);
          // Remove search query from URL
          router.push('/', { scroll: false });
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [debouncedSearch, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Discover Movies
        </h1>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies..."
            className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            {debouncedSearch ? `Results for "${debouncedSearch}"` : 'Popular Movies'}
          </h2>
          {debouncedSearch && (
            <span className="text-gray-400">
              {totalResults} movies found
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isLoading ? (
            // Show skeletons while loading
            Array.from({ length: 10 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No movies found</p>
              <p className="text-gray-500 mt-2">Try different keywords or check the spelling</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
