import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { AuthService } from "./services/AuthService.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const authService = new AuthService();

// TEMP route just to test register
app.post("/api/auth/register-test", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


// console.log("MONGO_URI from env:", process.env.MONGO_URI);
await connectDB();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
