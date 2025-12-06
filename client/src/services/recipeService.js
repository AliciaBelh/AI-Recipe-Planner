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

export async function updateRecipeTitle(id, newTitle) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title: newTitle }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch (e) {
    // ignore parse errors if no body
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to update recipe");
  }

  // Expecting { message, recipe }
  return data.recipe || null;
}

export async function deleteRecipe(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  // Try to parse JSON if present
  let data = {};
  try {
    data = await response.json();
  } catch (e) {
    // no body or invalid JSON, ignore
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete recipe");
  }

  return data; // e.g. { message: "Recipe deleted" }
}
