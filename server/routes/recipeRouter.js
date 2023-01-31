const express = require("express")
const router = express.Router()

const recipeController = require('../controllers/recipeController')

/**
 * APP ROUTES
 */
router.get("/" , recipeController.getIndex)
router.get("/home", recipeController.getHome)

router.get("/categories" , recipeController.exploreCategories)
router.get("/recipe/:id" , recipeController.getRecipe)
router.get("/categories/:type" , recipeController.getThisCategory)
router.post("/search" , recipeController.searchRecipe)

router.get("/explore-latest" , recipeController.exploreLatest)
router.get("/explore-random" , recipeController.exploreRandom)

module.exports = router;