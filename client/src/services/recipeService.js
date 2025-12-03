import { getToken } from "./authService";

const API_URL = "http://localhost:3000/api/recipes";

function getAuthHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function createRecipe({ title, ingredientsText, instructions }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, ingredientsText, instructions }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create recipe");
  }

  return data;
}

export async function getMyRecipes() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch recipes");
  }

  return data;
}

export async function generateRecipeWithAI(ingredientsText, preferences = "") {
  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ ingredientsText, preferences }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to generate recipe");
  }

  return data; // { title, ingredientsText, instructions }
}
