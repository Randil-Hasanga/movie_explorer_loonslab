import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Rating,
  Chip,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';
import { getMovieDetails, getImageUrl } from '../services/api';
import { MovieDetails as MovieDetailsType } from '../types/movie';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(Number(id));
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(Number(id));
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((favId: number) => favId !== Number(id))
      : [...favorites, Number(id)];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error">{error || 'Movie not found'}</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  const trailer = movie.videos.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 2fr',
          },
          gap: 4,
        }}
      >
        <Box>
          <Paper
            sx={{
              height: '100%',
              backgroundImage: `url(${getImageUrl(movie.poster_path, 'original')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: 500,
            }}
          />
        </Box>

        <Box>
          <Box sx={{ mb: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" component="h1" gutterBottom>
                {movie.title}
              </Typography>
              <IconButton onClick={handleToggleFavorite} color="primary">
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {new Date(movie.release_date).getFullYear()} • {movie.runtime} min
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({movie.vote_average.toFixed(1)})
              </Typography>
            </Box>
            <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
              {movie.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} />
              ))}
            </Box>
            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>
            {trailer && (
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </Button>
            )}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Cast
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(6, 1fr)',
                },
                gap: 2,
              }}
            >
              {movie.credits.cast.slice(0, 6).map((actor) => (
                <Box key={actor.id}>
                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                    <Typography variant="body2" noWrap>
                      {actor.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {actor.character}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails; 