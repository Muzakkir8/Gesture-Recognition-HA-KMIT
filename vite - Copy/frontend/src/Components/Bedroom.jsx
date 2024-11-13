import React, { useEffect, useState } from 'react';

function Bedroom() {
    const [devices, setDevices] = useState([]);
    const [deviceStates, setDeviceStates] = useState({});
    const [newDevice, setNewDevice] = useState('');
    const allowedDevices = ['fan', 'light', 'ac', 'heater'];
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                // Fetch devices for Bedroom
                const response = await fetch('http://localhost:8080/api/devices/bedroom');
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

        const socket = new WebSocket('ws://localhost:5001');
        setWs(socket);
        socket.onmessage = (event) => {
            const { device, status, room } = JSON.parse(event.data);

            // Check if the device is the one we care about and update its state
            if (room === 'bedroom' && deviceStates.hasOwnProperty(device)) {
                setDeviceStates((prevState) => ({
                    ...prevState,
                    [device]: status,
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
            if (ws && ws.readyState === WebSocket.OPEN) {
                const currentStatus = deviceStates[device.name];
                const newStatus = currentStatus ? 'off' : 'on';

                // Update local state first
                setDeviceStates((prevState) => ({
                    ...prevState,
                    [device.name]: !prevState[device.name], // Toggle the local state immediately
                }));

                // Send the updated status through WebSocket
                const message = {
                    device: device.name,
                    status: newStatus,
                    room: 'bedroom',
                };
                ws.send(JSON.stringify(message));

                // Send updated status to the API
                const response = await fetch(`http://localhost:8080/api/devices/${device._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus }),
                });

                if (!response.ok) {
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
                    body: JSON.stringify({ name: normalizedNewDevice, status: 'off', room: 'bedroom' }),
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
        <div className="p-6 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Bedroom</h2>
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
            <div className="grid grid-cols-1 gap-2 w-full max-w-lg">
                {devices.length > 0 ? (
                    devices.map((device) => (
                        <div key={device._id}
                             style={{
                                 display: "flex",
                                 justifyContent: "space-between",
                                 alignItems: "center",
                                 backgroundColor: deviceStates[device.name] ? "#527ff4" : "#d0d7e0",
                                 padding: "12px 15px",
                                 borderRadius: "12px",
                                 width: "95%",
                                 height:"65px",
                                 marginBottom: "16px",
                                 transition: "background-color 0.3s ease",
                             }}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <h3 style={{ margin: "0", fontSize: "1.2rem", color: "white" }}>
                                    {device.name.charAt(0).toUpperCase() + device.name.slice(1)}
                                </h3>
                            </div>

                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div
                                    onClick={() => toggleDevice(device)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        backgroundColor: deviceStates[device.name] ? "#3863ee" : "#b0bec5",
                                        padding: "5px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                        width: "70px",
                                        height: "38px",
                                        position: "relative",
                                        marginRight: "8px",
                                    }}
                                >
                                    <span
                                        style={{
                                            position: "absolute",
                                            left: deviceStates[device.name] ? "10px" : "34px",
                                            color: deviceStates[device.name] ? "white" : "#4b82f1",
                                            fontSize: "0.75rem",
                                            fontWeight: "bold",
                                            textTransform: "uppercase",
                                            transition: "left 0.3s, color 0.3s",
                                        }}
                                    >
                                        {deviceStates[device.name] ? "ON" : "OFF"}
                                    </span>
                                    <div
                                        style={{
                                            height: "33px",
                                            width: "28px",
                                            backgroundColor: "white",
                                            borderRadius: "6px",
                                            transition: "transform 0.3s ease",
                                            transform: deviceStates[device.name] ? "translateX(38px)" : "translateX(0)",
                                        }}
                                    ></div>
                                </div>

                                <button
                                    onClick={() => removeDevice(device)}
                                    style={{
                                        fontSize: "1.2rem", // Larger "X" size
                                        color: "#f44336",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500">No devices added yet.</div>
                )}
            </div>
        </div>
    );
}

export default Bedroom;
