import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaCheck, FaGripVertical } from 'react-icons/fa';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from "../elements/Header.jsx";
import Footer from "../elements/Footer.jsx";

function AddCourse() {
  const location = useLocation();
  const { teacherId } = location.state || {}; // Retrieve teacherId from route state
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [workflow, setWorkflow] = useState([]);
  const [checkpoint, setCheckpoint] = useState(''); // For individual checkpoint input
  const [editingIndex, setEditingIndex] = useState(null); // Index of the checkpoint being edited
  const [editCheckpoint, setEditCheckpoint] = useState(''); // Value of the checkpoint being edited

  const handleAiSuggestion = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/ai/generate-course-suggestion', { name, description });
      const { suggestion, checkpoints } = response.data;
      setDescription(suggestion);
      setWorkflow(checkpoints); // Add the suggested checkpoints to the workflow
    } catch (error) {
      console.error('Error generating AI suggestion:', error);
    }
  };

  const handleAddCheckpoint = () => {
    if (checkpoint) {
      setWorkflow([...workflow, checkpoint]);
      setCheckpoint(''); // Clear the input after adding
    }
  };

  const handleRemoveCheckpoint = (index) => {
    const newWorkflow = workflow.filter((_, i) => i !== index);
    setWorkflow(newWorkflow);
  };

  const handleEditCheckpoint = (index) => {
    setEditingIndex(index);
    setEditCheckpoint(workflow[index]);
  };

  const handleSaveCheckpoint = (index) => {
    const updatedWorkflow = [...workflow];
    updatedWorkflow[index] = editCheckpoint;
    setWorkflow(updatedWorkflow);
    setEditingIndex(null); // Exit editing mode
  };

  const moveCheckpoint = (dragIndex, hoverIndex) => {
    const draggedCheckpoint = workflow[dragIndex];
    const updatedWorkflow = [...workflow];
    updatedWorkflow.splice(dragIndex, 1);
    updatedWorkflow.splice(hoverIndex, 0, draggedCheckpoint);
    setWorkflow(updatedWorkflow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3000/api/teacher/${teacherId}/add-course`, {
        name,
        description,
        workflow,
      });
      alert("Course is added");
      navigate("/teacher/dashboard");
      // Handle successful submission (e.g., redirect to the teacher dashboard)
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white p-12 pl-80 pr-80">
        <h1 className="text-5xl font-extrabold mb-6 text-blue-400">Add a New Course</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-2xl font-bold text-white mb-2">Course Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-2xl font-bold text-white mb-2">Course Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-4 rounded-lg border text-black resize-none"
              style={{ minHeight: '150px' }} // Initial size larger
            />
          </div>

          <DndProvider backend={HTML5Backend}>
            <div className="mb-6">
              <label className="block text-2xl font-bold text-white mb-4">Workflow (Checkpoints)</label>
              {workflow.map((point, index) => (
                <Checkpoint
                  key={index}
                  index={index}
                  point={point}
                  editingIndex={editingIndex}
                  editCheckpoint={editCheckpoint}
                  setEditCheckpoint={setEditCheckpoint}
                  handleEditCheckpoint={handleEditCheckpoint}
                  handleSaveCheckpoint={handleSaveCheckpoint}
                  handleRemoveCheckpoint={handleRemoveCheckpoint}
                  moveCheckpoint={moveCheckpoint}
                />
              ))}
            </div>
          </DndProvider>

          <div className="flex mt-4">
            <input
              type="text"
              value={checkpoint}
              onChange={(e) => setCheckpoint(e.target.value)}
              className="flex-grow px-4 py-2 rounded-lg border mr-2 text-black"
              placeholder="Add a checkpoint"
            />
            <button
              type="button"
              onClick={handleAddCheckpoint}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <br />
          <button
            type="button"
            onClick={handleAiSuggestion}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-6"
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
      <Footer />
    </>
  );
}

function Checkpoint({
  index,
  point,
  editingIndex,
  editCheckpoint,
  setEditCheckpoint,
  handleEditCheckpoint,
  handleSaveCheckpoint,
  handleRemoveCheckpoint,
  moveCheckpoint,
}) {
  const [, ref] = useDrag({
    type: 'CHECKPOINT',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'CHECKPOINT',
    hover: (item) => {
      if (item.index !== index) {
        moveCheckpoint(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-2">
      <div className="flex items-center space-x-4">
        <FaGripVertical className="cursor-grab text-blue-400" />
        {editingIndex === index ? (
          <textarea
            value={editCheckpoint}
            onChange={(e) => setEditCheckpoint(e.target.value)}
            className="bg-gray-700 text-white rounded px-3 py-2 w-full resize-none"
            style={{ width: '100%', height: '60px' }} // Increased width and height
          />
        ) : (
          <p className="text-lg">{index + 1}. {point}</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {editingIndex === index ? (
          <button
            type="button"
            onClick={() => handleSaveCheckpoint(index)}
            className="text-green-500 hover:underline"
          >
            <FaCheck />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleEditCheckpoint(index)}
            className="text-yellow-500 hover:underline"
          >
            <FaEdit />
          </button>
        )}
        <button
          type="button"
          onClick={() => handleRemoveCheckpoint(index)}
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}


export default AddCourse;
