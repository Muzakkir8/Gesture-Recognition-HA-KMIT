import React, { useState } from 'react';
import './LightFanControl.css';

const LightControl = () => {
  const [brightness, setBrightness] = useState(50);
  const increaseBrightness = () => {
    if (brightness < 100) setBrightness(brightness + 50);
  };
  const decreaseBrightness = () => {
    if (brightness > 0) setBrightness(brightness - 50);
  };
 return (
    <div className=" control-container rounded-[40px] w-[380px] h-[135px]">
      <div className="light_icon"></div>
      <div className="leftC">
      <div className="control-title">Light Brightness</div>
      <div className="control-value text-[35px] font-semibold">{brightness}%  {brightness === 50 && <span className="text-gray-500 text-[20px] ml-2">(Dim)</span>}
      {brightness === 100 && <span className="text-yellow-400 text-[20px] ml-2">(Bright)</span>}</div>
      </div>
      <div className="control-buttons bg-[#DCE5FD] h-[105px] w-[50px] rounded-2xl text-blue-500  text-xl">
        <button className="pb-3 pt-2 hover:bg-blue-200 rounded-2xl " onClick={increaseBrightness}>+</button>
        <button className="pt-2 pb-3 hover:bg-blue-200 rounded-2xl" onClick={decreaseBrightness}>-</button>
      </div>
    </div>

  );

};



export default LightControl;