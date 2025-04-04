import React, { useState, useEffect } from 'react';
import Bottom from '../Components/bottom.jsx';
import Room from '../Components/Room.jsx';
import Bedroom from '../Components/Bedroom.jsx';
import LivingRoom from '../Components/LivingRoom.jsx';
import Kitchen from '../Components/Kitchen.jsx';
import Outdoor from '../Components/Outdoor.jsx';
import ACControl from '../Components/ACControl.jsx';
import Temp from '../Components/temp.jsx';
import FanControl from './Fan_Control.jsx';
import LightControl from './LightControl.jsx';
import LeftSection from './leftPC.jsx';
import './Dashboard.css';
import { initializeWebSocket, subscribeToMessages, sendMessage } from './websocketUtils';
import Left from './leftMOBILE.jsx';

const LeftMOBILE = () => {
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

  const isAcOn = acStatus[selectedRoom] ?? false;
  const roomTemperature = temperature[selectedRoom] ?? 16;

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
      sendMessage({ device: 'ac', status: '+', room: roomMapping[selectedRoom] });

      return updatedTemps;
    });
  };

  const decreaseTemperature = () => {
    setTemperature((prevTemp) => {
      const newTemp = Math.max(prevTemp[selectedRoom] - 1, 16);
      const updatedTemps = { ...prevTemp, [selectedRoom]: newTemp };
      localStorage.setItem('roomTemperatures', JSON.stringify(updatedTemps));
      sendMessage({ device: 'ac', status: '-', room: roomMapping[selectedRoom] });

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
    const userInput = prompt(`
      Enter initial temperature for ${selectedRoom} (16-30°C):
    `);
    const newTemp = parseInt(userInput, 10);
    if (newTemp >= 16 && newTemp <= 30) {
      setTemperature((prevTemp) => {
        const updatedTemps = { ...prevTemp, [selectedRoom]: newTemp };
        localStorage.setItem('roomTemperatures', JSON.stringify(updatedTemps));
        return updatedTemps;
      });
    } else {
      alert('Invalid temperature. Please enter a value between 16 and 30.');
    }
  };

  return (
    <div className="mt-[55px] min-h-full ">
      <div className="bg-white z-10 w-full fixed pl-5  dark:!bg-transparent ">
        <p className="text-gray-600 opacity-90 text-[20px] text-center dark:text-white ">
          {selectedRoom && `Controls - ${selectedRoom.replace(/([A-Z])/g, ' $1').trim()}`}
        </p>
        <Room onSelectedRoom={setSelectedRoom} />
      </div>
      <div className="deviceContrl flex flex-col gap-4 min-h-screen">
        <div className="-ml-[58px] mt-36">
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
        <div className="LightFanControl ml-3 flex flex-col gap-2">
          <FanControl />
          <LightControl />
        </div>
      </div>
    </div>
  );
};

export default LeftMOBILE;
