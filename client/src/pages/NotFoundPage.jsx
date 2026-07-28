import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h3" gutterBottom>404</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>The page you are looking for does not exist.</Typography>
      <Button component={Link} to="/dashboard" variant="contained">Go Home</Button>
    </Box>
  );
}
