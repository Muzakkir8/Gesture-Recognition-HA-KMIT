import React, { useState } from 'react';
import './LightFanControl.css';

const LightControl = () => {
  const [brightness, setBrightness] = useState(50);
  const increaseBrightness = () => {
    if (brightness < 100) setBrightness(brightness + 10);
  };
  const decreaseBrightness = () => {
    if (brightness > 0) setBrightness(brightness - 10);
  };
 return (
    <div className="control-container">
      <div className="light_icon"></div>
      <div className="leftC">
      <div className="control-title">Light Brightness</div>
      <div className="control-value">{brightness}%</div>
      </div>
      <div className="control-buttons">
        <button className="buttons" onClick={increaseBrightness}>+</button>
        <button className="buttons" onClick={decreaseBrightness}>-</button>
      </div>
    </div>

  );

};



export default LightControl;