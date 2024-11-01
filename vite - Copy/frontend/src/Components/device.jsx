import React, { useState } from 'react';

function Device() {
    // Define the allowed room names (consistency in naming)
    const allowedRooms = ['bedroom', 'kitchen', 'living room','livingroom']; // Using 'living room' consistently
    const [deviceName, setDeviceName] = useState('');

    const handleAddDevice = async (deviceType) => {
        const selectedRoom = prompt(`Enter the room name to add the ${deviceType} (e.g., 'Living Room', 'Bedroom', 'Kitchen'):`);
        
        if (selectedRoom) {
            const normalizedRoom = selectedRoom.trim().toLowerCase();
            if (!allowedRooms.includes(normalizedRoom)) {
                alert('Invalid room name. Please enter a valid room: Bedroom, Kitchen, Living Room.');
                return;
            }

            const normalizedDevice = deviceType.toLowerCase();

            try {
                const response = await fetch('http://localhost:8080/api/devices', { // Ensure this URL is correct
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: normalizedDevice, status: 'off', room: normalizedRoom }),
                });

                if (response.ok) {
                    alert(`${deviceType} added to ${selectedRoom}`);
                } else {
                    const result = await response.json();
                    alert(result.message || 'Failed to add device.');
                }
            } catch (error) {
                console.error('Error adding device:', error);
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Add Devices</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {['Light', 'Fan', 'Heater', 'Air Conditioner', 'Refrigerator', 'Television'].map((deviceType, index) => (
                    <div key={index} className="bg-white p-4 shadow rounded text-center">
                        <h2 className="font-semibold text-lg mb-2">{deviceType}</h2>
                        <button
                            onClick={() => handleAddDevice(deviceType)}
                            className="text-blue-500 hover:underline"
                        >
                            + Add Device
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Device;
