
var initHeader = function() {
	$header = $('#header');
	$(window).scroll(function() {
		var _top = parseInt($(window).height() / 2)
			, _scroll = parseInt($(window).height() / 3);

		if ($(window).scrollTop() >= _scroll ) {
			$header.addClass('is-scroll');
		} else {
			$header.removeClass('is-scroll');
		}

		if ($(window).scrollTop() >= _top) {
			$header.addClass('is-fixed');
		} else {
			$header.removeClass('is-fixed');
		}
	});
};

//code support ie 11
// menuCollapsToDorpdown for menu init
var menuCollapsToDorpdown = function($menuList, $dropdawn, $dropdawnButton) {
	var $menuItems = $menuList.find('li');
	var $dropdawnItems = $menuItems.clone();
	var activeClass = 'active';

	$dropdawn.html($dropdawnItems);
	//close when click out container
	$(document).mouseup(function (e) {
		if (!$dropdawn.is(e.target) // if the target of the click isn't the container...
			 && $dropdawn.has(e.target).length === 0) // ... nor a descendant of the container
			 {
			$dropdawnButton.removeClass(activeClass);
			$dropdawn.hide();
		}
	});

	function collapseMenuItems() {
		var wraperWidth = $menuList.width();
		var visibleItemsWidth = 0;
		var lastItemIndex = $menuItems.length;
		var itemsNumber = $menuItems.length;

		$menuItems.each(function(index) {

			var itemWidth = $(this).outerWidth();
			visibleItemsWidth += itemWidth;

			if(visibleItemsWidth + 15 > wraperWidth) {
				lastItemIndex = index;
				return false;
			}
		});

		$menuItems
			.slice(lastItemIndex, $menuItems.length ).hide()
			.end()
			.slice(0, lastItemIndex ).show();

		$dropdawnItems
			.slice(lastItemIndex, $menuItems.length ).show()
			.end()
			.slice(0, lastItemIndex ).hide();

			console.log(lastItemIndex)
			console.log(itemsNumber)

		if(lastItemIndex >= itemsNumber) {
			$dropdawn.hide();
			$dropdawnButton.hide();
			return;
		}
		$dropdawnButton.show();
	};

	collapseMenuItems()

	$( window ).resize(function() {
		collapseMenuItems()
	});

	$dropdawnButton.click(function() {
		var act = $dropdawnButton.hasClass(activeClass);
		if(act) {
			$dropdawnButton.removeClass(activeClass);
		} else {
			$dropdawnButton.addClass(activeClass);
		}
		$dropdawn.toggle(!act);
	});
};

$(function(){
	var $topMenuList = $('.header_new-top-main_menu-list');
	var $topMenuDropdawn = $('.header_new-top-main_menu-dropdown');
	var $topMenuDropdawnButton = $('.header_new-top-main_menu-dropdown_button');
	
	initHeader();
	menuCollapsToDorpdown($topMenuList, $topMenuDropdawn, $topMenuDropdawnButton);
});