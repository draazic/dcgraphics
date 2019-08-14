function mymethod(){
    $(".card").click(function(e){
        $(e.currentTarget).toggleClass("flip");
      });
 
}