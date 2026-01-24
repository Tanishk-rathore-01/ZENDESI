import express from 'express';
import bcrypt from 'bcryptjs';
import User from "../models/User.js";
const router = express.Router();

// SINGUP
router.post("/signup", async (req, res) => {
    try{
        const{ name,email,password} = req.body;

        //1. Validate

        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields required"});

        }

        //2. check if user exists
        const existingUser = await User.findOne({ email});
        
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
    
        //3. Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

// test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});

export default router;