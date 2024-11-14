// app.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/users', userRoutes); // Attach user routes
// app.use('/api/quiz', quizRoutes);
app.use('/api/quiz', quizRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Online Quiz Maker API');
});
app.get('/test', (req, res) => res.send('Server is working!'));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
