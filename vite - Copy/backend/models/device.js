const mongoose=require('mongoose');
const { connectDevicesDB } = require('../config/db');
const devicesConnection=connectDevicesDB();
DeviceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})
// models/device.js
module.exports = devicesConnection.model('Device', DeviceSchema);
