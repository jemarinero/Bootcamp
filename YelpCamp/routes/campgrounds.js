
var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");

router.get("/",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });
});

router.get("/new",function (req,res) {
   res.render("campgrounds/new") ;
});

//SHOW - shows more info about one campgroud
router.get("/:id", function(req, res){
    //find the campground with de provided ID
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campgroud
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.post("/",function (req,res) {
   //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //create a new campground and save to DB
    Campground.create(newCampground, function(err, created){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
   
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login");
}
module.exports = router;