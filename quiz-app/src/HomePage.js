// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './HomePage.css';

// const HomePage = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quiz/quizzes');
//         setQuizzes(response.data.quizzes);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   const navigateToCreateQuiz = () => {
//     navigate('/create-quiz');
//   };

//   const navigateToTakeQuiz = (quizId) => {
//     navigate(`/take-quiz/${quizId}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login'; // Redirect to login page
//   };

//   return (
//     <div className="home-page">
//       <h1>Welcome to the Quiz App</h1>
//       <div className="buttons">
//         <button onClick={navigateToCreateQuiz}>Create a Quiz</button>
//         <button onClick={handleLogout}>Logout</button>
//       </div>

//       <h2>Available Quizzes</h2>
//       {loading ? (
//         <p>Loading quizzes...</p>
//       ) : quizzes.length === 0 ? (
//         <p>No quizzes available</p>
//       ) : (
//         <div className="quiz-list">
//           {quizzes.map((quiz) => (
//             <div key={quiz._id} className="quiz-item">
//               <h3>{quiz.title}</h3>
//               <p>{quiz.description}</p>
//               <button onClick={() => navigateToTakeQuiz(quiz._id)}>Take Quiz</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, redirect to login
      navigate('/login');
    } else {
      const fetchQuizzes = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/quiz/quizzes', {
            headers: { Authorization: `Bearer ${token}` }, // Pass token in header if needed
          });
          setQuizzes(response.data.quizzes);
        } catch (error) {
          console.error('Error fetching quizzes:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchQuizzes();
    }
  }, [navigate]);

  const navigateToCreateQuiz = () => {
    navigate('/create-quiz');
  };

  const navigateToTakeQuiz = (quizId) => {
    navigate(`/take-quiz/${quizId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Quiz App</h1>
      <div className="buttons">
        <button onClick={navigateToCreateQuiz}>Create a Quiz</button>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>

      <h2>Available Quizzes</h2>
      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes available</p>
      ) : (
        <div className="quiz-list">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-item">
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <button onClick={() => navigateToTakeQuiz(quiz._id)}>Take Quiz</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
