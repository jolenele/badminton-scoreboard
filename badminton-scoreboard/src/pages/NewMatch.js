// function NewMatch() {
//     return ( 
//         <h1>New Match</h1>
//      );
// }

// export default NewMatch;

import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <input className="border p-2" placeholder="Team 1" value={team1} onChange={e => setTeam1(e.target.value)} />
      <input className="border p-2" placeholder="Team 2" value={team2} onChange={e => setTeam2(e.target.value)} />
      <input className="border p-2" placeholder="Referee" value={referee} onChange={e => setReferee(e.target.value)} />
      <button disabled={!team1 || !team2 || !referee} onClick={handleDone} className="px-4 py-2 bg-green-700 text-white rounded">Done</button>
    </div>
  );
}
