import express from 'express';
import authRoutes from './auth.routes.js';
import studentCourseRoutes from './studentCourse.routes.js'; // Rename the route file for students
import teacherCourseRoutes from './teacherCourse.routes.js'; // Separate route file for teachers
import postRoutes from "./posts.routes.js";
import aiRoutes from "./ai.routes.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/student', studentCourseRoutes); // Use specific routes for students
router.use('/teacher', teacherCourseRoutes); // Use specific routes for teachers
router.use('/course', postRoutes);
router.use('/ai',aiRoutes);

export default router;
