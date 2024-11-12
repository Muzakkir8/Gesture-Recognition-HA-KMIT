const mongoose = require('mongoose');

const connectUserDB = async () => {
    try {
        const mongoUserURI = process.env.MONGO_USER_URI || 'mongodb+srv://zeeshan:Zeeshan123%402023@cluster0.knc0r.mongodb.net/User?retryWrites=true&w=majority&appName=Cluster0';
        
        // Connect once for the user database
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(mongoUserURI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
            console.log('UserDB connected');
        } else {
            console.log('UserDB already connected');
        }
    } catch (err) {
        console.error('UserDB connection error:', err.message); // More detailed error handling
    }
};

const connectDevicesDB = async () => {
    try {
        const mongoDeviceURI = process.env.MONGO_DEVICE_URI || 'mongodb+srv://zeeshan:Zeeshan123%402023@cluster0.knc0r.mongodb.net/Devices?retryWrites=true&w=majority&appName=Cluster0';

        // Create a separate connection for the devices database
        const devicesConnection = mongoose.createConnection(mongoDeviceURI, {
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000,
        });

        devicesConnection.on('connected', () => {
            console.log('DevicesDB connected');
        });

        devicesConnection.on('error', (err) => {
            console.error('DevicesDB connection error:', err.message);
        });

        return devicesConnection; // Return the separate connection instance
    } catch (err) {
        console.error('DevicesDB connection error:', err.message);
    }
};

module.exports = { connectUserDB, connectDevicesDB };