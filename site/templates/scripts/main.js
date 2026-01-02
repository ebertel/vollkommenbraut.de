// 	Slider
  $(function() {
	$(".rslides").responsiveSlides({
		  auto: true,             // Boolean: Animate automatically, true or false
		  speed: 700,            // Integer: Speed of the transition, in milliseconds
		  timeout: 2000,          // Integer: Time between slide transitions, in milliseconds
		  pager: false,           // Boolean: Show pager, true or false
		  nav: false,             // Boolean: Show navigation, true or false
		  random: false,          // Boolean: Randomize the order of the slides, true or false
		  pause: false,           // Boolean: Pause on hover, true or false
		  pauseControls: true,    // Boolean: Pause when hovering controls, true or false
		  prevText: "Previous",   // String: Text for the "previous" button
		  nextText: "Next",       // String: Text for the "next" button
		  maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
		  navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
		  manualControls: "",     // Selector: Declare custom pager navigation
		  namespace: "rslides",   // String: Change the default namespace used
		  before: function(){},   // Function: Before callback
		  after: function(){}     // Function: After callback
		});
  });
  
	  
	 
//	Fancybox
//	$(document).ready(function() {
//		  $(".fancybox").fancybox({
//			caption : {
//				type : 'float'
//				},
//			nextEffect  : 'elastic',
//			prevEffect  : 'elastic'
//			});
//		});
	
	
// 	Hamburger-Navi  
	$(document).ready(function(){
		$( '.hamburger' ).on('click', function() {
			$(this).toggleClass('hamburger_x').siblings('.button').removeClass('hamburger_x');
				$('.navi_top_hamburger').slideToggle('200');
	  });   
	});	

// 	Mobile Dropdown Toggle (Touch + Hover)
	$(document).ready(function(){
		// Touch: Klick auf den Link
		$('#navi_top_hamburger .dropdown > a').on('click', function(e) {
			e.preventDefault();
			var $dropdown = $(this).parent();
			$dropdown.find('.dropdown-content').slideToggle('200');
			$dropdown.toggleClass('open');
		});

		// Desktop: Hover
		$('#navi_top_hamburger .dropdown').hover(
			function() {
				$(this).find('.dropdown-content').stop(true, true).slideDown('200');
				$(this).addClass('open');
			},
			function() {
				$(this).find('.dropdown-content').stop(true, true).slideUp('200');
				$(this).removeClass('open');
			}
		);
	});

