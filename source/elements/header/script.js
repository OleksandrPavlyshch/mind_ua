
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

$(function(){
	initHeader();
});