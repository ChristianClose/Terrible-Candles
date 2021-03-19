import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { createUser, updateUser, authUser, authUserByToken, getUser, getAllUsers, deleteUser } from '../controllers/userController.js';
const router = express.Router();

router.route("/").get(protect, isAdmin, getAllUsers).post(createUser).put(protect, updateUser);
router.route("/login").get(authUserByToken).post(authUser);
router.route("/:id").get(protect, isAdmin, getUser).delete(protect, isAdmin, deleteUser);

export default router;
