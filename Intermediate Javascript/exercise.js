var age = prompt("What is your age?");

var valSquare = Math.sqrt(age);
var valPow = valSquare*valSquare;

if(age<0){
    console.log("you entered an invalid age.");
}
else if(age == 21){
    console.log("happy 21st birthday");
}
else if(!((age%2)===0)){
    console.log("your age is an odd number.");
}
else if(age==valPow){
    console.log("perfect square");
}
else{
    console.log("nothing to print");
}