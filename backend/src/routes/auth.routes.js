import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'zendesi_secret_key_2026', {
        expiresIn: '7d'
    });
};

// SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // 2. Check if user exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
    
        // 3. Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // 4. Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // 2. Find user
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Check password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 4. Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET current user (protected route)
router.get("/me", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zendesi_secret_key_2026');
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });

    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
});

// Test route
router.get("/test", (req, res) => {
    res.json({ message: "Auth route working" });
});

export default router;
