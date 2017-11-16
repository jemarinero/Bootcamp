var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3805/9667057875_90f0a0d00a.jpg",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc"
    },
    {
        name: "Desert Mesa",
        image: "https://farm1.staticflickr.com/756/21043112059_788cbc12ed.jpg",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc"
    },
    {
        name: "Canyon Floor",
        image: "https://farm4.staticflickr.com/3011/2997488895_4c458dca1d.jpg",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc"
    }
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({},function(err){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("Removed campgrounds");
    //         //add a few campgrounds
    //         data.forEach(function(seed){
    //             Campground.create(seed,function(err,campground){
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                     console.log("added a camprounds")
    //                     //add a few comments
    //                     Comment.create({
    //                         text: "This place is greate, but I wish there was internet",
    //                         author: "Homer"
    //                     }, function(err, comment){
    //                         if(err){
    //                             console.log(err);
    //                         } else {
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                             console.log("comment added");
    //                         }
                            
    //                     });
    //                 }
    //             });
    //         });
    //     }
    });

    
    
}

module.exports = seedDB;