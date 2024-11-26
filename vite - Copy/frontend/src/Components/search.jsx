import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import cloud from '../assets/sun.png';
import './temp.css';


const Temp = () => {
  const [temperature, setTemperature] = useState("24");

  useEffect(() => {
 
  }, []);

  return (
    <div className="container text-white w-96 mt-4 mb-0">
    <div className="background">
      <div className="Circle1"></div>
      <div className="Circle2"></div>
      <div className="Circle3"></div>
      <div className="content">
        <h1 className="Condition"><i className="material-icons sun">wb_sunny</i> Sunny</h1>
        <h1 className="Temp">72<span id="F">&#8457;</span></h1>
        <h1 className="Time">09:35</h1>
        <h1 className="Location"><i className="material-icons locationIcon">place</i> Raleigh, NC</h1>
      </div>
      </div>
      </div>
    
  );
};



export default Temp11;
