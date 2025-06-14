import mongoose from 'mongoose';

const RecruterSchema = new mongoose.Schema({

        name : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true,
            unique: true
        },
        age:{
            type: Number,
            required: true
        },
        password : {
            type: String,
            required: true
        }
});

export default mongoose.model('Recruter', RecruterSchema);
// This code defines a Mongoose schema for a Recruter model in a MongoDB database.