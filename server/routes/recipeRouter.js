const express = require("express")
const router = express.Router()

const recipeController = require('../controllers/recipeController')

/**
 * APP ROUTES
 */
router.get("/" , recipeController.getIndex)
router.get("/home", recipeController.getHome)

router.get("/categories" , recipeController.exploreCategories)

module.exports = router;