/*******************************************************************************
Cookie consent
*******************************************************************************/

$(document).ready(function () {
	window.cookieconsent.initialise({
		"palette": {
			"popup": {
				"background": "#45c1c0",
				"text": "#ffffff"
			},
			"button": {
				"background": "#006f74",
				"text": "#ffffff"
			}
		},
		"position": "top",
		"static": true,
		"content": {
			"message": "This website uses cookies. By browsing this website, you agree to our use of cookies.",
			"dismiss": "Close",
			"link": "More info",
			"href": "http://www.cso.ie/en/privacystatement/"
		}
	})
});

/*******************************************************************************
Datatables configuration
*******************************************************************************/

$(document).ajaxComplete(function () {
	$('#table-hook').DataTable({
		responsive: true
	});
});

/*******************************************************************************
Drop Down Mobile Menu
*******************************************************************************/

$(document).ajaxComplete(function () {
	$(".burger-nav").click(function() {
		$(".site-navigation .main-nav").toggleClass("open");
	});

	$(".main-nav li").click(function() {
		$('.dropdown-content').toggleClass("open");	
	});
});


/*******************************************************************************
Date Picker
*******************************************************************************/

$(document).ajaxComplete(function () {
	$(function() {
		$( ".date" ).datepicker();
	});
});

/*******************************************************************************
Scroll To Top
*******************************************************************************/

$(document).ajaxComplete(function () {
	$(window).scroll(function() {
		if ($(this).scrollTop() >= 50) { 
			$('#return-to-top').fadeIn(1000); 
		} else {
			$('#return-to-top').fadeOut(1000);
		}
	});
	
	$('#return-to-top').click(function() { 
		$('body,html').stop().animate({
			scrollTop: 0 
		}, 500);
	});
});

/*******************************************************************************
jQuery UI C/R
*******************************************************************************/

$(document).ajaxComplete(function () {
	$(function() {
		$(".checkradio input").checkboxradio({});
	});
});
	
/*******************************************************************************
Accordion
*******************************************************************************/
	
$(document).ajaxComplete(function () {
	$('div.panel').hide();
	$("button.accordion").on('click touch ', function() {
		$(this).next().toggle('fast');
	});
});
