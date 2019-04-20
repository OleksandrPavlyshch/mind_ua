$(function(){
	$('.footer_new-arrow_up').click(function() {
		$('html, body').animate({ scrollTop: 0 });
	});

	$('.footer_new-section_header').click(function(event) {
		if ($(window).width() <= 1024) {
			$(this).toggleClass('is_open')
			.next('.footer_new-list').slideToggle();
		}
	});
})