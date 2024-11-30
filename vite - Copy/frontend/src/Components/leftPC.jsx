import ACControl from './ACControl.jsx'; // Adjust path if necessary
import FanControl from './Fan_Control.jsx';
import LightControl from './LightControl.jsx';
const LeftSection = ({
    userName,
    selectedRoom,
    acStatus = {},
    toggleAC,
    temperature = {},
    increaseTemperature,
    decreaseTemperature,
    setInitialTemperature,
  }) => {
    const isAcOn = acStatus[selectedRoom] ?? false; // Default to false if undefined
    const roomTemperature = temperature[selectedRoom] ?? 16; // Default to 16 if undefined
  
    return (
      <div className="left flex flex-col w-full lg:w-[65vw] min-h-screen p-4 sm:block hidden md:block">
        <div className="w-full max-w-[90vw] mx-auto mt-4 lg:max-w-[800px]">
          <h1 className="text-[24px] font-thin text-gray-800">
            Hey, <span className="font-bold">{userName || 'User'} 👋🏻</span> Welcome to Dashboard
          </h1>
          <p className="text-gray-600 opacity-60 text-[14px]">
            {selectedRoom && `You are viewing: ${selectedRoom.replace(/([A-Z])/g, ' $1').trim()}`}
          </p>
        </div>
        <div className="deviceControl">
          <div className="mt-6 text-sm">
            <ACControl
              isOn={isAcOn}
              toggleAC={toggleAC}
              temperature={roomTemperature}
              increaseTemperature={increaseTemperature}
              decreaseTemperature={decreaseTemperature}
              setInitialTemperature={setInitialTemperature}
              selectedRoom={selectedRoom}
            />
          </div>
          <div className="LightFanControl">
            <FanControl />
            <LightControl />
          </div>
        </div>
      </div>
    );
  };
  export default LeftSection;
