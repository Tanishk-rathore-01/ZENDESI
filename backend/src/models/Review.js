import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);