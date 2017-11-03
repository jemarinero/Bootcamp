var express = require("express");
var app = express();
var request = require("request");

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("search");
});

app.get("/results",function(req, res){
    var search = req.query.search;
    var url = "http://omdbapi.com/?s="+search+"&apikey=thewdb";
    request(url,function(error,responde,body){
        if(!error && responde.statusCode === 200){
            var data = JSON.parse(body)
            res.render("results",{data: data});
        }
    });
});

app.listen(3000,"localhost",function(){
    console.log("server started");
});