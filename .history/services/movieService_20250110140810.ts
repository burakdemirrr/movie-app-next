import { MovieResponse, MovieDetails, tmdb } from '@/lib/tmdb';

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
}; 