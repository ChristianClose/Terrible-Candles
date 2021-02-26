import Review from '../models/reviewModel.js';

export const getReviews = async (req, res) => {
    const reviews = await Review.find({});
    res.json(reviews);
}; 