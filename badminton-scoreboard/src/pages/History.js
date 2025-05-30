import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ScoreBoard.css";

export default function History() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await axios.get("https://badminton-scoreboard.onrender.com/api/matches");
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching match history:", error);
      }
    }
    fetchMatches();
  }, []);

  return (
    <div className="scoreboard-container">
      <h1 className="scoreboard-title">Match History</h1>
      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Referee</th>
            <th>Score</th>
            <th>Winner</th>
            <th>Duration</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index} style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
              <td>{match.team1}</td>
              <td>{match.team2}</td>
              <td>{match.referee}</td>
              <td>{match.team1Score} - {match.team2Score}</td>
              <td>{match.winner}</td>
              <td>{match.duration}</td>
              <td>{new Date(match.startTime).toLocaleString()}</td>
              <td>{new Date(match.endTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
