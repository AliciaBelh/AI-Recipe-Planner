import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyRecipes, deleteRecipe } from "../services/recipeService";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";

function DashboardPage() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "error" | "success"
  const [error, setError] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState(null); // null = "New Recipe"

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setStatus("loading");
        setError("");

        const data = await getMyRecipes();
        setRecipes(data);
        setStatus("success");
      } catch (err) {
        console.error("Error loading recipes:", err);
        setError(err.message || "Failed to load recipes");
        setStatus("error");
      }
    }

    fetchRecipes();
  }, []);

  function handleRecipeCreated(newRecipe) {
    // Add the new recipe to the list (at the top)
    setRecipes((prev) => [newRecipe, ...prev]);
    // Select the new recipe so it opens on the right and gets highlighted
    setSelectedRecipeId(newRecipe._id);
  }

  async function handleDeleteRecipe(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await deleteRecipe(id);

      // Remove recipe from local state
      setRecipes((prev) => prev.filter((r) => r._id !== id));

      // If the deleted recipe was selected, go back to "New Recipe"
      if (selectedRecipeId === id) {
        setSelectedRecipeId(null);
      }
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert(err.message || "Failed to delete recipe.");
    }
  }

  return (
    <>
      {/* Fixed sidebar on the left */}
      <DashboardSidebar
        recipes={recipes}
        selectedRecipeId={selectedRecipeId}
        onSelectNew={() => setSelectedRecipeId(null)}
        onSelectRecipe={(id) => setSelectedRecipeId(id)}
        onDeleteRecipe={handleDeleteRecipe}
      />

      {/* Main content shifted to the right of the sidebar */}
      <div className="ml-96 mr-4 mt-18">
        <DashboardContent
          user={user}
          status={status}
          error={error}
          recipes={recipes}
          selectedRecipeId={selectedRecipeId}
          onRecipeCreated={handleRecipeCreated}
        />
      </div>
    </>
  );
}

export default DashboardPage;
