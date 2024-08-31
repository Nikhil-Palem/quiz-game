import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from './components/Quiz';
import Scoreboard from './components/Scoreboard';
import './App.css'
function App() {
  const [questions, setQuestions] = useState([]);
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [loading, setloading] = useState(true);
  const [StartQuiz, setStartQuiz] = useState(false);
  const BackendUrl="https://vercel.com/nikhils-projects-4641f0d8/quiz-backend";

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(`${BackendUrl}/api/quiz`);
      setQuestions(response.data);
      setloading(false);
      console.log(response.data);
    };
    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleQuizEnd = async () => {
    setQuizOver(true);
    const response=await axios.post(`${BackendUrl}/api/scores`, { username, score });
    console.log(response.data.username);
    setUsername(response.data.username);
    setScore(response.data.score);
  };

  const handleStartQuiz = () => {
    setStartQuiz(true);
  }

  return (
    <div className="App">
      <h1>Online Quiz Game</h1>
      {!quizOver ? (
        <>
          {!StartQuiz ? (<div className='name_div'>
            <div className='name_box'>
              <label htmlFor="name">Name </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            </div>
            {username ?(<button className='Start_btn' onClick={handleStartQuiz}>Start Quiz</button>):""}
          </div>)
            : (<Quiz questions={questions} setScore={setScore} onQuizEnd={handleQuizEnd} />)}
        </>
      ) : (
        <Scoreboard username={username} score={score}/>
      )}
    </div>
  );
}

export default App;
