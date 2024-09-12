import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaCheck, FaGripVertical } from 'react-icons/fa';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from "../elements/Header.jsx";
import Footer from "../elements/Footer.jsx";

function AddTest() {
  const location = useLocation();
  const { course_id } = location.state || {}; // Retrieve courseId from route state
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editQuestion, setEditQuestion] = useState('');

  const handleAiQuestionGeneration = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/ai/generate-questions', { title, description, difficulty });
      const generatedQuestions = response.data.questions;
      console.log(generatedQuestions);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Error generating AI questions:', error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleEditQuestion = (index) => {
    setEditingIndex(index);
    setEditQuestion(questions[index]);
  };

  const handleSaveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = editQuestion;
    setQuestions(updatedQuestions);
    setEditingIndex(null);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmitTest = async (e) => {
    e.preventDefault();
    try {
      const q1 = questions[0];
      const q2 = questions[1];
      const q3 = questions[2];
      console.log(course_id);
      await axios.post(`http://localhost:3000/api/course/${course_id}/add-test`, {
        course_id,
        q1,
        q2,
        q3
      });
      alert("Test added successfully");
      navigate("/teacher/dashboard");
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white p-12 pl-80 pr-80">
        <h1 className="text-5xl font-extrabold mb-6 text-blue-400">Add a New Test</h1>
        
        <form onSubmit={handleSubmitTest}>
          <div className="mb-6">
            <label className="block text-2xl font-bold text-white mb-2">Test Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-2xl font-bold text-white mb-2">Test Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-4 rounded-lg border text-black resize-none"
              style={{ minHeight: '150px' }}
            />
          </div>

          <div className="mb-6">
            <label className="block text-2xl font-bold text-white mb-2">Difficulty Level</label>
            <input
              type="text"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border text-black"
            />
          </div>

          <DndProvider backend={HTML5Backend}>
            <div className="mb-6">
              <label className="block text-2xl font-bold text-white mb-4">Questions</label>
              {questions.map((question, index) => (
                <Question
                  key={index}
                  index={index}
                  question={question}
                  editingIndex={editingIndex}
                  editQuestion={editQuestion}
                  setEditQuestion={setEditQuestion}
                  handleEditQuestion={handleEditQuestion}
                  handleSaveQuestion={handleSaveQuestion}
                  handleRemoveQuestion={handleRemoveQuestion}
                />
              ))}
            </div>
          </DndProvider>

          <div className="flex mt-4">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
            >
              Add Question
            </button>

            <button
              type="button"
              onClick={handleAiQuestionGeneration}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Generate AI Questions
            </button>
          </div>
          
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-6"
          >
            Submit Test
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

function Question({
  index,
  question,
  editingIndex,
  editQuestion,
  setEditQuestion,
  handleEditQuestion,
  handleSaveQuestion,
  handleRemoveQuestion,
}) {
  const [, ref] = useDrag({
    type: 'QUESTION',
    item: { index },
  });

  return (
    <div ref={ref} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-2">
      <div className="flex items-center space-x-4">
        <FaGripVertical className="cursor-grab text-blue-400" />
        {editingIndex === index ? (
          <textarea
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
            className="bg-gray-700 text-white rounded px-3 py-2 w-full resize-none"
            style={{ width: '100%', height: '60px' }}
          />
        ) : (
          <p className="text-lg">{index + 1}. {question}</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {editingIndex === index ? (
          <button
            type="button"
            onClick={() => handleSaveQuestion(index)}
            className="text-green-500 hover:underline"
          >
            <FaCheck />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleEditQuestion(index)}
            className="text-yellow-500 hover:underline"
          >
            <FaEdit />
          </button>
        )}
        <button
          type="button"
          onClick={() => handleRemoveQuestion(index)}
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default AddTest;
