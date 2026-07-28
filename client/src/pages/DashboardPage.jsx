import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Stack, Chip, CircularProgress, Alert } from '@mui/material';
import api from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hallsRes, bookingsRes] = await Promise.all([api.get('/halls'), api.get('/bookings')]);
        setStats({ halls: hallsRes.data.data.length, bookings: bookingsRes.data.data.length });
      } catch (err) {
        setError('Unable to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}><Card><CardContent><Typography variant="h6">Total Halls</Typography><Typography variant="h3">{stats?.halls ?? 0}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} md={4}><Card><CardContent><Typography variant="h6">Total Bookings</Typography><Typography variant="h3">{stats?.bookings ?? 0}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} md={4}><Card><CardContent><Typography variant="h6">Status</Typography><Chip label="Operational" color="success" /></CardContent></Card></Grid>
      </Grid>
    </div>
  );
}
