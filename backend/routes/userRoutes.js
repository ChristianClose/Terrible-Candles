import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createUser, updateUser, authUser, authUserByToken } from '../controllers/userController.js';
const router = express.Router();

router.route("/").post(createUser).put(protect, updateUser);
router.route("/login").post(authUser).get(authUserByToken);

export default router;
