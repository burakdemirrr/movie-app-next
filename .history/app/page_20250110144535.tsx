'use client';

import MovieCard from '@/components/MovieCard';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import { movieService } from '@/services/movieService';
import { Movie } from '@/lib/tmdb';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

const sortOptions = {
  popularity: 'Popularity',
  'vote_average': 'Rating',
  'release_date': 'Release Date',
};

type SortKey = keyof typeof sortOptions;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState<SortKey>('popularity');
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      try {
        if (debouncedSearch) {
          const results = await movieService.searchMovies(debouncedSearch);
          let filteredMovies = results.results;
          
          // Apply rating filter
          if (minRating > 0) {
            filteredMovies = filteredMovies.filter(movie => movie.vote_average >= minRating);
          }

          // Apply sorting
          filteredMovies.sort((a, b) => {
            if (sortBy === 'popularity') return b.popularity - a.popularity;
            if (sortBy === 'vote_average') return b.vote_average - a.vote_average;
            if (sortBy === 'release_date') return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
            return 0;
          });

          setMovies(filteredMovies);
          setTotalResults(filteredMovies.length);
          router.push(`/?q=${encodeURIComponent(debouncedSearch)}`, { scroll: false });
        } else {
          const results = await movieService.getPopularMovies();
          let filteredMovies = results.results;
          
          // Apply rating filter
          if (minRating > 0) {
            filteredMovies = filteredMovies.filter(movie => movie.vote_average >= minRating);
          }

          // Apply sorting
          filteredMovies.sort((a, b) => {
            if (sortBy === 'popularity') return b.popularity - a.popularity;
            if (sortBy === 'vote_average') return b.vote_average - a.vote_average;
            if (sortBy === 'release_date') return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
            return 0;
          });

          setMovies(filteredMovies);
          setTotalResults(filteredMovies.length);
          router.push('/', { scroll: false });
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [debouncedSearch, router, sortBy, minRating]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Search */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          Discover
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Movies</span>
        </h1>
        <div className="relative max-w-2xl mx-auto">
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

      {/* Filters Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-800/50 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-300">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="bg-gray-700 text-white text-sm rounded-md border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(sortOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-300">Min rating:</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="bg-gray-700 text-white text-sm rounded-md border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>All</option>
                <option value={5}>5+</option>
                <option value={6}>6+</option>
                <option value={7}>7+</option>
                <option value={8}>8+</option>
              </select>
            </div>
          </div>
          {debouncedSearch && (
            <span className="text-gray-400 text-sm">
              {totalResults} movies found
            </span>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isLoading ? (
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
