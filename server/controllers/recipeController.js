const Category = require("../models/category")
const Recipe = require("../models/recipe")


/** GET LANDING PAGE */
exports.getIndex = (req, res, next) => {
    res.render('index', {
        title: "Cook With Modi"
    })
}

/** GET HOME PAGE with categories page, thai,american, chinese sections as well */
exports.getHome = async (req, res, next) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).sort({ _id: -1 }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber).sort({ _id: -1 });
        const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber).sort({ _id: -1 });

        const food = { latest, thai, american, chinese };

        res.render('home', { title: 'Cooking Blog - Home', categories, food });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }

}

/** GET VIEW ALL BUTTON PAGE in categories section */
exports.exploreCategories = (req, res, next) => {
    Category.find()
        .then(categories => {
            res.render("categories", {
                title: "Explore!",
                categories: categories
            })
        }).catch(err => console.log(err))
}

/** GET INDIVIDUAL RECIPE PAGE */
exports.getRecipe = (req, res, next) => {
    const recipeId = req.params.id;
    Recipe.findById(recipeId)
        .then(foundRecipe => {
            let recipe = foundRecipe;
            res.render("recipe", {
                recipe: recipe
            })
        })
        .catch(err => console.log(err))
}

/** GET THIS CATEGORY DISHES PAGE */
exports.getThisCategory = (req, res, next) => {
    let thisCategory = req.params.type;
    Recipe.find({ 'category': thisCategory })
        .then(foundCategory => {
            let categoryDishes = foundCategory
            res.render('currentCategory', {
                categoryDishes: categoryDishes,
                categoryName: thisCategory
            })
        }).catch(err => console.log(err))
}

/** SEARCH FUNCTIONALITY */
exports.searchRecipe = (req, res, next) => {
    const valueSearched = req.body.searchTerm

    Recipe.find({ $text: { $search: valueSearched, $diacriticSensitive: true } })
        .then(foundRecipes => {
            let recipes = foundRecipes
            res.render('search', {
                title: 'Search',
                recipes: recipes
            })
        })
        .catch(err => console.log(err))
}

/** EXPLORE LATEST */
exports.exploreLatest = (req, res, next) => {
    Recipe.find().sort({ _id: -1 })
        .then(recipes => {
            res.render("explore-latest", {
                title: "Explore Latest!",
                recipes: recipes
            })
        }).catch(err => console.log(err))
}

/** EXPLORE RANDOM */
exports.exploreRandom = (req, res, next) => {
    let count = Recipe.find().countDocuments()
    let random = Math.floor(Math.random() * count)
    Recipe.findOne().skip(random).exec()
        .then(recipe => {
            res.render('explore-random', {
                title: "Explore-Random",
                recipe: recipe
            })
        })
}

/** GET SUBMIT RECIPE */
exports.getSubmit = (req, res, next) => {
    const errorInfo = req.flash('errorInfo')
    const successInfo = req.flash('successInfo')
    res.render('submit-recipe', {
        title: 'Submit Today !',
        errorInfo: errorInfo,
        successInfo: successInfo
    })
}

exports.postSubmit = (req, res, next) => {
    let sampleFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.image;
    newImageName = Date.now() + sampleFile.name
    uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
    });

    const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: req.body.image
    });
    newRecipe.save()
}

exports.getUpdateRecipe = (req, res, next) => {
    const recipeId = req.params.id
    Recipe.findById(recipeId)
        .then(recipe => {
            res.render('update', {
                title: 'update',
                recipe: recipe
            })
        })
        .catch(err => console.log(err))
}

exports.postUpdateRecipe = (req, res, next) => {
    const recipeId = req.params.id
    const updatedName= req.body.name
    const updatedDescription = req.body.description
    const updatedEmail = req.body.email
    const updatedIngredients = req.body.ingredients
    const updatedCategory = req.body.category



    let sampleFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.image;
    newImageName = Date.now() + sampleFile.name
    uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
    });

    Recipe.findById(recipeId)
    .then(recipe => {
        recipe.name = updatedName;
        recipe.description = updatedDescription;
        recipe.email = updatedEmail;
        recipe.ingredients = updatedIngredients;
        recipe.category = updatedCategory
        recipe.image = newImageName

        recipe.save()
    })
    .then(result => {
        res.redirect(`/recipe/${recipeId}`)
    })
    .catch(err => console.log(err))
}

exports.get404 = (req,res,next) => {
    res.render('get404', {
        title: '404 Not Found',
    })
}