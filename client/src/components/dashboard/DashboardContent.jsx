import NewRecipePanel from "./NewRecipePanel";
import RecipeDetailPanel from "./RecipeDetailPanel";

function DashboardContent({ user, status, error, recipes, selectedRecipeId }) {
  // Find the selected recipe, if any
  const selectedRecipe =
    selectedRecipeId && recipes.length > 0
      ? recipes.find((r) => r._id === selectedRecipeId)
      : null;

  return (
    <div className="flex-1 border rounded-lg shadow-md p-6 bg-gray">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <p className="text-lg mb-6">
        {user?.email
          ? `Welcome, ${user.email}!`
          : "Welcome to your dashboard."}
      </p>

      {/* Loading / error states take precedence */}
      {status === "loading" && (
        <p className="text-gray-600">Loading your recipes...</p>
      )}

      {status === "error" && (
        <p className="text-red-600">Error: {error}</p>
      )}

      {/* Only render content when loading is done and no error */}
      {status === "success" && (
        <>
          {/* If no recipes and New Recipe selected, just show NewRecipePanel */}
          {selectedRecipeId === null && (
            <NewRecipePanel />
          )}

          {/* If a recipe is selected, show its details */}
          {selectedRecipeId !== null && (
            <RecipeDetailPanel recipe={selectedRecipe} />
          )}

          {/* Optional hint when there are no recipes at all */}
          {recipes.length === 0 && selectedRecipeId === null && (
            <p className="mt-6 text-gray-500">
              You don&apos;t have any saved recipes yet. Once you create
              recipes, they will appear in the sidebar on the left.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default DashboardContent;
