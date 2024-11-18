const mongoose = require('mongoose');

// Schema for Device Usage
const deviceUsageSchema = new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true,
    },
    action: {
        type: String,
        enum: ['on', 'off'],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

const DeviceUsage = mongoose.model('DeviceUsage', deviceUsageSchema);

module.exports = DeviceUsage;
