
import Job from '../models/jobDetailDb.js';
import User from '../models/userDb.js';
import Recruter from '../models/recruterDb.js';
import SaveJob from '../models/savedJob.js';
import Application from '../models/appliedJobs.js';
export const JobAvailable = (req , res) => {

    const { jobTitle, location, salary, companyName } = req.body;

    if (!jobTitle || !location || !salary || !companyName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newJob = new Job({
            jobTitle,
            location,
            salary,
            companyName,
            jobDescription: req.body.jobDescription || ''
        });

        newJob.save()
            .then(() => res.status(201).json({ message: "Job posted successfully" }))
            .catch(err => res.status(500).json({ message: "Error posting job", error: err.message }));
    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const showAppliedJobs = async (req, res) => {
    const { _id } = req.params;

    try {
        const jobs = await Job.find({ _id: _id });
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this user" });
        }
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllJobs = async (req, res) => {

    try {
        const jobs = await Job.find();
        console.log("Jobs fetched:", jobs);
        res.status(200).json({jobs});
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}




export const UpdateProfile  =  async (req, res) => {
    const { email, name, age } = req.body;
    if (!email || !name || !age) return res.status(400).json({ message: "All fields are required" });
    try {
        const updated = await User.findOneAndUpdate(
            { email },
            { name, age },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Recruiter not found" });
        res.json({ message: "Profile updated!", recruiter: updated });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const SavedJobs = async (req, res) => {
    const { _id, email , userEmail } = req.body;
    console.log("Saving job :", req.body);
    if (!_id || !email) {
        return res.status(400).json({ message: "Job ID and User email are required" });
    }
    console.log("Saving job with ID:", _id, "for user:", email);
    try {
        // Find the job that matches both _id and useEmail (recruiter email)
        const job = await Job.findOne({ _id ,  useEmail: email });
        if (!job) {
            return res.status(404).json({ message: "Job not found with given ID and email" });
        }

        // Save this job into SavedJob DB (assuming SavedJob schema has jobId and userEmail fields)
        const _job =  {
            useEmail: email,
            userEmail : userEmail,
            jobTitle: job.jobTitle,
            jobDescription: job.jobDescription,
            location: job.location,
            salary: job.salary,
            companyName: job.companyName,
            postedDate : new Date(), // Assuming you want to save the date when the job was saved
        }
    
        const savedJob = new SaveJob(_job);
        await savedJob.save();

        res.status(200).json({ message: "Job saved successfully", job });
    } catch (error) {
        console.error("Error saving job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const GetProfile = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "user not found" });
        res.json({
            name: user.name,
            email: user.email,
            age: user.age
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}


export const GetAllSavedJobs = async (req, res) => {

        const {email } = req.body;
        if(!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        try{

        const savedJobs = await SaveJob.find({userEmail : email});
        if (!savedJobs || savedJobs.length === 0) {
            return res.status(404).json({ message: "No saved jobs found" });
        }
        res.status(200).json({message: "fetched Successfully" ,  jobs : savedJobs});
        }
        catch(err){
            console.error("Error fetching saved jobs:", err);
            res.status(500).json({ message: "Internal server error" });
        }

}

export const GetAppliedJobs = async (req, res) => {
        const {userEmail} = req.body;
        if(!userEmail) {
            return res.status(400).json({ message: "Email is required" });
        }
    try{
            const _appliedJobs = await Application.find({userEmail : userEmail});
            if (!_appliedJobs || _appliedJobs.length === 0) {
                return res.status(404).json({ message: "No applied jobs found" });
            }
            res.status(200).json({message: "fetched Successfully" ,  jobs : _appliedJobs});
    }
    catch(err){
            console.error("Error fetching applied jobs:", err);
            res.status(500).json({ message: "Internal server error" });
        }

}

export const AppliedJobs = async (req, res) => {
const { _id, useEmail , userEmail } = req.body;
    console.log("Appling job :", req.body);
    if (!_id || !useEmail) {
        return res.status(400).json({ message: "Job ID and User email are required" });
    }
    console.log("Saving job with ID:", _id, "for user:", useEmail);
    try {
        // Find the job that matches both _id and useEmail (recruiter email)
        const job = await Job.findOne({ _id ,  useEmail:useEmail });
        if (!job) {
            return res.status(404).json({ message: "Job not found with given ID and email" });
        }

        const user = await User.findOne({email : userEmail});

        // Save this job into SavedJob DB (assuming SavedJob schema has jobId and userEmail fields)
        const _job =  {
            useEmail: useEmail,
            userEmail : userEmail,
            jobTitle: job.jobTitle,
            jobDescription: job.jobDescription,
            salary: job.salary,
            location: job.location,
            salary: job.salary,
            name : user.name,
            age : user.age,
            companyName: job.companyName,
           
        }
    
        let appliedJob = new Application(_job);
        await appliedJob.save();

        res.status(200).json({ message: "Job Applied successfully", job });
    } catch (error) {
        console.error("Error saving job:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

