import { useState } from "react";
import { createRecipe } from "../../services/recipeService";

function NewRecipePanel({ onRecipeCreated }) {
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "saving" | "success" | "error"
  const [error, setError] = useState("");

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

      // Optional: clear the form after saving
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
      <p className="text-white mb-4">
        Enter your ingredients and recipe details. Later, this flow can be
        powered by AI to help you generate meal ideas automatically.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block text-sm font-semibold mb-1">
            Ingredients
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 h-28"
            placeholder="List your ingredients here..."
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
          />
        </div>

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
