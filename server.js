const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const User = require('./Models/User');
const bcrypt = require('bcryptjs');
const Recipe = require('./Models/Recipe');

const app = express()
const PORT = 3000
app.use(express.json());  //middleware

// homepage Api
// app.get('/', (req, res) => {
//     res.send("<h1 text align=center >Welcome to the session</h1>")
// })

// Registration Api
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword })
        await user.save()
        res.json({ message: "User Registered.." })
        console.log("User Registration Completed...")

    }
    catch (err) {
        console.log(err)

    }
});

// Login Api

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Login Successful", username: user.username });
        console.log("Login Successful...")

    }


    catch (err) {

        console.log(err)
    }
});

//Create a recipe
app.post('/create', async (req, res) => {
    const { name, ingredients, procedure, servings, Time } = req.body
    try {
        const recipe = new Recipe({ name, ingredients, procedure, servings, Time });
        await recipe.save();
        res.json({ message: "Recipe Created Succesfully!" });
        console.log("Recipe Created!");


    } catch (err) {

        console.log(err)

    }
});

//Get All recipe

app.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find(req.body);
        res.json(recipes);
    }
    catch (err) {

        console.log(err)


    }
});

//Get Single Recipe

app.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);

    }
    catch (err) {

        console.log(err)

    }
});


//Update Recipe

app.put('/:id', async (req, res) => {
    try {
        const updateRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Updated Successfully!", updateRecipe });

    }

    catch (err) {

        console.log(err)


    }
});

//Delete Recipe

app.delete('/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: "Recipe deleted successfully" });

    } catch (err) {

        console.log(err)


    }
});



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