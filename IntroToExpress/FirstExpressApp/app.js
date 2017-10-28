//includes express framework
var express = require("express");
//initialize express
var app = express();

//------------------------------------------------------//
// Routes
//------------------------------------------------------//
//home
//two parametres, request and response


app.get("/",function(req,res){
    res.send("hi there");
});

app.get("/bye",function (req, res) {
   res.send("Goodbye!!") ;
});

app.get("/dog",function (req, res) {
    res.send("MEOW!!") ;
 });

app.get("/r/:subredittName",function(req, res){
    //req.params returns the parameters object
    //console.log(req.params);
    var subreddit = req.params.subredittName
    res.send("welcome to the "+subreddit.toUpperCase()+" subreddit");
});

app.get("/r/:subredittName/comments/:id/:title",function(req, res){
    res.send("welcome to the comments section");
});

app.get("*",function(req,res){
    res.send("Wrong site");
});
//tell express to listen for requests (start server)
app.listen(3000,"localhost",function(){
    console.log("server has started");
});