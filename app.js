var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs")

var campgrounds = [
        { name: "AAA", image: "http://www.herbalbear.com/pix/camping-tent-480.jpg" },
        { name: "BBB", image: "https://s3.amazonaws.com/images.gearjunkie.com/uploads/2015/10/Hunting-Tent-700x525.jpg" },
        { name: "CCC", image: "https://s3.amazonaws.com/images.gearjunkie.com/uploads/2015/10/Canvas-Camp-Tent-2-700x429.jpg" },
        { name: "AAA", image: "http://www.herbalbear.com/pix/camping-tent-480.jpg" },
        { name: "BBB", image: "https://s3.amazonaws.com/images.gearjunkie.com/uploads/2015/10/Hunting-Tent-700x525.jpg" },
        { name: "CCC", image: "https://s3.amazonaws.com/images.gearjunkie.com/uploads/2015/10/Canvas-Camp-Tent-2-700x429.jpg" },
        { name: "AAA", image: "http://www.herbalbear.com/pix/camping-tent-480.jpg" },
        { name: "BBB", image: "https://s3.amazonaws.com/images.gearjunkie.com/uploads/2015/10/Hunting-Tent-700x525.jpg" },
        { name: "CCC", image: "https://s3.amazonaws.com/images.gearjunkie.com/uploads/2015/10/Canvas-Camp-Tent-2-700x429.jpg" },
    ];

app.get("/", function (req, res) {
    res.render("landing");

});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});


app.post("/campgrounds", function (req, res) {
    //Add data form from data And add to campground array.
    var vName=req.body.name;
    var vImate = req.body.image;
    var newCampGround = {name: vName, image: vImate};
    campgrounds.push(newCampGround);

    //Redirect to campgrounds
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});


app.listen(3000, function () {
    console.log("The YelpCamp Server Has Started !!!");
})
// app.listen(process.env.PORT, process.env.IP, function () {
//     console.log("The YelpCamp Server Has Started !!!");
// })