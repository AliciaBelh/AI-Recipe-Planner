import { Router } from "express";
import { AuthService } from "../services/AuthService.js";

const router = Router();
const authService = new AuthService();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
