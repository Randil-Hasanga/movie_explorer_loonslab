import axios from 'axios';
import { Movie, MovieDetails, MovieSearchResponse } from '../types/movie';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const searchMovies = async (query: string, page: number = 1): Promise<MovieSearchResponse> => {
  const response = await api.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const getTrendingMovies = async (page: number = 1): Promise<MovieSearchResponse> => {
  const response = await api.get('/trending/movie/week', {
    params: {
      page,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'videos,credits',
    },
  });
  return response.data;
};

export const getMovieGenres = async () => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};

export default api; 