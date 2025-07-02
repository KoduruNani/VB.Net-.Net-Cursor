import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Avatar, Divider, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DescriptionIcon from '@mui/icons-material/Description';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import ProjectReport from './pages/ProjectReport';
import ViewStudents from './pages/ViewStudents';
import InsertStudent from './pages/InsertStudent';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'View', icon: <TableRowsIcon />, path: '/students' },
  { text: 'Insert', icon: <AddBoxIcon />, path: '/insert' },
  { text: 'Project Report', icon: <DescriptionIcon />, path: '/report' },
];

function Sidebar() {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#222c36', color: '#fff' },
      }}
    >
      <Toolbar sx={{ minHeight: 80 }}>
        <Box display="flex" alignItems="center" width="100%">
          <Avatar sx={{ bgcolor: '#fff', color: '#222c36', mr: 1 }}>
            <span role="img" aria-label="cap">🎓</span>
          </Avatar>
          <Typography variant="h6" fontWeight={700} color="#fff">
            System
          </Typography>
        </Box>
      </Toolbar>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2} mb={2}>
        <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: '#90caf9' }}>
          <span role="img" aria-label="avatar">🧑‍🎓</span>
        </Avatar>
      </Box>
      <Divider sx={{ bgcolor: '#444' }} />
      <List>
        {menuItems.map((item, idx) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                color: location.pathname === item.path ? '#fff' : '#fff',
                bgcolor: location.pathname === item.path ? '#1976d2' : 'inherit',
                '&:hover': { bgcolor: '#1565c0', color: '#fff' },
                mb: 1,
                borderRadius: 2,
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box flexGrow={1} />
      <Box p={2}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<ExitToAppIcon />}
          sx={{ color: '#fff', borderColor: '#fff', '&:hover': { bgcolor: '#e57373', borderColor: '#fff' } }}
          onClick={() => window.location.href = '/'}
        >
          EXIT
        </Button>
      </Box>
    </Drawer>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <Sidebar />
              <Header />
              <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f6fa', p: 3, minHeight: '100vh', pb: 6 }}>
                <Toolbar sx={{ minHeight: 80 }} />
                <Outlet />
              </Box>
              <Footer />
            </Box>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<ViewStudents />} />
          <Route path="insert" element={<InsertStudent />} />
          <Route path="report" element={<ProjectReport />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
