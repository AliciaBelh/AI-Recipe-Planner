import OpenAI from "openai";

// We will use this client in the next step to call the real API.
// For now we just set it up.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * For now this is a MOCK implementation.
 * Later we will replace the mock with a real OpenAI call.
 */
export async function generateRecipeFromIngredients(
  ingredientsText,
  preferences = ""
) {
  console.log("generateRecipeFromIngredients called with:");
  console.log("ingredientsText:", ingredientsText);
  console.log("preferences:", preferences);

  // TEMP: return a fake recipe so we can test the flow
  return {
    title:
      "Mock Pasta with " + (ingredientsText?.slice(0, 20) || "Ingredients"),
    ingredientsText:
      ingredientsText ||
      "No specific ingredients provided. (This is mock data.)",
    instructions:
      "1. Prepare your ingredients.\n" +
      "2. Cook everything together in a pan.\n" +
      "3. Season to taste and serve.\n\n" +
      "(These instructions are mock data. Real AI generation coming soon.)",
  };
}
