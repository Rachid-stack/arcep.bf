(function($) {
  "use strict";

  // Ajuste la hauteur
  var fullHeight = function() {
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function() {
      $('.js-fullheight').css('height', $(window).height());
    });
  };
  fullHeight();

  // Carrousel ACEP
  var carousel = function() {
    $('.home-slider').owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      nav: true,
      dots: true,
      autoplayHoverPause: false,
      items: 1,
      navText: [
        "<span class='ion-ios-arrow-back'></span>",
        "<span class='ion-ios-arrow-forward'></span>"
      ],
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1000: { items: 1 }
      }
    });

    // Relancer les animations à chaque changement de slide
    $('.home-slider').on('changed.owl.carousel', function(event) {
      var current = $('.owl-item').eq(event.item.index);
      var elements = current.find('.text h2, .text h1, .text p, .text a');

      // Supprimer les anciennes animations
      elements.removeClass('animate__animated animate__fadeInUp animate__fadeInDown animate__zoomIn');

      // Forcer une légère pause pour redéclencher la séquence
      setTimeout(function() {
        current.find('h2').addClass('animate__animated animate__fadeInDown animate__delay-0_5s');
        current.find('h1').addClass('animate__animated animate__zoomIn animate__delay-1s');
        current.find('p').addClass('animate__animated animate__fadeInUp animate__delay-2s');
        current.find('a').addClass('animate__animated animate__fadeInUp animate__delay-3s');
      }, 150);
    });

    // Effet de sortie des textes avant la transition
    $('.home-slider').on('translate.owl.carousel', function() {
      $('.text h2, .text h1, .text p, .text a').removeClass('animate__fadeInUp animate__fadeInDown animate__zoomIn').addClass('animate__fadeOutUp');
    });

  };
  carousel();

})(jQuery);
