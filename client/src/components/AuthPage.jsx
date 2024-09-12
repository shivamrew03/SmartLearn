import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthPage() {
  const { role } = useParams(); // "student" or "teacher"
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? `/api/auth/${role}login`
        : `/api/auth/${role}signup`;
  
      const data = isLogin ? { email, password } : { name, email, password };
  
      const response = await axios.post(`http://localhost:3000${endpoint}`, data);
  
      // Store the token and student/teacher ID in local storage
      localStorage.setItem('token', response.data.token);
      
      if (role === 'student' && response.data.user?.student_id) {
        localStorage.setItem('student_id', response.data.user.student_id);
      } else if (role === 'teacher' && response.data.user?.teacher_id) {
        localStorage.setItem('teacher_id', response.data.user.teacher_id);
      }
  
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center p-4">
      <h2 className="text-4xl text-white mb-6 font-bold">
        {isLogin ? 'Login' : 'Sign Up'} as {role}
      </h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {!isLogin && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="bg-purple-600 text-white w-full p-3 rounded hover:bg-purple-700 transition-transform transform hover:scale-105">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-6 text-white underline hover:text-gray-200 transition-colors"
      >
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

export default AuthPage;
