import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, TextField, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = React.useState('');

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.data.token, res.data.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f7fb' }}>
      <Card sx={{ width: 420, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Login</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth label="Email" margin="normal" {...register('email', { required: true })} error={Boolean(errors.email)} />
            <TextField fullWidth label="Password" type="password" margin="normal" {...register('password', { required: true })} error={Boolean(errors.password)} />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">Login</Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>No account? <Link to="/register">Register</Link></Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
