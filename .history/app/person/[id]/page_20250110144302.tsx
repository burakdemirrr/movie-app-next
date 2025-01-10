'use client';

import { movieService, PersonDetails } from '@/services/movieService';
import { tmdb } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';

interface PersonPageProps {
  params: {
    id: string;
  };
}

export default function PersonPage({ params }: PersonPageProps) {
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPerson() {
      try {
        const data = await movieService.getPersonDetails(parseInt(params.id));
        setPerson(data);
      } catch (error) {
        console.error('Error fetching person:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPerson();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="h-[600px] bg-gray-700 rounded" />
            <div className="md:col-span-2 space-y-4">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-700 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!person) return null;

  // Sort movies by release date (newest first)
  const sortedMovies = [...person.combined_credits.cast].sort((a, b) => {
    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div>
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl mb-6">
            <Image
              src={person.profile_path ? `${tmdb.posterSize.large}${person.profile_path}` : '/no-image.png'}
              alt={person.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="bg-gray-800 rounded-lg p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-400">Known For</h2>
              <p className="text-white">{person.known_for_department}</p>
            </div>
            {person.birthday && (
              <div>
                <h2 className="text-lg font-semibold text-gray-400">Birthday</h2>
                <p className="text-white">{new Date(person.birthday).toLocaleDateString()}</p>
              </div>
            )}
            {person.place_of_birth && (
              <div>
                <h2 className="text-lg font-semibold text-gray-400">Place of Birth</h2>
                <p className="text-white">{person.place_of_birth}</p>
              </div>
            )}
            {person.also_known_as.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-400">Also Known As</h2>
                <ul className="text-white space-y-1">
                  {person.also_known_as.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Biography and Filmography Section */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-6">{person.name}</h1>
          
          {person.biography && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Biography</h2>
              <p className="text-gray-300 whitespace-pre-line">{person.biography}</p>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-6">Filmography</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedMovies.map((movie) => (
                <Link 
                  key={`${movie.id}-${movie.character}`}
                  href={`/movie/${movie.id}`}
                  className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={movie.poster_path ? `${tmdb.posterSize.medium}${movie.poster_path}` : '/no-image.png'}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-sm text-gray-300">as</p>
                      <p className="font-semibold text-white">{movie.character}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white line-clamp-1">{movie.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-400">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-white">{movie.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 