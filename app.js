var express = require("express"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    bodyparser = require("body-parser"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    mongoose = require("mongoose");
    SeedDB = require("./seeds.js")

//Require routes.
var campgoundRoutes = require("./routes/campgroundRoute"),
    commentRoutes = require("./routes/commentRoute"),
    indexRoutes = require("./routes/indexRoute")

//SeedDB();

// mongoose.connect("mongodb://localhost/yelp_camp"); 
mongoose.connect("mongodb://bom:password@ds123722.mlab.com:23722/itech"); 

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT Configuration
app.use(require("express-session")({
    secret: "I am PHAYAO.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Add current user to all routes
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    res.locals.error = req.flash("error");

    next(); // important to all routes to do the next page
});

//ROUTES
app.use(indexRoutes);
app.use("/campgrounds",campgoundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes); //Add prefix before call route file.

//========================
// Server listening
//========================
// app.listen(3000, function () {
//     console.log("The YelpCamp Server Has Started !!!");
// })

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The YelpCamp Server Has Started !!!");
})