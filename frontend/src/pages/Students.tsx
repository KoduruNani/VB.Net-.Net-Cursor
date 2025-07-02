import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await StudentService.getAll();
    setStudents(data);
  };

  const handleOpen = (student?: Student) => {
    if (student) {
      setEditId(student.id);
      setForm({ ...student, dateOfBirth: student.dateOfBirth.split('T')[0], enrollmentDate: student.enrollmentDate.split('T')[0] });
    } else {
      setEditId(null);
      setForm(initialForm);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await StudentService.update(editId, form);
    } else {
      await StudentService.create(form);
    }
    fetchStudents();
    handleClose();
  };

  const handleDelete = async (id: number) => {
    await StudentService.remove(id);
    fetchStudents();
  };

  const filtered = students.filter(s =>
    s.firstName.toLowerCase().includes(search.toLowerCase()) ||
    s.lastName.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Student List</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()} className="form-button">Add Student</Button>
      </Stack>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Father Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone No</TableCell>
              <TableCell>Alt Mob No</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>YOA</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(student => (
              <TableRow key={student.id} className="table-row">
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.fatherName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
                <TableCell>{student.altMobNo}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.session}</TableCell>
                <TableCell>{student.yoa}</TableCell>
                <TableCell>{student.dateOfBirth}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(student)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(student.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="form-button">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" className="form-button">{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Students; 