

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import Dashboard from './Components/Dashboard.jsx';
import Device from './Components/device.jsx';
import Navbar from './Components/Navbar';  // Import the Navbar component


function App() {
  const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);
  return(
  <>
  
       <Router>
       <div className="header shadow-[0_4px_10px_rgba(0,0,0,0.1)] sticky z-99">    <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 absolute right-0 bg-gray-200 dark:bg-gray-700 dark:border rounded text-xs my-2 mx-2 dark:text-white"
      >
        Dark Mode
      </button></div>

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
