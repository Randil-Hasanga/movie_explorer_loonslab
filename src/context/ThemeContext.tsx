import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#1976d2' : '#1976d2',
        light: isDarkMode ? '#42a5f5' : '#42a5f5',
        dark: isDarkMode ? '#1565c0' : '#1565c0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: isDarkMode ? '#dc004e' : '#dc004e',
        light: isDarkMode ? '#ff4081' : '#ff4081',
        dark: isDarkMode ? '#c51162' : '#c51162',
        contrastText: '#ffffff',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f8f9fa',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#2c3e50',
        secondary: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#546e7a',
      },
      divider: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
        color: isDarkMode ? '#ffffff' : '#2c3e50',
      },
      h2: {
        fontWeight: 600,
        color: isDarkMode ? '#ffffff' : '#2c3e50',
      },
      h3: {
        fontWeight: 600,
        color: isDarkMode ? '#ffffff' : '#2c3e50',
      },
      h4: {
        fontWeight: 600,
        color: isDarkMode ? '#ffffff' : '#2c3e50',
      },
      h5: {
        fontWeight: 600,
        color: isDarkMode ? '#ffffff' : '#2c3e50',
      },
      h6: {
        fontWeight: 600,
        color: isDarkMode ? '#ffffff' : '#2c3e50',
      },
      body1: {
        color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#546e7a',
      },
      body2: {
        color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#78909c',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isDarkMode ? "#6b6b6b #2b2b2b" : "#6b6b6b #f5f5f5",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: isDarkMode ? "#2b2b2b" : "#f5f5f5",
              width: 8,
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: isDarkMode ? "#6b6b6b" : "#bdbdbd",
              minHeight: 24,
              border: isDarkMode ? "3px solid #2b2b2b" : "3px solid #f5f5f5",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
              backgroundColor: isDarkMode ? "#959595" : "#9e9e9e",
            },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
              backgroundColor: isDarkMode ? "#959595" : "#9e9e9e",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
              backgroundColor: isDarkMode ? "#959595" : "#9e9e9e",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            padding: '8px 16px',
            boxShadow: isDarkMode
              ? '0 2px 4px rgba(0,0,0,0.2)'
              : '0 2px 4px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: isDarkMode
                ? '0 4px 8px rgba(0,0,0,0.3)'
                : '0 4px 8px rgba(0,0,0,0.15)',
            },
          },
          contained: {
            background: isDarkMode
              ? 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
            color: '#ffffff',
            '&:hover': {
              background: isDarkMode
                ? 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                : 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
            },
          },
          outlined: {
            borderColor: isDarkMode ? '#2196f3' : '#1976d2',
            color: isDarkMode ? '#2196f3' : '#1976d2',
            '&:hover': {
              borderColor: isDarkMode ? '#1976d2' : '#1565c0',
              backgroundColor: isDarkMode ? 'rgba(33, 150, 243, 0.08)' : 'rgba(25, 118, 210, 0.08)',
            },
          },
          text: {
            color: isDarkMode ? '#2196f3' : '#1976d2',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(33, 150, 243, 0.08)' : 'rgba(25, 118, 210, 0.08)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDarkMode
              ? '0 4px 20px rgba(0,0,0,0.3)'
              : '0 4px 20px rgba(0,0,0,0.1)',
            background: isDarkMode
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: isDarkMode
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: 16,
            boxShadow: isDarkMode
              ? '0 4px 20px rgba(0,0,0,0.3)'
              : '0 4px 20px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDarkMode
              ? 'rgba(18, 18, 18, 0.8)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid',
            borderColor: isDarkMode
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 