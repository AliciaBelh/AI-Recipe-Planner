const API_URL = "http://localhost:3000/api/auth";

export async function registerUser(email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  // If login successful → save token
  if (response.ok && data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}
