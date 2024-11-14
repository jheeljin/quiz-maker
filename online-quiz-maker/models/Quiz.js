import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [
    {
      optionText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [questionSchema], // Array of questions
    timePerQuestion: { type: Number, default: 30 }, // Time for each question (in seconds)
    totalQuizTime: { type: Number, default: 600 },  // Total quiz time (in seconds)
  },
  { timestamps: true }
);

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
