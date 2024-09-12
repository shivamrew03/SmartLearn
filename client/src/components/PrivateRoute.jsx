import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('student_id');
  const teacherId = localStorage.getItem('teacher_id');

  if (!token || (role === 'student' && !studentId) || (role === 'teacher' && !teacherId)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
