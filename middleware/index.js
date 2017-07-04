
var Comment = require("../models/comment");
var Campground = require("../models/campgrounds");

// //Another code style
// var indexMiddleware={
//     xxxx:function(){
//         //Code here
//     }
// };

var indexMiddleware = {};

indexMiddleware.isLoggedIn = function(req, res, next) {
     if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","You need to be logged in to do that.");
    res.redirect("/login");
}

// Campground function
indexMiddleware.checkCampgroundOwnership = function (req,res,next) {
    //Code here
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                req.flash("error","Not found data.");
                res.redirect("back");
            } else {
                //Does the user is own ?
                if (foundCampground.author.id.equals(req.user._id)) {
                    //SUCCESS
                    next();

                    // //Remove item
                    // Campground.findById(req.params.id, function (err) {
                    //     if (err) {
                    //         res.redirect("back");
                    //     } else {
                    //         //SUCCESS
                    //         next();
                    //     }
                    // });
                } else {
                    req.flash("error","You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error","You need to be logged in to do that.");
        res.redirect("back");
    }
}

//Comment function
indexMiddleware.checkCommentOwnership = function (req,res,next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                req.flash("error","Not found data.");
                res.redirect("back");
            } else {
                //Does the user is own ?
                if (foundComment.author.id.equals(req.user._id)) {
                    //SUCCESS
                    next();

                    // Comment.findById(req.params.id, function (err) {
                    //     if (err) {
                    //         req.flash("error","Comment not found.");
                    //         res.redirect("back");
                    //     } else {
                    //         //SUCCESS
                    //         next();
                    //     }
                    // });
                } else {
                    req.flash("error","Yout don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error","You need to be logged in to do that.");
        res.redirect("back");
    }
}

module.exports = indexMiddleware;