$(function(){
	var $body = $('body')
		, $menuButton = $('.header_new-menu_button')
		, menuShowClass = 'is-menu-show';

	$menuButton.on('click', function() {
		$menuButton.toggleClass('active');
		$body.toggleClass(menuShowClass);
	})
});