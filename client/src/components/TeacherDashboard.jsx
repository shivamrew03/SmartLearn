import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const teacherId = 1; // Replace with dynamic teacher ID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/teacher/${teacherId}/courses`);
        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [teacherId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-extrabold mb-8">Teacher Dashboard</h1>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg mb-8 hover:bg-green-600 transition-transform transform hover:scale-105"
        onClick={() => navigate('/add-course')}
      >
        Add Course
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              <h2 className="text-2xl font-semibold mb-4">{course.name}</h2>
              <p className="text-gray-400 mb-4">{course.description}</p>
              <Link to={`/course/${course.course_id}`} state={{ courseName: course.name, courseId: course.course_id }}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Manage Course
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
