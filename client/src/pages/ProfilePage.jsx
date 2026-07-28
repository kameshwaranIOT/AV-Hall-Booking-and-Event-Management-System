import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>My Profile</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography><strong>Name:</strong> {user?.name}</Typography>
        <Typography><strong>Email:</strong> {user?.email}</Typography>
        <Typography><strong>Role:</strong> {user?.role}</Typography>
      </Paper>
    </Box>
  );
}
