import express from 'express';
import { createQuiz,getQuizById,submitQuiz,getQuizzes,deleteQuiz,generateRandomQuiz} from '../controllers/quizController.js';

const router = express.Router();

// Route to create a new quiz
router.post('/create', createQuiz);
router.get('/take/:quizId', getQuizById);

// Submit quiz answers and calculate score
router.post('/submit', submitQuiz);
router.get('/quizzes', getQuizzes);

router.delete('/:quizId', deleteQuiz);
router.get('/random-quiz', generateRandomQuiz);


export default router;
