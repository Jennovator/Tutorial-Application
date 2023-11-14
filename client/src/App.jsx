import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import AddTutorial from "./components/addTutorialComponent";
import Tutorial from "./components/tutorialComponent";
import TutorialsList from "./components/tutorialsListComponent";
import NavBar from "./components/navBar";

function App() {

  return (
    <div className="relative z-0 bg-primary h-[800px]">
        <NavBar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList/>} />
            <Route path="/tutorials" element={<TutorialsList/>} />
            <Route path="/add" element={<AddTutorial/>} />
            <Route path="/tutorials/:id" element={<Tutorial/>} />
          </Routes>
        </div>
    </div>
  )
}

export default App;
