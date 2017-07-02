
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
    req.flash("error","Pleash login first!!!");
    res.redirect("/login");
}

// Campground function
indexMiddleware.checkCampgroundOwnership = function (req,res,next) {
    //Code here
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect("back");
            } else {
                //Does the user is own ?
                if (foundCampground.author.id.equals(req.user._id)) {
                    //Remove item
                    Campground.findById(req.params.id, function (err) {
                        if (err) {
                            res.redirect("back");
                        } else {
                            //SUCCESS
                            next();
                        }
                    });
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

//Comment function
indexMiddleware.checkCommentOwnership = function (req,res,next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                //Does the user is own ?
                if (foundComment.author.id.equals(req.user._id)) {
                    //Remove item
                    Comment.findById(req.params.id, function (err) {
                        if (err) {
                            res.redirect("back");
                        } else {
                            //SUCCESS
                            next();
                        }
                    });
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = indexMiddleware;