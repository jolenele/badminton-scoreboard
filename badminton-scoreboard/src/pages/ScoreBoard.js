// function ScoreBoard() {
//     return ( 
//         <h1>
//             hello world
//         </h1>
//      );
// }

// export default ScoreBoard;

import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useLocation, useNavigate } from "react-router-dom";


export default function ScoreBoard() {
  const location = useLocation();
  const { team1, team2 } = location.state;
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const [undoAvailable, setUndoAvailable] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStart = () => setRunning(true);

  const handleScore = team => {
    if (!running) return;
    if (team === 1 && score1 < 30) {
      setHistory([{ team: 1, score: score1 }, ...history]);
      setScore1(score1 + 1);
      setUndoAvailable(true);
    }
    if (team === 2 && score2 < 30) {
      setHistory([{ team: 2, score: score2 }, ...history]);
      setScore2(score2 + 1);
      setUndoAvailable(true);
    }
  };

  const handleUndo = () => {
    if (!undoAvailable || history.length === 0) return;
    const last = history[0];
    if (last.team === 1) setScore1(last.score);
    if (last.team === 2) setScore2(last.score);
    setHistory(history.slice(1));
    setUndoAvailable(false);
  };

  const checkWinner = () => {
    if (score1 >= 21 && score1 - score2 >= 2) return 1;
    if (score2 >= 21 && score2 - score1 >= 2) return 2;
    if (score1 === 30) return 1;
    if (score2 === 30) return 2;
    return 0;
  };

  const winner = checkWinner();

  const handleFinish = () => navigate("/");

  const formatTime = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')} : ${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold mb-4">Badminton ScoreBoard</h1>
      <div className="mb-4">Time: {formatTime(timer)}</div>
      <div className="flex justify-center items-center space-x-8 mb-6">
        <div>
          <div className="text-3xl font-bold">{team1}</div>
          <div className={`text-6xl p-6 rounded ${winner === 1 ? 'bg-green-200' : winner === 2 ? 'bg-gray-200' : 'bg-gray-50'} cursor-pointer`} onClick={() => handleScore(1)}>{score1}</div>
        </div>
        <div className="text-4xl">:</div>
        <div>
          <div className="text-3xl font-bold">{team2}</div>
          <div className={`text-6xl p-6 rounded ${winner === 2 ? 'bg-green-200' : winner === 1 ? 'bg-gray-200' : 'bg-gray-50'} cursor-pointer`} onClick={() => handleScore(2)}>{score2}</div>
        </div>
      </div>
      {/* {!running && winner === 0 ? (
        <button onClick={handleStart} className="px-4 py-2 bg-green-700 text-white rounded">Start</button>
      ) : winner ? (
        <button onClick={handleFinish} className="px-4 py-2 bg-red-600 text-white rounded">Finish</button>
      ) : (
        <div className="space-x-4">
          <button onClick={() => setRunning(false)} className="px-4 py-2 bg-yellow-500 text-white rounded">Pause</button>
          <button onClick={handleUndo} disabled={!undoAvailable} className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50">Undo</button>
        </div>
      )} */}
    </div>
  );
}
