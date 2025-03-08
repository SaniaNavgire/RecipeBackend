import express from "express";
import Recipe from "../models/Recipe.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid Token" });
    }
};

// Create Recipe
router.post("/", verifyToken, async (req, res) => {
    try {
        const { name, ingredients, procedure, servings, time } = req.body;
        const newRecipe = new Recipe({ name, ingredients, procedure, servings, time, user: req.user.id });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("user", "username");
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User's Recipes
router.get("/my-recipes", verifyToken, async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user.id });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Recipe
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
