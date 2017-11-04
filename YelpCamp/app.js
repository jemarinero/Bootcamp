var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient: true});
mongoose.Promise = global.Promise;

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg",
//         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//     }, function(err,Campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground");
//             console.log(Campground);
//         }
//     }
// );

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index",{campgrounds: campgrounds});
        }
    });
});

app.get("/campgrounds/new",function (req,res) {
   res.render("new") ;
});

//shows more info about one campgroud
app.get("/campgrounds/:id", function(req, res){
    //find the campground with de provided ID
    
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campgroud
            res.render("show", {campground: foundCampground});
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

app.listen(3000,"localhost",function(){
    console.log("YelpCamp has started");
});