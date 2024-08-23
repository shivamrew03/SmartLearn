import { teachersignupService, teacherloginService, studentloginService, studentsignupService, logoutService, testPasswordFlow } from '../services/auth.service.js';
import bcrypt from 'bcrypt';

export const studentsignup = async (req, res) => {
  try {
    console.log("Signup controller triggered");
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await studentsignupService(name, email, passwordHash);

    if (user) {
      return res.status(201).json({ message: "User created successfully", user });
    } else {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error" });
    }
  }
};


export const studentlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const { user, token } = await studentloginService(email, password);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const teachersignup = async (req, res) => {
  try {
    console.log("Signup controller triggered");
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await teachersignupService(name, email, passwordHash);

    if (user) {
      return res.status(201).json({ message: "User created successfully", user });
    } else {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error" });
    }
  }
};


export const teacherlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const { user, token } = await teacherloginService(email, password);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const test = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    // console.log("hi");
    await testPasswordFlow(email, password);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    await logoutService(req);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
