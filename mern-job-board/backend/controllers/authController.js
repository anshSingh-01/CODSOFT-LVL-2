
import User from '../models/userDb.js';
import Recruter from '../models/recruterDb.js';

// ...rest of your code...

export const Signup = async (req, res) => {

        const {name, email , age , isUser , password} = req.body;
        console.log(req.body);
        if (!name || !email || !age || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
           

            let existingUser;
            if (isUser) {
                existingUser = await User.findOne({ email });
            } else {
                existingUser = await Recruter.findOne({ email });
            }

            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const newUser = isUser ? new User({ name, email, age, password }) : new Recruter({ name, email, age, password });
            await newUser.save();

            res.status(201).json({ message: "Signup successful" });

        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ message: "Internal server error" });
        }

};

export const Login = async (req, res) => {

    const { email, password, isUser } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
      

        let user;
        if (isUser) {
            user = await User.findOne({ email, password });
        } else {
            user = await Recruter.findOne({ email, password });
        }

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        console.log("User found:", user);
        res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

export const UpdateProfile = async (req, res) => {
    const { email, name, age } = req.body;
  if (!email || !name || !age) return res.status(400).json({ message: "All fields are required" });
  try {
    const updated = await Recruter.findOneAndUpdate(
      { email },
      { name, age },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Recruiter not found" });
    res.json({ message: "Profile updated!", recruiter: updated });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetProfile = async (req, res) => {
    const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    const recruiter = await Recruter.findOne({ email });
    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });
    res.json({
      name: recruiter.name,
      email: recruiter.email,
      age: recruiter.age,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

