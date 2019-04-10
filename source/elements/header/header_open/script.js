$(function(){
	var $body = $('body')
		, $menuButton = $('.header_new-menu_button');
	$('.header_new-open-section_header').click(function(event) {
		$(this).toggleClass('is_open')
		.next('.header_new-open-list').slideToggle();
	});
	$('.header_new-open-button_close').on('click', function() {
		$menuButton.removeClass('active');
		$body.removeClass('is-menu-show');
	});
});