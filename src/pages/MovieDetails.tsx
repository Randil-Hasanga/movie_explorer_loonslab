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
  Container,
  Card,
  CardMedia,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  PlayArrow as PlayArrowIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { getMovieDetails, getImageUrl } from '../services/api';
import { MovieDetails as MovieDetailsType } from '../types/movie';
import { useMovieContext } from '../context/MovieContext';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useMovieContext();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const isFavorite = favorites.includes(Number(id));

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
            md: '300px 1fr',
          },
          gap: 4,
        }}
      >
        {/* Movie Poster */}
        <Card
          sx={{
            height: 'fit-content',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {!imageError ? (
            <CardMedia
              component="img"
              image={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              sx={{
                width: '100%',
                height: 'auto',
                aspectRatio: '2/3',
                objectFit: 'cover',
              }}
              onError={() => setImageError(true)}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                aspectRatio: '2/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.200',
              }}
            >
              <ImageIcon sx={{ fontSize: 60, color: 'grey.400' }} />
            </Box>
          )}
        </Card>

        {/* Movie Details */}
        <Box>
          <Box sx={{ mb: 4 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                {movie.title}
              </Typography>
              <IconButton
                onClick={() => toggleFavorite(Number(id))}
                color="primary"
                size="large"
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>

            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography variant="subtitle1" color="text.secondary">
                {new Date(movie.release_date).getFullYear()}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {movie.runtime} min
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({movie.vote_average.toFixed(1)})
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    }
                  }}
                />
              ))}
            </Box>

            <Typography variant="body1" paragraph sx={{ mb: 3, lineHeight: 1.7 }}>
              {movie.overview}
            </Typography>

            {trailer && (
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrowIcon />}
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mb: 4 }}
              >
                Watch Trailer
              </Button>
            )}
          </Box>

          {/* Cast Section */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
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
                <Card key={actor.id} sx={{ p: 1.5 }}>
                  <Typography variant="body2" noWrap sx={{ fontWeight: 'medium' }}>
                    {actor.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {actor.character}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default MovieDetails; 