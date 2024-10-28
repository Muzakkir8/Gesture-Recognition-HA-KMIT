const express=require('express')
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
PORT=8000

dotenv.config()

connectDB()


app.use(cors());
app.use(express.json({ extended: false }));



app.use('/api/auth', require('./routes/auth'));


app.listen(PORT,()=>{
    console.log(`App listening on PORT ${PORT}`);
})