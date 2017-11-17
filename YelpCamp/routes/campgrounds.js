
var express    = require("express");
var router     = express.Router({mergeParams: true});
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

router.get("/new",isLoggedIn,function (req,res) {
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

//create - add new campground
router.post("/",isLoggedIn,function (req,res) {
    //get data from form and add to campgrounds array
     var name = req.body.name;
     var image = req.body.image;
     var desc = req.body.description;
     var author = {
         id: req.user._id, 
         username: req.user.username
     };
     var newCampground = {
         name: name, 
         image: image, 
         description: desc, 
         author: author
     };
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

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",checkCampgroundOwnership,function(req, res){
    //is user logged in
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id",checkCampgroundOwnership,function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            //redirect to the show page
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
    
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}
module.exports = router;