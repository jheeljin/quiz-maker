// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// POST request for user registration
router.post('/register', registerUser);

// POST request for user login
router.post('/login', loginUser);

export default router;
