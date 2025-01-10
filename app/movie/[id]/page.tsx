import { movieService } from '@/services/movieService';
import { tmdb, CastMember, Movie } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';

interface MovieDetailParams {
  params: {
    id: string;
  };
}

export default async function MovieDetail({ params }: MovieDetailParams) {
  const movie = await movieService.getMovieDetails(parseInt(params.id));

  return (
    <div className="bg-gray-900">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] w-full">
        <Image
          src={`${tmdb.posterSize.original}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="relative w-64 h-96 shrink-0 hidden md:block transform hover:scale-105 transition-transform duration-300">
              <Image
                src={`${tmdb.posterSize.large}${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1 text-white">
              <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {movie.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4 italic">{movie.tagline}</p>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-yellow-400">★</span>
                  <span className="text-xl font-bold">{movie.vote_average.toFixed(1)}</span>
                </div>
                <span className="text-gray-300">{new Date(movie.release_date).getFullYear()}</span>
                <span className="text-gray-300">{movie.runtime} min</span>
              </div>
              <p className="text-lg text-gray-300 max-w-3xl">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Top Cast
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movie.credits.cast.slice(0, 6).map((actor: CastMember) => (
            <div 
              key={actor.id} 
              className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-64">
                <Image
                  src={
                    actor.profile_path
                      ? `${tmdb.posterSize.medium}${actor.profile_path}`
                      : '/no-image.png'
                  }
                  alt={actor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-white mb-1">{actor.name}</p>
                <p className="text-sm text-gray-400">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Similar Movies */}
        <h2 className="text-3xl font-bold mt-16 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Similar Movies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movie.similar.results.slice(0, 6).map((similar: Movie) => (
            <Link 
              key={similar.id} 
              href={`/movie/${similar.id}`}
              className="block transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={
                    similar.poster_path
                      ? `${tmdb.posterSize.medium}${similar.poster_path}`
                      : '/no-image.png'
                  }
                  alt={similar.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold">{similar.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white text-sm">
                        {similar.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 