// server/routes/posts.routes.js
import express from 'express';
import pool from '../db/index.js';
import { createPost } from '../controllers/posts.controllers.js';
import { addTestToCourse } from '../controllers/testController.js';
const router = express.Router();

router.get('/:course_id', async (req, res) => {
  const { course_id } = req.params;

  try {
    const postsResult = await pool.query(
      `SELECT * FROM posts WHERE course_id = $1 ORDER BY created_at DESC`,
      [course_id]
    );

    const testsResult = await pool.query(
      `SELECT * FROM tests WHERE course_id = $1 ORDER BY test_id ASC`,
      [course_id]
    );

    res.json({
      posts: postsResult.rows,
      tests: testsResult.rows,
    });
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/createPost', createPost);
router.post('/:courseId/add-test', addTestToCourse);

export default router;
