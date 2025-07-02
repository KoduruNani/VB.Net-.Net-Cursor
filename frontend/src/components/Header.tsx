import React from 'react';
import { AppBar, Toolbar, Box, Typography, Avatar } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#fff', color: '#222c36', boxShadow: 0 }}>
      <Toolbar sx={{ minHeight: 80, justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: '#222c36', color: '#fff', mr: 1 }}>
            <span role="img" aria-label="cap">🎓</span>
          </Avatar>
          <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: 1 }}>
            Student Management System
          </Typography>
        </Box>
        <Typography variant="h6" fontWeight={700}>
          - Siddharth Jain IIMCA-4
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 