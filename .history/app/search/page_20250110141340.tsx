import MovieCard from '@/components/MovieCard';
import { movieService } from '@/services/movieService';
import { Movie } from '@/lib/tmdb';

interface SearchPageProps {
  searchParams: { q: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q;
  const movies = query ? await movieService.searchMovies(query) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Movies</h1>

      <form className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for movies..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {query && movies && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Search Results for "{query}"
          </h2>
          {movies.results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.results.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No movies found for your search.</p>
          )}
        </div>
      )}
    </div>
  );
} 