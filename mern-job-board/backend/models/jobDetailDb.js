import mongoose from 'mongoose';

const jobDetailSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    useEmail : {
        type: String,
    }
    ,
    postedDate: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('JobDetail', jobDetailSchema);
// This code defines a Mongoose schema for a JobDetail model in a MongoDB database.