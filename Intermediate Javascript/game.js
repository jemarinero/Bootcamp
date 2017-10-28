var secretNumber = 6;

var guess = prompt("Guess a number");

if(Number(guess) === secretNumber){
    alert("You got it right.");
}
else if(Number(guess) > secretNumber){
    alert("Too high.");
}
else {
    alert("Too low.");
}