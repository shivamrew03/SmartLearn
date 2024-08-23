import { useState } from 'react';
import axios from 'axios';

function AddCourse() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');

  const handleAiSuggestion = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/ai/generate-course-suggestion', { name });
      setAiSuggestion(response.data.suggestion);
    } catch (error) {
      console.error('Error generating AI suggestion:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/teacher/${teacherId}/add-course`, {
        name,
        description: description || aiSuggestion,
        workflow,
      });

      // Handle response (e.g., redirect to the teacher dashboard)
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl mb-6">Add a New Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg">Course Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Course Description</label>
          <textarea
            value={description || aiSuggestion}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Workflow (Checkpoints)</label>
          <textarea
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
          />
        </div>

        <button
          type="button"
          onClick={handleAiSuggestion}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Generate AI Suggestion
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
