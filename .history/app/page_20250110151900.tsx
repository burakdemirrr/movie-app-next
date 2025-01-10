'use client';

import dynamic from 'next/dynamic';
import { movieService } from '@/services/movieService';
import { Movie } from '@/lib/tmdb';
import { useEffect, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';

// Lazy load MovieCard component
const MovieCard = dynamic(() => import('@/components/MovieCard'), {
  loading: () => <MovieCardSkeleton />,
  ssr: false
});

const sortOptions = {
  popularity: '🔥 Popularity',
  'vote_average': '⭐ Rating',
  'release_date': '📅 Release Date',
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
        <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-4 border border-gray-700/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              {/* Sort Filter */}
              <div className="relative group min-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-300">Sort by</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="w-full px-4 py-3 bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-white rounded-xl border border-gray-700/80 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm appearance-none hover:border-blue-500/30 transition-all duration-200 text-sm font-medium"
                >
                  {Object.entries(sortOptions).map(([key, label]) => (
                    <option key={key} value={key} className="bg-gray-800 py-2">
                      {label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-[60%] transform -translate-y-1/2 pointer-events-none text-blue-400/80 group-hover:text-blue-400 transition-colors duration-200">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="relative group min-w-[160px]">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-300">Rating</span>
                </div>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-white rounded-xl border border-gray-700/80 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm appearance-none hover:border-blue-500/30 transition-all duration-200 text-sm font-medium"
                >
                  <option value={0} className="bg-gray-800 py-2">All Ratings</option>
                  <option value={5} className="bg-gray-800 py-2">⭐ 5+</option>
                  <option value={6} className="bg-gray-800 py-2">⭐ 6+</option>
                  <option value={7} className="bg-gray-800 py-2">⭐ 7+</option>
                  <option value={8} className="bg-gray-800 py-2">⭐ 8+</option>
                </select>
                <div className="absolute right-3 top-[60%] transform -translate-y-1/2 pointer-events-none text-blue-400/80 group-hover:text-blue-400 transition-colors duration-200">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Results Count */}
            {debouncedSearch && (
              <div className="flex items-center gap-3 px-4 py-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span className="text-sm font-medium">
                  {totalResults} movies found
                </span>
              </div>
            )}
          </div>
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
