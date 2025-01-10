'use client';

import dynamic from 'next/dynamic';
import { movieService } from '@/services/movieService';
import { Movie } from '@/lib/tmdb';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Lazy load MovieCard component
const MovieCard = dynamic(() => import('@/components/MovieCard'), {
  loading: () => <MovieCardSkeleton />
});

import MovieCardSkeleton from '@/components/MovieCardSkeleton';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState<{ results: Movie[], total_results: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const results = await movieService.searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('q') as string;
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Discover Movies
        </h1>
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search for movies..."
              className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Search
          </button>
        </form>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : query && movies ? (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              Results for "{query}"
            </h2>
            <span className="text-gray-400">
              {movies.total_results} movies found
            </span>
          </div>
          
          {movies.results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.results.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No movies found for your search.</p>
              <p className="text-gray-500 mt-2">Try different keywords or check the spelling.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Enter a movie title to start searching</p>
          <p className="text-gray-500 mt-2">Discover thousands of movies in our database</p>
        </div>
      )}
    </div>
  );
} 