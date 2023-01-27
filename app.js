require("dotenv").config()

/**
 * All packages requires
 */
const path = require('path')
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
app.set('layout' , './includes/main')
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// some constants 
const MONGODB_URI = process.env.URI;
const PORT = process.env.PORT || 3000

/** 
 * routers required
 */
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
