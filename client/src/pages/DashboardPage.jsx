import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyRecipes } from "../services/recipeService";
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

  return (
    <div className="max-w-5xl mx-auto mt-20 px-4">
      <div className="flex gap-6">
        <DashboardSidebar
          recipes={recipes}
          selectedRecipeId={selectedRecipeId}
          onSelectNew={() => setSelectedRecipeId(null)}
          onSelectRecipe={(id) => setSelectedRecipeId(id)}
        />
        <DashboardContent
          user={user}
          status={status}
          error={error}
          recipes={recipes}
          // selectedRecipeId will be used in next steps
          selectedRecipeId={selectedRecipeId}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
