const Category = require("../models/category")
const Recipe = require("../models/recipe")


/** GET LANDING PAGE */
exports.getIndex = (req, res, next) => {
    res.render('index', {
        title: "Cook With Modi"
    })
}

/** GET HOME PAGE with categories page, thai,american, chinese sections as well */
exports.getHome = async(req, res, next) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).sort({_id:-1}).limit(limitNumber);
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
exports.getRecipe = (req,res,next) => {
    const recipeId = req.params.id;
    Recipe.findById(recipeId)
    .then(foundRecipe => {
        let recipe = foundRecipe; 
        res.render("recipe" , {
            recipe: recipe
        })
    })
    .catch(err => console.log(err))
}

/** GET THIS CATEGORY DISHES PAGE */
exports.getThisCategory = (req,res,next) => {
    let thisCategory = req.params.type;
    Recipe.find({'category' : thisCategory})
    .then(foundCategory => {
        let categoryDishes = foundCategory
        res.render('currentCategory' , {
            categoryDishes : categoryDishes,
            categoryName: thisCategory
        })
    }).catch(err => console.log(err))
}

/** SEARCH FUNCTIONALITY */
exports.searchRecipe = (req,res,next) => {
    const valueSearched = req.body.searchTerm

    Recipe.find( { $text: { $search: valueSearched , $diacriticSensitive: true}})
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
    Recipe.find().sort({_id: -1})
        .then(recipes => {
            res.render("explore-latest", {
                title: "Explore Latest!",
                recipes: recipes
            })
        }).catch(err => console.log(err))
}

/** EXPLORE RANDOM */
exports.exploreRandom = (req,res,next) => {
    let count = Recipe.find().countDocuments()
    let random = Math.floor(Math.random() * count)
    Recipe.findOne().skip(random).exec()
    .then(recipe => {
        res.render('explore-random' , {
            title: "Explore-Random",
            recipe: recipe
        })
    })
}