import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AuthPage from './components/AuthPage';
import CoursePage from './components/CoursePage'; // Import CoursePage
import AddCourse from './components/AddCourse';
import TeacherCoursePage from './components/TeacherCourse';
import CreatePostPage from './components/CreatePostPage';
import CreateTests from './components/CreateTests';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/:role" element={<AuthPage />} />
        <Route path="/student/dashboard" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
        <Route path="/teacher/dashboard" element={<PrivateRoute role="teacher"><TeacherDashboard /></PrivateRoute>} />
        <Route path="/api/course/:course_id" element={<CoursePage />} />
        <Route path="/course/:course_id" element={<TeacherCoursePage />} /> 
        <Route path="/course/:course_id/create-tests" element={<CreateTests />} /> 
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/teacher/createPost" element={<CreatePostPage />} />

      </Routes>
    </Router>
  );
}

export default App;
