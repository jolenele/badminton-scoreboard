// ScoreBoard.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ScoreBoard.css";


export default function ScoreBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { team1, team2, referee } = location.state || {};

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [history, setHistory] = useState([]);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [canUndo, setCanUndo] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins} : ${secs}`;
  };

  const handleScore = (team) => {
    if (!running) return;
    const newHistory = [...history];

    if (team === 1 && score1 < 30) {
      newHistory.push({ team: 1, prev: score1 });
      setScore1(score1 + 1);
    } else if (team === 2 && score2 < 30) {
      newHistory.push({ team: 2, prev: score2 });
      setScore2(score2 + 1);
    }

    setHistory(newHistory);
    setCanUndo(true); // Enable Undo after a valid score
  };


  const handleUndo = () => {
    if (!canUndo) return;
    const last = history.pop();
    if (!last) return;

    if (last.team === 1) setScore1(last.prev);
    else setScore2(last.prev);

    setHistory([...history]);
    setCanUndo(false); // Disable Undo after one use
  };


  const checkWinner = () => {
    if ((score1 >= 21 && score1 - score2 >= 2) || score1 === 30) return team1;
    if ((score2 >= 21 && score2 - score1 >= 2) || score2 === 30) return team2;
    return null;
  };

  const handleStart = () => {
    setRunning(true);
    setStartTime(new Date());
  };

  const handleFinish = async () => {
    setRunning(false);
    const end = new Date();
    setEndTime(end);
    const winner = checkWinner();
    const matchData = {
      team1,
      team2,
      referee,
      team1Score: score1,
      team2Score: score2,
      winner,
      startTime,
      endTime: end,
      duration: formatTime(timer),
    };
    try {
      await axios.post("http://localhost:5000/api/matches", matchData);
    } catch (err) {
      console.error("Error saving match:", err);
    }
    navigate("/");
  };

  const winner = checkWinner();

  return (
  <div className="scoreboard-container">
    <h1 className="scoreboard-title">Badminton ScoreBoard</h1>
    <p className="scoreboard-timer">Time: {formatTime(timer)}</p>
    <p className="scoreboard-timer">Referee: {referee}</p>
    <hr className="scoreboard-divider" />

    <div className="scoreboard-score-row">
      <div className="scoreboard-team-block">
        <h2 className="scoreboard-team-title">Team 1</h2>
        <p className="scoreboard-team-name">{team1}</p>
      </div>

      <div className="scoreboard-score-card" onClick={() => handleScore(1)}>
        <span>{score1}</span>
      </div>

      <div className="scoreboard-colon">:</div>

      <div className="scoreboard-score-card" onClick={() => handleScore(2)}>
        <span>{score2}</span>
      </div>

      <div className="scoreboard-team-block">
        <h2 className="scoreboard-team-title">Team 2</h2>
        <p className="scoreboard-team-name">{team2}</p>
      </div>
    </div>

    <div className="scoreboard-button-container">
      {!running && !winner && (
        <button className="scoreboard-button" onClick={handleStart}>Start</button>
      )}
      {running && !winner && (
        <>
          <button className="scoreboard-button" onClick={() => setRunning(false)}>Pause</button>
          <button
            className={`undo-button ${canUndo ? 'active' : 'inactive'}`}
            onClick={handleUndo}
            disabled={!canUndo}
          >
            Undo
          </button>
        </>
      )}
      {winner && (
        <button className="scoreboard-button" onClick={handleFinish}>Finish</button>
      )}
    </div>
  </div>
);


}
