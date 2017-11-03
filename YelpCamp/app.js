var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8038/7930463550_42c3f82870.jpg"},
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8038/7930463550_42c3f82870.jpg"}
]

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    res.render("campgrounds",{campgrounds: campgrounds});
});

app.get("/campgrounds/new",function (req,res) {
   res.render("new") ;
});

app.post("/campgrounds",function (req,res) {
   //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
   //redirect back to campgrounds page
   res.redirect("/campgrounds");
});

app.listen(3000,"localhost",function(){
    console.log("YelpCamp has started");
});