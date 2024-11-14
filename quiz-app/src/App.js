import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuizPage from './CreateQuizPage';  // Importing CreateQuizPage component
import TakeQuizPage from './TakeQuizPage';      // Importing TakeQuizPage component
import HomePage from './HomePage';          // Importing HomePage component (your landing page with quiz options)
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home route - Displays the homepage with options to create or take a quiz */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Create Quiz route */}
        <Route path="/create-quiz" element={<CreateQuizPage />} />

        {/* Take Quiz route - Takes a quiz using quizId */}
        <Route path="/take-quiz/:quizId" element={<TakeQuizPage />} />
      </Routes>
    </Router>
  );
};

export default App;
