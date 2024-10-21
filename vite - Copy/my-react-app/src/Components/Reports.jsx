import React, { useState } from 'react';

const RemoteControl = () => {
  const [carStatus, setCarStatus] = useState('Stopped');

  const handleControl = (command) => {
    setCarStatus(command);
    console.log(`Car is now: ${command}`);
    // Here, you could send the command to the actual RC car through WebSockets, HTTP request, or Bluetooth.
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">RC Car Remote Control</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => handleControl('Moving Forward')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded col-start-2"
        >
          Forward
        </button>

        <button
          onClick={() => handleControl('Turning Left')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Left
        </button>
        
        <button
          onClick={() => handleControl('Turning Right')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Right
        </button>

        <button
          onClick={() => handleControl('Moving Backward')}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded col-start-2"
        >
          Backward
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleControl('Stopped')}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Stop
        </button>

        <button
          onClick={() => handleControl('Started')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Start
        </button>
      </div>

      <div className="mt-8 text-xl font-semibold text-gray-800 dark:text-white">
        Car Status: {carStatus}
      </div>
    </div>
  );
};

export default RemoteControl;
