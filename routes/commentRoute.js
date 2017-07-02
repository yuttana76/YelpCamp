
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//========================
// COMMENT ROUTES
//========================

//NEW comments
router.get("/new",middleware.isLoggedIn, function (req, res) {
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
router.post("/",middleware.isLoggedIn,function (req, res) {
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

// Show edit page
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");

        }else{
            res.render("comments/edit",{campground_id: req.params.id,comment: foundComment});
        }
    });

});

//Comment Update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
        if(err){
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

// //Middleware
// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// };

// function checkCommentOwnership(req,res,next){

//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id,function(err,foundCampground){
//             if(err){
//                 res.redirect("back");
//             }else{
//                 //Does the user is own ?
//                 if(foundCampground.author.id.equals(req.user._id)){
//                     //Remove item
//                         Campground.findById(req.params.id, function (err) {
//                             if (err) {
//                                 res.redirect("back");
//                             } else {
//                                 //SUCCESS
//                                 next();
//                             }
//                         });
//                 }else{
//                     res.redirect("back");
//                 }
//             }
//         });
//     }else{
//         res.redirect("back");
//     }
// }

module.exports =router;
