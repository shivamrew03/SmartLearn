import pool from '../db/index.js'; // Adjust path to your db.js

export const createPost = async (req, res) => {
  const { title, description, urls, course_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO posts (title, description, urls, course_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, urls, course_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
