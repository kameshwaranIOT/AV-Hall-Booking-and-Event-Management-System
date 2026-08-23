import React, { useState } from 'react';
import { Alert, Avatar, Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const apiOrigin = 'http://localhost:5000';

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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>My Profile</Typography>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar src={imageUrl} alt={user?.name} sx={{ width: 88, height: 88 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6">Profile photo</Typography>
            <Button variant="outlined" component="label" disabled={uploading}>
              {uploading ? <CircularProgress size={20} /> : 'Choose photo'}
              <input hidden type="file" accept="image/*" onChange={handlePhotoChange} />
            </Button>
            <Typography variant="body2" color="text.secondary">Images up to 2 MB</Typography>
          </Box>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Typography><strong>Name:</strong> {user?.name}</Typography>
        <Typography><strong>Email:</strong> {user?.email}</Typography>
        <Typography><strong>Role:</strong> {user?.role}</Typography>
      </Paper>
    </Box>
  );
}
