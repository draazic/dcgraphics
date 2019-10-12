function mymethod(){
  console.log("passe")
  $('.containerFlip').on('click', function () {
    $('.cardHomeFlip').toggleClass('flipped');
  });
 
}