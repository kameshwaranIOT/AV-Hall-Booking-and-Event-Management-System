import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, TextField, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import api from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = React.useState('');

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/register', data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f7fb' }}>
      <Card sx={{ width: 420, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Register</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth label="Name" margin="normal" {...register('name', { required: true })} error={Boolean(errors.name)} />
            <TextField fullWidth label="Email" margin="normal" {...register('email', { required: true })} error={Boolean(errors.email)} />
            <TextField fullWidth label="Department" margin="normal" {...register('department')} />
            <TextField fullWidth label="Phone" margin="normal" {...register('phone')} />
            <TextField fullWidth label="Password" type="password" margin="normal" {...register('password', { required: true, minLength: 6 })} error={Boolean(errors.password)} />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">Register</Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>Already have an account? <Link to="/login">Login</Link></Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
