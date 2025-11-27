function DashboardSidebar({
  recipes,
  selectedRecipeId,
  onSelectNew,
  onSelectRecipe,
}) {
  return (
    <div className="w-64 border-r pr-4 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-4">Recipes</h2>

      <div className="space-y-2">
        {/* New Recipe button */}
        <button
          type="button"
          onClick={onSelectNew}
          className={`w-full text-left px-3 py-2 rounded transition ${
            selectedRecipeId === null
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-white hover:bg-blue-100"
          }`}
        >
          New Recipe
        </button>

        <div className="mt-2 text-sm text-white">
          {recipes.length === 0 && (
            <p className="px-3 py-2 text-gray-500">No recipes yet.</p>
          )}

          {recipes.length > 0 && (
            <div className="space-y-1">
              {recipes.map((recipe) => {
                const isSelected = selectedRecipeId === recipe._id;

                return (
                  <button
                    key={recipe._id}
                    type="button"
                    onClick={() => onSelectRecipe(recipe._id)}
                    className={`w-full text-left px-3 py-2 rounded truncate transition ${
                      isSelected
                        ? "bg-gray-200 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                    title={recipe.title}
                  >
                    {recipe.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
