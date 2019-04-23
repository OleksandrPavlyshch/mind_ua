$(function(){
	var $body = $('body')
		, $menuButton = $('.header_new-menu_button')
		, menuShowClass = 'is-menu-show'
		, $searchInput = $('.header_new-search-input')
		, focusClass = 'is_focused'
		, openClass = 'is_open'
		, $searchForm = $('.header_new-search')
		, $subMenuTitle = $('.header_new-top-sub_menu-item-title')
		, $dropdowns = $('.header_new-top-sub_menu-dropdown');

	$menuButton.on('click', function() {
		$menuButton.toggleClass('active');
		$body.toggleClass(menuShowClass);
	});

	$searchInput.focus(function() {
		$searchForm.addClass(focusClass);
	});
	$searchInput.blur(function() {
		$searchForm.removeClass(focusClass);
	});

	$(document).keyup(function(e) {
		 if (e.key === "Escape" && e.keyCode == 27) {
			$menuButton.removeClass('active');
			$body.removeClass(menuShowClass);
		}
	});

	//Sub menu dropdown

	$subMenuTitle.click(function(e) {
		var act = $(this).hasClass(openClass);

		if(act) {
			$subMenuTitle.removeClass(openClass);
			$dropdowns.hide();
		} else {
			$dropdowns.hide();
			$subMenuTitle.removeClass(openClass);
			$(this).addClass(openClass).next().show();
		}
	});

	$( document ).on( 'isScroll', function() {
		$subMenuTitle.removeClass(openClass);
		$dropdowns.hide();
	});

	$(document).mouseup(function (e) {
		if (!$dropdowns.is(e.target) // if the target of the click isn't the container...
			 && $dropdowns.has(e.target).length === 0
			 && !$subMenuTitle.is(e.target)
			 && $subMenuTitle.has(e.target).length === 0) // ... nor a descendant of the container
			 {

			$subMenuTitle.removeClass(openClass);
			$dropdowns.hide();
		}
	});

});