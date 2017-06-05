var express = require("express");
var app = express();

app.set("view engine","ejs")

app.get("/", function (req, res) {
    res.render("landing");

});

app.get("/campgrounds",function(req,res){
var campgrounds=[
    {name:"AAA",image:"http://www.herbalbear.com/pix/camping-tent-480.jpg"},
    {name:"BBB",image:"https://s3.amazonaws.com/images.gearjunkie.com/uploads/2015/10/Hunting-Tent-700x525.jpg"},
    {name:"CCC",image:"https://s3.amazonaws.com/images.gearjunkie.com/uploads/2015/10/Canvas-Camp-Tent-2-700x429.jpg"},
    ];


res.render("campgrounds",{campgrounds:campgrounds});
});

app.listen(3000,function(){
    console.log("The YelpCamp Server Has Started !!!");
})
// app.listen(process.env.PORT, process.env.IP, function () {
//     console.log("The YelpCamp Server Has Started !!!");
// })