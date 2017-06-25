var mongoose = require("mongoose");

//Connection database
// mongoose.connect("mongodb://localhost/yelp_camp"); 

//Shema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

//Model
// var Campground = mongoose.model("Campground",campgroundSchema);

module.exports =mongoose.model("Campground",campgroundSchema);