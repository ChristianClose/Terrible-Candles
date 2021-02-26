import express from 'express';
import { getOrders, receiveOrders, getOrder } from '../controllers/orderController.js';
const router = express.Router();

router.route("/").get(getOrders).post(receiveOrders);
router.route("/:id").get(getOrder);

export default router;
