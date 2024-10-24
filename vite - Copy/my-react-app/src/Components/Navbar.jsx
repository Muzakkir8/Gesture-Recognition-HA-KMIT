import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Add useNavigate for redirecting
import './Navbar.css';
import userI from '../assets/user.svg';
import home from '../assets/home.svg';
import message from '../assets/message.svg';
import reports from '../assets/reports.svg';
import settings from '../assets/settings.svg';
import devises from '../assets/devises.svg';
import log from '../assets/log.svg';
import logout from '../assets/logout.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const sidebarRef = useRef(null);
  const navigate = useNavigate(); // To redirect the user

  useEffect(() => {
    // Retrieve user info from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
      setIsOpen(false);
    }
  };

  const handleNavLinkClick = () => {
    setIsOpen(false); // Close sidebar when a link is clicked
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/'); // Redirect to the home page
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className={`side-nav dark:bg-slate-800 hover:dark:border-r-[1px] hover:dark:border-slate-600 ${isOpen ? 'open' : 'close1'}`} ref={sidebarRef}>
        {!isOpen && (
          <div className="hamburger" onClick={toggleSidebar}>
            <div className="ham">
              <svg className="dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="indigo">
                <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
              </svg>
            </div>
          </div>
        )}
        <div className="user">
          <div className="logo">
            <img src={userI} alt="User Icon" />
          </div>
          <h1>iSmart</h1>
        </div>
        <ul className="list">
          <NavLink to="/dashboard" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img src={home} alt="Dashboard Icon" /></i>
              <h2>Dashboard</h2>
            </li>
          </NavLink>
          <NavLink to="/devises" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img src={devises} alt="Devices Icon" /></i>
              <h2>Devices</h2>
            </li>
          </NavLink>
          <NavLink to="/contact" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img src={message} alt="Contact Icon" /></i>
              <h2>Contact Us</h2>
            </li>
          </NavLink>
          <NavLink to="/reports" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img src={reports} alt="Reports Icon" /></i>
              <h2>Reports</h2>
            </li>
          </NavLink>
          <NavLink to="/settings" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img src={settings} alt="Settings Icon" /></i>
              <h2>Settings</h2>
            </li>
          </NavLink>
          <li onClick={handleLogout} className="logout">
            <i><img src={logout} alt="Logout Icon" /></i>
            <h2>Log out</h2>
          </li>
        </ul>
        <hr className="border-t-2 border-azure w-50 my-24" />
        <div className="log overflow-hidden">
          <img src={log} alt="Log Icon" className="us" />
          <div>
            <h2>{username || 'User Name'} <br /><p>{email || 'email@example.com'}</p></h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
