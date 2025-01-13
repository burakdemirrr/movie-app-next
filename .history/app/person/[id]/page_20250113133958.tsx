'use client';

import { movieService, PersonDetails, PersonCastCredit } from '@/services/movieService';
import { tmdb } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';

interface PersonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PersonPage({ params }: PersonPageProps) {
  const { id } = use(params);
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPerson() {
      setIsLoading(true);
      try {
        const data = await movieService.getPersonDetails(parseInt(id));
        setPerson(data);
      } catch (error) {
        console.error('Error fetching person:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPerson();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-64 h-96 bg-gray-700 rounded-lg" />
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-700 rounded w-1/3" />
            <div className="h-4 bg-gray-700 rounded w-1/4" />
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!person) return null;

  // Sort movies by vote count and filter out undefined/null values
  const sortedMovies = person.combined_credits.cast
    .filter((movie): movie is PersonCastCredit => Boolean(movie))
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        <div className="w-64 shrink-0">
          <div className="sticky top-8">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={
                  person.profile_path
                    ? `${tmdb.posterSize.large}${person.profile_path}`
                    : '/no-image.png'
                }
                alt={person.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-bold text-white">{person.name}</h2>
              {person.known_for_department && (
                <p className="text-gray-400">{person.known_for_department}</p>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {person.name}
            </h1>
            
            {person.biography && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Biography</h2>
                <p className="text-gray-300 whitespace-pre-line">{person.biography}</p>
              </div>
            )}

            {sortedMovies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Known For</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {sortedMovies.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      className="block group"
                    >
                      <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={
                            movie.poster_path
                              ? `${tmdb.posterSize.medium}${movie.poster_path}`
                              : '/no-image.png'
                          }
                          alt={movie.title || 'Movie poster'}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-semibold line-clamp-2">
                              {movie.title}
                            </h3>
                            {movie.character && (
                              <p className="text-gray-300 text-sm mt-1">
                                as {movie.character}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 