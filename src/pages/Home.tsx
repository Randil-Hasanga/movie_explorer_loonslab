import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, CircularProgress, alpha, Button, useTheme } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { searchMovies, getTrendingMovies } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import { Movie } from '../types/movie';

const Home = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const {
    movies,
    setMovies,
    loading,
    setLoading,
    error,
    setError,
    lastSearch,
    setLastSearch,
    favorites,
    toggleFavorite,
  } = useMovieContext();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isTrending, setIsTrending] = useState(true);

  const loadTrendingMovies = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTrendingMovies(pageNum);
      if (pageNum === 1) {
        setMovies(response.results);
      } else {
        setMovies((prev: Movie[]) => [...prev, ...response.results]);
      }
      setHasMore(response.page < response.total_pages);
      setPage(response.page);
      setIsTrending(true);
    } catch (err) {
      setError('Failed to load trending movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [setMovies, setLoading, setError]);

  const handleLoadMore = useCallback(async () => {
    if (!isTrending) {
      await handleSearch(lastSearch, page + 1);
    } else {
      await loadTrendingMovies(page + 1);
    }
  }, [lastSearch, page, loadTrendingMovies, isTrending]);

  const handleSearch = useCallback(async (query: string, pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      setLastSearch(query);

      const params = new URLSearchParams(query);
      const searchQuery = params.get('query') || '';
      const year = params.get('year') || '';
      const rating = params.get('rating') || '';

      // If no search query and no filters, show trending movies
      if (!searchQuery && !year && !rating) {
        loadTrendingMovies(1);
        return;
      }

      // Otherwise, search all movies with the given filters
      const response = await searchMovies(query, pageNum);
      if (pageNum === 1) {
        setMovies(response.results);
      } else {
        setMovies((prev: Movie[]) => [...prev, ...response.results]);
      }
      setHasMore(response.page < response.total_pages);
      setPage(response.page);
      setIsTrending(false);
    } catch (err) {
      setError('Failed to search movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loadTrendingMovies, setMovies, setLoading, setError, setLastSearch]);

  useEffect(() => {
    if (lastSearch) {
      handleSearch(lastSearch);
    } else {
      loadTrendingMovies();
    }
  }, [loadTrendingMovies, handleSearch, lastSearch]);

  return (
    <Box
      sx={{
        borderRadius: '20px',
        minHeight: '100vh',
        background: isDarkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        pt: 8,
        pb: 4,
        position: 'relative',
        '&::before': {
          borderRadius: '20px',
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '1px',
              background: isDarkMode
                ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
            },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              background: isDarkMode
                ? 'linear-gradient(45deg, #fff 30%, #94a3b8 90%)'
                : 'linear-gradient(45deg, #0f172a 30%, #334155 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: isDarkMode
                ? '0 2px 10px rgba(255,255,255,0.1)'
                : '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            Movie Explorer
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: isDarkMode ? alpha('#fff', 0.7) : alpha('#0f172a', 0.7),
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Discover your next favorite film
          </Typography>
        </Box>

        <SearchBar onSearch={handleSearch} initialQuery={lastSearch} isLoading={loading} />

        {error && (
          <Typography
            color="error"
            sx={{
              textAlign: 'center',
              mt: 4,
              p: 2,
              backgroundColor: isDarkMode
                ? alpha('#ef4444', 0.1)
                : alpha('#ef4444', 0.05),
              borderRadius: 2,
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: isDarkMode
                ? alpha('#ef4444', 0.2)
                : alpha('#ef4444', 0.1),
            }}
          >
            {error}
          </Typography>
        )}

        {isTrending && (
          <Typography
            variant="h4"
            sx={{
              mt: 6,
              mb: 4,
              color: isDarkMode ? '#fff' : '#0f172a',
              fontWeight: 600,
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40%',
                height: '2px',
                background: isDarkMode
                  ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent)',
              },
            }}
          >
            Trending Movies
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
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
                  onToggleFavorite={toggleFavorite}
                />
              </Box>
            ))}
          </Box>

          {hasMore && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                mb: 4,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleLoadMore}
                disabled={loading}
                sx={{
                  color: isDarkMode ? '#fff' : '#0f172a',
                  borderColor: isDarkMode
                    ? alpha('#fff', 0.3)
                    : alpha('#0f172a', 0.2),
                  backgroundColor: isDarkMode
                    ? alpha('#fff', 0.1)
                    : alpha('#0f172a', 0.05),
                  backdropFilter: 'blur(10px)',
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode
                      ? alpha('#fff', 0.2)
                      : alpha('#0f172a', 0.1),
                    borderColor: isDarkMode
                      ? alpha('#fff', 0.5)
                      : alpha('#0f172a', 0.3),
                    transform: 'translateY(-2px)',
                    boxShadow: isDarkMode
                      ? '0 4px 20px rgba(255,255,255,0.1)'
                      : '0 4px 20px rgba(0,0,0,0.1)',
                  },
                  '&:disabled': {
                    borderColor: isDarkMode
                      ? alpha('#fff', 0.1)
                      : alpha('#0f172a', 0.1),
                    color: isDarkMode
                      ? alpha('#fff', 0.3)
                      : alpha('#0f172a', 0.3),
                  },
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: isDarkMode ? '#fff' : '#0f172a',
                    }}
                  />
                ) : (
                  'Load More'
                )}
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 