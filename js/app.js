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

	var $stickyMenuList = $('.header_new_sticky-menu');
	var $stickyMenuDropdawn = $('.header_new_sticky-menu-dropdown');
	var $stickyMenuDropdawnButton = $('.header_new_sticky-menu-dropdown_button');
	
	initHeader();
	menuCollapsToDorpdown($botMenuList, $botMenuDropdawn, $botMenuDropdawnButton);
	menuCollapsToDorpdown($topMenuList, $topMenuDropdawn, $topMenuDropdawnButton);
	menuCollapsToDorpdown($stickyMenuList, $stickyMenuDropdawn, $stickyMenuDropdawnButton);
});
$(function () {
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        
    }
    
    var $subscribeForm = $('#subscribe_form'),
        $subscribeFormInput = $subscribeForm.find('.subscribe-email'),
        $subscribeCloseMessageIcon = $subscribeForm.find('.subscribe-message-close_icon'),
        $subscribeMessageText = $subscribeForm.find('.subscribe-message-text');
        subscribeFocusClass = 'is_focus',
        subscribeErrorClass = 'is_error',
        subscribeSendingClass = 'is_sending',
        subscribeSendedClass = 'is_sended',
        subscribeURL = 'https://mind.ua/ajax/subscription';

    var sendSubscribeRequest = function (data) {
        return $.ajax({
            url: subscribeURL,
            type: 'POST',
            data: data,
            contentType: 'text/plain',
            scriptAttrs: 'crossorigin'
        });
    }
    
    $subscribeForm.submit(function(e) {
        e.preventDefault();
        
        console.log(validateEmail($subscribeFormInput.val()));

        if (validateEmail($subscribeFormInput.val())){
            var data = $(this).serialize();
            $subscribeForm.addClass(subscribeSendingClass);
            sendSubscribeRequest(data)
                .done(
                    function(){
                        setTimeout(function () {
                            $subscribeMessageText.text('Вам надіслано листа для підтвердження');
                            $subscribeForm
                                .addClass(subscribeSendedClass)
                                .removeClass(subscribeSendingClass);
                        }, 1500);
                    }
                )
                .fail(
                    function () {
                        setTimeout(function () {
                            console.log('fail');
                            
                            $subscribeMessageText.text('Щось пішло не так!!!');
                            $subscribeForm
                                .addClass(subscribeSendedClass)
                                .removeClass(subscribeSendingClass);
                        }, 1500);
                    }
                );
        }
    });

    $subscribeCloseMessageIcon.click(function() {
        $subscribeForm.removeClass(subscribeSendedClass);
    });

    $subscribeFormInput.on('input', function (e) {
        var isValid = validateEmail(e.target.value);
       
        if (isValid) {
            console.log(isValid);   
            $subscribeForm.removeClass(subscribeErrorClass);
        }
    });

    $subscribeFormInput.focus(function() {
        $subscribeForm.addClass(subscribeFocusClass);
    });

    $subscribeFormInput.blur(function (e) {
        var val = e.target.value;
        var isValid = validateEmail(val);

        if (!val.length) {
            $subscribeForm
                .removeClass(subscribeFocusClass)
                .removeClass(subscribeErrorClass);
        } else {
            if (!isValid) {
                $subscribeForm
                    .addClass(subscribeErrorClass);
            } else {
                $subscribeForm
                    .removeClass(subscribeErrorClass);
            }
        }
    })
});


$(function(){
	var $body = $('body')
		, $menuButton = $('.header_new-menu_button');

	$('.header_new-open-section_header').click(function(event) {
		if ($(window).width() <= 1024){
			$(this).toggleClass('is_open')
			.next('.header_new-open-list').slideToggle();
		}
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