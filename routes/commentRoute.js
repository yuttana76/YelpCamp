
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

//Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
module.exports =router;
