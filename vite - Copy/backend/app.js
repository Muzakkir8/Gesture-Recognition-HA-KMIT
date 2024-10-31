const dotenv = require('dotenv').config();
const express=require('express')
const {connectUserDB,connectDevicesDB}= require('./config/db');
const cors = require('cors');

const app = express();
PORT= 8080;


connectUserDB();
connectDevicesDB();

app.use(cors());
app.use(express.json({ extended: false }));



app.use('/api/auth', require('./routes/auth'));


app.listen(PORT,'0.0.0.0',()=>{
    console.log(`App listening on PORT:${PORT}`);
})