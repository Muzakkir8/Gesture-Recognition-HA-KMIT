import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const Login = ({ setUsername, setIsAuthenticated }) => {
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
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', formData.email);

            setIsAuthenticated(true);
            setUsername(data.username);

            toast.success('Logged in successfully!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Error logging in. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="body fixed top-0 dark:bg-slate-900 bg-slate-200 h-screen w-screen flex justify-center items-center">
            <div className='container lg:w-[700px] lg:mt-36 h-[600px] dark:bg-slate-900 lg:-top-16 fixed'>
                <ToastContainer
                    position="top-center"  // This will place the toast at the top center
                    autoClose={2000}       // Set auto-close to 2 seconds
                    hideProgressBar        // Hide the progress bar for simplicity
                    closeOnClick
                    pauseOnHover
                    draggable={false}
                    className="toast-container" // Custom class for additional styles
                />

                <div className="header bg-purple-600 rounded-2xl lg:w-[500px]">
                    <div className="text text-violet-100 dark:text-white">Login</div>
                    <div className="underline"></div>
                </div>
                <form className='dark:bg-slate-400' onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input">
                            <img src={email_icon} alt="email icon" />
                            <input
                                type="email"
                                placeholder='Email ID'
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="password icon" />
                            <input
                                type="password"
                                placeholder='Password'
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="submit-form">
                        <button type="submit" className="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
