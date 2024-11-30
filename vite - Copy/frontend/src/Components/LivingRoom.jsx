import React, { useEffect, useState } from 'react';
import { fetchDevices, toggleDevice, addDevice, removeDevice } from './deviceUtils';
import { initializeWebSocket, subscribeToMessages } from './websocketUtils';
import fan from '../assets/fan-tan.png'
import light from '../assets/idea.png'
import heater from '../assets/heater.png'
import ac from '../assets/air-conditioner.png'

function LivingRoom() {
    const [devices, setDevices] = useState([]);
    const [deviceStates, setDeviceStates] = useState({});
    const [newDevice, setNewDevice] = useState('');
    const allowedDevices = ['fan', 'light', 'ac', 'heater'];

    const deviceImages = {
        fan: fan,
        light: light,
        ac: ac,
        heater: heater,
    };


    const isGuest = window.location.pathname.includes('/guest');

    useEffect(() => {
        fetchDevices(setDevices, setDeviceStates, 'livingroom');

        const socket = initializeWebSocket();

        subscribeToMessages(({ device, status, room }) => {
            if (room === 'livingroom') {
                setDeviceStates((prevStates) => ({
                    ...prevStates,
                    [device]: status === 'on',
                }));
            }
        });
    }, []);

    return (
        <div className="lg:px-6 h-screen ">
            <h2 className="text-2xl font-bold mb-4">Living Room</h2>
            {!isGuest && (
                <div className="mb-4">
                    <input
                        type="text"
                        value={newDevice}
                        onChange={(e) => setNewDevice(e.target.value)}
                        placeholder="Add new device"
                        className="border p-2 rounded mr-2 bg-[#e9efff] text-black"
                    />
                    <button
                        onClick={() =>
                            addDevice(
                                newDevice,
                                allowedDevices,
                                devices,
                                setDevices,
                                setDeviceStates,
                                setNewDevice,
                                isGuest,
                                'livingroom'
                            )
                        }
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add Device
                    </button>
                </div>
            )}
            <div className=" grid grid-cols-1 gap-2 lg:w-full max-w-lg">
                {devices.length > 0 ? (
                    devices.map((device) => (
                        <div
                            key={device._id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: deviceStates[device.name] ? '#527ff4' : '#d0d7e0',
                                padding: '12px 15px',
                                borderRadius: '12px',
                                width: '95%',
                                height: '65px',
                                marginBottom: '16px',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img className='  w-5 opacity-40 mr-5 bg-white rounded-[14px] p-[5px]'
                                    src={deviceImages[device.name] }
                                    alt={`${device.name} icon`}
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        marginRight: '10px',
                                        borderRadius: '50%',
                                
                                
                                    }}
                                />
                                <h3 style={{ margin: '0', fontSize: '1.2rem', color: 'white' }}>
                                    {device.name.charAt(0).toUpperCase() + device.name.slice(1)}
                                </h3>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div
                                    onClick={() => toggleDevice(device, deviceStates, setDeviceStates, 'livingroom')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: deviceStates[device.name] ? '#3863ee' : '#b0bec5',
                                        padding: '5px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                        width: '70px',
                                        height: '38px',
                                        position: 'relative',
                                        marginRight: '8px',
                                    }}
                                >
                                    <span
                                        style={{
                                            position: 'absolute',
                                            left: deviceStates[device.name] ? '10px' : '38px',
                                            color: deviceStates[device.name] ? 'white' : '#4b82f1',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            transition: 'left 0.3s, color 0.3s',
                                        }}
                                    >
                                        {deviceStates[device.name] ? 'ON' : 'OFF'}
                                    </span>
                                    <div
                                        style={{
                                            height: '33px',
                                            width: '28px',
                                            backgroundColor: 'white',
                                            borderRadius: '6px',
                                            transition: 'transform 0.3s ease',
                                            transform: deviceStates[device.name] ? 'translateX(38px)' : 'translateX(0)',
                                        }}
                                    ></div>
                                </div>
                                {!isGuest && (
                                    <button
                                        onClick={() => removeDevice(device, setDevices, setDeviceStates, isGuest)}
                                        style={{
                                            fontSize: '1.2rem',
                                            color: '#f44336',
                                            border: 'none',
                                            background: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        x
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No devices available in the Living Room.</p>
                )}
            </div>
        </div>
    );
}

export default LivingRoom;
