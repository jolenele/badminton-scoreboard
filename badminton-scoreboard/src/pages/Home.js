import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ScoreBoard.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="scoreboard-container">
      <h1 className="scoreboard-title">Badminton Scoreboard</h1>
      <div className="scoreboard-button-container">
        <button className="scoreboard-button" onClick={() => navigate("/new-match")}>New Match</button>
        <button className="scoreboard-button" onClick={() => navigate("/history")}>History</button>
      </div>
    </div>
  );
}