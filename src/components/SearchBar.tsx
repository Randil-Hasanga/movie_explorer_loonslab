import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputProps={{ 'aria-label': 'search movies' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar; 