import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, useTheme } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { getMovieDetails } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import { Movie } from '../types/movie';

const Favorites: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { favorites, toggleFavorite } = useMovieContext();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const moviePromises = favorites.map(id => getMovieDetails(id));
        const movies = await Promise.all(moviePromises);
        setFavoriteMovies(movies);
      } catch (err) {
        setError('Failed to load favorite movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [favorites]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: isDarkMode ? '#fff' : '#0f172a',
          textAlign: 'center',
        }}
      >
        My Favorite Movies
      </Typography>

      {favoriteMovies.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '40vh',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            }}
          >
            No favorite movies yet. Start adding some!
          </Typography>
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
          {favoriteMovies.map((movie) => (
            <Box key={movie.id}>
              <MovieCard
                movie={movie}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Favorites; 