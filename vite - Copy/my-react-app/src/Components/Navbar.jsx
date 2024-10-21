import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
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
  const sidebarRef = useRef(null); // Create a ref for the sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
      setIsOpen(false); // Close the sidebar if clicking outside
    }
  };

  const handleNavLinkClick = () => {
    setIsOpen(false); // Close the sidebar when a link is clicked
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Clean up the event listener on component unmount or when isOpen changes

  return (
    <>
      <div className={`side-nav dark:bg-slate-800 hover:dark:border-r-[1px] hover:dark:border-slate-600  ${isOpen ? 'open ' : 'close1'}`} ref={sidebarRef}>
        {!isOpen && ( // Show hamburger only when the sidebar is closed
          <div className="hamburger" onClick={toggleSidebar}>
            <div className="ham">
              <svg className='dark:fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="indigo">
                <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
              </svg>
            </div>
          </div>
        )}
        <div className="user">
          <div className="logo"><img src={userI} alt="" /></div>
          <h1>iSmart</h1>
        </div>
        <ul className="list">
          <NavLink to="/" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img src={home} alt="" /></i>
              <h2>Dashboard</h2>
            </li>
          </NavLink>
          <NavLink to="/devises" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img src={devises} alt="" /></i>
              <h2>Devices</h2>
            </li>
          </NavLink>
          <NavLink to="/contact" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img src={message} alt="" /></i>
              <h2>Contact Us</h2>
            </li>
          </NavLink>
          <NavLink to="/reports" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img className="mx-10 " src={reports} alt="" /></i>
              <h2>Robot</h2>
            </li>
          </NavLink>
          <NavLink to="/settings" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img src={settings} alt="" /></i>
              <h2>Settings</h2>
            </li>
          </NavLink>
          <NavLink to="/home" onClick={handleNavLinkClick} className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            <li>
              <i><img src={logout} alt="" /></i>
              <h2>Log out</h2>
            </li>
          </NavLink>
        </ul>
        <hr className="border-t-2 border-azure w-50 my-24" />
        <div className="log overflow-hidden">
          <img src={log} alt="" className="us" />
          <div>
            <h2>Username <br /><p>abcd123@gmail.com</p></h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
