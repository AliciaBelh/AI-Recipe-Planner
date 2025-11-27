function DashboardSidebar() {
  return (
    <div className="w-64 border-r pr-4 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-4">Recipes</h2>

      <div className="space-y-2">
        <button
          type="button"
          className="w-full text-left px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          New Recipe
        </button>

        <div className="mt-2 text-sm text-gray-500">
          {/* Placeholder items for now */}
          <p className="px-3 py-2 rounded hover:bg-gray-100 cursor-default">
            Example Recipe 1
          </p>
          <p className="px-3 py-2 rounded hover:bg-gray-100 cursor-default">
            Example Recipe 2
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
