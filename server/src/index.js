import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/recipes", authMiddleware, recipeRoutes);
app.use("/api/recipes", authMiddleware, aiRoutes);

// Simple protected route to test JWT auth
app.get("/api/protected-test", authMiddleware, (req, res) => {
  return res.json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

// console.log("MONGO_URI from env:", process.env.MONGO_URI);
await connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
