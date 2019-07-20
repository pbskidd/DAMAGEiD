/* Template: Leon Mobile App Landing Page Template--modified
   Author: Inovatik
   Version: 1.2
   Created: March 2017
   Description: Custom JS file
*/


/* Preloader */
//<![CDATA[
$(window).on('load', function() { // makes sure the whole site is loaded 
	"use strict";
	$('#status').delay(50).fadeOut(); // will first fade out the loading animation 
	$('#preloader').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website. 
	$('body').delay(550).css({'overflow':'visible'});
});
//]]>


(function($) {
    "use strict"; 
	
	/* Newsletter Form */
    $("#NewsletterForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formNError();
            submitNMSG(false, "Check if the field is filled in!");
        } else {
            // everything looks good!
            event.preventDefault();
            submitNForm();
        }
    });

    function submitNForm() {
        // initiate variables with form content
        var nemail = $("#nemail").val();

        $.ajax({
            type: "POST",
            url: "php/newsletterform-process.php",
            data: "email=" + nemail,
            success: function(text) {
                if (text == "success") {
                    formNSuccess();
                } else {
                    formNError();
                    submitNMSG(false, text);
                }
            }
        });
    }

    function formNSuccess() {
        $("#NewsletterForm")[0].reset();
        submitNMSG(true, "Email Submitted!")
    }

    function formNError() {
        $("#NewsletterForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function submitNMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#nmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
   	
	
	/* Contact Form */
    $("#ContactForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formCError();
            submitCMSG(false, "Check if all fields are filled in!");
        } else {
            // everything looks good!
            event.preventDefault();
            submitCForm();
        }
    });

    function submitCForm() {
        // initiate variables with form content
        var cfirstname = $("#cfirstname").val();
        var clastname = $("#clastname").val();
        var cemail = $("#cemail").val();
		var cmessage = $("#cmessage").val();

        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data: "firstname=" + cfirstname + "&lastname=" + clastname + "&email=" + cemail + "&message=" + cmessage, 
            success: function(text) {
                if (text == "success") {
                    formCSuccess();
                } else {
                    formCError();
                    submitCMSG(false, text);
                }
            }
        });
    }

    function formCSuccess() {
        $("#ContactForm")[0].reset();
        submitCMSG(true, "Message Submitted!")
    }

    function formCError() {
        $("#ContactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function submitCMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
   

	/* Testimonials Text Height */
    setCarouselHeight('#carousel-example-generic');

    function setCarouselHeight(id) {
        var slideHeight = [];
        $(id + ' .item').each(function() {
            // add all slide heights to an array
            slideHeight.push($(this).height());
        });

        // find the tallest item
        var max = Math.max.apply(null, slideHeight);

        // set the slide's height
        $(id + ' .carousel-content').each(function() {
            $(this).css('height', max + 'px');
        });
    }
	
	
	/* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="#header" class="back-to-top scrolling">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });
    
	
	/* jQuery Page Scrolling Feature */
	// requires jQuery easing plugin
		$('a.scrolling').on('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: ($($anchor.attr('href')).offset().top - 50)
			}, 1250, 'easeInOutExpo');
			event.preventDefault();
		});
	// highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });
    // closes the responsive menu on menu item click
    $('.navbar-collapse ul li a').on('click', function(){ 
            $('.navbar-toggle:visible').click();
	});
    // offset for main navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })
	
		/* Initialize Swiper */
    var myScreenShotsSwiper = new Swiper ('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		slidesPerView: 5,
		spaceBetween: 20,
		loop: true,
		direction: 'horizontal',
		effect: "slide",
		speed: 1000,
		autoplay: 3000,
		autoplayDisableOnInteraction: true,
		breakpoints: {
			1024: {
				slidesPerView: 4,
				spaceBetween: 0
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 0
			},
			640: {
				slidesPerView: 2,
				spaceBetween: 0
			},
			480: {
				slidesPerView: 1,
				spaceBetween: 0
			}
		}
	});

	
})(jQuery);