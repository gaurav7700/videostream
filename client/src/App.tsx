import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./pages/Navigation";
import Upload from "./pages/Upload";
import Singlevideo from "./pages/Singlevideo";
function App() {
  return (
    <>
      <Router>
      
        <Routes>
          <Route path="/" element={<Singlevideo />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
