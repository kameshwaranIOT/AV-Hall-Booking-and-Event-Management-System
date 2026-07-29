import React, { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  MenuItem,
  Grid,
  Stack,
  Box
} from '@mui/material';
import api from '../services/api';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ hall: '', eventName: '', date: '', startTime: '', endTime: '', expectedParticipants: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, hallsRes] = await Promise.all([api.get('/bookings'), api.get('/halls')]);
        setBookings(bookingsRes.data.data);
        setHalls(hallsRes.data.data);
      } catch (err) {
        setError('Unable to load bookings or halls');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const refreshBookings = async () => {
    try {
      const res = await api.get('/bookings');
      setBookings(res.data.data);
    } catch (err) {
      setError('Unable to refresh bookings');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.hall || !form.eventName || !form.date || !form.startTime || !form.endTime || !form.expectedParticipants) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await api.post('/bookings', form);
      setSuccess('Booking submitted successfully.');
      setForm({ hall: '', eventName: '', date: '', startTime: '', endTime: '', expectedParticipants: '' });
      refreshBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create booking');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Bookings</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Add a Booking</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Hall"
                name="hall"
                value={form.hall}
                onChange={handleChange}
                fullWidth
              >
                {halls.map((hall) => (
                  <MenuItem key={hall._id} value={hall._id}>
                    {hall.hallName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Event Name"
                name="eventName"
                value={form.eventName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Start Time"
                name="startTime"
                type="time"
                value={form.startTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="End Time"
                name="endTime"
                type="time"
                value={form.endTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Expected Participants"
                name="expectedParticipants"
                type="number"
                inputProps={{ min: 1 }}
                value={form.expectedParticipants}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
                <Button type="submit" variant="contained">Submit Booking</Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Hall</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.eventName}</TableCell>
                <TableCell>{booking.hall?.hallName || 'N/A'}</TableCell>
                <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                <TableCell>{booking.startTime}</TableCell>
                <TableCell>{booking.endTime}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
