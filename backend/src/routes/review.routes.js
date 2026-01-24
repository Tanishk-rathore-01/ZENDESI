import express from "express";
import Review from "../models/Review.js";
import Place from "../models/Place.js";

const router = express.Router();

// GET all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("author", "name email")
            .populate("place", "name location");
        res.status(200).json({
            message: "Reviews fetched successfully",
            reviews,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET reviews by place ID
router.get("/place/:placeId", async (req, res) => {
    try {
        const reviews = await Review.find({ place: req.params.placeId })
            .populate("author", "name email")
            .populate("place", "name location");
        res.status(200).json({
            message: "Reviews fetched successfully",
            reviews,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// CREATE new review
router.post("/", async (req, res) => {
    try {
        const { title, content, rating, author, place } = req.body;

        if (!title || !content || !rating || !author || !place) {
            return res.status(400).json({ message: "All fields required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const review = await Review.create({
            title,
            content,
            rating,
            author,
            place,
        });

        // Add review to place
        await Place.findByIdAndUpdate(
            place,
            { $push: { reviews: review._id } }
        );

        res.status(201).json({
            message: "Review created successfully",
            review,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// UPDATE review
router.put("/:id", async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({
            message: "Review updated successfully",
            review,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE review
router.delete("/:id", async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Remove review from place
        await Place.findByIdAndUpdate(
            review.place,
            { $pull: { reviews: review._id } }
        );

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;