const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Ensure that the URI has the correct format
        const mongoURI = process.env.MONGODB_URI

        await mongoose.connect(mongoURI, {
       
            serverSelectionTimeoutMS: 30000, 
            socketTimeoutMS: 45000,
        });
        
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};

module.exports = connectDB;
