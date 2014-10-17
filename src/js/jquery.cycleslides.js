;(function( $, window, document, undefined ) {
  var CycleSlides = {
    init: function( options, elem ) {
      var self = this;

      self.elem = elem;
      self.$elem = $( elem );
      self.options = $.extend( {}, $.fn.cycleSlides.options, options );

      // Save elements for easy reference
      self.$html = $('html');
      self.$slides = self.$elem.find('.slide');
      self.$nextButton = self.$elem.find('.slides__next');

      // Set an initial next slide number
      self.nextSlideNumber = 0;

      // Bind resize event
      $(window).on('resize', function() {
        self.sizeElem();
      });

      // Bind next click event
      self.$nextButton.on('click', function(e) {
        e.preventDefault();
        clearInterval(self.cycleInterval);
        self.cycle();
      });

      // Begin cycling
      self.sizeElem();
      self.displayNextButton();
      self.cycle();
    },

    sizeElem: function() {
      var self = this;

      // Set slides height equals window height
      var windowHeight = Math.max($(document).height(), $(window).height());
      self.$elem.not('.is-done').css('height', windowHeight);

      // Disable overflow
      self.$html.addClass('no-overflow');
    },

    displayNextButton: function() {
      var self = this;

      self.$nextButton.addClass('is-visible');
    },

    cycle: function() {
      var self = this;

      self.nextSlide();
      self.cycleInterval = setInterval(function() {
        self.nextSlide();
      }, self.options.waitTime);

    },

    nextSlide: function() {
      var self = this;

      // If we have an active slide, set it to was-active
      if (self.$slides.filter('.is-active').length > 0) {
        self.$slides.filter('.is-active').removeClass('is-active').addClass('was-active');
      }

      // If we have a next slide, set it to active and raise the active number by 1
      if (self.$slides.eq(self.nextSlideNumber).length > 0) {
        self.$slides.eq(self.nextSlideNumber).addClass('is-active');
        self.nextSlideNumber = self.nextSlideNumber +1;
      }
      else {
        clearInterval(self.cycleInterval);
        self.finish();
      }

    },

    finish: function() {
      var self = this;

      // Set slides height to 0
      self.$elem.addClass('is-done');
      self.$elem.removeAttr('style');

      // Enable overflow
      self.$html.removeClass('no-overflow');
    }

  };




  $.fn.cycleSlides = function( options ) {
    return this.each(function() {
      var cycleslides = Object.create( CycleSlides );
      cycleslides.init( options, this );
    });
  };

  $.fn.cycleSlides.options = {
    waitTime: 5000
  };

})( jQuery, window, document );
