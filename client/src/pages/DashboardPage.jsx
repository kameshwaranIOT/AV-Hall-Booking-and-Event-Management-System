import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BuildIcon from '@mui/icons-material/Build';
import ScheduleIcon from '@mui/icons-material/Schedule';
import api from '../services/api';

const localizer = momentLocalizer(moment);

const statusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'pending':
      return 'warning';
    case 'rejected':
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [halls, setHalls] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hallsRes, bookingsRes] = await Promise.all([api.get('/halls'), api.get('/bookings')]);
        setHalls(hallsRes.data.data);
        setBookings(bookingsRes.data.data);
      } catch (err) {
        setError('Unable to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;

  const today = moment().startOf('day');
  const upcomingBookings = bookings.filter((booking) => moment(booking.date).isSameOrAfter(today));
  const availableHalls = halls.filter((hall) => hall.status === 'available').length;
  const maintenanceHalls = halls.filter((hall) => hall.status === 'maintenance').length;
  const equipmentMap = halls.reduce((acc, hall) => {
    (hall.equipment || []).forEach((item) => {
      acc[item] = acc[item] ? acc[item] + 1 : 1;
    });
    return acc;
  }, {});
  const equipmentAlerts = maintenanceHalls + Object.keys(equipmentMap).length;

  const calendarEvents = bookings.map((booking) => {
    const date = moment(booking.date);
    const [startHour, startMinute] = booking.startTime.split(':').map(Number);
    const [endHour, endMinute] = booking.endTime.split(':').map(Number);
    return {
      id: booking._id,
      title: `${booking.eventName} (${booking.hall?.hallName || 'Hall'})`,
      start: date.clone().hour(startHour).minute(startMinute).toDate(),
      end: date.clone().hour(endHour).minute(endMinute).toDate(),
      status: booking.status
    };
  });

  const hallStatusItems = halls.slice(0, 4).map((hall) => ({
    title: hall.hallName,
    caption: hall.location,
    status: hall.status,
    equipment: hall.equipment?.length || 0
  }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <MeetingRoomIcon color="primary" />
                <Typography variant="subtitle1">Total Halls</Typography>
              </Stack>
              <Typography variant="h3">{halls.length}</Typography>
              <Typography color="text.secondary">Rooms available for scheduling</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <EventAvailableIcon color="primary" />
                <Typography variant="subtitle1">Upcoming Events</Typography>
              </Stack>
              <Typography variant="h3">{upcomingBookings.length}</Typography>
              <Typography color="text.secondary">Future bookings in the system</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <ScheduleIcon color="primary" />
                <Typography variant="subtitle1">Available Halls</Typography>
              </Stack>
              <Typography variant="h3">{availableHalls}</Typography>
              <Typography color="text.secondary">Halls ready for new reservations</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <BuildIcon color="primary" />
                <Typography variant="subtitle1">Equipment Alerts</Typography>
              </Stack>
              <Typography variant="h3">{equipmentAlerts}</Typography>
              <Typography color="text.secondary">Maintenance or inventory attention</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Schedule Calendar</Typography>
              <Chip label={`${upcomingBookings.length} upcoming`} color="primary" />
            </Stack>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.status === 'approved' ? '#4caf50' : event.status === 'pending' ? '#ffb300' : '#f44336',
                  color: '#fff'
                }
              })}
            />
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Quick Reservation Actions</Typography>
              <Button variant="contained" onClick={() => navigate('/bookings')}>Manage Bookings</Button>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button fullWidth variant="outlined" onClick={() => navigate('/bookings')}>
                  New Booking
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button fullWidth variant="outlined" onClick={() => navigate('/halls')}>
                  Manage Halls
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button fullWidth variant="outlined" onClick={() => navigate('/profile')}>
                  View Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>AV Equipment Status</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Track equipment readiness across halls and identify rooms that need service.
            </Typography>
            <List>
              {hallStatusItems.map((item) => (
                <React.Fragment key={item.title}>
                  <ListItem>
                    <ListItemIcon>
                      <MeetingRoomIcon color={item.status === 'maintenance' ? 'error' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      secondary={`${item.caption} • ${item.equipment} equipment items`}
                    />
                    <Chip label={item.status} color={item.status === 'maintenance' ? 'error' : 'success'} size="small" />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Management Tools</Typography>
            <Stack spacing={2}>
              <Button variant="contained" fullWidth onClick={() => navigate('/halls')}>
                Hall Inventory
              </Button>
              <Button variant="contained" fullWidth onClick={() => navigate('/bookings')}>
                Upcoming Bookings
              </Button>
              <Button variant="contained" fullWidth onClick={() => navigate('/admin')}>
                Admin Controls
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
