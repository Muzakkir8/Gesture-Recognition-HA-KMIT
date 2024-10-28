const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb+srv://akifali:Iotauth1@cluster0.lbilm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Ensure the correct URI is used
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Adjust timeouts as needed
            socketTimeoutMS: 45000,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message); // More detailed error handling
    }
};

module.exports = connectDB;
