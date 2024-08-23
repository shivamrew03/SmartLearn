import pool from '../db/index.js'; // Your database connection
 // For generating unique IDs (optional, based on your needs)

// Create a new post
export const createPost = async (req, res) => {
  const { course_id, title, description, resources } = req.body;
  console.log(req.body);

  // Validate required fields
  if (!course_id || !title || !description) {
    return res.status(400).json({ message: 'Course ID, title, and description are required.' });
  }

  try {
    // Generate a unique ID for the post
    // Insert the new post into the database
    const query = `
      INSERT INTO posts ( course_id, title, description, resources)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [ course_id, title, description, resources || null];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Post created successfully!',
      post: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'An error occurred while creating the post.' });
  }
};
