const Category = require("../models/category")
const Recipe = require("../models/recipe")

exports.getIndex = (req, res, next) => {
    res.render('index', {
        title: "Cook With Modi"
    })
}

exports.getHome = async(req, res, next) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);

        const food = { latest, thai, american, chinese };

        res.render('home', { title: 'Cooking Blog - Home', categories, food });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Occured" });
    }

}

exports.exploreCategories = (req, res, next) => {
    Category.find()
        .then(categories => {
            res.render("categories", {
                title: "Explore!",
                categories: categories
            })
        })
}