function DashboardSidebar({ recipes }) {
  return (
    <div className="w-64 border-r pr-4 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-4">Recipes</h2>

      <div className="space-y-2">
        {/* New Recipe button - no behavior yet */}
        <button
          type="button"
          className="w-full text-left px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          New Recipe
        </button>

        <div className="mt-2 text-sm text-white">
          {recipes.length === 0 && (
            <p className="px-3 py-2 text-gray-500">No recipes yet.</p>
          )}

          {recipes.length > 0 && (
            <div className="space-y-1">
              {recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="px-3 py-2 rounded hover:bg-gray-500 cursor-default truncate"
                  title={recipe.title}
                >
                  {recipe.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
