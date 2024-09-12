import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../elements/Header.jsx';
import Footer from '../elements/Footer.jsx';

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showEnrolled, setShowEnrolled] = useState(false);

  const studentId = localStorage.getItem('student_id');
  console.log(studentId);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log(studentId);
        const response = await axios.get(`http://localhost:3000/api/student/${studentId}/${showEnrolled ? 'enrolled-courses' : 'unenrolled-courses'}`);
        showEnrolled ? setEnrolledCourses(response.data) : setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [showEnrolled, studentId]);

  const enrollInCourse = async (courseId, courseName, courseDescription) => {
    try {
      await axios.post(`http://localhost:3000/api/student/${studentId}/enroll`, { course_id: courseId, course_name: courseName, description: courseDescription });
  
      alert('You have successfully enrolled in the course!');
  
      // Update state directly without animation
      // setCourses(courses.filter(course => course.course_id !== courseId));
      setEnrolledCourses([...enrolledCourses, { course_id: courseId, name: courseName, description: courseDescription  }]);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };
  

  const handleMouseMove = (e, courseId) => {
    const card = document.getElementById(`course-card-${courseId}`);
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xMid = rect.width / 2;
    const yMid = rect.height / 2;
    const xDeg = (x - xMid) / 20;
    const yDeg = (y - yMid) / 20;
    card.style.transform = `rotateY(${xDeg}deg) rotateX(${yDeg}deg)`;
  };

  const handleMouseLeave = (courseId) => {
    const card = document.getElementById(`course-card-${courseId}`);
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-4">Student Dashboard</h1>
          <p className="text-xl text-gray-300">Manage your courses and explore new learning opportunities.</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">{showEnrolled ? 'Your Enrolled Courses' : 'Offered Courses'}</h2>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => setShowEnrolled(!showEnrolled)}
          >
            {showEnrolled ? 'View Offered Courses' : 'View Enrolled Courses'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showEnrolled ? enrolledCourses : courses).length > 0 ? (
            (showEnrolled ? enrolledCourses : courses).map((course) => (
              <div
                key={course.course_id}
                id={`course-card-${course.course_id}`}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform perspective-1000"
                onMouseMove={(e) => handleMouseMove(e, course.course_id)}
                onMouseLeave={() => handleMouseLeave(course.course_id)}
              >
                <h3 className="text-2xl font-semibold mb-2">{showEnrolled ? course.course_name : course.name}</h3>
                <p className="text-gray-400 mb-4">Course ID: {course.course_id}</p>
                <p className="text-gray-400 mb-4">{course.description}</p>
                {showEnrolled ? (
                  <Link to={`/api/course/${course.course_id}`} state={{ courseName: course.course_name, courseId: course.course_id, description: course.description }}>
                    <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition duration-300" >
                      Go to Course
                    </button>
                  </Link>
                ) : (
                  <button
                    className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    onClick={() => enrollInCourse(course.course_id, showEnrolled ? course.course_name : course.name)}
                  >
                    Enroll
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-lg">No courses found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default StudentDashboard;
