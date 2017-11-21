
var lightbox = {
  //custom colors
  boxShadow: "0px 0px 20px #000",
  crossColor: "#333",
  crossBgColor: "rgba(255, 255, 255, 0.5)",
  overlayColor: "rgba(0, 0, 0, .9)",
  lightBoxColor: "#fff",

  colorSetup: function(){
    $(".close").css("background", this.crossBgColor);
    $(".close-crossbar").css("background-color", this.crossColor);
    $(".overlay").css("background", this.overlayColor);
    $(".lightbox").css("background", this.lightBoxColor);
    $(".gallery-title").css("color", this.lightBoxColor);
  },

  //container adjustment
  lineCount: undefined,
  containerMaxHeight: undefined,
  containerHeight: undefined,
  linkHeight: undefined,

  heightSetup: function(){
    if($(window).width() > 480){
      this.lineCount = $(".conteneur-img a").length / 4;
      this.containerMaxHeight = 200 * this.lineCount;
      $(".conteneur-img").css("max-height", this.containerMaxHeight);
      this.containerHeight = 'calc(' + 25 * this.lineCount + 'vw - ' + 5 * this.lineCount + 'px)';
      $(".conteneur-img").css("height", this.containerHeight);
      this.linkHeight = 100 / this.lineCount + '%';
      $(".conteneur-img a").css("height", this.linkHeight);
    } else {
      this.lineCount = $(".conteneur-img a").length / 2;
      this.containerMaxHeight = 200 * this.lineCount;
      $(".conteneur-img").css("max-height", this.containerMaxHeight);
      this.containerHeight = 'calc(' + 50 * this.lineCount + 'vw - ' + 5 * this.lineCount + 'px)';
      $(".conteneur-img").css("height", this.containerHeight);
      this.linkHeight = 100 / this.lineCount + '%';
      $(".conteneur-img a").css("height", this.linkHeight);
    }
  },

  // lightbox opening
  gallery: undefined,
  address: undefined,
  id: undefined,
  title: undefined,

  modaleOut: function(){
    $(".lightbox").fadeOut(500);
    $(".overlay").removeClass("blur");
  },

  modaleIn: function(){
    lightbox.gallery = ".gallery" + $(this).data("gallery");
    lightbox.address = $(this).data("address");
    lightbox.id = $(this).data("id");
    lightbox.title = "Gallery " + $(this).data("gallery");
    $(".img-full").attr("src", lightbox.address);
    $(".lightbox").fadeIn(500);
    $(".overlay").addClass("blur");
    $(".gallery-title").text(lightbox.title);
  },

  lightboxOpening: function(){
    $(".conteneur-img a").on("click", this.modaleIn);
  },

  lightboxClosing: function(){
    $(".overlay, .close").on("click", this.modaleOut);
  },

  // effet boxShadow
  boxShadowIn: function(){
    var $this = $(this);
    $this.css('box-shadow', lightbox.boxShadow);
    $this.addClass("shadow");
  },
  boxShadowOut: function(target){
    var $this = $(this);
    $this.css('box-shadow', 'none');
    $this.removeClass("shadow");
  },
  shadowEffect: function(){
    $(".conteneur-img a").on("mouseenter", lightbox.boxShadowIn);
    $(".conteneur-img a").on("mouseleave", lightbox.boxShadowOut);
  },

  // gallery
  slider: function(){
    var idMax = this.id;
    var idMin = this.id;

    $(this.gallery).each(
      function(){
        if($(this).data("id") > idMax){
          idMax = $(this).data("id");
          console.log(idMax);
        }
        if($(this).data("id") < idMin){
          idMin = $(this).data("id");
        }
      }
    );
    if(this.id < idMax){
      this.id += 1;
    } else if (this.id == idMax) {
      this.id = idMin;
    }
    $(".conteneur-img a").each(
      function(){
        if($(this).data("id") == lightbox.id){
          lightbox.address = $(this).data("address");
          $(".img-full").attr("src", lightbox.address);
        }
      }
    );
  },

  init: function(){
    this.colorSetup();
    this.heightSetup();
    this.lightboxOpening();
    this.lightboxClosing();
    this.shadowEffect();
    $(".img-full").on("click", this.slider.bind(this));
  }

};

lightbox.init();
