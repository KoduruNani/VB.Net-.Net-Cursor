import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Stack, MenuItem, Paper } from '@mui/material';
import StudentService, { Student } from '../services/StudentService';

const initialForm: Omit<Student, 'id'> = {
  firstName: '',
  lastName: '',
  fatherName: '',
  email: '',
  phoneNumber: '',
  altMobNo: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  course: '',
  session: '',
  yoa: new Date().getFullYear(),
  enrollmentDate: '',
};

const InsertStudent: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await StudentService.create(form);
    setForm(initialForm);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>Insert Student</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required className="form-label" />
            <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required className="form-label" />
            <TextField label="Father Name" name="fatherName" value={form.fatherName} onChange={handleChange} required className="form-label" />
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} required className="form-label" />
            <TextField label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required className="form-label" />
            <TextField label="Alt Mob No" name="altMobNo" value={form.altMobNo} onChange={handleChange} className="form-label" />
            <TextField label="Date of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} required className="form-label" />
            <TextField label="Gender" name="gender" value={form.gender} onChange={handleChange} select required className="form-label">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
            <TextField label="Address" name="address" value={form.address} onChange={handleChange} required className="form-label" />
            <TextField label="Course" name="course" value={form.course} onChange={handleChange} required className="form-label" />
            <TextField label="Session" name="session" value={form.session} onChange={handleChange} required className="form-label" />
            <TextField label="YOA" name="yoa" type="number" value={form.yoa} onChange={handleChange} required className="form-label" />
            <TextField label="Enrollment Date" name="enrollmentDate" type="date" value={form.enrollmentDate} onChange={handleChange} InputLabelProps={{ shrink: true }} required className="form-label" />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button type="submit" variant="contained" className="form-button">Save</Button>
              <Button type="reset" variant="outlined" className="form-button" onClick={() => setForm(initialForm)}>Cancel</Button>
            </Stack>
            {success && <Typography color="success.main">Student added successfully!</Typography>}
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default InsertStudent; 