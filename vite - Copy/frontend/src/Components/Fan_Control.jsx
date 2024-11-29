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
    <div className="control-container rounded-[35px] w-[380px] h-[135px]">
      <div className="fan_icon"></div>
      <div className="leftC">
        
        <div className="control-title">Fan Speed</div>
        <div className="control-value">{speed}</div>
      </div>
      <div className="control-buttons bg-[#DCE5FD] h-[105px] w-[50px] rounded-2xl text-blue-500  text-xl">
        <button className="pb-3 pt-2 hover:bg-blue-200 rounded-2xl" onClick={increaseSpeed}>+</button>
        <button className="pt-2 pb-3 hover:bg-blue-200 rounded-2xl" onClick={decreaseSpeed}>-</button>
      </div>
    </div>
  );
};

export default FanControl;