const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const tmdb = {
  apiKey: API_KEY,
  baseUrl: BASE_URL,
  imageBaseUrl: IMAGE_BASE_URL,
  posterSize: {
    small: `${IMAGE_BASE_URL}/w185`,
    medium: `${IMAGE_BASE_URL}/w342`,
    large: `${IMAGE_BASE_URL}/w500`,
    original: `${IMAGE_BASE_URL}/original`,
  },
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
};

export type MovieResponse = {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}; 