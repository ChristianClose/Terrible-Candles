import express from 'express';
import { getPromos } from '../controllers/promoController.js';
const router = express.Router();

router.route("/").get(getPromos);

export default router;
