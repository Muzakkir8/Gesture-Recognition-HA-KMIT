import React, { useState, useEffect } from 'react';
import ACControl from '../Components/ACControl.jsx';
import { sendMessage } from './websocketUtils';

const Dashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState('LivingRoom');
  const [acStatus, setAcStatus] = useState({
    LivingRoom: false,
    Bedroom: false,
    Kitchen: false,
  });
  const [temperature, setTemperature] = useState({
    LivingRoom: 20,
    Bedroom: 22,
    Kitchen: 24,
  });

  const roomMapping = {
    LivingRoom: 'livingroom',
    Bedroom: 'bedroom',
    Kitchen: 'kitchen',
  };

  useEffect(() => {
    const storedTemps = JSON.parse(localStorage.getItem('roomTemperatures'));
    if (storedTemps) {
      setTemperature(storedTemps);
    }
  }, []);

  useEffect(() => {
    const initialAcStatus = {
      LivingRoom: localStorage.getItem('LivingRoomAcStatus') === 'on',
      Bedroom: localStorage.getItem('BedroomAcStatus') === 'on',
      Kitchen: localStorage.getItem('KitchenAcStatus') === 'on',
    };
    setAcStatus(initialAcStatus);
  }, []);

  const toggleAC = () => {
    const newStatus = !acStatus[selectedRoom];
    setAcStatus((prevStatus) => ({
      ...prevStatus,
      [selectedRoom]: newStatus,
    }));
    localStorage.setItem(
      `${selectedRoom}AcStatus`,
      newStatus ? 'on' : 'off'
    );
    sendMessage({
      device: 'ac',
      status: newStatus ? 'on' : 'off',
      room: roomMapping[selectedRoom],
    });
  };

  const increaseTemperature = () => {
    setTemperature((prevTemp) => {
      const newTemp = Math.min(prevTemp[selectedRoom] + 1, 30);
      const updatedTemps = { ...prevTemp, [selectedRoom]: newTemp };
      localStorage.setItem('roomTemperatures', JSON.stringify(updatedTemps));
      return updatedTemps;
    });
  };

  const decreaseTemperature = () => {
    setTemperature((prevTemp) => {
      const newTemp = Math.max(prevTemp[selectedRoom] - 1, 16);
      const updatedTemps = { ...prevTemp, [selectedRoom]: newTemp };
      localStorage.setItem('roomTemperatures', JSON.stringify(updatedTemps));
      return updatedTemps;
    });
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
    <div>
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
  );
};

export default Dashboard;
