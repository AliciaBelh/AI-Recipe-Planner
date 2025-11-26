import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">
        {user?.email ? `Welcome, ${user.email}!` : "Welcome to your dashboard."}
      </p>
      <p className="mt-4 text-gray-600">
        This page is protected and only visible to logged-in users. Later we’ll
        show your saved recipes and AI meal ideas here.
      </p>
    </div>
  );
}

export default DashboardPage;
