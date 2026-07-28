import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, CircularProgress, Alert, Stack } from '@mui/material';
import api from '../services/api';

export default function HallsPage() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await api.get('/halls');
        setHalls(res.data.data);
      } catch (err) {
        setError('Unable to load halls');
      } finally {
        setLoading(false);
      }
    };
    fetchHalls();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Halls</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3}>
        {halls.map((hall) => (
          <Grid item xs={12} md={6} lg={4} key={hall._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{hall.hallName}</Typography>
                <Typography color="text.secondary">{hall.location}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{hall.description}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button variant="contained">Book</Button>
                  <Button variant="outlined">Details</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
