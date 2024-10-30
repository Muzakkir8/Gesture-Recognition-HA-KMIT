const mongoose = require('mongoose');

const connectUserDB = async () => {
    try {
        const mongoUserURI = process.env.MONGO_USER_URI || 'mongodb+srv://zeeshan:Zeeshan123%402023@cluster0.knc0r.mongodb.net/User?retryWrites=true&w=majority&appName=Cluster0'
        await mongoose.connect(mongoUserURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Adjust timeouts as needed
            socketTimeoutMS: 45000,
        });
        console.log('UserDB connected');
    } catch (err) {
        console.error('UserDB connection error:', err.message); // More detailed error handling
    }
};

const connectDevicesDB = async () => {
        const mongoDeviceURI = process.env.MONGO_DEVICE_URI || 'mongodb+srv://zeeshan:Zeeshan123%402023@cluster0.knc0r.mongodb.net/Devices?retryWrites=true&w=majority&appName=Cluster0'
        const devicesConnection=mongoose.createConnection(mongoDeviceURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Adjust timeouts as needed
            socketTimeoutMS: 45000,
        });
        devicesConnection.on('connected', () => {
            console.log('DevicesDB connected');
        });
    
        devicesConnection.on('error', (err) => {
            console.error('DevicesDB connection error:', err.message);
        });
    
        return devicesConnection; // Return the separate connection instance
};


module.exports = {connectUserDB,connectDevicesDB};
