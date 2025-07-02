import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
    <Typography variant="h3" gutterBottom>Welcome to Student Management System</Typography>
    <Box mt={2}>
      <Button component={Link} to="/login" variant="contained" color="primary" sx={{ mr: 2 }}>Login</Button>
      <Button component={Link} to="/register" variant="outlined" color="primary">Register</Button>
    </Box>
  </Box>
);

export default LandingPage; 