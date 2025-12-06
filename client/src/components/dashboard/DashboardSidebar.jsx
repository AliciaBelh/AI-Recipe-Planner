import { useState, useRef, useEffect } from "react";

function DashboardSidebar({
  recipes,
  selectedRecipeId,
  onSelectNew,
  onSelectRecipe,
  onDeleteRecipe,
  onRenameRecipe,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  function toggleMenu(e, recipeId) {
    e.stopPropagation();
    e.preventDefault();
    setOpenMenuId((prev) => (prev === recipeId ? null : recipeId));
  }

  function handleDeleteClick(e, recipeId) {
    e.stopPropagation();
    e.preventDefault();
    setOpenMenuId(null);
    if (onDeleteRecipe) {
      onDeleteRecipe(recipeId);
    }
  }

  function handleRenameClick(e, recipeId) {
    e.stopPropagation();
    e.preventDefault();
    setOpenMenuId(null);
    if (onRenameRecipe) {
      onRenameRecipe(recipeId);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      // If a menu is open and the click is outside the menu, close it
      if (
        openMenuId &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  return (
    <div className="fixed top-18 left-0 w-80 h-[calc(100vh-4rem)] border-r border-black bg-black px-4 py-4 overflow-y-auto">
      {/* <h2 className="text-lg font-semibold mb-4">Recipes</h2> */}

      <div className="space-y-2 pt-4">
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
                const isMenuOpen = openMenuId === recipe._id;

                return (
                  <div
                    key={recipe._id}
                    className={`group flex items-center justify-between w-full px-3 py-2 rounded cursor-pointer transition ${
                      isSelected
                        ? "bg-gray-600 font-medium"
                        : "hover:bg-gray-500"
                    }`}
                    onClick={() => onSelectRecipe(recipe._id)}
                  >
                    {/* Title on the left */}
                    <span className="truncate mr-2" title={recipe.title}>
                      {recipe.title}
                    </span>

                    {/* 3-dots button on the right, visible on hover */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => toggleMenu(e, recipe._id)}
                        className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded hover:bg-gray-200 text-gray-600 transition"
                        aria-label="Recipe options"
                      >
                        ⋯
                      </button>

                      {isMenuOpen && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                            onClick={(e) => handleRenameClick(e, recipe._id)}
                          >
                            Rename
                          </button>

                          <button
                            type="button"
                            className="block w-full text-left mt-0.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            onClick={(e) => handleDeleteClick(e, recipe._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
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
