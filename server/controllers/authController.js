const User = require("../models/user")

const bcrypt = require('bcrypt')
const saltRounds = 12;

/** GET SIGNUP PAGE */
exports.getSignup = (req, res, next) => {
    res.render('index', {
        title: "Cook With Modi"
    })
}

/** POST SIGNUP PAGE */
exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    if (password !== confirm_password) {
        console.log("PASSWORDS DON'T MATCH")
        res.redirect("/")
    }
    else {
        User.findOne({email:email})
        .then(userFound => {
            if(userFound){
                console.log("USER ALREADY EXISTS")
                return res.redirect("/login")
            } else {
                return bcrypt.hash(password , saltRounds)
                .then(encryptedPass => {
                    const newUser = new User({
                        email: email,
                        password: encryptedPass
                    })
                    return newUser.save()
                    .then(result => {
                        res.redirect('/login')
                    })
                })
                .catch(err => console.log(err))
            }
        })
    }

}

/** GET LOGIN PAGE */
exports.getLogin = (req,res,next) => {
    res.render("login")
}

/** POST LOGIN PAGE */
exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email : email})
    .then(foundUser => {
        if(!foundUser){
            console.log("USER DOESN'T EXIST! SIGNUP FIRST")
            return res.redirect("/signup")
        } else{
            bcrypt.compare(password , foundUser.password)
            .then(doMatch => {
                if(doMatch){
                    res.redirect("/home")
                    console.log("SUCCESSFULLY LOGGED IN")
                } else {
                    res.redirect("/login")
                    console.log("INVALID PASSWORD")
                }
            })
        }
    })
}
