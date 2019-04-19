
var initHeader = function() {
	$header = $('#header');
	$(window).scroll(function() {
		var _top = parseInt($(window).height() / 2)
			, _scroll = parseInt($(window).height() / 3);


		if ($(window).scrollTop() >= _scroll) {
			$header.addClass('is-scroll');
		} else {
			$header.removeClass('is-scroll');
		}

		if ($(window).scrollTop() >= 150 && $(window).scrollTop() <= _scroll && !$header.hasClass('is-scroll')) {
			$( document ).trigger('isScroll');
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
			 && $dropdawn.has(e.target).length === 0
			 && !$dropdawnButton.is(e.target)
			 && $dropdawnButton.has(e.target).length === 0) // ... nor a descendant of the container
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

			if(index < $menuItems.length - 1) {
				var itemWidth = $(this).outerWidth();
				visibleItemsWidth += itemWidth;
			}

			if(visibleItemsWidth + 15 > wraperWidth) {
				lastItemIndex = index;
				$menuList.parent().removeClass('all-items-visible')
				return false;
			}

			$menuList.parent().addClass('all-items-visible')
		});

		$menuItems
			.slice(lastItemIndex, $menuItems.length - 1 ).hide()
			.end()
			.slice(0, lastItemIndex ).show();

		$dropdawnItems
			.slice(lastItemIndex, $menuItems.length ).show()
			.end()
			.slice(0, lastItemIndex ).hide();

		if(lastItemIndex >= itemsNumber) {
			$dropdawn.hide();
			$dropdawnButton.hide();
			return;
		}
		$dropdawnButton.show();
	};

	$menuList.removeClass('is_no_js_dot_menu');

	collapseMenuItems()

	$( window ).resize(function() {
		collapseMenuItems()
	});

	$( document ).on( 'isScroll', function() {
		$dropdawnButton.removeClass(activeClass);
		$dropdawn.hide();
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
	
	var $botMenuList = $('.header_new-bot-menu');
	var $botMenuDropdawn = $('.header_new-bot-menu-dropdown');
	var $botMenuDropdawnButton = $('.header_new-bot-menu-dropdown_button');
	
	initHeader();
	menuCollapsToDorpdown($botMenuList, $botMenuDropdawn, $botMenuDropdawnButton);
	menuCollapsToDorpdown($topMenuList, $topMenuDropdawn, $topMenuDropdawnButton);
});
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

	//Sub menu dropdawn

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
