import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AuthPage from './components/AuthPage';
import CoursePage from './components/CoursePage'; // Import CoursePage
import AddCourse from './components/AddCourse';
import TeacherCoursePage from './components/TeacherCourse';
import CreatePostPage from './components/CreatePostPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/:role" element={<AuthPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/api/course/:course_id" element={<CoursePage />} />
        <Route path="/course/:course_id" element={<TeacherCoursePage />} /> {/* Add CoursePage route */}
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/teacher/createPost" element={<CreatePostPage />} />

      </Routes>
    </Router>
  );
}

export default App;
