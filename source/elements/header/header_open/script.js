$(function(){
	$('.header_new-open-section_header').click(function(event) {
		$(this).toggleClass('is_open')
		.next('.header_new-open-list').slideToggle();
	});
});