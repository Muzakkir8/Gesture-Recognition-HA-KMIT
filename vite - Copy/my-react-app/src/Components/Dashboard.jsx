import React from 'react';
import cloud from '../assets/sky.jpg';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header with Background Image */}
      <div className="bg-white h-[100px] rounded-lg shadow-sm w-full max-w-[90vw] mx-auto mt-4 lg:max-w-[1410px] lg:ml-[80px] md:max-w-[800px]"> {/*1487*/}
      <div className="bg-[url('./assets/sky.jpg')] opacity-90 bg-cover bg-bottom h-[100px] rounded-lg p-6 filter brightness-90 contrast-125 saturate-200  hue-rotate-[14deg] w-full max-w-[90vw] mx-auto lg:max-w-[1410px] md:max-w-[800px]">

        <div className=" flex justify-around gap-40 lg:gap-[900px] items-center "><div className='text-center '><div className='temp font-semibold text-2xl  opacity-90'>26°C </div>  <div className=' text-xs opacity-60'>Home Temp</div></div><div className="humid text-center"><div className='font-semibold text-2xl opacity-80'>48.2%</div><div className='opacity-60 text-xs'>Home Humidity</div></div></div>
      </div></div>

      {/* Main content area */}
      <div className="bg-[#e8eaf6] w-full max-w-[90vw] mx-auto rounded-lg p-6 mt-4 lg:max-w-[1410px] md:max-w-[800px] min-h-[calc(100vh-100px)] lg:ml-[80px]">
        <div className="mt-8 flex flex-row lg:flex-row ">
          <div className="bg-white p-4 rounded shadow mb-4 lg:mb-0 flex-1 mx-2 max-w-32 max-h-32">
            <h2 className="font-semibold text-lg">Card 1</h2>
            <p>Details about Card 1.</p>
          </div>
          <div className="bg-white p-4 rounded shadow mb-4 lg:mb-0 flex-1 max-w-32 max-h-32 mx-2">
            <h2 className="font-semibold text-lg">Card 2</h2>
            <p>Details about Card 2.</p>
          </div>
          <div className="bg-white p-4 max-w-32 max-h-32 rounded shadow flex-1 mx-2">
            <h2 className="font-semibold text-lg">Card 3</h2>
            <p>Details about Card 3.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
