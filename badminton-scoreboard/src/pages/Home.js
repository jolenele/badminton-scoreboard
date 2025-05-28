// function Home() {
//     return ( 
//         <h1>Home</h1>
//      );
// }

// export default Home;

import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Badminton Scoreboard</h1>
      <button onClick={() => navigate("/new-match")} className="px-6 py-2 bg-green-700 text-white rounded">New Match</button>
      <button className="px-6 py-2 bg-gray-700 text-white rounded">History</button>
    </div>
  );
}
