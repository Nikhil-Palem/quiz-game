import React, { useState, useEffect } from 'react';
import './Quiz.css';

function Quiz({ questions, setScore, onQuizEnd }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    if (questions.length > 0) {
      shuffleAnswers();
    }
  }, [currentQuestion, questions]);

  const shuffleAnswers = () => {
    const answers = [...questions[currentQuestion]?.incorrect_answers, questions[currentQuestion]?.correct_answer];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    setShuffledAnswers(answers);
  };

  const handleAnswer = (answer) => {
    const correct = answer === questions[currentQuestion]?.correct_answer;
    setIsCorrect(correct);
    setSelectedAnswer(answer);

    if (!userAnswers[currentQuestion]) {
      setUserAnswers([...userAnswers, { answer, correct }]);
      setScore(prev => prev + (correct ? 1 : 0));
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        onQuizEnd();
      }
    }, 1000);
  };
  const getDifficultyColor = (difficult) => {
    switch (difficult) {
      case 'hard':
        return '#d93025';
      case 'medium':
        return '#ffa000';
      case 'easy':
        return '#2db55d';
      default:
        return 'black';
    }
  }

  return (
    <div className='quiz-container'>
      <div className="qn_info">
        <p className='q_no'>{currentQuestion + 1} of {questions.length} Questions</p>
        <p className='q_difficulty' style={{ color: getDifficultyColor(questions[currentQuestion]?.difficulty),background:"#00000009" }}>{questions[currentQuestion]?.difficulty}</p>
      </div>
      <hr />
      {questions.length > 0 && questions[currentQuestion] && (
        <div>
          <p>{currentQuestion + 1}. {questions[currentQuestion]?.question}</p>
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              className='select_option'
              style={{
                backgroundColor:
                  selectedAnswer === answer
                    ? (isCorrect ? 'green' : 'red')
                    : 'initial',
                color: selectedAnswer === answer ? 'white' : 'initial'
              }}
              onClick={() => handleAnswer(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quiz;
