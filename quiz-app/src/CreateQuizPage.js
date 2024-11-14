import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateQuizPage.css'; 
const CreateQuizPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: [{ optionText: '', isCorrect: false }] }]);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].optionText = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleIsCorrectChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.forEach((option, idx) => {
      if (idx === optionIndex) {
        option.isCorrect = e.target.checked;
      }
    });
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({ optionText: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = { questionText: '', options: [{ optionText: '', isCorrect: false }] };
    setQuestions([...questions, newQuestion]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuiz = { title, description, questions };
    
    try {
      const response = await fetch('http://localhost:5000/api/quiz/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuiz),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Quiz created successfully');
        navigate('/'); // Navigate to home or quiz listing page
      } else {
        alert('Error creating quiz: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating quiz');
    }
  };

  return (
    <div>
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} required />
        </div>

        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <div>
              <label>Question:</label>
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(questionIndex, e)}
                required
              />
            </div>

            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>Option {optionIndex + 1}:</label>
                <input
                  type="text"
                  value={option.optionText}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                  required
                />
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) => handleIsCorrectChange(questionIndex, optionIndex, e)}
                />
                Correct
                {question.options.length > 1 && (
                  <button type="button" onClick={() => handleRemoveOption(questionIndex, optionIndex)}>
                    Remove Option
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={() => handleAddOption(questionIndex)}>
              Add Option
            </button>
          </div>
        ))}

        {/* Button to add more questions */}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default CreateQuizPage;


