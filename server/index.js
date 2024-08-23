// server/index.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import router from './routes/index.js';
import logger from './middleware/logger.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(logger); // Use logger middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.use("/api", router); // Use the modularized routes

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
