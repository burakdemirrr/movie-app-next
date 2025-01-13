'use client';

import { movieService } from '@/services/movieService';
import { Movie } from '@/lib/tmdb';
import { useEffect, useState, use } from 'react';
import dynamic from 'next/dynamic';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';

// Lazy load MovieCard component
const MovieCard = dynamic(() => import('@/components/MovieCard'), {
  loading: () => <MovieCardSkeleton />
});

type CategoryType = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

interface CategoryParams {
  params: Promise<{
    category: CategoryType;
  }>;
}

const categoryTitles: Record<CategoryType, string> = {
  popular: 'Popular Movies',
  top_rated: 'Top Rated Movies',
  upcoming: 'Upcoming Movies',
  now_playing: 'Now Playing'
};

export default function CategoryPage({ params }: CategoryParams) {
  const { category } = use(params);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      try {
        const results = await movieService.getMoviesByCategory(category);
        setMovies(results.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        {categoryTitles[category]}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
} 