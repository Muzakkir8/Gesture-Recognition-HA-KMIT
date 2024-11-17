import React from 'react';

const ACControl = ({ isOn, toggleAC, temperature, setTemperature, speed, changeSpeed }) => {
  const increaseTemperature = () => setTemperature((prevTemp) => Math.min(prevTemp + 1, 30));
  const decreaseTemperature = () => setTemperature((prevTemp) => Math.max(prevTemp - 1, 16));

  return (
    <div className="ml-20 p-5 bg-white dark:bg-slate-800 rounded-lg text-center w-[40vw] lg:w-[25vw]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Air Conditioner Control</h2>

      {/* Temperature Display */}
      <div className="text-3xl font-bold mb-4 text-blue-600">{temperature}°C</div>

      {/* Temperature Adjustment Buttons */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={decreaseTemperature}
          className="px-4 py-2 text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition"
        >
          -
        </button>
        <button
          onClick={increaseTemperature}
          className="px-4 py-2 text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition"
        >
          +
        </button>
      </div>

      {/* Speed Control */}
      <div className="text-sm font-medium mb-4">
        <span>Speed: </span>
        <span className="text-blue-600">{speed === 1 ? 'Low' : speed === 2 ? 'Medium' : 'High'}</span>
        <button
          onClick={changeSpeed}
          className="ml-3 px-4 py-1 rounded-full bg-blue-200 text-blue-800 hover:bg-blue-300 transition font-semibold"
        >
          Change
        </button>
      </div>

      {/* AC Toggle Button */}
      <button
        onClick={toggleAC}
        className={`w-full py-2 rounded-full font-bold transition ${
          isOn ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }`}
      >
        {isOn ? 'Turn Off' : 'Turn On'}
      </button>
    </div>
  );
};

export default ACControl;
