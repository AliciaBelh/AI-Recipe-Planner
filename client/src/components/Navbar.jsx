import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }
  //w-full fixed top-0 left-0 bg-white shadow-md py-4 px-6 z-50
 
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-semibold text-gray-800">
        AI Recipe Planner
      </Link>

      <div className="flex items-center gap-4">
        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Register
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <span className="text-gray-700">
              {user?.email ? `Hello, ${user.email}` : "Logged in"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
