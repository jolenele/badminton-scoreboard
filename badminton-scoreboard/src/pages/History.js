import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await axios.get("http://localhost:5000/api/matches");
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching match history:", error);
      }
    }

    fetchMatches();
  }, []);
  
  const navigate = useNavigate();

  return (
    <div>
      <h1>Match History</h1>
      <table border="1">
        <thead>
          <tr>
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
            <tr key={index}>
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
            <button onClick={() => navigate("/")} className="px-6 py-2 bg-gray-700 text-white rounded">Home</button>

    </div>
  );
}
