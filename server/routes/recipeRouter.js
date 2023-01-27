const express = require("express")
const router = express.Router()

const recipeController = require('../controllers/recipeController')

/**
 * APP ROUTES
 */
router.get("/", recipeController.getIndex)


module.exports = router;