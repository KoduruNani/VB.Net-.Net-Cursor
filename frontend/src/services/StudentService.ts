import axios from 'axios';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  fatherName: string;
  email: string;
  phoneNumber: string;
  altMobNo?: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  course: string;
  session: string;
  yoa: number;
  enrollmentDate: string;
}

const API_URL = 'http://localhost:5291/api/Students';

const getAll = async (): Promise<Student[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

const create = async (student: Omit<Student, 'id'>) => {
  await axios.post(API_URL, student);
};

const update = async (id: number, student: Omit<Student, 'id'>) => {
  await axios.put(`${API_URL}/${id}`, { id, ...student });
};

const remove = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

const StudentService = { getAll, create, update, remove };
export default StudentService; 