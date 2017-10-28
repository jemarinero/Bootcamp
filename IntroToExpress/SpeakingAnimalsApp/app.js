var express = require("express");

var app = express();

var animals = {
    pig: 'Oink',
    cow: 'Moo',
    dog: 'Woof Woof!',
    cat: 'Meow!'
}

app.get("/",function(req,res){
    res.send("He there, welcome to my assignment!");
});

app.get("/speak/:animal",function(req, res){
    var animal = req.params.animal.toLowerCase();
    var speak = animals[animal];
    res.send("The "+animal+" says '"+speak+"'");
});


app.get("/repeat/:word/:times",function(req,res){
    var word = req.params.word;
    var times = Number(req.params.times);
    var newWord = "";
    for(var i = 0; i < times; i++){
        newWord += word+" ";
    }
    res.send(newWord);
});

app.get("*",function(req,res) {
   res.send("Sorry, page not found...What are you doing with your life?"); 
});

app.listen(3000,"localhost");