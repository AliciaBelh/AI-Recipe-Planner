import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI();

/**
 * Generates a real recipe using OpenAI.
 * Uses JSON mode to guarantee structured output.
 */
export async function generateRecipeFromIngredients(ingredientsText, preferences = "") {
  try {
    console.log("Calling OpenAI with ingredients:", ingredientsText);

    const systemMessage = `
      You are a helpful cooking assistant that creates recipes based on ingredients.
      Respond ONLY in valid JSON with the following fields:
      {
        "title": "short recipe title",
        "ingredientsText": "formatted list of ingredients",
        "instructions": "clear numbered steps"
      }
      Do not include Markdown, explanations, or text outside the JSON.
    `;

    const userMessage = `
      Ingredients: ${ingredientsText}
      Preferences: ${preferences}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    // Parse JSON returned by OpenAI
    const recipe = JSON.parse(content);

    console.log("AI recipe generated successfully:", recipe);

    return {
      title: recipe.title,
      ingredientsText: recipe.ingredientsText,
      instructions: recipe.instructions,
    };

  } catch (err) {
    console.error("OpenAI generation error:", err);

    throw new Error(
      "AI recipe generation failed. Please try again or adjust the ingredients."
    );
  }
}
