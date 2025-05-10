import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Button,
  useScrollTrigger,
  Slide,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme,
  ListItemButton,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Logout,
  Menu as MenuIcon,
  Home,
  Favorite,
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

interface LayoutProps {
  children: React.ReactNode;
}

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(18, 18, 18, 0.8)'
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid',
  borderColor: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)',
  boxShadow: 'none',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.7)'
    : 'rgba(0, 0, 0, 0.7)',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.05)',
  },
  '&.active': {
    color: theme.palette.primary.main,
    background: theme.palette.mode === 'dark'
      ? 'rgba(33, 150, 243, 0.1)'
      : 'rgba(33, 150, 243, 0.05)',
  },
}));

const GlassDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(18, 18, 18, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRight: '1px solid',
    borderColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    width: 240,
  },
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const trigger = useScrollTrigger();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const navItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Favorites', icon: <Favorite />, path: '/favorites' },
  ];

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => setDrawerOpen(false)}
            sx={{
              '&.Mui-selected': {
                background: muiTheme.palette.mode === 'dark'
                  ? 'rgba(33, 150, 243, 0.1)'
                  : 'rgba(33, 150, 243, 0.05)',
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
                '& .MuiListItemText-primary': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon sx={{
              color: muiTheme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(0, 0, 0, 0.7)'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Slide appear={false} direction="down" in={!trigger}>
        <GlassAppBar position="fixed">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: muiTheme.palette.mode === 'dark' ? 'inherit' : 'rgba(0, 0, 0, 0.87)',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              Movie Explorer
            </Typography>
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    startIcon={item.icon}
                    sx={{
                      color: muiTheme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(0, 0, 0, 0.7)',
                      '&:hover': {
                        background: muiTheme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.05)',
                      },
                      '&.active': {
                        color: 'primary.main',
                        background: muiTheme.palette.mode === 'dark'
                          ? 'rgba(33, 150, 243, 0.1)'
                          : 'rgba(33, 150, 243, 0.05)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
            <IconButton
              onClick={toggleTheme}
              sx={{
                mr: 1,
                color: muiTheme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'rgba(0, 0, 0, 0.7)',
                '&:hover': {
                  background: muiTheme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.05)',
                  color: muiTheme.palette.mode === 'dark'
                    ? '#ffffff'
                    : '#000000',
                },
              }}
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button
              color="inherit"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  background: muiTheme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </GlassAppBar>
      </Slide>
      <Toolbar /> {/* Spacer for fixed AppBar */}
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          background: muiTheme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(18,18,18,0) 0%, rgba(18,18,18,0.8) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)',
        }}
      >
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          background: muiTheme.palette.mode === 'dark'
            ? 'rgba(18, 18, 18, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid',
          borderColor: muiTheme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: muiTheme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(0, 0, 0, 0.7)'
            }}
          >
            © {new Date().getFullYear()} Movie Explorer. All rights reserved.
          </Typography>
        </Container>
      </Box>
      <GlassDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </GlassDrawer>
    </Box>
  );
};

export default Layout; 