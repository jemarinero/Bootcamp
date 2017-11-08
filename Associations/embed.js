var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo",{useMongoClient: true});
mongoose.Promise = global.Promise;


var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);


var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


// var newUser = new user({
//     email: "josue.marinero@hotmail.com",
//     name: "Josue E. Marinero"
// });
// newUser.posts.push({
//     title: "Nothing",
//     content: "nothing"
// })
// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });

// newPost.save(function(err,post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Josue Marinero"}, function(err, user){
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title: "Cagada",
            content: "Si cagada"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});