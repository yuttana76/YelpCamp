var express = require("express"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    bodyparser = require("body-parser"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    SeedDB = require("./seeds.js")

SeedDB();

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));
// console.log("__dirname>>" + __dirname);

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
    next(); // important to all routes to do the next page
});

//========================
// CAMPGROUND ROUTES
//========================
app.get("/", function (req, res) {
    res.render("landing");
});

//INDEX 
app.get("/campgrounds", function (req, res) {

    //Get all campground from DB.
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        };
    });
});

// NEW FORM
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

//NEW 
app.post("/campgrounds",isLoggedIn,function (req, res) {
    //Add data form from data And add to campground array.
    var vName = req.body.name;
    var vImate = req.body.image;
    var vDesc = req.body.description;
    var newCampGround = { name: vName, image: vImate, description: vDesc };
    Campground.create(newCampGround, function (err, newlyCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        };
    });
});

// SHOW detail
app.get("/campgrounds/:id", function (req, res) {
    // Campground.findById(req.params.id, function (err, foundCampground) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

//========================
// COMMENT ROUTES
//========================

//NEW comments
app.get("/campgrounds/:id/comments/new",isLoggedIn, function (req, res) {
    var campgourndId = req.params.id;

    Campground.findById(campgourndId, function (err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds/:id");
        } else {
            res.render("comments/new", { campground: foundCampground });
        }
    });


});

//CREATE comments
app.post("/campgrounds/:id/comments", function (req, res) {
    // var campgourndId = req.params.id;

    // var vText = req.body.text;
    // var vAuthor = req.body.author;
    // var comment = { text: vText, author: vAuthor };
    var comment = req.body.comment;

    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
            // res.redirect("/campgrounds/" + campgourndId);
        } else {
            Comment.create(comment, function (err, newComment) {
                if (err) {
                    console.log(err);
                    // res.redirect("/campgrounds/" + campgourndId);
                } else {
                    // console.log(newComment);
                    foundCampground.comments.push(newComment);
                    foundCampground.save();

                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});


//========================
// COMMENT ROUTES
//========================

//Show register form
app.get("/register", function (req, res) {
    res.render("register");
});

//Handle sign up logic
app.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect("register");
        }

        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });

});

// Show login form
app.get("/login", function (req, res) {
    res.render("login");

});

//Handling login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function (req, res) {
        res.send("Login process !!!");
});

//Logout route
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
//========================
// Server listening
//========================
app.listen(3000, function () {
    console.log("The YelpCamp Server Has Started !!!");
})

// app.listen(process.env.PORT, process.env.IP, function () {
//     console.log("The YelpCamp Server Has Started !!!");
// })