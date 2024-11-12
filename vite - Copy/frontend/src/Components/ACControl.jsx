// ACControl.jsx
import React from 'react';

const ACControl = ({ isOn, toggleAC, temperature, setTemperature, speed, changeSpeed }) => {
  const increaseTemperature = () => setTemperature((prevTemp) => Math.min(prevTemp + 1, 30));
  const decreaseTemperature = () => setTemperature((prevTemp) => Math.max(prevTemp - 1, 16));

  return (
    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-md text-center w-[40vw] lg:w-[25vw]">
      <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-1">Air Conditioner Control</h2>
      <div className="text-xl font-bold mb-1 text-blue-600">{temperature}°C</div>
      <div className="flex justify-center mb-2">
        <button onClick={decreaseTemperature} className="px-2 py-1 mx-1 bg-blue-100 rounded">-</button>
        <button onClick={increaseTemperature} className="px-2 py-1 mx-1 bg-blue-100 rounded">+</button>
      </div>
      <div className="text-sm mb-3">
        <span>Speed: {speed === 1 ? 'Low' : speed === 2 ? 'Medium' : 'High'}</span>
        <button onClick={changeSpeed} className="ml-2 bg-blue-200 px-3 py-1 rounded">Change</button>
      </div>
      <button
        onClick={toggleAC}
        className={`px-3 py-1 rounded ${isOn ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
      >
        {isOn ? 'Turn Off' : 'Turn On'}
      </button>
    </div>
  );
};

export default ACControl;
