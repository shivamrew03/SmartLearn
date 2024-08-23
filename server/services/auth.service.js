import bcrypt from 'bcrypt';
import { findStudentByEmail, findTeacherByEmail, createStudent, createTeacher } from '../models/user.model.js';
import { generateToken } from '../utils/jwt.utils.js';

export const studentsignupService = async (name, email, password) => {
  const existingUser = await findStudentByEmail(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  console.log('Generated Hash during Signup:', password); 

  const user = await createStudent(name, email, password);
  const token = generateToken(user.id);

  return { user, token };
};

export const studentloginService = async (email, password) => {
  const user = await findStudentByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  console.log('Input Password:', password);
  console.log('Stored Hashed Password:', user.password);

  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log('Password Match:', passwordMatch); 

  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user.id);
  return { user, token };
};

export const teachersignupService = async (name, email, password) => {
  const existingUser = await findTeacherByEmail(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  console.log('Generated Hash during Signup:', password); 

  const user = await createTeacher(name, email, password);
  const token = generateToken(user.id);

  return { user, token };
};

export const teacherloginService = async (email, password) => {
  const user = await findTeacherByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  console.log('Input Password:', password);
  console.log('Stored Hashed Password:', user.password);

  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log('Password Match:', passwordMatch);

  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user.id);
  return { user, token };
};

export const testPasswordFlow = async () => {
  const storedHash = '$2b$10$rLoSyV0i14B9OUsy.zdOKe8ceU75tWW/MugTFQNtD06YSxGOmJjXa';
  const inputPassword = 'shivam';

  try {
    const passwordMatch = await bcrypt.compare(inputPassword, storedHash);
    console.log('Manual Test Password Match:', passwordMatch);
  } catch (error) {
    console.error('Error during manual bcrypt comparison:', error);
  }

};

export const logoutService = async (req) => {
  // Clearing the JWT token
  req.session = null;
  return { message: 'Logged out successfully' };
};
