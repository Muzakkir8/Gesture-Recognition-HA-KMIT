const express = require('express');
const router = express.Router();
const Device = require('../models/device');
const DeviceUsage = require('../models/deviceUsage'); // Import the schema
// GET all devices for a specific room
router.get('/:room', async (req, res) => {
    const { room } = req.params;
    try {
        const devices = await Device.find({ room });
        res.json(devices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching devices', error: error.message });
    }
});

// POST to add a new device
router.post('/', async (req, res) => {
    const { name, status, room } = req.body;
    try {
        // Check if the device already exists in the room
        const existingDevice = await Device.findOne({ name, room });
        if (existingDevice) {
            return res.status(400).json({ message: 'Device already exists in this room' });
        }

        const newDevice = new Device({ name, status, room, lastUpdated: new Date() });
        await newDevice.save();
        res.status(201).json({ message: 'Device added successfully', device: newDevice });
    } catch (error) {
        res.status(500).json({ message: 'Error adding device', error: error.message });
    }
});

// PUT to update device status
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedDevice = await Device.findByIdAndUpdate(
            id,
            { status, lastUpdated: new Date() },
            { new: true }
        );
        if (!updatedDevice) {
            return res.status(404).json({ message: 'Device not found' });
        }
        res.json({ message: 'Device status updated', device: updatedDevice });
    } catch (error) {
        res.status(500).json({ message: 'Error updating device', error: error.message });
    }
});

// DELETE to remove a device
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDevice = await Device.findByIdAndDelete(id);
        if (!deletedDevice) {
            return res.status(404).json({ message: 'Device not found' });
        }
        res.json({ message: 'Device removed', device: deletedDevice });
    } catch (error) {
        res.status(500).json({ message: 'Error removing device', error: error.message });
    }
});




// Toggle Device Endpoin

router.post('/toggleDevice', async (req, res) => {
    const { deviceName, room, status } = req.body;

    try {
        // Update the device status
        const updatedDevice = await Device.findOneAndUpdate(
            { name: deviceName, room },
            { status, lastUpdated: new Date() },
            { new: true }
        );

        if (!updatedDevice) {
            return res.status(404).json({ message: 'Device not found.' });
        }

        if (status === 'on') {
            // Create a new usage log for devices turned ON
            const newUsage = new DeviceUsage({
                deviceName,
                room,
                startTime: new Date(),
                status: 'on',
            });
            await newUsage.save();
        } else if (status === 'off') {
            // Update the last ON log with endTime
            const lastUsage = await DeviceUsage.findOne({
                deviceName,
                room,
                status: 'on',
                endTime: null,
            }).sort({ startTime: -1 });

            if (lastUsage) {
                lastUsage.endTime = new Date();
                lastUsage.status = 'off';
                await lastUsage.save();
            }
        }

        return res.status(200).json({ message: `Device ${status}`, device: updatedDevice });
    } catch (error) {
        console.error('Error in toggleDevice:', error.message);
        return res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
});



module.exports = router;
