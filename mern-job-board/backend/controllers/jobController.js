import  Job from '../models/jobDetailDb.js'
import Applications from '../models/appliedJobs.js';
import User from '../models/userDb.js';
// Function to create a new job
export const createJob = async (req, res) => {
    const { jobTitle, jobDescription, location, salary, companyName, useEmail } = req.body;
    console.log(req.body);

    if (!jobTitle || !jobDescription || !location || !salary || !companyName || !useEmail) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newJob = new Job({
            jobTitle,
            jobDescription,
            location,
            salary,
            companyName,
            useEmail // This field links the job to the recruiter
        });

        await newJob.save();
        res.status(201).json({ message: "Job created successfully", job: newJob });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};




export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getJobById = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateJob = async (req, res) => {
    const { id } = req.params;
   const { jobTitle, jobDescription, location, salary, companyName } = req.body;

    try {
        const job = await Job.findByIdAndUpdate(id, {
           jobTitle, jobDescription, location, salary, companyName
        }, { new: true });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job updated successfully", job });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const searchJobs = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        const jobs = await Job.find({
            $or: [
                { jobTitle: { $regex: query, $options: 'i' } },
                { jobDescription: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } },
                { salary: { $regex: query, $options: 'i' } },
                { companyName: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error searching jobs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getJobsByCompany = async (req, res) => {
    const { company } = req.params;

    try {
        const jobs = await Job.find({ company: { $regex: company, $options: 'i' } });
        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this company" });
        }
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs by company:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getJobsByLocation = async (req, res) => {
    const { location } = req.params;

    try {
        const jobs = await Job.find({ location: { $regex: location, $options: 'i' } });
        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this location" });
        }
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs by location:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getJobsByRecruiter = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const jobs = await Job.find({ useEmail: email });
        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching jobs by recruiter:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserDetail = async (req, res) => {
    const { useEmail } = req.body;
    if (!useEmail) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const user = await Applications.find({ useEmail: useEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const _user = await User.find({ email: user.userEmail });
        // let candidate =  {
        //         name : _user.name,
        //         email : _user.email,
        //         age : _user.age,
        //         companyName : user.companyName,
        //         jobTitle : user.jobTitle,   
        //         jobDescription : user.jobDescription,
        //         location : user.location,
        // }
        console.log(user);
        res.status(200).json({ message : "Successfully fetched !!!" ,candidates : user });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



