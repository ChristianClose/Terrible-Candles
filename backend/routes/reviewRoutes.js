import express from 'express';
import { getReviews } from '../controllers/reviewController.js';
const router = express.Router();

router.route("/").get(getReviews);

export default router;
