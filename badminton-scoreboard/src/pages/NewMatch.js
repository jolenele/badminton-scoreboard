import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ScoreBoard.css";

export default function NewMatch() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [referee, setReferee] = useState("");
  const navigate = useNavigate();

  const handleDone = () => {
    if (team1 && team2 && referee) {
      navigate("/scoreboard", { state: { team1, team2, referee } });
    }
  };

  return (
    <div className="scoreboard-container">
      <h1 className="scoreboard-title">New Match</h1>
      <div className="scoreboard-button-container" style={{ flexDirection: "column", gap: "1rem" }}>
        <input className="scoreboard-team-name" placeholder="Team 1" value={team1} onChange={(e) => setTeam1(e.target.value)} />
        <input className="scoreboard-team-name" placeholder="Team 2" value={team2} onChange={(e) => setTeam2(e.target.value)} />
        <input className="scoreboard-team-name" placeholder="Referee" value={referee} onChange={(e) => setReferee(e.target.value)} />
        <button className="scoreboard-button" onClick={handleDone} disabled={!team1 || !team2 || !referee}>Done</button>
      </div>
    </div>
  );
}
