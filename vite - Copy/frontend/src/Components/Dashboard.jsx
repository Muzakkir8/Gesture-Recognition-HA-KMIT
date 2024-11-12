// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Room from '../Components/Room.jsx';
import Bedroom from '../Components/Bedroom.jsx';
import LivingRoom from '../Components/LivingRoom.jsx';
import Kitchen from '../Components/Kitchen.jsx';
import Outdoor from '../Components/Outdoor.jsx';
import ACControl from '../Components/ACControl.jsx';
import Temp from '../Components/temp.jsx';

const Dashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState('LivingRoom');
  const [userName, setUserName] = useState('');
  const [ws, setWs] = useState(null);
  const [isAcOn, setIsAcOn] = useState(false); 

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const socket = new WebSocket('ws://localhost:5001');
    setWs(socket);

    socket.onmessage = (event) => {
      const { device, status, room } = JSON.parse(event.data);
      if (room === 'livingroom' && device === 'ac') {
        
        setIsAcOn(status === 'on');
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setTimeout(() => setWs(new WebSocket('ws://localhost:5001')), 5000);
    };

    return () => socket.close();
  }, []);

  const toggleAC = () => {
    const newStatus = isAcOn ? 'off' : 'on';
    setIsAcOn(!isAcOn);
    
    
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ device: 'ac', status: newStatus, room: 'livingroom' }));
    }
  };

  const renderRoom = () => {
    switch (selectedRoom) {
      case 'LivingRoom':
        return <LivingRoom ws={ws} isAcOn={isAcOn} toggleAC={toggleAC} />;
      case 'Kitchen':
        return <Kitchen />;
      case 'Bedroom':
        return <Bedroom />;
      case 'Outdoor':
        return <Outdoor />;
      default:
        return <LivingRoom ws={ws} isAcOn={isAcOn} toggleAC={toggleAC} />;
    }
  };

  return (
    <div className="flex max-h-screen dark:bg-slate-900">
      {/* Main Section - Temperature, Humidity, Greeting, and AC Control */}
      <div className="flex flex-col w-full lg:w-[65vw] min-h-screen p-6 relative">
        
        {/* Greeting at the top */}
        <div className="w-full max-w-[90vw] mx-auto mt-6 lg:max-w-[800px]">
          <h1 className="text-[28px] text-gray-800">
            Hey, <span className="font-bold">{userName || 'User'} 👋🏻</span> Welcome to Dashboard
          </h1>
          <p className="text-gray-600 opacity-60 text-[16px]">Have a nice day!</p>
        </div>

        {/* AC Control Widget */}
        <div className="mt-8">
          <ACControl isOn={isAcOn} toggleAC={toggleAC} />
        </div>

        {/* Temperature Widget at the Bottom Right */}
        <div className="absolute bottom-16 right-6">
          <Temp />
        </div>
      </div>

      {/* Right Section - Room Selection and Device Content */}
      <div className="flex flex-col w-[35vw] bg-white dark:bg-slate-800 min-h-screen p-6 overflow-y-auto">
        
        {/* Room Selection */}
        <Room onSelectedRoom={setSelectedRoom} />

        {/* Room Content */}
        <div className="dark:border-[1px] dark:border-slate-600 dark:bg-slate-800 w-full mx-auto rounded-lg p-6 mt-4">
          {renderRoom()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
