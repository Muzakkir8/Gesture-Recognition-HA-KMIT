import React from 'react';
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
  return (
    <div className="side-nav">
      <div className="user">
        <div className="logo"><img src={userI} alt="" /></div>
        <h1>iSmart</h1>
      </div>
      <ul className="list">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-active" : "")}>
          <li>
            <i><img src={home} alt="" /></i>
            <h2>Dashboard</h2>
          </li>
        </NavLink>
        <NavLink to="/devises" className={({ isActive }) => (isActive ? "nav-active" : "")}>
          <li>
            <i><img src={devises} alt="" /></i>
            <h2>Devices</h2>
          </li>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-active" : "")}>
          <li>
            <i><img src={message} alt="" /></i>
            <h2>Contact Us</h2>
          </li>
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => (isActive ? "nav-active" : "")}>
          <li>
            <i><img src={reports} alt="" /></i>
            <h2>Reports</h2>
          </li>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? "nav-active" : "")}>
          <li>
            <i><img src={settings} alt="" /></i>
            <h2>Settings</h2>
          </li>
        </NavLink>
        <NavLink to="/home" className={({ isActive }) => (isActive ? "nav-active" : "")} >
          <li>
            <i><img src={logout} alt="" /></i>
            <h2>Log out</h2>
          </li>
        </NavLink>
      </ul>
      <hr className=" border-t-2 border-azure w-50 my-24 " />
      <div className="log">
        <img src={log} alt="" className="us" />
        <div>
          <h2>Username <br /><p>abcd123@gmail.com</p></h2>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
