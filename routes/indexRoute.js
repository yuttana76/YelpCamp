

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//root route
router.get("/", function (req, res) {
    res.render("landing");
});

//========================
// AUTH ROUTES
//========================

//Show register form
router.get("/register", function (req, res) {
    res.render("register");
});

//Handle sign up logic
router.post("/register", function (req, res) {
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
router.get("/login", function (req, res) {
    res.render("login");
});

//Handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function (req, res) {
        res.send("Login process !!!");
});

//Logout route
router.get("/logout",function(req,res){
    req.logout();
     req.flash("success","You logged out !!");
    res.redirect("/campgrounds");
});

module.exports = router;