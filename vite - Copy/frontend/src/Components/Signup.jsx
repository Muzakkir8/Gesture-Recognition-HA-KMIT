import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import person_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error on typing
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', formData.name);
      localStorage.setItem('email', formData.email);

      setUsername(formData.name);
      setIsAuthenticated(true);

      toast.success('Signed up successfully!');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Error signing up. Please try again.';
      setError(errorMessage); // Set error message

      toast.error(errorMessage);
      
      // Clear error after 3 seconds
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="body fixed top-0 dark:bg-slate-950 bg-slate-200 h-screen w-screen flex justify-center items-center">
      <div className="container lg:w-[700px] lg:mt-36 h-[600px] dark:bg-slate-900 lg:-top-16 fixed">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable={false}
          className="toast-container"
        />
        <div className="header bg-purple-600 rounded-2xl lg:w-[500px]">
          <div className="text text-violet-100 dark:text-white">Sign Up</div>
          <div className="underline rounded-lg"></div>
        </div>
        <form className='dark:bg-slate-400' onSubmit={handleSignupSubmit}>
          <div className="inputs">
            <div className="input">
              <img src={person_icon} alt="person icon" />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <img src={email_icon} alt="email icon" />
              <input
                type="email"
                placeholder="Email ID"
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
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {error && <div className="error-message text-red-500">{error}</div>}
          <div className="submit-form">
            <button type="submit" className="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
