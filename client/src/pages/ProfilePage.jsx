import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const apiOrigin = 'http://localhost:5000';

const getRoleLabel = (role) => {
  const roleMap = {
    admin: 'Admin',
    organizer: 'Organizer',
    faculty: 'Faculty/Staff',
    student: 'Student',
    viewer: 'Viewer',
    user: 'Student',
  };

  return roleMap[role] || 'Student';
};

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('profileImage', file);
      const response = await api.put('/auth/profile/photo', formData);
      updateUser(response.data.data);
    } catch (uploadError) {
      setError(uploadError.response?.data?.message || 'Unable to upload profile photo.');
    } finally {
      setUploading(false);
    }
  };

  const imageUrl = user?.profileImage ? `${apiOrigin}${user.profileImage}` : undefined;

  const profile = {
    fullName: user?.name || 'Kameshwaran K',
    email: user?.email || 'kameshwaran@example.com',
    phone: user?.phone || '+91 98765 43210',
    gender: user?.gender || 'Male',
    dob: user?.dob || '10 January 2002',
    department: user?.department || 'CSE - IoT',
    designation: user?.designation || getRoleLabel(user?.role),
    employeeId: user?.employeeId || 'AVH00125',
    organization: user?.organization || 'AV Hall Booking System',
    batch: user?.batch || '2026 Batch',
    username: user?.username || (user?.email ? user.email.split('@')[0] : 'kameshwaran'),
    accountRole: getRoleLabel(user?.role),
    status: 'Active',
    joined: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'September 2026',
    lastLogin: 'Today, 9:45 AM',
  };

  const bookingStats = [
    { label: 'Total Bookings', value: 12 },
    { label: 'Upcoming', value: 2 },
    { label: 'Completed', value: 8 },
    { label: 'Cancelled', value: 2 },
  ];

  const upcomingEvents = [
    { title: 'Tech Fest 2026', date: '12 Sep 2026', status: 'Confirmed' },
    { title: 'Innovation Expo', date: '20 Sep 2026', status: 'Pending' },
    { title: 'Cultural Night', date: '28 Sep 2026', status: 'Confirmed' },
  ];

  const myBookings = [
    { event: 'Tech Symposium', hall: 'Main AV Hall', date: '20 Sep', time: '10 AM–1 PM', status: 'Confirmed' },
    { event: 'Project Expo', hall: 'Seminar Hall', date: '25 Sep', time: '9 AM–4 PM', status: 'Pending' },
  ];

  const myEvents = [
    { title: 'Startup Pitch Day', venue: 'Innovation Centre', date: '18 Sep 2026', participants: 120, status: 'Approved' },
    { title: 'Cultural Fest', venue: 'Open Stage', date: '30 Sep 2026', participants: 240, status: 'Draft' },
  ];

  const accountDetails = [
    ['User ID', profile.employeeId],
    ['Role', profile.accountRole],
    ['Status', profile.status],
    ['Date Joined', profile.joined],
    ['Last Login', profile.lastLogin],
  ];

  const accountActions = [
    'Change Password',
    'Notification Preferences',
    'Login Activity',
    'Logout',
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>My Profile</Typography>

      <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, mb: 3, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <Avatar src={imageUrl} alt={profile.fullName} sx={{ width: 96, height: 96, fontSize: 32, bgcolor: 'primary.main' }}>
              {profile.fullName.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{profile.fullName}</Typography>
              <Typography variant="subtitle1" color="text.secondary">{profile.designation} / Event Organizer</Typography>
              <Typography variant="subtitle2" color="text.secondary">{profile.department}</Typography>
            </Box>
          </Box>

          <Button variant="contained" size="large" sx={{ px: 3, py: 1.2, borderRadius: 2 }}>
            Edit Profile
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Typography variant="body1" color="text.secondary">Profile photo</Typography>
          <Button variant="outlined" component="label" disabled={uploading} sx={{ borderRadius: 2 }}>
            {uploading ? <CircularProgress size={18} /> : 'Choose photo'}
            <input hidden type="file" accept="image/*" onChange={handlePhotoChange} />
          </Button>
          <Typography variant="body2" color="text.secondary">Images up to 2 MB</Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Personal Information</Typography>
            <Grid container spacing={2}>
              {[
                ['Full Name', profile.fullName],
                ['Email Address', profile.email],
                ['Phone Number', profile.phone],
                ['Gender', profile.gender],
                ['Date of Birth', profile.dob],
                ['Department', profile.department],
                ['Designation', profile.designation],
                ['Organization / College', profile.organization],
                ['Year / Batch', profile.batch],
              ].map(([label, value]) => (
                <Grid item xs={12} sm={6} key={label}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>{label}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Account Information</Typography>
            <Stack spacing={1.5}>
              {accountDetails.map(([label, value]) => (
                <Box key={label}>
                  <Typography variant="caption" color="text.secondary">{label}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{value}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Booking Statistics</Typography>
            <Grid container spacing={2}>
              {bookingStats.map((stat) => (
                <Grid item xs={6} sm={3} key={stat.label}>
                  <Card variant="outlined" sx={{ height: '100%', borderRadius: 2, bgcolor: 'grey.50' }}>
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Upcoming Events</Typography>
              <Chip label="Live" color="primary" size="small" />
            </Box>
            <List disablePadding>
              {upcomingEvents.map((event) => (
                <React.Fragment key={event.title}>
                  <ListItem disableGutters sx={{ py: 1.5 }}>
                    <ListItemText
                      primary={event.title}
                      secondary={event.date}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                    <Chip label={event.status} size="small" color={event.status === 'Confirmed' ? 'success' : 'warning'} />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>My Bookings</Typography>
            <Stack spacing={2}>
              {myBookings.map((booking) => (
                <Box key={booking.event} sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, gap: 2, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{booking.event}</Typography>
                    <Chip
                      label={booking.status}
                      size="small"
                      color={booking.status === 'Confirmed' ? 'success' : 'warning'}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">{booking.hall}</Typography>
                  <Typography variant="body2" color="text.secondary">{booking.date} • {booking.time}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>My Events</Typography>
            <Stack spacing={2}>
              {myEvents.map((event) => (
                <Box key={event.title} sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{event.title}</Typography>
                    <Chip label={event.status} size="small" color={event.status === 'Approved' ? 'success' : 'default'} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">Venue: {event.venue}</Typography>
                  <Typography variant="body2" color="text.secondary">Date: {event.date}</Typography>
                  <Typography variant="body2" color="text.secondary">Participants: {event.participants}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Account Settings</Typography>
            <Grid container spacing={2}>
              {accountActions.map((action) => (
                <Grid item xs={12} sm={6} md={3} key={action}>
                  <Button variant="outlined" fullWidth sx={{ justifyContent: 'center', py: 1.5, borderRadius: 2 }}>
                    {action}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
