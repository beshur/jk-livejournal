// Simple J/k navigation for Wordpress
// by Alex Buznik (@beshur)
// https://gist.github.com/beshur/3a66b643a176eb1495d0
// Change t value for the correct selectors of the items that need to be traversed
window.onload = function() {
	jQuery.noConflict();
	(function($) {
		$(function() {
			var is_blog = false;
			console.log(is_blog);
			/*

			if (!$("body").hasClass("blog")) {
				is_blog = false;
			}
			*/
			var t = getTargets();

			$(".ljcut-link-expand").on("click", function(e) {
				$(document).ajaxComplete(function(e) {
					t = getTargets();
				});
			});

			console.log(t);

			$(window).on("keyup", function(e) {
				if (e.which == 74 || e.which == 75) {

					// forward
					var dir = true;
					// backward
					if (e.which == 75) dir = false;


					var scrollTop = $(window).scrollTop();

					t.each(function(i) {
						var o = $(this).offset().top;

						if (o > scrollTop || o == scrollTop || i+1 == t.length) {
							var to = o;
							if (o == scrollTop && dir) {
								to = $(t[i+1]).offset().top;
							} else if (o == scrollTop && !dir) {
								if (i == 0) return false;
								to = $(t[i-1]).offset().top;
							}

							
							if (!dir) {
								to = $(t[i-1]).offset().top;
								if (o < scrollTop && i != 0) {
									to = $(this).offset().top;
								}
							} else {
								// if forward, post is last and position on last
								if (i+1 == t.length) return false;
							}

							if (to != scrollTop) {
								$("html,body").stop(true, true).animate({
									scrollTop: to
								}, "fast");
								return false;
							}
						}

					});

				}
			});
		});

		function getTargets() {
			var t = $(".entry-wrap, .entry-wrap img, .entry-wrap iframe, .entry-wrap .ljpoll-meta");
			/*
			if (is_blog) {
				t = $("article.post, article + .pagination");
			}
			*/
			return t;
		}
	})(jQuery);
}