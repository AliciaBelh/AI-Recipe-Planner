import { Router } from "express";
import { generateRecipeFromIngredients } from "../services/aiRecipeService.js";

const router = Router();

// POST /api/recipes/generate
// Body: { ingredientsText: string, preferences?: string }
// Requires authMiddleware (we'll attach it in index.js)
router.post("/generate", async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { ingredientsText, preferences = "" } = req.body;

    if (!ingredientsText || !ingredientsText.trim()) {
      return res.status(400).json({ message: "ingredientsText is required" });
    }

    const recipe = await generateRecipeFromIngredients(
      ingredientsText.trim(),
      preferences.trim()
    );

    // recipe should have: { title, ingredientsText, instructions }
    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Error generating recipe with AI:", error);
    return res
      .status(500)
      .json({ message: "Failed to generate recipe. Please try again." });
  }
});

export default router;
