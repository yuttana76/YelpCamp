
var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");

//========================
// CAMPGROUND ROUTES
//========================
//INDEX 
router.get("/campgrounds", function (req, res) {

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
router.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

//NEW 
router.post("/campgrounds",isLoggedIn,function (req, res) {
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
router.get("/campgrounds/:id", function (req, res) {
    // Campground.findById(req.params.id, function (err, foundCampground) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

//Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;