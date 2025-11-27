function DashboardContent({ user, status, error, recipes }) {
  return (
    <div className="flex-1 border rounded-lg shadow-md p-6 bg-gray">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <p className="text-lg mb-6">
        {user?.email
          ? `Welcome, ${user.email}!`
          : "Welcome to your dashboard."}
      </p>

      <h2 className="text-2xl font-semibold mb-4">My Recipes</h2>

      {status === "loading" && (
        <p className="text-gray-600">Loading your recipes...</p>
      )}

      {status === "error" && (
        <p className="text-red-600">Error: {error}</p>
      )}

      {status === "success" && recipes.length === 0 && (
        <p className="text-gray-600">
          You don&apos;t have any saved recipes yet.
        </p>
      )}

      {status === "success" && recipes.length > 0 && (
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="border rounded-md p-4 shadow-sm bg-gray"
            >
              <h3 className="text-xl font-semibold mb-2">
                {recipe.title}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                Created at:{" "}
                {new Date(recipe.createdAt).toLocaleString()}
              </p>

              <div className="mb-2">
                <h4 className="font-semibold">Ingredients:</h4>
                <p className="whitespace-pre-line">
                  {recipe.ingredientsText}
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Instructions:</h4>
                <p className="whitespace-pre-line">
                  {recipe.instructions}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardContent;
