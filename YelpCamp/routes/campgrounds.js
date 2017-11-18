
var express    = require("express");
var router     = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder   = require("geocoder");

router.get("/",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: campgrounds, page: "campgrounds"});
        }
    });
});

router.get("/new",middleware.isLoggedIn,function (req,res) {
    res.render("campgrounds/new") ;
});

//SHOW - shows more info about one campgroud
router.get("/:id", function(req, res){
    //find the campground with de provided ID
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            console.log(err);
        } else {
            //render show template with that campgroud
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var cost = req.body.cost;
    geocoder.geocode(req.body.location, function (err, data) {
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      var location = data.results[0].formatted_address;
      var newCampground = {name: name, image: image, description: desc, cost: cost, author:author, location: location, lat: lat, lng: lng};
      // Create a new campground and save to DB
      Campground.create(newCampground, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
              //redirect back to campgrounds page
              console.log(newlyCreated);
              res.redirect("/campgrounds");
          }
      });
    });
  });

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res){
    //is user logged in
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      var location = data.results[0].formatted_address;
      var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
      Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
          if(err){
              req.flash("error", err.message);
              res.redirect("back");
          } else {
              req.flash("success","Successfully Updated!");
              res.redirect("/campgrounds/" + campground._id);
          }
      });
    });
  });

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        } else {
            req.flash("success", "Campground deleted");
            res.redirect("/campgrounds")
        }
    });
});

module.exports = router;