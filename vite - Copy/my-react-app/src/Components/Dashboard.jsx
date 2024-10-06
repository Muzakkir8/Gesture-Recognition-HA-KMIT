import React from 'react';
import { useRef, useEffect, useState } from 'react';

const Dashboard = () => {
  const buttonRef = useRef(null);
  const [clicked, setClicked] = useState(0);
  function handle() {
    clicked ? buttonRef.current.innerHTML = 'Off' : buttonRef.current.innerHTML = 'On';
  }
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header with Background Image */}
      <div className="bg-white h-[100px] rounded-lg shadow-sm w-full max-w-[90vw] mx-auto mt-4 lg:max-w-[1410px] lg:ml-[80px] md:max-w-[800px]"> {/*1487*/}
      <div className="bg-[url('./assets/sky.jpg')] opacity-90 bg-cover bg-bottom h-[100px] rounded-lg p-6 filter brightness-90 contrast-125 saturate-200  hue-rotate-[14deg] w-full max-w-[90vw] mx-auto lg:max-w-[1410px] md:max-w-[800px]">
      <div className="flex justify-between lg:justify-around items-center gap-4 lg:gap-[700px] ">
  <div className="text-center flex items-center gap-4">
    <img src="https://cdn-icons-png.flaticon.com/512/2100/2100130.png" className="w-8" />
    <div>
      <div className="temp font-semibold text-2xl opacity-90">26°C</div>
      <div className="text-xs opacity-60">Home Temp</div>
    </div>
  </div>

  <div className="humid text-center flex items-center gap-4">
    <img src="https://cdn-icons-png.flaticon.com/512/12564/12564499.png" alt="" className="w-8" />
    <div>
      <div className="font-semibold text-2xl opacity-80">48.2%</div>
      <div className="opacity-60 text-xs">Home Humidity</div>
    </div>
  </div>
</div>

      </div></div>

      {/* Main content area */}
      <div className="bg-[#e8eaf6] w-full max-w-[90vw] mx-auto rounded-lg p-6 mt-4 lg:max-w-[1410px] md:max-w-[800px] min-h-[calc(100vh-100px)] lg:ml-[80px]">
        <div className="mt-8 flex flex-row lg:flex-row ">
          <div className="bg-white p-4 rounded shadow mb-4 lg:mb-0 flex-1 mx-2 max-w-32 max-h-32">
            <h2 className="font-semibold text-lg ">Light <br /> <button 
        type="button" 
        className="btn btn-dark bg-purple-300 px-4 rounded-lg" 
        ref={buttonRef} 
        onClick={() => {handle(); setClicked(!clicked);}}
      >
        Off
      </button></h2>
      
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
