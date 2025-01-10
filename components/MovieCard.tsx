'use client'
import { Movie, tmdb } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="relative w-full pt-[150%]">
          <div className="absolute inset-0">
            <Image
              src={movie.poster_path ? `${tmdb.posterSize.medium}${movie.poster_path}` : '/no-image.png'}
              alt={movie.title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoadingComplete={() => setImageLoading(false)}
            />
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-700 animate-pulse" />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="font-bold text-base mb-2 text-white line-clamp-2">
              {movie.title}
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-200">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm font-semibold text-white">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
            <p className="text-gray-200 text-sm line-clamp-3">{movie.overview}</p>
          </div>
        </div>
      </div>
    </Link>
  );
} 