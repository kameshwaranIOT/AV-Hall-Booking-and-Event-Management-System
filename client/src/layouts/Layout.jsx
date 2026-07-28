import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Drawer, List, ListItemButton, ListItemText, Toolbar, Typography, Container, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>AV Hall Booking</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', mt: 8 } }}>
        <List>
          <ListItemButton component={Link} to="/dashboard"><ListItemText primary="Dashboard" /></ListItemButton>
          <ListItemButton component={Link} to="/halls"><ListItemText primary="Halls" /></ListItemButton>
          <ListItemButton component={Link} to="/bookings"><ListItemText primary="Bookings" /></ListItemButton>
          <ListItemButton component={Link} to="/profile"><ListItemText primary="Profile" /></ListItemButton>
          {user?.role === 'admin' && <ListItemButton component={Link} to="/admin"><ListItemText primary="Admin" /></ListItemButton>}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
