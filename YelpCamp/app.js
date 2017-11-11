var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var seedDB     = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient: true});
mongoose.Promise = global.Promise;

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
seedDB();

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });
});

app.get("/campgrounds/new",function (req,res) {
   res.render("campgrounds/new") ;
});

//SHOW - shows more info about one campgroud
app.get("/campgrounds/:id", function(req, res){
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

app.post("/campgrounds",function (req,res) {
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

// ------------------------------------------
// COMMENTS ROUTES
// ------------------------------------------
app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground});
        }
    });
    
});

app.post("/campgrounds/:id/comments",function(req,res){
    //lookup campground using ID
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    res.redirect("/campgrounds/"+campground._id)
                }
            });
        }
    });
    
});

app.listen(3000,"localhost",function(){
    console.log("YelpCamp has started");
});