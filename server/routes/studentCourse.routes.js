// server/routes/studentCourse.routes.js
import express from 'express';
import { getEnrolledCourses, getUnenrolledCourses, enrollInCourse } from '../controllers/course.controller.js';

const router = express.Router();

// Routes for student
router.get('/:id/enrolled-courses', getEnrolledCourses);
router.get('/:id/unenrolled-courses', getUnenrolledCourses);
router.post('/:studentId/enroll', enrollInCourse);

export default router;
