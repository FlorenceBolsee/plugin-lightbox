$(window).click(function(){
  $(".lightbox").fadeOut(400);
  $(".overlay").removeClass("blur");
});
$(".conteneur-img a").click(function(e){
  e.stopPropagation();
  var address = $(this).data("address");
  $(".img-full").attr("src", address);
  $(".lightbox").fadeIn(500);
  $(".overlay").addClass("blur");
});
$(".close").click(function(){
  $(".lightbox").fadeOut(500);
  $(".overlay").removeClass("blur");
});

$(document).keyup(function(e){
  if(e.keyCode == 27){
    $(".lightbox").fadeOut(500);
    $(".overlay").removeClass("blur");
  }

});

// effet hover et focus sur les preview

$(".conteneur-img a").on("mouseenter",
  function(){
    var $this = $(this);
    $this.addClass("shadow");
  }
);

$(".conteneur-img a").on("mouseleave",
  function(){
    var $this = $(this);
    $this.removeClass("shadow");
  }
);

$(".conteneur-img a").on("focus",
  function(){
    var $this = $(this);
    $this.addClass("shadow");
  }
);

$(".conteneur-img a").on("blur",
  function(){
    var $this = $(this);
    $this.removeClass("shadow");
  }
);
