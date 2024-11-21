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
        const usages = await DeviceUsage.find();

        if (!usages.length) {
            return res.status(404).json({ message: 'No device usage records found' });
        }

        const usageData = usages.map((usage) => {
            const startTime = new Date(usage.startTime);
            const endTime = usage.endTime ? new Date(usage.endTime) : new Date();
            const durationInMs = endTime - startTime;
            const durationInHours = durationInMs / (1000 * 60 * 60);
            const duration = durationInHours < 0.01 ? 0.01 : durationInHours;

            return {
                _id: usage._id,
                deviceName: usage.deviceName,
                room: usage.room,
                startTime: usage.startTime,
                endTime: usage.endTime,
                status: usage.status,
                duration: duration.toFixed(2)
            };
        });

        // Calculate total duration
        const totalDuration = usageData.reduce((total, usage) => total + parseFloat(usage.duration), 0).toFixed(2);
        const ratePerHour = 5; // Example rate per hour
        const totalBill = (parseFloat(totalDuration) * ratePerHour).toFixed(2);



        return res.status(200).json({
            usageData,
            totalDuration,
            totalBill
        });
        return res.status(200).json({ usages: usageData, totalDuration,totalBill });
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
