import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import StudentService, { Student } from '../services/StudentService';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const degreeList = ['BCA', 'MCA', 'IIMCA'];
const yearList = [1, 2, 3, 4, 5];

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    StudentService.getAll().then(setStudents);
  }, []);

  const maleCount = students.filter(s => s.gender === 'Male').length;
  const femaleCount = students.filter(s => s.gender === 'Female').length;

  const degreeCounts = degreeList.map(degree => ({
    degree,
    count: students.filter(s => s.course === degree).length,
  }));

  const yearCounts = yearList.map(year => ({
    year,
    count: students.filter(s => s.yoa === year).length,
  }));

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2} fontWeight={700}>DASHBOARD</Typography>
      <Grid container spacing={2}>
        {/* Gender Wise */}
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>Gender Wise</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: '#90caf9', mr: 1 }}><MaleIcon /></Avatar>
                    <Box>
                      <Typography variant="body2">Male Students</Typography>
                      <Typography variant="h5">{maleCount}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: '#f48fb1', mr: 1 }}><FemaleIcon /></Avatar>
                    <Box>
                      <Typography variant="body2">Female Students</Typography>
                      <Typography variant="h5">{femaleCount}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* Degree Wise */}
        <Grid item xs={12} sm={8} md={8}>
          <Card sx={{ bgcolor: '#ede7f6' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>Degree Wise</Typography>
              <Grid container spacing={2}>
                {degreeCounts.map(d => (
                  <Grid item xs={4} key={d.degree}>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: '#b39ddb', mr: 1 }}><SchoolIcon /></Avatar>
                      <Box>
                        <Typography variant="body2">{d.degree} Students</Typography>
                        <Typography variant="h5">{d.count}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* Year Wise */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: '#fffde7' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>Year Wise</Typography>
              <Grid container spacing={2}>
                {yearCounts.map(y => (
                  <Grid item xs={2} key={y.year}>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: '#ffe082', mr: 1 }}><CalendarTodayIcon /></Avatar>
                      <Box>
                        <Typography variant="body2">{y.year} Year Students</Typography>
                        <Typography variant="h5">{y.count}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 