import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    name: String,
    text: String,
    score: Number,
}, { timestamps: true });

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;