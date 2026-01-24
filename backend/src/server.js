import authRoutes from "./routes/auth.routes.js";
import placeRoutes from "./routes/place.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// CORS configuration for frontend-backend connection
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/",(req,res)=>{
    res.send("ZENDESI API IS RUNNING");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>
console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
