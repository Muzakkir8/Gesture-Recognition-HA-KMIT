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
import { initializeWebSocket, subscribeToMessages, sendMessage } from './websocketUtils';

const Dashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState('LivingRoom');
  const [userName, setUserName] = useState('');
  const [ws, setWs] = useState(null);
  const [acStatus, setAcStatus] = useState({
    LivingRoom: false,
    Bedroom: false,
    Kitchen: false,
  });
  const [temperature, setTemperature] = useState({
    LivingRoom: 16,
    Bedroom: 20,
    Kitchen: 18,
  });

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

    const initialAcStatus = {
      LivingRoom: localStorage.getItem('LivingRoomAcStatus') === 'on',
      Bedroom: localStorage.getItem('BedroomAcStatus') === 'on',
      Kitchen: localStorage.getItem('KitchenAcStatus') === 'on',
    };
    setAcStatus(initialAcStatus);

    const socket = initializeWebSocket();
    subscribeToMessages(({ device, status, room }) => {
      const formattedRoom = Object.keys(roomMapping).find(
        (key) => roomMapping[key] === room
      );
      if (device === 'ac' && formattedRoom) {
        setAcStatus((prevStatus) => ({
          ...prevStatus,
          [formattedRoom]: status === 'on',
        }));
        localStorage.setItem(`${formattedRoom}AcStatus`, status);
      }
    });
  }, []);
  useEffect(() => {
    const storedTemps = JSON.parse(localStorage.getItem('roomTemperatures'));
    if (storedTemps) {
      setTemperature(storedTemps);
    }
  }, []);

  const toggleAC = () => {
    const newStatus = !acStatus[selectedRoom];
    setAcStatus((prevStatus) => ({
      ...prevStatus,
      [selectedRoom]: newStatus,
    }));
    localStorage.setItem(`${selectedRoom}AcStatus`, newStatus ? 'on' : 'off');
    sendMessage({ device: 'ac', status: newStatus ? 'on' : 'off', room: roomMapping[selectedRoom] });
  };

  
  

  const increaseTemperature = () => {
    setTemperature((prevTemp) => {
      const newTemp = Math.min(prevTemp[selectedRoom] + 1, 30);
      const updatedTemps = { ...prevTemp, [selectedRoom]: newTemp };
      localStorage.setItem('roomTemperatures', JSON.stringify(updatedTemps));
      sendMessage({ device: 'ac', status:'+', room: roomMapping[selectedRoom] });

      return updatedTemps;
    });
  };

  const decreaseTemperature = () => {
    setTemperature((prevTemp) => {
      const newTemp = Math.max(prevTemp[selectedRoom] - 1, 16);
      const updatedTemps = { ...prevTemp, [selectedRoom]: newTemp };
      localStorage.setItem('roomTemperatures', JSON.stringify(updatedTemps));
      sendMessage({ device: 'ac', status:'-', room: roomMapping[selectedRoom] });

      return updatedTemps;
    });
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
  const setInitialTemperature = () => {
    const userInput = prompt(
      `Enter initial temperature for ${selectedRoom} (16-30°C):`
    );
    const newTemp = parseInt(userInput, 10);
    if (newTemp >= 16 && newTemp <= 30) {
      setTemperature((prevTemp) => {
        const updatedTemps = { ...prevTemp, [selectedRoom]: newTemp };
        localStorage.setItem(
          'roomTemperatures',
          JSON.stringify(updatedTemps)
        );
        return updatedTemps;
      });
    } else {
      alert('Invalid temperature. Please enter a value between 16 and 30.');
    }
  };

  return (
    <div className="flex max-h-screen dark:bg-slate-900">
      <style>
        {`
          .hide-scrollbar {
            overflow-y: auto;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
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
            <ACControl
              isOn={acStatus[selectedRoom]}
              toggleAC={toggleAC}
              temperature={temperature[selectedRoom]}
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

      <div className="flex flex-col w-[32vw] bg-white dark:bg-slate-800 min-h-screen p-3 ml-auto">
        <Room onSelectedRoom={setSelectedRoom} />
        <div
          className="flex-grow dark:border-[1px] dark:border-slate-600 dark:bg-slate-800 w-full mx-auto rounded-lg p-4 hide-scrollbar"
          style={{ maxHeight: '55vh' }}
        >
          {renderRoom()}
        </div>
        <div className="w-full mx-auto flex justify-center mt-3">
          <Temp />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
