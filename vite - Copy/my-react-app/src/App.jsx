

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Dashboard from './Components/Dashboard.jsx';
import Device from './Components/device.jsx';
import Navbar from './Components/Navbar';  // Import the Navbar component


function App() {
  return(
  <>
       <Router>
       <div className="header shadow-[0_4px_10px_rgba(0,0,0,0.1)] sticky z-10"> </div>

       <Navbar/>

      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/devises" element={<Device/>} />
      </Routes>
    </Router>

  
  </>
  )
}

export default App;
