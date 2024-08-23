import pool from '../db/index.js';

export const findStudentByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};
export const findTeacherByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM teachers WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};

export const createStudent = async (name, email, passwordHash) => {
    try {
        const result = await pool.query(
            'INSERT INTO students (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, passwordHash]
        );
        console.log(result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};

export const createTeacher = async (name, email, passwordHash) => {
    try {
        const result = await pool.query(
            'INSERT INTO teachers (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, passwordHash]
        );
        console.log(result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};
