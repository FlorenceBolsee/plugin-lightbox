$(window).click(function(){
  $(".popup").fadeOut(400);
  $("main").removeClass("blur")
});
$("section a").click(function(e){
  e.stopPropagation();
  $(".popup").fadeIn(500);
  $("main").addClass("blur");
});
$(".close").click(function(){
  $(".popup").fadeOut(500);
  $("main").removeClass("blur");
});

$(document).keyup(function(e){
  if(e.keyCode == 27){
    $(".popup").fadeOut(500);
    $("main").removeClass("blur");
  }

});
