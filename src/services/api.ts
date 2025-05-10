import axios from 'axios';
import { Movie, MovieDetails, MovieSearchResponse } from '../types/movie';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const searchMovies = async (searchParams: string, page = 1): Promise<MovieSearchResponse> => {
  try {
    const params = new URLSearchParams(searchParams);
    const query = params.get('query') || '';
    const year = params.get('year');
    const rating = params.get('rating');

    // If we have filters but no search query, use the discover endpoint
    if (!query && (year || rating)) {
      const response = await api.get('/discover/movie', {
        params: {
          page,
          primary_release_year: year,
          'vote_average.gte': rating ? parseFloat(rating) : undefined,
          sort_by: 'popularity.desc', // Sort by popularity when using filters
        },
      });
      return response.data;
    }

    // Otherwise, use the search endpoint
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
        primary_release_year: year,
        'vote_average.gte': rating ? parseFloat(rating) : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getTrendingMovies = async (page = 1): Promise<MovieSearchResponse> => {
  try {
    const response = await api.get('/trending/movie/week', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos,similar',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getMovieGenres = async () => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};

export default api; 