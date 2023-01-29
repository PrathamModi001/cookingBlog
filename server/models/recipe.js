const mongoose = require("mongoose")

const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ingrediants: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Thai", "Chinese", "Mexican", "Indian", "Spanish", "American"],
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Recipe', recipeSchema)