// import Quiz from '../models/Quiz.js';

// // Helper function to validate quiz data
// const validateQuizData = ({ title, questions }) => {
//   if (!title || !questions || questions.length === 0) {
//     return { valid: false, message: 'Title and questions are required' };
//   }
//   return { valid: true };
// };

// // Create a new quiz
// export const createQuiz = async (req, res) => {
//   const { title, description, questions } = req.body;

//   try {
//     // Validate the provided data
//     const { valid, message } = validateQuizData({ title, questions });
//     if (!valid) {
//       return res.status(400).json({ message });
//     }

//     // Create a new quiz object
//     const newQuiz = new Quiz({
//       title,
//       description,
//       questions,
//     });

//     // Save the quiz to the database
//     await newQuiz.save();
//     res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating quiz', error });
//   }
// };

// // Get quiz by ID (for quiz taking)
// export const getQuizById = async (req, res) => {
//   const { quizId } = req.params;

//   try {
//     // Trim any unwanted whitespace or newline characters from the quiz ID
//     const sanitizedQuizId = quizId.trim();

//     const quiz = await Quiz.findById(sanitizedQuizId);
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }

//     // Only return the questions, not the answers
//     const questions = quiz.questions.map((question) => ({
//       questionText: question.questionText,
//       options: question.options.map((option) => option.optionText),
//     }));

//     // Include time limits for the quiz
//     const { timePerQuestion, totalQuizTime } = quiz;

//     res.json({
//       quizId: quiz._id,
//       questions,
//       timePerQuestion,  // Time allotted per question (in seconds)
//       totalQuizTime,     // Total time for the quiz (in seconds)
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching quiz', error });
//   }
// };

// const score = result.filter((question) => question.isCorrect).length;

// res.json({
//   message: 'Quiz submitted successfully',
//   score: score,
//   result: result, // Send detailed results with correct answers
// });
// } 
// catch (error) {
// res.status(500).json({ message: 'Error submitting quiz', error });
// }








// export const submitQuiz = async (req, res) => {
//   const { quizId, answers } = req.body;

//   try {
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }

//     // Map through questions and check user's answer against the correct answer
//     const result = quiz.questions.map((question, index) => {
//       const correctOption = question.options.find((option) => option.isCorrect);

//       // Handle undefined correct answer or no correct answer
//       const correctAnswer = correctOption ? correctOption.optionText : 'No correct answer found';

//       const userAnswer = answers[index];
//       const isCorrect = correctAnswer === userAnswer; // Check if the user answer is correct

//       return {
//         questionText: question.questionText,
//         userAnswer: userAnswer,
//         correctAnswer: correctAnswer, // Always show the correct answer
//         isCorrect: isCorrect,
//       };
//     });

//     // Calculate the score: number of correct answers
//     const score = result.filter((question) => question.isCorrect).length;

//     res.json({
//       message: 'Quiz submitted successfully',
//       score: score,
//       result: result, // Send detailed results with correct answers
//     });
    
//   } catch (error) {
//     res.status(500).json({ message: 'Error submitting quiz', error });
//   }
// };








// // Get a list of all available quizzes for browsing


// // Get a list of all available quizzes for browsing


// // Get a list of all available quizzes for browsing
// export const getQuizzes = async (req, res) => {
//   try {
//     // Fetch all quizzes, return only title, description, and creation date
//     const quizzes = await Quiz.find({}, 'title description createdAt'); 

//     // If no quizzes are found, return a 404 message
//     if (!quizzes || quizzes.length === 0) {
//       return res.status(404).json({ message: 'No quizzes available' });
//     }

//     // Return the list of quizzes
//     res.json({ quizzes });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching quizzes', error });
//   }
// };

// // Delete a quiz by its ID
// export const deleteQuiz = async (req, res) => {
//     const { quizId } = req.params;
  
//     try {
//       // Trim any unwanted whitespace or newline characters from the quiz ID
//       const sanitizedQuizId = quizId.trim();
  
//       // Find and delete the quiz by its ID
//       const deletedQuiz = await Quiz.findByIdAndDelete(sanitizedQuizId);
  
//       if (!deletedQuiz) {
//         return res.status(404).json({ message: 'Quiz not found' });
//       }
  
