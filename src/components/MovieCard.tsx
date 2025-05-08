import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(movie.id);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out',
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="400"
        image={getImageUrl(movie.poster_path)}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(movie.release_date).getFullYear()}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Rating
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({movie.vote_average.toFixed(1)})
          </Typography>
        </Box>
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          {isFavorite ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder color="error" />
          )}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default MovieCard; 