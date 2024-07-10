import express from 'express';
import { config, configDotenv } from 'dotenv';
import cors from 'cors';

import user from './routes/user';
import connectDB from '../config/db';
import cookieParser from 'cookie-parser';
import camp from './routes/camp';
import admin from './routes/admin'
import randomthing from './routes/randomthing'
import subFrontend from './routes/subFrontend'

config({ path: './config/config.env' });

connectDB();

const app = express();
app.use(cookieParser());
//Body parser
app.use(express.json());

app.use(cors());
app.use('/randomthing',randomthing)
app.use('/admin', admin)
app.use('/subFunction',subFrontend)



app.use('/camp', camp);
app.use('/api/v1/auth', user);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

process.on('unhandledRejection', (err: Error, Promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
//console.log('jjjjjjjjjjjjjjjjjjjbutfyiknjjjjj')