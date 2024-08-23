// server/routes/posts.routes.js
import express from 'express';
import pool from '../db/index.js'; // Adjust the path to your db.js file
import { createPost } from '../controllers/posts.controllers.js';
const router = express.Router();

// Fetch posts for a specific course
router.get('/:course_id', async (req, res) => {
  const { course_id } = req.params;
  
  try {
    const result = await pool.query(
      `SELECT * FROM posts WHERE course_id = $1 ORDER BY created_at DESC`, 
      [course_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/createPost', createPost);

export default router;
