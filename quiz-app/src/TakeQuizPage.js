import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TakeQuizPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [results, setResults] = useState(null);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quiz/take/${quizId}`);
        const data = await response.json();
        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(''));
        setTimeLeft(data.totalQuizTime);
        setTimerActive(true);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Timer effect
  useEffect(() => {
    if (!timerActive || timeLeft === 0) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft, timerActive]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, answers }),
      });
  
      const data = await response.json();
  
      if (data.result) {
        alert(`Your score is: ${data.score}`);
        setResults(data.result);  // Set the results state here
  
        // Display each question with user's answer and correct answer
        data.result.forEach((result) => {
          alert(
            `Question: ${result.questionText}\n` +
            `Your Answer: ${result.userAnswer}\n` +
            `Correct Answer: ${result.correctAnswer}\n` +
            `Your answer is ${result.isCorrect ? 'correct' : 'incorrect'}\n`
          );
        });
      } else {
        alert('Error: Unable to get quiz results.');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz');
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  // Make sure quiz and questions are present
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>Quiz data is missing or malformed.</div>;
  }
  

  

  const chartData = {
    labels: results ? results.map((result, index) => `Q${index + 1}`) : [],
    datasets: [
      {
        label: 'Correctness',
        data: results ? results.map((result) => (result.isCorrect ? 1 : 0)) : [],
        backgroundColor: results
          ? results.map((result) => (result.isCorrect ? 'green' : 'red'))
          : [],
      },
    ],
  };

  const timePercentage = (timeLeft / quiz.totalQuizTime) * 100;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>

      <h3>Time Left: {timeLeft} seconds</h3>
      <div style={{ width: '100%', backgroundColor: '#ccc', height: '20px', marginBottom: '20px' }}>
        <div
          style={{
            width: `${timePercentage}%`,
            height: '100%',
            backgroundColor: timePercentage > 20 ? 'green' : 'red',
            transition: 'width 1s linear',
          }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, questionIndex) => (
          <div key={questionIndex} style={{ marginBottom: '20px' }}>
            <h3>{question.questionText}</h3>
            {question.options && question.options.length > 0 ? (
              question.options.map((option, optionIndex) => (
                <div key={optionIndex} style={{ marginBottom: '10px' }}>
                  <input
                    type="radio"
                    name={`question${questionIndex}`}
                    value={option}
                    onChange={() => handleAnswerChange(questionIndex, option)}
                    checked={answers[questionIndex] === option}
                  />
                  <label style={{ marginLeft: '10px' }}>{option}</label>
                </div>
              ))
            ) : (
              <div>No options available for this question.</div>
            )}
          </div>
        ))}
        <button type="submit" disabled={timeLeft <= 0}>Submit Quiz</button>
      </form>

      {results && (
        <div style={{ marginTop: '40px' }}>
          <h2>Quiz Results</h2>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

export default TakeQuizPage;
