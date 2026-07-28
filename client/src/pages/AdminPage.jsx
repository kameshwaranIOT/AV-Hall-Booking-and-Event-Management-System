import React from 'react';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

export default function AdminPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          <ListItem><ListItemText primary="Approve or reject bookings" /></ListItem>
          <ListItem><ListItemText primary="Manage halls and events" /></ListItem>
          <ListItem><ListItemText primary="View analytics and reports" /></ListItem>
        </List>
      </Paper>
    </div>
  );
}
