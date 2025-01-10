import { movieService } from '@/services/movieService';
import { tmdb, CastMember } from '@/lib/tmdb';
import Image from 'next/image';

interface MovieDetailParams {
  params: {
    id: string;
  };
}

export default async function MovieDetail({ params }: MovieDetailParams) {
  const movie = await movieService.getMovieDetails(parseInt(params.id));

  return (
    <div>
      {/* Hero Section with Backdrop */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={`${tmdb.posterSize.original}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.tagline}</p>
          <div className="flex items-center gap-4">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>{movie.runtime} min</span>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="relative h-[600px]">
            <Image
              src={`${tmdb.posterSize.large}${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700">{movie.overview}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.credits.cast.slice(0, 4).map((actor: CastMember) => (
                  <div key={actor.id} className="text-center">
                    <div className="relative h-40 mb-2">
                      <Image
                        src={
                          actor.profile_path
                            ? `${tmdb.posterSize.medium}${actor.profile_path}`
                            : '/no-image.png'
                        }
                        alt={actor.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <p className="font-semibold">{actor.name}</p>
                    <p className="text-sm text-gray-600">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 