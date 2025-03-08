import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipe.js";

dotenv.config();
const app = express();

const PORT = 5000

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/recipe", recipeRoutes);


mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("DB connected Succesfully..")
).catch(
    (err) => console.log(err)
)

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)

    }
    console.log("Server is running on port:" + PORT)

});