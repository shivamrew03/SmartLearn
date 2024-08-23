// server/controllers/course.controller.js
import pool from '../db/index.js';

export const getUnenrolledCourses = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM courses;
    `,);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrolledCourses = async (req, res) => {
  const studentId = req.params.id;
  try {
    const result = await pool.query(`
      SELECT * FROM student_courses 
      WHERE student_id = $1;
    `, [studentId]);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoursesForTeacher = async (req, res) => {
  const teacherId = req.params.id;
  try {
    const result = await pool.query(`
      SELECT * FROM courses WHERE teacher_id = $1;
    `, [teacherId]);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const enrollInCourse = async (req, res) => {
  const { studentId } = req.params;
  const { course_id, course_name } = req.body;

  try {
      await pool.query(
          'INSERT INTO student_courses (student_id, course_id, course_name) VALUES ($1, $2, $3)',
          [studentId, course_id, course_name]
      );
      res.status(201).json({ message: 'Enrolled successfully' });
  } catch (error) {
      console.error('Error enrolling in course:', error);
      res.status(500).json({ error: 'Failed to enroll in course' });
  }
};
