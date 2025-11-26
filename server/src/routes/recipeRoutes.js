import { Router } from "express";
import { Recipe } from "../models/Recipe.js";

const router = Router();

// POST /api/recipes
// Requires authMiddleware (we'll attach it in index.js)
router.post("/", async (req, res) => {
  try {
    const userId = req.user?.id; // set by authMiddleware
    const { title, ingredientsText, instructions } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!title || !ingredientsText || !instructions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const recipe = await Recipe.create({
      userId,
      title,
      ingredientsText,
      instructions,
      //source: "manual", // for now; later: "ai"
    });

    return res.status(201).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Failed to create recipe" });
  }
});

export default router;