//       res.status(200).json({ message: 'Quiz deleted successfully', quiz: deletedQuiz });
//     } catch (error) {
//       res.status(500).json({ message: 'Error deleting quiz', error });
//     }
//   };
  

// // Controller function to generate a random quiz
 

// // Export the controller function to be used in the routes


 


// // Export the controller function to be used in the routes

import Quiz from '../models/Quiz.js';
// Helper function to validate quiz data
const validateQuizData = ({ title, questions }) => {
  if (!title || !questions || questions.length === 0) {
    return { valid: false, message: 'Title and questions are required' };
  }
  return { valid: true };
};

// Create a new quiz
export const createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    // Validate the provided data
    const { valid, message } = validateQuizData({ title, questions });
    if (!valid) {
      return res.status(400).json({ message });
    }

    // Create a new quiz object
    const newQuiz = new Quiz({
      title,
      description,
      questions,
    });

    // Save the quiz to the database
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error });
  }
};

// Get quiz by ID (for quiz taking)
export const getQuizById = async (req, res) => {
  const { quizId } = req.params;

  try {
    // Trim any unwanted whitespace or newline characters from the quiz ID
    const sanitizedQuizId = quizId.trim();

    const quiz = await Quiz.findById(sanitizedQuizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Only return the questions, not the answers
    const questions = quiz.questions.map((question) => ({
      questionText: question.questionText,
      options: question.options.map((option) => option.optionText),
    }));

    // Include time limits for the quiz
    const { timePerQuestion, totalQuizTime } = quiz;

    res.json({
      quizId: quiz._id,
      questions,
      timePerQuestion,  // Time allotted per question (in seconds)
      totalQuizTime,     // Total time for the quiz (in seconds)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error });
  }
};

export const submitQuiz = async (req, res) => {
  const { quizId, answers, startTime } = req.body; // Include the start time of the quiz

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Validate if the time has exceeded
    const totalQuizTime = quiz.totalQuizTime; // Total allowed time (in seconds)
    const currentTime = Date.now();
    const elapsedTime = (currentTime - new Date(startTime).getTime()) / 1000; // Time elapsed in seconds

    if (elapsedTime > totalQuizTime) {
      return res.status(400).json({ message: 'Time limit exceeded' });
    }

    // Map through questions and check user's answer against the correct answer
    const result = quiz.questions.map((question, index) => {
      const correctOption = question.options.find((option) => option.isCorrect);

      const correctAnswer = correctOption ? correctOption.optionText : 'No correct answer found';
      const userAnswer = answers[index];
      const isCorrect = correctAnswer === userAnswer;

      return {
        questionText: question.questionText,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
      };
    });

    // Calculate the score
    const correctAnswersCount = result.filter((question) => question.isCorrect).length;
    const totalQuestions = quiz.questions.length;

    // Calculate the percentage
    const percentage = (correctAnswersCount / totalQuestions) * 100;

    // Return the response with score and percentage
    res.json({
      message: 'Quiz submitted successfully',
      score: correctAnswersCount,
      percentage: percentage.toFixed(2), // Round to two decimal places
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error });
  }
};






// Get a list of all available quizzes for browsing
export const getQuizzes = async (req, res) => {
  try {
    // Fetch all quizzes, return only title, description, and creation date
    const quizzes = await Quiz.find({}, 'title description createdAt'); 

    // If no quizzes are found, return a 404 message
    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes available' });
    }

    // Return the list of quizzes
    res.json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error });
  }
};

// Delete a quiz by its ID
export const deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    // Trim any unwanted whitespace or newline characters from the quiz ID
    const sanitizedQuizId = quizId.trim();

    // Find and delete the quiz by its ID
    const deletedQuiz = await Quiz.findByIdAndDelete(sanitizedQuizId);

    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz deleted successfully', quiz: deletedQuiz });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quiz', error });
  }
};

// Controller function to generate a random quiz (not implemented here)
export const generateRandomQuiz = async (req, res) => {
  // Logic to generate a random quiz (this could be done by selecting random questions from a pool)
  res.json({ message: 'Random quiz generation is not implemented yet.' });
};


