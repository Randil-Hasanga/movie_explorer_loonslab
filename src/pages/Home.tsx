import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { searchMovies, getTrendingMovies } from '../services/api';
import { Movie } from '../types/movie';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const loadTrendingMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTrendingMovies();
      setMovies(response.results);
    } catch (err) {
      setError('Failed to load trending movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchMovies(query);
      setMovies(response.results);
    } catch (err) {
      setError('Failed to search movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (movieId: number) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <Box>
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {movies.map((movie) => (
            <Box key={movie.id}>
              <MovieCard
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            </Box>
          ))}
        </Box>
      )}

      {!loading && movies.length === 0 && (
        <Typography variant="h6" align="center" color="text.secondary">
          No movies found. Try a different search term.
        </Typography>
      )}
    </Box>
  );
};

export default Home; 