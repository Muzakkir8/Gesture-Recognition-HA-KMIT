import React, { useState, useEffect } from 'react';
import Room from '../Components/Room.jsx';
import Bedroom from '../Components/Bedroom.jsx';
import LivingRoom from '../Components/LivingRoom.jsx';
import Kitchen from '../Components/Kitchen.jsx';
import Outdoor from '../Components/Outdoor.jsx';
import ACControl from '../Components/ACControl.jsx';
import Temp from '../Components/temp.jsx';
import FanControl from './Fan_Control.jsx';
import LightControl from './LightControl.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState('LivingRoom');
  const [userName, setUserName] = useState('');
  const [ws, setWs] = useState(null);
  const [acStatus, setAcStatus] = useState({
    LivingRoom: false,
    Bedroom: false,
    Kitchen: false,
  });

  // Mapping of room names for consistency
  const roomMapping = {
    LivingRoom: 'livingroom',
    Bedroom: 'bedroom',
    Kitchen: 'kitchen',
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Load initial AC status for each room from localStorage
    const initialAcStatus = {
      LivingRoom: localStorage.getItem('LivingRoomAcStatus') === 'on',
      Bedroom: localStorage.getItem('BedroomAcStatus') === 'on',
      Kitchen: localStorage.getItem('KitchenAcStatus') === 'on',
    };
    setAcStatus(initialAcStatus);

    const socket = new WebSocket('ws://localhost:5001');
    setWs(socket);

    socket.onmessage = (event) => {
      const { device, status, room } = JSON.parse(event.data);
      const formattedRoom = Object.keys(roomMapping).find(
        (key) => roomMapping[key] === room
      );
      if (device === 'ac' && formattedRoom) {
        setAcStatus((prevStatus) => ({
          ...prevStatus,
          [formattedRoom]: status === 'on',
        }));
        localStorage.setItem(`${formattedRoom}AcStatus`, status); // Update localStorage
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
    const newStatus = !acStatus[selectedRoom];
    setAcStatus((prevStatus) => ({
      ...prevStatus,
      [selectedRoom]: newStatus,
    }));
    localStorage.setItem(`${selectedRoom}AcStatus`, newStatus ? 'on' : 'off'); // Save to localStorage

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({ device: 'ac', status: newStatus ? 'on' : 'off', room: roomMapping[selectedRoom] })
      );
    } else {
      console.log("WebSocket is not open.");
    }
  };

  const renderRoom = () => {
    switch (selectedRoom) {
      case 'LivingRoom':
        return <LivingRoom ws={ws} isAcOn={acStatus.LivingRoom} toggleAC={toggleAC} />;
      case 'Kitchen':
        return <Kitchen ws={ws} isAcOn={acStatus.Kitchen} toggleAC={toggleAC} />;
      case 'Bedroom':
        return <Bedroom ws={ws} isAcOn={acStatus.Bedroom} toggleAC={toggleAC} />;
      case 'Outdoor':
        return <Outdoor />;
      default:
        return <LivingRoom ws={ws} isAcOn={acStatus.LivingRoom} toggleAC={toggleAC} />;
    }
  };

  return (
    <div className="flex max-h-screen dark:bg-slate-900">
      <style>
        {`
          /* Hide scrollbar but keep scrolling */
          .hide-scrollbar {
            overflow-y: auto;
            scrollbar-width: none; /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}
      </style>

      <div className="flex flex-col w-full lg:w-[65vw] min-h-screen p-4">
        <div className="w-full max-w-[90vw] mx-auto mt-4 lg:max-w-[800px]">
          <h1 className="text-[24px] text-gray-800">
            Hey, <span className="font-bold">{userName || 'User'} 👋🏻</span> Welcome to Dashboard
          </h1>
          <p className="text-gray-600 opacity-60 text-[14px]">
            {selectedRoom && `You are viewing: ${selectedRoom.replace(/([A-Z])/g, ' $1').trim()}`}
          </p>
        </div>
        <div className="deviceControl">
          <div className="mt-6">
            <ACControl isOn={acStatus[selectedRoom]} toggleAC={toggleAC} />
          </div>
          <div className="LightFanControl">
            <FanControl />
            <LightControl/>
          </div>
            
        </div>


        </div>

        <div className="flex flex-col w-[32vw] bg-white dark:bg-slate-800 min-h-screen p-3 ml-auto">
          <Room onSelectedRoom={setSelectedRoom} />

          <div
            className="flex-grow dark:border-[1px] dark:border-slate-600 dark:bg-slate-800 w-full mx-auto rounded-lg p-4 hide-scrollbar"
            style={{ maxHeight: '55vh' }} // Updated maxHeight to limit scroll area
          >
            {renderRoom()}
          </div>

          <div className="w-full mx-auto flex justify-center mt-3"> {/* Updated width for Temp widget */}
            <Temp />
          </div>
        </div>
      </div>
      );
}

      export default Dashboard;
