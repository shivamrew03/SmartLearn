import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../elements/Header.jsx';
import Footer from '../elements/Footer.jsx';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

function LandingPage() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const studentId = localStorage.getItem('student_id');
    const teacherId = localStorage.getItem('teacher_id');

    if (token) {
      if (studentId) {
        setRole('student');
      } else if (teacherId) {
        setRole('teacher');
      }
    }
  }, []);

  const StudentLink = () => {
    const destination = role === 'student' ? '/student/dashboard' : '/auth/student';
    return (
      <Link to={destination}>
        <div className="transform hover:scale-105 transition-transform duration-300 cursor-pointer bg-blue-700 p-6 rounded-xl shadow-lg text-center">
          <FaUserGraduate size={40} className="mb-4 mx-auto" />
          <button className="text-xl font-semibold">Continue as Student</button>
        </div>
      </Link>
    );
  };

  const TeacherLink = () => {
    const destination = role === 'teacher' ? '/teacher/dashboard' : '/auth/teacher';
    return (
      <Link to={destination}>
        <div className="transform hover:scale-105 transition-transform duration-300 cursor-pointer bg-purple-700 p-6 rounded-xl shadow-lg text-center">
          <FaChalkboardTeacher size={40} className="mb-4 mx-auto" />
          <button className="text-xl font-semibold">Continue as Teacher</button>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      <Header />
      <div className="container mx-auto flex flex-col items-center justify-center py-20">
        <h1 className="text-6xl font-extrabold mb-8 text-center">Welcome to EduPlatform</h1>
        <p className="text-xl text-gray-400 mb-16 text-center max-w-2xl">
          EduPlatform is your one-stop solution for interactive learning. Join us today as a student or a teacher, and explore a world of knowledge.
        </p>
        <div className="flex space-x-8">
          <StudentLink />
          <TeacherLink />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
