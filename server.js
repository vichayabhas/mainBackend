const express = require('express');
const dotenv = require('dotenv');

const auth = require('./routes/user')
const connectDB = require('./config/db');
const cookieParser=require('cookie-parser');
const camp = require('./routes/camp')


dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();
app.use(cookieParser());
//Body parser
app.use(express.json());

/*app.get('/', (req,res) => {
    //1. res.send('<h1>Hello from express<h1>');
    //2. res.send({name:'Brad'});
    //3. res.json({name:'Brad'});
    //4. res.sendStatus(400);
    //5. res.status(400).json({success:false});
    res.status(200).json({success:true, data:{id:1}});
});*/

app.use('/camp',camp);
app.use('/user',auth);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ',process.env.NODE_ENV, ' mode on port ', PORT));

process.on('unhandledRejection',(err,Promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});