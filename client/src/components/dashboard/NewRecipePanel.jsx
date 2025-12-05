import { useState } from "react";
import {
  createRecipe,
  generateRecipeWithAI,
} from "../../services/recipeService";

function NewRecipePanel({ onRecipeCreated }) {
  // User input ingredients (used as prompt for AI)
  const [rawIngredients, setRawIngredients] = useState("");
  // AI-generated fields (these will be saved)
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructions, setInstructions] = useState("");
  // Saving state
  const [status, setStatus] = useState("idle"); // "idle" | "saving" | "success" | "error"
  const [error, setError] = useState("");
  // AI generation state
  const [preferences, setPreferences] = useState("");
  const [aiStatus, setAiStatus] = useState("idle"); // "idle" | "generating" | "error"
  const [aiError, setAiError] = useState("");

  async function handleGenerate() {
    if (!rawIngredients.trim()) {
      setAiError("Please enter some ingredients before generating.");
      return;
    }

    try {
      setAiStatus("generating");
      setAiError("");

      const aiRecipe = await generateRecipeWithAI(
        rawIngredients.trim(),
        preferences.trim()
      );

      // Fill form fields with AI response (but allow user to edit)
      setTitle(aiRecipe.title || "");
      setIngredientsText(aiRecipe.ingredientsText || "");
      setInstructions(aiRecipe.instructions || "");

      setAiStatus("idle");
    } catch (err) {
      console.error("Error generating recipe with AI:", err);
      setAiStatus("error");
      setAiError(err.message || "Failed to generate recipe.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !ingredientsText.trim() || !instructions.trim()) {
      setError("Please fill in all fields before saving.");
      return;
    }

    try {
      setStatus("saving");
      setError("");

      const newRecipe = await createRecipe({
        title: title.trim(),
        ingredientsText: ingredientsText.trim(),
        instructions: instructions.trim(),
      });

      setStatus("success");

      // Notify parent so it can update the list + selection
      if (onRecipeCreated) {
        onRecipeCreated(newRecipe);
      }

      // clear the form after saving
      setRawIngredients("");
      setPreferences("");
      setTitle("");
      setIngredientsText("");
      setInstructions("");
    } catch (err) {
      console.error("Error creating recipe:", err);
      setStatus("error");
      setError(err.message || "Failed to save recipe.");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">New Recipe</h2>
      <p className="mb-4">
        Enter your ingredients and optionally some preferences. Use AI to
        generate a recipe, then review and save it.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User ingredients (prompt to AI) */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Your Ingredients 
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 h-28"
            placeholder="List your ingredients here (e.g. pasta, tomatoes, garlic)..."
            value={rawIngredients}
            onChange={(e) => setRawIngredients(e.target.value)}
          />
        </div>

        {/* Preferences + Generate button */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Extra preferences (optional)
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="E.g. vegetarian, quick dinner, one-pot..."
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />

          <button
            type="button"
            onClick={handleGenerate}
            disabled={aiStatus === "generating"}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {aiStatus === "generating"
              ? "Generating with AI..."
              : "Generate with AI"}
          </button>

          {aiError && (
            <p className="text-red-600 text-sm mt-1">{aiError}</p>
          )}
        </div>

        {/* Title (AI-filled or manual) */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Title 
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="E.g. Creamy Tomato Pasta"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* AI Ingredients box (between title and instructions) */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Ingredients
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 h-28"
            placeholder="AI-generated ingredients will appear here..."
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
          />
        </div>

        {/* Instructions (AI-filled or manual) */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Instructions
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 h-40"
            placeholder="Describe how to prepare the meal..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        {status === "success" && (
          <p className="text-green-600 text-sm">
            Recipe saved successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={status === "saving"}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {status === "saving" ? "Saving..." : "Save Recipe"}
        </button>
      </form>
    </div>
  );
}

export default NewRecipePanel;
