var action = prompt("What would you like to do?");
var todo = [];

while(action !== "quit"){
    if(action === "list"){
        listTodos();
    }else if(action === "new"){
        addTodo();
    }else if(action === "delete"){
        deleteTodo(); 
    }
    action = prompt("What would you like to do?");
}
console.log("ok, you quit the app");

function listTodos(){
    console.log("************");
    todo.forEach(function(td,i){
        console.log(i+": "+td);
    });
    console.log("************");
}

function addTodo(){
    var newTodo = prompt("Enter new todo");
    todo.push(newTodo);
}

function deleteTodo(){
    var idx = prompt("Index of todo to delete");
    todo.splice(idx,1);
}