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


const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

app.get('/api/devices/weeklyUsage', async (req, res) => {
    try {
        const usages = await DeviceUsage.find(); // Fetch usage records from the database
        const dailyUsage = Array(7).fill(0); // Initialize daily usage for 7 days

        usages.forEach((usage) => {
            const startTime = new Date(usage.startTime);
            const endTime = usage.endTime ? new Date(usage.endTime) : new Date();

            // Calculate the duration in hours
            const durationInMs = endTime - startTime;
            const durationInHours = Math.max(durationInMs / (1000 * 60 * 60), 0.01); // Minimum duration of 0.01 hours

            const startDay = startTime.getDay();
            const endDay = endTime.getDay();

            // If usage spans multiple days, distribute hours proportionally
            if (startDay !== endDay) {
                let remainingDuration = durationInHours;
                for (let i = startDay; i !== (endDay + 1) % 7; i = (i + 1) % 7) {
                    dailyUsage[i] += remainingDuration / (endDay - startDay + 1);
                    remainingDuration -= remainingDuration / (endDay - startDay + 1);
                }
            } else {
                dailyUsage[startDay] += durationInHours; // Same-day usage
            }
        });

        // Format data for the frontend
        const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weeklyUsage = dailyUsage.map((usage, index) => ({
            day: DAYS_OF_WEEK[index],
            usage: usage.toFixed(2), // Round to 2 decimal places
        }));

        return res.status(200).json(weeklyUsage);
    } catch (error) {
        console.error('Error calculating weekly usage:', error);
        return res.status(500).json({ message: 'Error calculating weekly usage', error: error.message });
    }
});

app.delete('/api/devices/clearUsage', async (req, res) => {
    try {
        await DeviceUsage.deleteMany({}); // Adjust based on your database schema
        res.status(200).send({ message: 'All usage data cleared successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to clear usage data.' });
    }
});




app.use('/api/auth', require('./routes/auth'));
app.use('/api/devices', require('./routes/devices'));




app.listen(PORT, '0.0.0.0', () => {
    console.log(`App listening on PORT:${PORT}`);
})
