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
import Guest from './Components/guest.jsx';
import Guest_Login from './Components/guest_login.jsx';
import Help from './Components/Help.jsx';
import BillPage from './Components/BillPage';


function AppContent({ darkMode, setDarkMode, isAuthenticated, setIsAuthenticated, setUsername }) {
    const location = useLocation();

    // Define paths where the Navbar should be hidden
    const hideNavbarPaths = ['/', '/login', '/signup','/help','/guest','/guest_login'];
    const showNavbar = !hideNavbarPaths.includes(location.pathname);

    return (
        <>
      
            {/* Only show Navbar if the current path is not in the hideNavbarPaths */}
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/Help" element={<Help />} /> */}
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
                <Route path="/guest_login" element={<Guest_Login />} />
                <Route path="/help" element={<Help />} />
                <Route path="/guest" element={<Guest />}/>
                <Route path="/bill" element={<BillPage />} />
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
