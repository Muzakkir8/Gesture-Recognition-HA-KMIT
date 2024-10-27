// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard.jsx';
import Device from './Components/device.jsx';
import Navbar from './Components/Navbar';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import Home from './Components/Home.jsx';
import Contact from './Components/Contact.jsx';
import Reports from './Components/Reports.jsx';

function AppContent({ darkMode, setDarkMode, isAuthenticated, setIsAuthenticated, setUsername }) {
    const location = useLocation();

    // Define paths where the Navbar should be hidden
    const hideNavbarPaths = ['/', '/login', '/signup'];
    const showNavbar = !hideNavbarPaths.includes(location.pathname);

    return (
        <>
         <div className="header mt-0 shadow-[0_4px_10px_rgba(0,0,0,0.1)] sticky top-0 z-99 dark:border-b-[1px] dark:border-slate-600 dark:bg-slate-800">


                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 absolute right-0 bg-gray-200 dark:bg-gray-700 dark:border rounded text-xs my-2 mx-2 dark:text-white"
                >
                    Dark Mode
                </button>
            </div>
            {/* Only show Navbar if the current path is not in the hideNavbarPaths */}
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/devices" element={<Device />} />
                <Route path="/reports" element={<Reports />} />
                <Route 
                    path="/login" 
                    element={<Login setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} 
                />
                <Route 
                    path="/signup" 
                    element={<Signup setIsAuthenticated={setIsAuthenticated} />} 
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <AppContent
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setUsername={setUsername}
            />
        </Router>
    );
}

export default App;
