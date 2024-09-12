import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../elements/Header.jsx';
import Footer from '../elements/Footer.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function CreatePostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course_id, courseName } = location.state || {};

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const handleAddUrl = () => {
    

    try {
      const parsedUrl = new URL(url);
      if (!parsedUrl.hostname) {
        throw new Error('Please enter a valid URL.');
      }

      setUrls([...urls, url]);
      setUrl('');
    } catch (error) {
      setError(error.message || 'Please enter a valid external URL.');
    }
  };

  const handleRemoveUrl = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  const handleEditUrl = (index, newUrl) => {
    try {
      const parsedUrl = new URL(newUrl);
      if (!parsedUrl.hostname) {
        throw new Error('Please enter a valid URL.');
      }

      const newUrls = [...urls];
      newUrls[index] = newUrl;
      setUrls(newUrls);
    } catch (error) {
      setError(error.message || 'Please enter a valid external URL.');
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(urls);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setUrls(items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Please fill in the title and description fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await axios.post('http://localhost:3000/api/course/createPost', {
        title,
        description,
        urls,
        course_id,
      });

      navigate(`/course/${course_id}`, { state: { courseName } });
    } catch (err) {
      setError('An error occurred while creating the post.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAISuggestions = async () => {
    if (!title && !description) {
      setError('Please enter at least a title or description for AI suggestions.');
      return;
    }

    setLoadingAI(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/ai/generate-post-suggestion', {
        title: title || 'Untitled',
        description,
      });

      if (response.data) {
        const { title, description } = response.data;
        // console.log(suggestion);
        if (title) {
          setTitle(title);
          setDescription(description);
        }
      }
    } catch (err) {
      setError('An error occurred while generating AI suggestions.');
      console.error(err);
    } finally {
      setLoadingAI(false);
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
                rows={5}
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">External Resources (URLs)</label>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="urls">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {urls.map((resource, index) => (
                        <Draggable key={index} draggableId={resource} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center justify-between bg-gray-700 p-2 mb-2 rounded-lg"
                            >
                              <input
                                type="text"
                                value={resource}
                                onChange={(e) => handleEditUrl(index, e.target.value)}
                                className="flex-grow p-2 rounded-lg bg-gray-600 border border-gray-500 mr-2 focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveUrl(index)}
                                className="text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <div className="flex mt-4">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-grow p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 mr-2"
                  placeholder="Add an external resource URL"
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <button
              type="button"
              onClick={handleAISuggestions}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-4"
              disabled={loadingAI}
            >
              {loadingAI ? 'Generating AI Suggestions...' : 'Generate AI Suggestions'}
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
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
