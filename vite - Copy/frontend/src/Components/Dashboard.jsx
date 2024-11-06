import React from 'react';
import { useRef, useEffect, useState } from 'react';
import Room from '../Components/Room.jsx';
import Bedroom from '../Components/Bedroom.jsx';
import LivingRoom from '../Components/LivingRoom.jsx';
import Kitchen from '../Components/Kitchen.jsx';
import Outdoor from '../Components/Outdoor.jsx'
import Temp from '../Components/temp.jsx'


const Dashboard = () => {
  
  const [selectedRoom, setSelectedRoom] = useState('LivingRoom');
  const renderRoom = () => {
    switch (selectedRoom) {
      case 'LivingRoom':
        return <LivingRoom />;
      case 'Kitchen':
        return <Kitchen />;
      case 'Bedroom':
        return <Bedroom />;
        case 'Outdoor':
        return <Outdoor />;
    
      default:
        return <LivingRoom />;
    }
  };
  return (
    <div className="max-h-screen  transition-all duration-200 ease-linear flex  dark:bg-slate-900">
      <div className="flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 min-h-screen lg:ml-14 lg:w-[80vw] ">

        <div className=" mt-10 hello ml-10 text-[28px] hidden sm:block">Hey, <span className="name font-bold">Jhon. 👋🏻</span>Welcome to Dashboard<p className="a opacity-60 text-[16px]">Have a nice day!</p></div>
        {/* Header with Background Image */}
        <div className="lg:hidden h-[100px] rounded-lg shadow-sm w-full max-w-[90vw] mx-auto mt-4 lg:max-w-[1410px] lg:ml-[80px] md:max-w-[800px]"> {/*1487*/}
          <div className=" bg-blue-100 dark:bg-slate-500 opacity-90 bg-cover bg-bottom h-[100px] rounded-lg p-6 filter brightness-90 contrast-125 saturate-200  hue-rotate-[14deg] w-full max-w-[90vw] mx-auto lg:max-w-[1410px] md:max-w-[800px] ">
            <div className="flex justify-between lg:justify-around items-center gap-4 lg:gap-[800px] ">
              <div className="text-center flex items-center gap-2  ">
                <img src="https://cdn-icons-png.flaticon.com/512/2100/2100130.png" className="w-8" />
                <div>
                  <div className="dark:text-white temp font-semibold text-2xl opacity-90 ">26°C</div>
                  <div className="dark:text-white text-xs opacity-60">Home Temp</div>
                </div>
              </div>

              <div className="humid text-center flex items-center gap-2">
                <img src="https://cdn-icons-png.flaticon.com/512/12564/12564499.png" alt="" className="w-8" />
                <div>
                  <div className="dark:text-white font-semibold text-2xl opacity-80">48.2%</div>
                  <div className="dark:text-white opacity-60 text-xs">Home Humidity</div>
                </div>
              </div>
            </div>

          </div></div><div></div>

        {/* Main content area */}
        <div className=" dark:border-[1px] dark:border-slate-600 dark:bg-slate-800 w-full max-w-[90vw] mx-auto rounded-lg p-6 mt-4 lg:max-w-[1410px] md:max-w-[800px] min-h-[calc(100vh-100px)] lg:ml-[80px]">
          <div className="">
            
            {renderRoom()}


          </div>
        </div>
      </div>
      {/* right content */}
      <div className="right max-h-screen w-[35vw] bg-white">
      <Room onSelectedRoom={setSelectedRoom} />

        <div className="temp fixed bottom-5  ml-5 "><Temp/></div>
        </div></div>


  );
};

export default Dashboard;
