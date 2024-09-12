import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../elements/Header.jsx';
import Footer from '../elements/Footer.jsx';

function TeacherCoursePage() {
  const navigate = useNavigate();
  const { course_id } = useParams();
  const location = useLocation();
  const { courseName, courseDescription } = location.state || {};

  const [posts, setPosts] = useState([]);
  const [tests, setTests] = useState([]);
  const [expandedTestId, setExpandedTestId] = useState(null);
  const [showTests, setShowTests] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/course/${course_id}`);
        setPosts(response.data.posts);
        setTests(response.data.tests); // Assuming the backend sends both posts and tests in one call
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [course_id]);

  const toggleTestExpansion = (testId) => {
    setExpandedTestId((prevTestId) => (prevTestId === testId ? null : testId));
  };

  const handleCreatePost = () => {
    navigate('/teacher/createPost', {
      state: { course_id, courseName },
    });
  };

  const handleCreateTest = () => {
    navigate(`/course/${course_id}/create-tests`, { state: { course_id } });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-8">
        {courseName ? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-5xl font-extrabold mb-4">{courseName}</h1>
              <p className="text-xl text-gray-300 mb-2">Course ID: {course_id}</p>
              <p className="text-xl text-gray-300 mb-2">Description: {courseDescription}</p>
            </div>

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold">Posts</h2>
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={() => setShowTests(!showTests)}
              >
                {showTests ? 'Hide Tests' : 'View Tests'}
              </button>
            </div>

            <div className="flex justify-end space-x-4 mb-8">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={handleCreatePost}
              >
                Create Post
              </button>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                onClick={handleCreateTest}
              >
                Create Test
              </button>
            </div>

            {showTests ? (
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                {tests ? (
                  tests.map((test, index) => (
                    <div
                      key={test.test_id}
                      className="mb-4 p-4 bg-gray-700 rounded-lg shadow-lg"
                    >
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleTestExpansion(test.test_id)}
                      >
                        <span className="text-xl font-semibold">Test {index + 1}</span>
                        <span className="text-gray-400">
                          {expandedTestId === test.test_id ? '▲' : '▼'}
                        </span>
                      </div>
                      {expandedTestId === test.test_id && (
                        <div className="mt-4 space-y-2">
                          <p className="text-gray-300">Question 1: {test.question1}</p>
                          <p className="text-gray-300">Question 2: {test.question2}</p>
                          <p className="text-gray-300">Question 3: {test.question3}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-lg">No tests found for this course.</p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {posts ? (
                  posts.map((post) => (
                    <div
                      key={post.post_id}
                      className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-gray-700 transition duration-300"
                    >
                      <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-400 mb-4">{post.description}</p>
                      {post.urls.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-lg font-semibold">Resources:</h4>
                          <ul className="list-disc list-inside text-gray-400">
                            {post.urls.map((resource, idx) => (
                              <li key={idx}>
                                <a
                                  href={resource}
                                  className="text-blue-500 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {resource}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="text-gray-500 text-sm mt-2">
                        Posted on {new Date(post.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-lg">No posts found for this course.</p>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-lg">Course details not found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default TeacherCoursePage;
