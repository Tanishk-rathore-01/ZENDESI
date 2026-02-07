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
const isProduction = process.env.NODE_ENV === "production";
const configuredOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

const defaultDevOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
];

const allowedOrigins = new Set(
    (configuredOrigins.length ? configuredOrigins : defaultDevOrigins).map((o) => o.toLowerCase())
);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow non-browser tools and local file previews (Origin: null)
            if (!origin || origin === "null") return callback(null, true);

            const normalized = origin.toLowerCase();

            if (allowedOrigins.has(normalized)) return callback(null, true);

            // Allow any localhost port in development
            if (!isProduction && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(normalized)) {
                return callback(null, true);
            }

            return callback(new Error(`CORS blocked for origin: ${origin}`));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

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
