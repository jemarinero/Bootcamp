//check of specific todos by clicking
$('ul').on("click","li",function(evt){
   $(this).toggleClass('completed');
    //stops other event listeners to fire up
    evt.stopPropagation();
});

//click on x to delete todo
$('ul').on("click","span",function(evt){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    //stops other event listeners to fire up
    evt.stopPropagation();
});

$("input[type='text']").keypress(function(evt){
    if(evt.which === 13){
        //grabbing new todo text from input
        var todoText = $(this).val();
        //create a new li and add to ul
        $("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> "+todoText+"</li>")
        $(this).val("");
    }
});

$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
});