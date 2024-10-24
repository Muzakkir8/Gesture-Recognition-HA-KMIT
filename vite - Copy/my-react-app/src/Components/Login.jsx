import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', 'User Name');
            localStorage.setItem('email', formData.email);

            // Update the authenticated state
            setIsAuthenticated(true);
    
            toast.success('Logged in successfully!');
    
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
    
        } catch (error) {
            toast.error('Error logging in. Please try again.');
        }
    };

    return (
        <div className='container'>
            <ToastContainer />
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="email icon" />
                        <input type="email" placeholder='Email ID' name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="password icon" />
                        <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                </div>
                <div className="submit-form">
                    <button type="submit" className="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
