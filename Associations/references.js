var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2",{useMongoClient: true});
mongoose.Promise = global.Promise;
var Post = require("./models/post");
var User = require("./models/user");





// Post.create({
//     title: "burgers 4",
//     content: "bla bla bla bla"
//     }, function(err, post){
//         User.findOne({email: "pancho@pancho.com"},function(err, user){
//             if(err){
//                 console.log(err);
//             } else {
//                 user.posts.push(post);
//                 user.save(function(err, data){
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log(data);
//                     }
//                 });
//             }
//         });
//     }
// );

//find user
//find all post for that user

User.findOne({email: "pancho@pancho.com"}).populate("posts").exec(function(err,user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});