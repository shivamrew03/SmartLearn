import pool from '../db/index.js';

export const addTestToCourse = async (req, res) => {

  const { course_id, q1, q2, q3 } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tests (course_id, question1, question2, question3) VALUES ($1, $2, $3, $4) RETURNING *',
      [course_id, q1, q2, q3]
    );
    res.status(201).json({ message: 'Test added successfully', test: result.rows[0] });
  } catch (error) {
    console.error('Error adding test:', error);
    res.status(500).json({ error: 'Error adding test' });
  }
};
