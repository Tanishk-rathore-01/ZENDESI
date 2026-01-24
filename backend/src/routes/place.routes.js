import express from "express";
import Place from "../models/Place.js";

const router = express.Router();

// GET all places
router.get("/", async (req, res) => {
    try {
        const places = await Place.find().populate("reviews");
        res.status(200).json({
            message: "Places fetched successfully",
            places,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET single place by ID
router.get("/:id", async (req, res) => {
    try {
        const place = await Place.findById(req.params.id).populate("reviews");
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.status(200).json({
            message: "Place fetched successfully",
            place,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// CREATE new place
router.post("/", async (req, res) => {
    try {
        const { name, description, location, price, image } = req.body;

        if (!name || !description || !location || !price) {
            return res.status(400).json({ message: "All fields required" });
        }

        const place = await Place.create({
            name,
            description,
            location,
            price,
            image,
        });

        res.status(201).json({
            message: "Place created successfully",
            place,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// UPDATE place
router.put("/:id", async (req, res) => {
    try {
        const place = await Place.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        res.status(200).json({
            message: "Place updated successfully",
            place,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE place
router.delete("/:id", async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);

        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        res.status(200).json({ message: "Place deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;