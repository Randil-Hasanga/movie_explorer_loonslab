import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const GlassContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '400px',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    : '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
}));

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)'
    : 'linear-gradient(45deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '200%',
    height: '200%',
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)'
      : 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 60%)',
    animation: 'pulse 15s infinite',
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.3)'
        : 'rgba(0, 0, 0, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.5)'
        : theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(0, 0, 0, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: theme.palette.mode === 'dark'
      ? 'white'
      : 'rgba(0, 0, 0, 0.87)',
  },
}));

const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username === 'demo' && formData.password === 'demo123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <GradientBackground>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="sm">
          <GlassContainer>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Typography
                variant="h4"
                component="h1"
                align="center"
                gutterBottom
                sx={{
                  color: theme.palette.mode === 'dark'
                    ? 'white'
                    : 'rgba(0, 0, 0, 0.87)',
                  fontWeight: 600,
                  mb: 4,
                  textShadow: theme.palette.mode === 'dark'
                    ? '0 2px 4px rgba(0,0,0,0.2)'
                    : '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Welcome to Movie Explorer
              </Typography>
              <form onSubmit={handleSubmit}>
                <StyledTextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{
                          color: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.7)'
                            : 'rgba(0, 0, 0, 0.7)'
                        }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{
                          color: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.7)'
                            : 'rgba(0, 0, 0, 0.7)'
                        }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : 'rgba(0, 0, 0, 0.7)'
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && (
                  <Typography
                    color="error"
                    align="center"
                    sx={{
                      mt: 2,
                      color: '#ff6b6b',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 4,
                    mb: 2,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                      : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                    borderRadius: '12px',
                    height: '48px',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 4px 20px rgba(33, 150, 243, 0.3)'
                      : '0 4px 20px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)'
                        : 'linear-gradient(45deg, #1565C0 30%, #1976D2 90%)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 6px 25px rgba(33, 150, 243, 0.4)'
                        : '0 6px 25px rgba(25, 118, 210, 0.4)',
                    },
                  }}
                >
                  Login
                </Button>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    color: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'rgba(0, 0, 0, 0.7)',
                    mt: 2,
                    fontSize: '0.9rem',
                  }}
                >
                </Typography>
              </form>
            </motion.div>
          </GlassContainer>
        </Container>
      </motion.div>
    </GradientBackground>
  );
};

export default Login; 