import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Scoreboard.css';

function Scoreboard({ username, score }) {
  const [scores, setScores] = useState([]);
  const BackendUrl = "https://quiz-backend-gray.vercel.app";

  console.log(username, score)
  useEffect(() => {
    const fetchScores = async () => {
      const response = await axios.get(`${BackendUrl}/api/scores`);
      setScores(response.data);
      console.log(response.data, "data");
    };
    fetchScores();
  }, []);

  console.log(scores);
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((scoreItem, index) => (
            <tr
              key={index}
              style={{
                fontWeight: scoreItem.username === username ? 'bold' : 'normal',
                color: scoreItem.username === username ? '#34a853' : 'initial',
              }}>
              <td>{scoreItem.username}</td>
              <td>{scoreItem.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Your Score: {score}</h3>
    </div>
  );
}

export default Scoreboard;
