exports.getIndex = (req,res,next) => {
    res.render('index' , {
        title: "Cook With Modi"
    })
}
