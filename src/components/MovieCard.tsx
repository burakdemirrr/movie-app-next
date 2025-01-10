import { Movie, tmdb } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
        <div className="relative h-[400px]">
          <Image
            src={movie.poster_path ? `${tmdb.posterSize.medium}${movie.poster_path}` : '/no-image.png'}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {new Date(movie.release_date).getFullYear()}
            </span>
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-sm">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 