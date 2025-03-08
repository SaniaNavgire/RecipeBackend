import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    procedure: { type: String, required: true },
    servings: { type: Number, required: true },
    time: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Recipe", RecipeSchema);
