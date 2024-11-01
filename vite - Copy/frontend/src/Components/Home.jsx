import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ isAuthenticated }) => {
    return (
        <>
            <div className="top">
                <div className="left">
                    G-160
                </div>
                <div className="middle">
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact Us</a></li>
                        <li><a href="">Help</a></li>
                    </ul>
                </div>
                <div className="right">
                    <Link to="/login">
                        <button className='home-button'>Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className='home-button'>Sign Up</button>
                    </Link>
                </div>
            </div>
            <main>
                <div className='second'>
                    <div className='H1 dark:text-white'>MAKE YOUR LIFE MORE COMFORTABLE</div>
                    <div className='H2 dark:text-slate-400'>Transforming comfort into a seamless experience.</div>


                    <div className='home-container'>
                        <h1 className='home-title dark:text-yellow-500'>Welcome to Our App</h1>
                        <div className="canbody">
                            <div className="containerleft">
                                Effortlessly control your surroundings with our IoT-based voice automation system. From home to office, hotel, or outdoor spaces, manage lighting, security, and climate with a simple command. Experience the ease and convenience of a smart, responsive environment tailored to your daily life.
                            </div>
                            <div className="containeright">
                                {/* <img src="C:\Users\Mukarram Uddin\OneDrive\Desktop\Project\git-G160\vite - Copy\frontend\src\assets\image1.png.jpg" className='image1' alt="" /> */}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="third">
                    <div className="head3 dark:text-violet-200">Control Your Appliances With Ease And Comfort</div>
                    <div className="body3 dark:bg-slate-500 ">
                        <div className="left3 dark:text-white dark:bg-slate-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, consectetur.</div>
                        <div className="right3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate necessitatibus illum ipsam, a mollitia eaque ipsa exercitationem est iste et?</div>
                    </div>
                </div>
                <div className="fourth dark:bg-violet-900">
                    <div className="top4 dark:text-white">You will gain access to...</div>

                    <div className="body4">
                        <div className="grid">
                            <div className="item item1">
                                <div className="itemhead">Control</div>

                                <div className="img1"></div>
                                <div className="itembody">
                                Seamlessly control your home appliances, such as fans, lights, and AC, through voice commands or mobile access.
                                </div>
                                <div>
                                <Link to="/signup">
                                    <button className='btn1'>Get Access</button>
                                </Link >
                                <Link to="/help">

                                    <button className='btn2'>Need Help?</button>
                                    </Link >

                                </div>
                            </div>
                            <div className="item item2">
                                <div className="itemhead">SmartSave</div>
                                
                                <div className="img2"></div>
                                <div className="itembody">
                                Monitor your appliance usage history to optimize performance and save energy
                                </div>
                                <div>
                                <Link to="/signup">
                                    <button className='btn1'>Get Access</button>
                                </Link>
                                <Link to="/help">

                                    <button className='btn2'>Need Help?</button>
                                    </Link>

                                </div>
                            </div>
                            <div className="item item3">
                                <div className="itemhead">Temp Insight</div>
                                
                                <div className="img3"></div>
                                <div className="itembody">
                                Access real-time temperature insights to make informed decisions on device usage.
                                </div>
                                <div>
                                <Link to="/signup">
                                    <button className='btn1'>Get Access</button>
                                </Link>
                                <Link to="/help">

                                    <button className='btn2'>Need Help?</button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <p className='home-text'>Sign up or log in to access your dashboard.</p> */}

                {/* <div className='home-buttons'> */}
                {/* <Link to="/login"> */}
                {/* <button className='home-button'>Login</button> */}
                {/* </Link> */}
                {/* <Link to="/signup"> */}
                {/* <button className='home-button'>Sign Up</button> */}
                {/* </Link>  */}


                {/* </div> */}
                <div className="pop"><a href="">Help?</a></div>

            </main>
        </>
    );
};

export default Home;
