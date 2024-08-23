import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../elements/Header.jsx';
import Footer from '../elements/Footer.jsx';

function CreatePostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course_id, courseName } = location.state || {};

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !file) {
      setError('Please fill in all fields and select a file.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('course_id', course_id);
        console.log(formData);
      await axios.post('http://localhost:3000/api/course/createPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(`/teacher/course/${course_id}`, { state: { courseName } });
    } catch (err) {
      setError('An error occurred while creating the post.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-8">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-6">Create Post for {courseName}</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter post title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter post description"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Upload Resource (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full text-white p-2"
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Create Post'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CreatePostPage;
