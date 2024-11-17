import React, { useState } from 'react';
import './LightFanControl.css'; // Import the external CSS file

const FanControl = () => {
  const [speed, setSpeed] = useState(1);
  const increaseSpeed = () => {
    if (speed < 5) setSpeed(speed + 1);
  };
  const decreaseSpeed = () => {
    if (speed > 1) setSpeed(speed - 1);
  };
  return (
    <div className="control-container">
      <div className="fan_icon"></div>
      <div className="leftC">
        
        <div className="control-title">Fan Speed</div>
        <div className="control-value">{speed}</div>
      </div>
      <div className="control-buttons">
        <button className="buttons" onClick={increaseSpeed}>+</button>
        <button className="buttons" onClick={decreaseSpeed}>-</button>
      </div>
    </div>
  );
};

export default FanControl;