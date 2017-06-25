var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comment")

//Connection database
mongoose.connect("mongodb://localhost/yelp_camp"); 

var data = [
    {
        name: "AAA",
        image: "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5115588.jpg",
        description: "Description AAA"
    },
    {
        name: "BBB",
        image: "http://www.acadiamagic.com/1200px/seawall-1312.jpg",
        description: "Description BBB"
    },
    {
        name: "CCC",
        image: "https://static1.squarespace.com/static/539a5ea7e4b039fccfb868c0/5660646ee4b071e0f8ab57ae/5660651ee4b0a6f078db6107/1449158649321/tentsite_1000px.jpg",
        description: "Description CCC"
    }
];

function seedDB() {
    //Remove
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds.");

            //Create data
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campgroundCreted) {
                    if (err) {
                        console.log(err);
                    } else {

                        Comment.create({
                            text:"Comment 1",
                            author:"BOM"
                        },function(err,commentCreated){
                            if(err){

                            }else{
                                campgroundCreted.comments.push(commentCreated);
                                campgroundCreted.save();
                            }
                        });

                        console.log("Campground created..");
                    }
                });
            });
        }
    });


}

module.exports = seedDB;