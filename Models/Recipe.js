const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    name: { type: String, require: true },
    ingredients: { type: String, require: true },
    procedure: { type: String, require: true },
    servings: { type: Number, require: true },
    Time: { type: Number, require: true }
})

module.exports = mongoose.model('Recipe', RecipeSchema)