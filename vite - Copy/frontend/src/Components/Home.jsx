import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ isAuthenticated }) => {
    return (
        <div className='home-container'>
            <h1 className='home-title'>Welcome to Our App</h1>
            <p className='home-text'>Sign up or log in to access your dashboard.</p>

            <div className='home-buttons'>
                <Link to="/login">
                    <button className='home-button'>Login</button>
                </Link>
                <Link to="/signup">
                    <button className='home-button'>Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
