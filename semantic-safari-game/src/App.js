// src/components/QuizGame.js

import React, { useState, useEffect } from 'react';

const App = () => {
  const [question, setQuestion] = useState({
    definition: '',
    options: [],
    correctAnswer: '',
  });

  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching question');
      }

      const data = await response.json();
      setQuestion(data.question);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    // Check if the selected answer is correct
    const isCorrect = selectedAnswer === question.correctAnswer;

    // Update the score based on the correctness of the answer
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));

    // Fetch the next question after handling the answer (if needed)
    fetchQuestion();
  };

  return (
    <div style={{ backgroundColor: 'beige', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Quiz Game</h1>
      <p>{question.definition}</p>
      <div>
        {question.options.map((option, index) => (
          <button
            key={index}
            style={{
              margin: '5px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: 'lightblue',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleAnswerClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <p>Score: {score}</p>
    </div>
  );
};

export default App;
