
import dotenv from 'dotenv'
import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import {connection,pool} from './db/connection.js';


dotenv.config({
    path: './env'
})

const app = express();
app.use(cors())

// Function to connect Backend to Database


 async function initializeApp() {
    try {
        await connection();
        console.log('Database connected successfully!');

        // Start the Express server
        app.listen(process.env.PORT, () => {
            console.log('Express server listening on port', process.env.PORT);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        // Handle the error appropriately
    }
}

initializeApp();

pool.on('connection', (connections) => {
    console.log('Connected to MySQL server');
});

pool.on('error', (err) => {
    console.error('MySQL Pool Error:', err);
});

import auth from '../src/routes/authentication.js'
app.use('/authentication',auth )








