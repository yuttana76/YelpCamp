var mongoose = require("mongoose");

//Connection database
// mongoose.connect("mongodb://localhost/yelp_camp"); 

var commentSchema = mongoose.Schema({
    text : String,
    author : String,
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment",commentSchema);

