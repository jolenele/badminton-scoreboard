import React, { useState, useEffect, useRef } from 'react';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewMatch from "./pages/NewMatch";
import ScoreBoard from "./pages/ScoreBoard"
import History from "./pages/History"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-match" element={<NewMatch />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}
