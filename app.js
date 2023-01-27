require("dotenv").config()

const path = require('path')
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const MONGODB_URI = 'mongodb+srv://modii:pratham@mycluster.l92tp0u.mongodb.net/cookingBlog';
const PORT = process.env.PORT || 3000

const recipeRoutes = require("./server/routes/recipeRouter")

app.use("/" , recipeRoutes)

mongoose.set('strictQuery', true);
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log(`LISTENING TO ${PORT} `)
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });
