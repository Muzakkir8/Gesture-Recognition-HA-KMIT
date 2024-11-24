const dotenv = require('dotenv').config();
const express = require('express')
const { connectUserDB, connectDevicesDB } = require('./config/db');
const cors = require('cors');
const initializeWebSocket = require('./websocket.js');
const DeviceUsage = require('./models/deviceUsage'); // Import the schema

// Call the function to start the server and WebSocket
initializeWebSocket();

const app = express();
PORT = 8080;


connectUserDB();
connectDevicesDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.get('/api/devices/calculateUsage', async (req, res) => {
    try {
        const usages = await DeviceUsage.find(); // Fetch usage records from the database

        if (!usages.length) {
            return res.status(404).json({ message: 'No device usage records found' });
        }

        // Aggregate usage data by device and room
        const aggregatedData = usages.reduce((acc, usage) => {
            const startTime = new Date(usage.startTime);
            const endTime = usage.endTime ? new Date(usage.endTime) : new Date();
            const durationInMs = endTime - startTime;
            const durationInHours = durationInMs / (1000 * 60 * 60); // Convert to hours
            const duration = durationInHours < 0.01 ? 0.01 : durationInHours; // Minimum duration

            // Ensure valid device name and room
            const deviceName = usage.deviceName || "Unknown Device";
            const room = usage.room || "Unknown Room";
            const key = `${deviceName} (${room})`; // Key for grouping

            acc[key] = (acc[key] || 0) + duration; // Aggregate duration
            return acc;
        }, {});

        // Convert aggregated data into an array format for the frontend
        const usageData = Object.keys(aggregatedData).map((key) => ({
            deviceRoomName: key, // e.g., "Fan (Living Room)"
            duration: aggregatedData[key].toFixed(2), // Total time in hours
        }));

        // Calculate total bill
        const totalDuration = usageData.reduce((total, usage) => total + parseFloat(usage.duration), 0);
        const ratePerHour = 5; // Example rate per hour
        const totalBill = (totalDuration * ratePerHour).toFixed(2);

        return res.status(200).json({
            usageData,
            totalDuration: totalDuration.toFixed(2),
            totalBill,
        });
    } catch (error) {
        console.error('Error calculating usage:', error);
        return res.status(500).json({ message: 'Error calculating usage', error: error.message });
    }
});




app.use('/api/auth', require('./routes/auth'));
app.use('/api/devices', require('./routes/devices'));




app.listen(PORT, '0.0.0.0', () => {
    console.log(`App listening on PORT:${PORT}`);
})
