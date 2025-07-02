import React from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const loginImage = 'https://undraw.co/api/illustrations/undraw_secure_login_pdn4.svg';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add login logic here
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" bgcolor="#f5f6fa">
        <Card sx={{ maxWidth: 400, width: '100%', p: 2, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="180"
            image={loginImage}
            alt="Login Illustration"
            sx={{ objectFit: 'contain', mb: 2 }}
          />
          <CardContent>
            <Typography variant="h5" align="center" fontWeight={700} gutterBottom>Login</Typography>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextField label="Email" margin="normal" required fullWidth />
              <TextField label="Password" type="password" margin="normal" required fullWidth />
              <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}>Login</Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login; 