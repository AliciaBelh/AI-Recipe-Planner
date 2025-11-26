import { createContext, useContext, useEffect, useState } from "react";
import { getToken, logoutUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(null);

  // If there's no token, ensure user is null
  useEffect(() => {
    if (!token) {
      setUser(null);
    }
  }, [token]);

  function login(userData, tokenValue) {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem("token", tokenValue);
  }

  function logout() {
    setUser(null);
    setToken(null);
    logoutUser(); // removes token from localStorage
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
