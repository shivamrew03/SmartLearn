import express from 'express';
import { getCoursesForTeacher } from '../controllers/course.controller.js';
import pool from '../db/index.js'

const router = express.Router();

// Route for teacher
router.get('/:id/courses', getCoursesForTeacher);

router.post('/:teacherId/add-course', async (req, res) => {
  const { teacherId } = req.params;
  const { name, description, workflow } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO courses (name, description, teacher_id, workflow) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, teacherId, workflow]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Error adding course' });
  }
});

export default router;
