import { MovieResponse, MovieDetails, tmdb } from '@/lib/tmdb';

export type PersonCastCredit = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  character: string;
};

export type PersonDetails = {
  id: number;
  name: string;
  profile_path: string | null;
  biography: string;
  known_for_department: string;
  combined_credits: {
    cast: PersonCastCredit[];
  };
};

export const movieService = {
  async getPopularMovies(page = 1): Promise<MovieResponse> {
    const response = await fetch(
      `${tmdb.baseUrl}/movie/popular?api_key=${tmdb.apiKey}&page=${page}`
    );
    return response.json();
  },

  async getMoviesByCategory(category: string, page = 1): Promise<MovieResponse> {
    const response = await fetch(
      `${tmdb.baseUrl}/movie/${category}?api_key=${tmdb.apiKey}&page=${page}`
    );
    return response.json();
  },

  async searchMovies(query: string, page = 1): Promise<MovieResponse> {
    const response = await fetch(
      `${tmdb.baseUrl}/search/movie?api_key=${tmdb.apiKey}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    return response.json();
  },

  async getMovieDetails(id: number): Promise<MovieDetails> {
    const response = await fetch(
      `${tmdb.baseUrl}/movie/${id}?api_key=${tmdb.apiKey}&append_to_response=credits,similar`
    );
    return response.json();
  },

  async getPersonDetails(id: number): Promise<PersonDetails> {
    const response = await fetch(
      `${tmdb.baseUrl}/person/${id}?api_key=${tmdb.apiKey}&append_to_response=combined_credits`
    );
    return response.json();
  },

  async getPopularPeople(page = 1): Promise<{
    results: {
      id: number;
      name: string;
      profile_path: string | null;
      known_for_department: string;
      popularity: number;
    }[];
    total_pages: number;
    total_results: number;
  }> {
    const response = await fetch(
      `${tmdb.baseUrl}/person/popular?api_key=${tmdb.apiKey}&page=${page}`
    );
    return response.json();
  },
}; 