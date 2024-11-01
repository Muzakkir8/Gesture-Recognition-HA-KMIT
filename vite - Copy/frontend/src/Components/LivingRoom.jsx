import React, { useEffect, useState } from 'react';

function LivingRoom() {
    const [devices, setDevices] = useState([]);
    const [deviceStates, setDeviceStates] = useState({});
    const [newDevice, setNewDevice] = useState('');
    const allowedDevices = ['fan', 'light', 'ac', 'heater'];

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                // Fetch devices for LivingRoom
                const response = await fetch('http://localhost:8080/api/devices/livingroom');
                if (response.ok) {
                    const data = await response.json();
                    setDevices(data);

                    // Initialize device states based on fetched data
                    const initialStates = {};
                    data.forEach((device) => {
                        initialStates[device.name] = device.status === 'on';
                    });
                    setDeviceStates(initialStates);
                } else {
                    console.error('Failed to fetch devices. Status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };
        fetchDevices();
    }, []);

    const toggleDevice = async (device) => {
        try {
            // Toggle the device status
            const response = await fetch(`http://localhost:8080/api/devices/${device._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: deviceStates[device.name] ? 'off' : 'on' }),
            });
            if (response.ok) {
                // Update device states locally
                setDeviceStates((prevState) => ({
                    ...prevState,
                    [device.name]: !prevState[device.name],
                }));
            } else {
                console.error('Failed to toggle device. Status:', response.status);
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
                  body: JSON.stringify({ name: normalizedNewDevice, status: 'off', room: 'livingroom' }), // Changed to lowercase
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
                console.error('Failed to remove device. Status:', response.status);
            }
        } catch (error) {
            console.error('Error removing device:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Living Room</h2>
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
                    devices.map((device) => (
                        <div key={device._id} className="bg-white p-4 shadow rounded">
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

export default LivingRoom;
