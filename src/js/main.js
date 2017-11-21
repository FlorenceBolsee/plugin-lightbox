
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
  opened: false,

  modaleOut: function(){
    $(".lightbox").fadeOut(500);
    $(".overlay").removeClass("blur");
    this.opened = false;
  },

  modaleIn: function(ev){
    this.gallery = ".gallery" + $(ev.currentTarget).data("gallery");
    this.address = $(ev.currentTarget).data("address");
    this.id = $(ev.currentTarget).data("id");
    this.title = "Gallery " + $(ev.currentTarget).data("gallery");
    $(".img-full").attr("src", this.address);
    $(".lightbox").fadeIn(500);
    $(".overlay").addClass("blur");
    $(".gallery-title").text(this.title);
    this.opened = true;
  },

  lightboxOpening: function(){
    $(".conteneur-img a").on("click", this.modaleIn.bind(this));
    $(".conteneur-img a").keyup(function(e){
      if(e.keyCode == 13 && this.opened == false){
        this.modaleIn.bind(this);
      }
    });
  },

  lightboxClosing: function(e){
    $(".overlay, .close").on("click", this.modaleOut);
    $(document).keyup(function(e){
      if(e.keyCode == 27){
        this.modaleOut();
      }
    }.bind(this));
  },

  // effet boxShadow
  boxShadowIn: function(ev){
    var $this = $(ev.currentTarget);
    $this.css('box-shadow', this.boxShadow);
    $this.addClass("shadow");
  },
  boxShadowOut: function(target){
    var $this = $(this);
    $this.css('box-shadow', 'none');
    $this.removeClass("shadow");
  },
  shadowEffect: function(){
    $(".conteneur-img a").on("mouseenter", this.boxShadowIn.bind(this));
    $(".conteneur-img a").on("focus", this.boxShadowIn.bind(this));
    $(".conteneur-img a").on("mouseleave", this.boxShadowOut);
    $(".conteneur-img a").on("blur", this.boxShadowOut);
  },

  // gallery
  slider: function(){
    var idMax = this.id;
    var idMin = this.id;
    var lightboxAddress = this.address;

    $(this.gallery).each(
      function(){
        if($(this).data("id") > idMax){
          idMax = $(this).data("id");
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
    var lightboxId = this.id;
    $(".conteneur-img a").each(
      function(ev){
        var linkId = $(this).data("id");
        var linkAddress = $(this).data("address");
        if(linkId == lightboxId){
          lightboxAddress = linkAddress;
          $(".img-full").attr("src", lightboxAddress);
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
    console.log(this);
    $(".img-full").on("click", this.slider.bind(this));
    $(document).keydown(function(e){
      if(e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 39){
        this.slider.bind(this);
      }
    });
  }

};

lightbox.init();
