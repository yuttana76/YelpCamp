
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

//========================
// COMMENT ROUTES
//========================

//NEW comments
router.get("/comments/new",isLoggedIn, function (req, res) {
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
router.post("/comments", function (req, res) {
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
                    // Add username and id  to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;

                    // Save Comment
                    newComment.save();

                    console.log("Author"+ newComment.author );

                    // Save associate
                    foundCampground.comments.push(newComment);
                    foundCampground.save();

                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
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
module.exports =router;
