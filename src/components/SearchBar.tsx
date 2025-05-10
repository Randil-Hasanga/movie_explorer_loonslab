import { useState, useEffect } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Fade,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  alpha,
  useTheme,
  Tooltip,
} from '@mui/material';
import { Search as SearchIcon, FilterList } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '', isLoading = false }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [query, setQuery] = useState(() => {
    if (initialQuery) {
      const params = new URLSearchParams(initialQuery);
      return params.get('query') || '';
    }
    return '';
  });
  const [year, setYear] = useState(() => {
    if (initialQuery) {
      const params = new URLSearchParams(initialQuery);
      return params.get('year') || '';
    }
    return '';
  });
  const [rating, setRating] = useState(() => {
    if (initialQuery) {
      const params = new URLSearchParams(initialQuery);
      return params.get('rating') || '';
    }
    return '';
  });
  const [showFilters, setShowFilters] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());
  const ratings = ['Any', '7+', '8+', '9+'];

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (query.trim()) {
      searchParams.append('query', query.trim());
    }
    if (year) searchParams.append('year', year);
    if (rating && rating !== 'Any') searchParams.append('rating', rating);
    onSearch(searchParams.toString());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Trigger search when year or rating changes
  useEffect(() => {
    handleSearch();
  }, [year, rating]);

  return (
    <Fade in timeout={1000}>
      <Box
        sx={{
          maxWidth: 800,
          mx: 'auto',
          px: { xs: 2, sm: 0 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '100%',
            background: isDarkMode
              ? 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)'
              : 'radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(20px)',
            zIndex: -1,
          },
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            flexDirection: { xs: 'column', sm: 'row' },
            position: 'relative',
          }}
        >
          <Paper
            elevation={0}
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              p: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              background: isDarkMode
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: isDarkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: isDarkMode
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                color: isDarkMode ? '#fff' : '#000',
                '& input': {
                  py: 1.5,
                  '&::placeholder': {
                    color: isDarkMode
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'rgba(0, 0, 0, 0.5)',
                    opacity: 1,
                  },
                },
              }}
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              inputProps={{
                'aria-label': 'search movies',
              }}
            />
            <Tooltip title="Toggle filters">
              <IconButton
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  p: '10px',
                  color: isDarkMode ? '#fff' : '#000',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: isDarkMode
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <FilterList />
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={handleSearch}
              sx={{
                p: '10px',
                color: isDarkMode ? '#fff' : '#000',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: isDarkMode
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.05)',
                  transform: 'scale(1.1)',
                },
              }}
              aria-label="search"
            >
              {isLoading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: isDarkMode ? '#fff' : '#000',
                  }}
                />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          </Paper>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <FormControl 
                  sx={{ 
                    minWidth: { xs: '100%', sm: 120 },
                    '& .MuiOutlinedInput-root': {
                      background: isDarkMode
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: isDarkMode
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      color: isDarkMode ? '#fff' : '#000',
                      '&:hover': {
                        background: isDarkMode
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(255, 255, 255, 0.9)',
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: isDarkMode
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(0, 0, 0, 0.5)',
                    },
                    '& .MuiSelect-icon': {
                      color: isDarkMode
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(0, 0, 0, 0.5)',
                    },
                  }}
                >
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={year}
                    label="Year"
                    onChange={(e) => setYear(e.target.value)}
                    size="small"
                    disabled={isLoading}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          background: isDarkMode
                            ? 'rgba(30, 41, 59, 0.95)'
                            : 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(10px)',
                          '& .MuiMenuItem-root': {
                            color: isDarkMode ? '#fff' : '#000',
                            '&:hover': {
                              background: isDarkMode
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.05)',
                            },
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="">Any</MenuItem>
                    {years.map((y) => (
                      <MenuItem key={y} value={y}>
                        {y}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl 
                  sx={{ 
                    minWidth: { xs: '100%', sm: 120 },
                    '& .MuiOutlinedInput-root': {
                      background: isDarkMode
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: isDarkMode
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      color: isDarkMode ? '#fff' : '#000',
                      '&:hover': {
                        background: isDarkMode
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(255, 255, 255, 0.9)',
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: isDarkMode
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(0, 0, 0, 0.5)',
                    },
                    '& .MuiSelect-icon': {
                      color: isDarkMode
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(0, 0, 0, 0.5)',
                    },
                  }}
                >
                  <InputLabel>Rating</InputLabel>
                  <Select
                    value={rating}
                    label="Rating"
                    onChange={(e) => setRating(e.target.value)}
                    size="small"
                    disabled={isLoading}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          background: isDarkMode
                            ? 'rgba(30, 41, 59, 0.95)'
                            : 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(10px)',
                          '& .MuiMenuItem-root': {
                            color: isDarkMode ? '#fff' : '#000',
                            '&:hover': {
                              background: isDarkMode
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.05)',
                            },
                          },
                        },
                      },
                    }}
                  >
                    {ratings.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Fade>
  );
};

export default SearchBar; 