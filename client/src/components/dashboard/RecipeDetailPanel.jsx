function RecipeDetailPanel({ recipe }) {
  if (!recipe) {
    return (
      <p className="text-gray-600">
        Recipe not found. Please select a recipe from the sidebar.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>

      <p className="text-sm text-gray-500 mb-4">
        Created at: {new Date(recipe.createdAt).toLocaleString()}
      </p>

      <div className="mb-4">
        <h3 className="font-semibold mb-1">Ingredients</h3>
        <p className="whitespace-pre-line text-white">
          {recipe.ingredientsText}
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Instructions</h3>
        <p className="whitespace-pre-line text-white">
          {recipe.instructions}
        </p>
      </div>
    </div>
  );
}

export default RecipeDetailPanel;
