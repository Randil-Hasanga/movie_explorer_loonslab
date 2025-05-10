import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import { Favorite, FavoriteBorder, Star } from '@mui/icons-material';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  onToggleFavorite?: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite = false, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(movie.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            '& .movie-overlay': {
              opacity: 1,
            },
            '& .movie-poster': {
              transform: 'scale(1.05)',
            },
          },
        }}
        onClick={handleClick}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="400"
            image={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="movie-poster"
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.5s ease-in-out',
            }}
          />
          <Box
            className="movie-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 3,
            }}
          >
            <Typography
              variant="body2"
              color="white"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.6,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {movie.overview}
            </Typography>
          </Box>
          {onToggleFavorite && (
            <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
              <IconButton
                onClick={handleToggleFavorite}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {isFavorite ? (
                  <Favorite sx={{ color: '#ff4081' }} />
                ) : (
                  <FavoriteBorder sx={{ color: '#ff4081' }} />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 3, background: 'rgba(0,0,0,0.4)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                lineHeight: 1.2,
                flex: 1,
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {movie.title}
            </Typography>
            <Chip
              label={new Date(movie.release_date).getFullYear()}
              size="small"
              sx={{
                flexShrink: 0,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: 500,
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              readOnly
              icon={<Star sx={{ color: '#ffd700' }} />}
              emptyIcon={<Star sx={{ color: 'rgba(255,255,255,0.3)' }} />}
            />
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                ml: 1,
                fontWeight: 500,
              }}
            >
              {movie.vote_average.toFixed(1)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                ml: 0.5,
              }}
            >
              ({movie.vote_count.toLocaleString()} votes)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MovieCard; 