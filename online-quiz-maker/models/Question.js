// // models/Question.js

// import { Schema, model } from 'mongoose';

// const questionSchema = new Schema({
//   questionText: { type: String, required: true },
//   options: {
//     type: [String],
//     required: true
//   },
//   correctAnswer: { type: String, required: true }, // Store the correct answer
//   category: { type: String, default: 'General Knowledge' },
//   difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }
// });

// const Question = model('Question', questionSchema);
// export default Question;
