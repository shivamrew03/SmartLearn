import { Link } from 'react-router-dom';
import Header from '../elements/Header.jsx';
import Footer from '../elements/Footer.jsx';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      <Header />
      <div className="container mx-auto flex flex-col items-center justify-center py-20">
        <h1 className="text-6xl font-extrabold mb-8 text-center">Welcome to EduPlatform</h1>
        <p className="text-xl text-gray-400 mb-16 text-center max-w-2xl">
          EduPlatform is your one-stop solution for interactive learning. Join us today as a student or a teacher, and explore a world of knowledge.
        </p>
        <div className="flex space-x-8">
          <Link to="/auth/student">
            <div className="transform hover:scale-105 transition-transform duration-300 cursor-pointer bg-blue-700 p-6 rounded-xl shadow-lg text-center">
              <FaUserGraduate size={40} className="mb-4 mx-auto"/>
              <button className="text-xl font-semibold">Continue as Student</button>
            </div>
          </Link>
          <Link to="/auth/teacher">
            <div className="transform hover:scale-105 transition-transform duration-300 cursor-pointer bg-purple-700 p-6 rounded-xl shadow-lg text-center">
              <FaChalkboardTeacher size={40} className="mb-4 mx-auto"/>
              <button className="text-xl font-semibold">Continue as Teacher</button>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
