import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: { responseMimeType: 'application/json' }
});

// Generate course suggestion
router.post('/generate-course-suggestion', async (req, res) => {
  const { name, description } = req.body;

  try {
    const prompt = `Generate a course description and checkpoints for a course titled "${name}". 
      The description is: "${description}". Provide a concise course description and a list of checkpoints.`;

    const result = await model.generateContent(prompt);
    const generated = await result.response.text();
    const generatedJSON = JSON.parse(generated);

    const suggestedDescription = generatedJSON.description;
    const checkpoints = generatedJSON.checkpoints || [];

    res.json({ suggestion: suggestedDescription, checkpoints });
  } catch (error) {
    console.error('Error generating course suggestion:', error);
    res.status(500).json({ error: 'Error generating course suggestion' });
  }
});

// Generate post suggestion
router.post('/generate-post-suggestion', async (req, res) => {
  const { title, description } = req.body;

  try {
    const prompt = `I am an instructor in college for a course and i want to make an announcement, suggest a title and description for a post with the given preliminary title: "${title}" and description: "${description}". Provide a short title and a very brief description for this announcement`;
    const result = await model.generateContent(prompt);
    const generated = await result.response.text();
    const generatedJSON = JSON.parse(generated);

    const suggestedTitle = generatedJSON.title;
    console.log(suggestedTitle);
    const suggestedDescription = generatedJSON.description;

    res.json({ title: suggestedTitle, description: suggestedDescription });
  } catch (error) {
    console.error('Error generating post suggestion:', error);
    res.status(500).json({ error: 'Error generating post suggestion' });
  }
});

router.post('/generate-questions', async (req, res) => {
  const { title, description, difficulty } = req.body;

  try {
    const prompt = `I am creating a test for a course titled "${title}". The test description is: "${description}". The difficulty level is "${difficulty}". 
      Please generate 3 short-answer questions related to this test. Do not provide answers, only generate the text for the questions.`;

    const result = await model.generateContent(prompt);
    const generated = await result.response.text();
    const generatedJSON = JSON.parse(generated);

    const generatedQuestions = generatedJSON.questions || [];

    res.json({ questions: generatedQuestions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ error: 'Error generating test questions' });
  }
});

export default router;
