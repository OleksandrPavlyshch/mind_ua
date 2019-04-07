$(function(){
	var $body = $('body')
		, $menuButton = $('.header_new-menu_button')
		, menuShowClass = 'is-menu-show'
		, $searchInput = $('.header_new-search-input')
		, focusClass = 'is_focused'
		, $searchForm = $('.header_new-search');

	$menuButton.on('click', function() {
		$menuButton.toggleClass('active');
		$body.toggleClass(menuShowClass);
	});

	$searchInput.focus(function() {
		console.log('dd')
		$searchForm.addClass(focusClass);
	});
	$searchInput.blur(function() {
		$searchForm.removeClass(focusClass);
	});


});