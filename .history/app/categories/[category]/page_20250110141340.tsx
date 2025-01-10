import MovieCard from '@/components/MovieCard';
import { movieService } from '@/services/movieService';
import { Movie } from '@/lib/tmdb';

const categoryNames = {
  popular: 'Popular',
  top_rated: 'Top Rated',
  upcoming: 'Upcoming',
  now_playing: 'Now Playing',
};

type CategoryParams = {
  params: {
    category: keyof typeof categoryNames;
  };
};

export default async function CategoryPage({ params }: CategoryParams) {
  const movies = await movieService.getMoviesByCategory(params.category);
  const categoryTitle = categoryNames[params.category] || params.category;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{categoryTitle} Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
} 