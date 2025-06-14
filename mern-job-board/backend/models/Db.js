import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const MONGO_CONN = process.env.MONGO_CONN;

mongoose.connect("mongodb+srv://user-123:user123@cluster0.tmqltv4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log(`Connected to MongoDB on port ${PORT}`);
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });