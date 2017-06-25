
var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");

//========================
// CAMPGROUND ROUTES
//========================
//INDEX 
router.get("/", function (req, res) {

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
router.get("/new",isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//NEW 
router.post("/",isLoggedIn,function (req, res) {
    //Add data form from data And add to campground array.
    var vName = req.body.name;
    var vImate = req.body.image;
    var vDesc = req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    };
    var newCampGround = { name: vName, image: vImate, description: vDesc ,author: author};
    Campground.create(newCampGround, function (err, newlyCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(newCampGround);
            res.redirect("/campgrounds");
        };
    });
});

// SHOW detail
router.get("/:id", function (req, res) {
    // Campground.findById(req.params.id, function (err, foundCampground) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

//Edit campground route
router.get("/:id/edit",function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){

        if(err){
            // console.log(err);
            res.redirect("/campgrounds");
        }
        res.render("campgrounds/edit",{campground: foundCampground});

    });
});
//Update campground route
router.put("/:id",function(req,res){

    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+updatedCampground._id);
        }
    });
});

//Delete campground route
router.delete("/:id",function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
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