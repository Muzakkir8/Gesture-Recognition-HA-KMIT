import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginSignup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import email_icon from '../assets/email.png';

const Guest_Login = ({ }) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // Access current route path

  

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email) {
            toast.error('Please enter an email!');
            return;
        }

        // Directly set guest-related details
        toast.success('Guest verified successfully!');
     
       
        setTimeout(() => navigate('/guest'), 1000);
    };

    return (
        <div className="body fixed top-0 dark:bg-slate-900 bg-slate-200 h-screen w-screen flex justify-center items-center">
            <div className="container lg:w-[700px] lg:mt-36 h-[600px] dark:bg-slate-900 lg:-top-16 fixed">
                <ToastContainer
                    position="top-center" // Toast at the top center
                    autoClose={2000} // Auto-close in 2 seconds
                    hideProgressBar // No progress bar
                    closeOnClick
                    pauseOnHover
                    draggable={false}
                    className="toast-container"
                />

                <div className="header bg-purple-600 rounded-2xl lg:w-[500px]">
                    <div className="text text-violet-100 dark:text-white">Login As Guest</div>
                    <div className="underline"></div>
                </div>
                <form className='dark:bg-slate-400' onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input">
                            <img src={email_icon} alt="email icon" />
                            <input
                                type="email"
                                placeholder="Email ID"
                                name="email"
                                value={email}
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

export default Guest_Login;
