const dotenv = require('dotenv').config();
const express=require('express')
const {connectUserDB,connectDevicesDB}= require('./config/db');
const cors = require('cors');
const initializeWebSocket = require('./websocket.js');

// Call the function to start the server and WebSocket
initializeWebSocket();

const app = express();
PORT= 8080;


connectUserDB();
connectDevicesDB();

app.use(cors());
app.use(express.json({ extended: false }));



app.use('/api/auth', require('./routes/auth'));
app.use('/api/devices', require('./routes/devices'));



app.listen(PORT,'0.0.0.0',()=>{
    console.log(`App listening on PORT:${PORT}`);
})