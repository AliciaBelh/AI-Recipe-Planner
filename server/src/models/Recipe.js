import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  ingredientsText: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  // Optional: you can later use this to know if it was AI-generated or manual
  //   source: {
  //     type: String,
  //     enum: ["ai", "manual"],
  //     default: "ai",
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
