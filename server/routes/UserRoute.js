import express from "express";
import { register, login, getUsers, logout, updateUser } from "../controllers/UserController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/api/users/register", register);
router.post("/api/users/login", login);
router.get("/api/users", authenticateToken, getUsers);
router.post("/api/users/logout", authenticateToken, logout);
router.patch('/api/users/:id', authenticateToken, updateUser);

export default router;