import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in → render the protected content
  return children;
}

export default ProtectedRoute;
