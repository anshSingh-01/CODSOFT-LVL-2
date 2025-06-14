import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import dotenv from 'dotenv';
import jobRoute from './routes/jobRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// connect to MongoDB
import './models/Db.js';

//middleware
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}` );
});

app.use('/joblo', authRoute);
app.use('/joblo/job',  jobRoute);
app.use('/joblo/user',  userRoute);