import React, { useEffect, useState } from 'react';

function Outdoor() {
    const [devices, setDevices] = useState([]);
    const [deviceStates, setDeviceStates] = useState({});
    const [newDevice, setNewDevice] = useState('');
    const allowedDevices = ['fan', 'light', 'ac', 'heater'];
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/devices/outdoor'); // Correct endpoint
                if (response.ok) {
                    const data = await response.json();
                    setDevices(data);
                    const initialStates = {};
                    data.forEach((device) => {
                        initialStates[device.name] = device.status === 'on';
                    });
                    setDeviceStates(initialStates);
                } else {
                    console.error('Failed to fetch devices');
                }
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };
        fetchDevices();
        const socket = new WebSocket('ws://localhost:5001');
        setWs(socket);
        socket.onmessage = (event) => {
            const { device, status,room } = JSON.parse(event.data);
        
            // Check if the device is the one we care about and update its state
            if (room === 'outoor' && deviceStates.hasOwnProperty(device)) {
                setDeviceStates((prevState) => ({
                    ...prevState,              // Spread the previous state
                    [device]: status,          // Update only the specific device's state
                }));
            }
        };
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
          };
          socket.onclose = () => {
            console.log("WebSocket connection closed");
            setTimeout(() => setWs(new WebSocket('ws://localhost:5001')), 5000); // Reconnect after 5 seconds
          };
          return () => socket.close();
    }, []);

   
    const toggleDevice = async (device) => {
        try {
            // Check if WebSocket is open
            if (ws && ws.readyState === WebSocket.OPEN) {
                // Get the current status of the device from deviceStates
                const currentStatus = deviceStates[device.name];
                
                // Toggle the status
                const newStatus = currentStatus ? 'off' : 'on';
    
                // Prepare the message with room information and device status
                const message = {
                    device: device.name,        // Device name (e.g., 'light')
                    status: newStatus,          // New status ('on' or 'off')
                    room: 'outdoor',            // Room name (you can set it dynamically if needed)
                };
    
                // Send the updated status to the WebSocket server with room info
                ws.send(JSON.stringify(message));
    
                // Send the updated status to the backend (API)
                const response = await fetch(`http://localhost:8080/api/devices/${device._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus }),
                });
    
                // Check if the API request was successful
                if (response.ok) {
                    // Update the local state with the new status for the specific device
                    setDeviceStates((prevState) => ({
                        ...prevState,
                        [device.name]: !prevState[device.name], // Toggle the local state
                    }));
                } else {
                    console.error('Failed to toggle device');
                }
            } else {
                console.error('WebSocket is not open');
            }
        } catch (error) {
            console.error('Error toggling device:', error);
        }
    };

    const addDevice = async () => {
        const normalizedNewDevice = newDevice.toLowerCase();
        if (normalizedNewDevice && allowedDevices.includes(normalizedNewDevice) && !devices.some((d) => d.name === normalizedNewDevice)) {
            try {
                const response = await fetch('http://localhost:8080/api/devices', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: normalizedNewDevice, status: 'off', room: 'outdoor' }),
                });
                if (response.ok) {
                    const result = await response.json();
                    setDevices((prevDevices) => [...prevDevices, result.device]);
                    setDeviceStates((prevState) => ({
                        ...prevState,
                        [normalizedNewDevice]: false,
                    }));
                    setNewDevice('');
                } else {
                    alert('Failed to add device.');
                }
            } catch (error) {
                console.error('Error adding device:', error);
            }
        } else {
            alert('Please enter a valid device: fan, light, AC, or heater.');
        }
    };

    const removeDevice = async (device) => {
        try {
            const response = await fetch(`http://localhost:8080/api/devices/${device._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setDevices((prevDevices) => prevDevices.filter((d) => d._id !== device._id));
                setDeviceStates((prevState) => {
                    const newState = { ...prevState };
                    delete newState[device.name];
                    return newState;
                });
            } else {
                console.error('Failed to remove device');
            }
        } catch (error) {
            console.error('Error removing device:', error);
        }
    };

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Outdoor</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={newDevice}
                    onChange={(e) => setNewDevice(e.target.value)}
                    placeholder="Add new device"
                    className="border p-2 rounded mr-2"
                />
                <button onClick={addDevice} className="bg-blue-500 text-white py-1 px-4 rounded">
                    Add Device
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {devices.length > 0 ? (
                    devices.map((device, index) => (
                        <div key={index} className="bg-white p-4 shadow rounded">
                            <h2 className="font-semibold text-lg capitalize text-center">{device.name}</h2>
                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={() => toggleDevice(device)}
                                    className="bg-blue-500 text-white py-1 px-4 rounded mr-2"
                                >
                                    {deviceStates[device.name] ? 'On' : 'Off'}
                                </button>
                                <button
                                    onClick={() => removeDevice(device)}
                                    className="bg-red-500 text-white py-1 px-4 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No devices added yet.</p>
                )}
            </div>
        </div>
    );
}

export default Outdoor;