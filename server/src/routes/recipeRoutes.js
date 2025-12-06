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

// GET /api/recipes
// Get all recipes for the logged-in user
router.get("/", async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const recipes = await Recipe.find({ userId }).sort({ createdAt: -1 });

    return res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

// DELETE /api/recipes/:id
// Deletes a recipe that belongs to the authenticated user
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find recipe that belongs to this user
    const recipe = await Recipe.findOne({ _id: id, userId });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await recipe.deleteOne();

    return res.json({ message: "Recipe deleted" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete recipe. Please try again." });
  }
});

// PUT /api/recipes/:id
// Updates the title of a recipe that belongs to the authenticated user
router.put("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { title } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const recipe = await Recipe.findOne({ _id: id, userId });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipe.title = title.trim();
    await recipe.save();

    return res.json({
      message: "Recipe updated",
      recipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return res
      .status(500)
      .json({ message: "Failed to update recipe. Please try again." });
  }
});

export default router;
