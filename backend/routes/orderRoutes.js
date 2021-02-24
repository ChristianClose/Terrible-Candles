import express from 'express';
import { getOrders, receiveOrders } from '../controllers/orderController.js';
const router = express.Router();

router.route("/").get(getOrders).post(receiveOrders);

export default router;
