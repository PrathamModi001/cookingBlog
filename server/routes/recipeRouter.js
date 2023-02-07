const express = require("express")
const router = express.Router()

const recipeController = require('../controllers/recipeController')
const authController = require('../controllers/authController')

const isLoggedIn = require("../../middleware/isAuth")

/**
 * APP ROUTES
 */
router.get("/signup" , authController.getSignup)
router.post("/signup" , authController.postSignup)

router.get("/" ,authController.getIndex)

router.get("/login" ,authController.getLogin)
router.post("/login" , authController.postLogin)

router.get("/home",isLoggedIn, recipeController.getHome)
router.post("/home" , recipeController.logout)

router.get("/categories" ,isLoggedIn, recipeController.exploreCategories)
router.get("/recipe/:id" ,isLoggedIn, recipeController.getRecipe)
router.get("/categories/:type" ,isLoggedIn, recipeController.getThisCategory)
router.post("/search" ,isLoggedIn, recipeController.searchRecipe)

router.get("/explore-latest" ,isLoggedIn, recipeController.exploreLatest)
router.get("/explore-random" ,isLoggedIn, recipeController.exploreRandom)

router.get("/submit-recipe" ,isLoggedIn, recipeController.getSubmit)
router.post("/submit-recipe" ,isLoggedIn, recipeController.postSubmit)

router.get('/recipe/:id/update' ,isLoggedIn, recipeController.getUpdateRecipe)
router.post('/recipe/:id/update' ,isLoggedIn, recipeController.postUpdateRecipe)

module.exports = router;