$(function(){
	$('.header_new-open-section_header').click(function(event) {
		$(this).next('.header_new-open-list').slideToggle();
	});
});