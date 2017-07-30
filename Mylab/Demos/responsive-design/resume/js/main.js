// my-page
$.fn.extend({
    transPage: function(opts) {
        var $nav = $(this).children('.nav'),
            $pageWarp = $(this).children('.warp');
        var init = function() {
            // show
            $pageWarp.children('.page').eq(0).show('fast');
            // set event
            $nav.on('click', 'li', function(event) {
                event.preventDefault();
                /* Act on the event */
                var ci = $(this).index(),
                    a_index = $(this).siblings('.active').index();
                a_index = a_index >= 0 ? a_index : ci;
                $(this).siblings('.active').removeClass('active').children('i').animate({ height: "0", fontSize: "0" }, 'slow');
                $(this).children('i').animate({ height: "100%", fontSize: "0.16rem" }, 'slow');
                $(this).addClass('active');
                // 
                var $fadeOut = $pageWarp.children('.page').eq(a_index),
                    $fadeIn = $pageWarp.children('.page').eq(ci);
                console.log(a_index);
                console.log(ci);
                $fadeOut.removeClass('active fadeInUp animated').addClass('active fadeOutDown animated');
                setTimeout(function() {
                    $fadeOut.removeClass('active fadeOutDown animated');
                    $fadeIn.removeClass('active fadeInUp animated').addClass('active fadeInUp animated');
                    if (ci == parseInt(opts.fnIndex)) { opts.fn[opts.fnIndex](); }
                }, 500);
            });
        };
        return this.each(function() { init(); });
    }
});
var page = function() {
    var $me = $('#me'),
        $back = $('#back'),
        $banner = $('section.banner'),
        $main = $('section.main');
    var pieChart = function() {
        $('.chart').easyPieChart({
            scaleColor: false,
            lineWidth: 10,
            lineCap: 'round', //round butt
            barColor: function(percent) {
                var ctx = this.renderer.getCtx();
                var canvas = this.renderer.getCanvas();
                var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                gradient.addColorStop(0, "#ffe57e");
                gradient.addColorStop(1, "#de5900");
                return gradient;
            },
            trackColor: "#fff",
            size: 100,
            animate: { duration: 1000, enabled: true }
        });
    };
    var init = function(argument) {
        $('.trans-page').transPage({ fnIndex: "3", fn: { 3: pieChart } });
        $me.on('mouseover', function(event) {
            event.preventDefault();
            /* Act on the event */
            var $parent = $(this).parent('section')
            var $next = $parent.next();
            $(this).animate({
                marginTop: "100%"
            }, 1000, function() {
                /* stuff to do after animation is complete */
                $next.show('fast');
                $parent.slideUp('slow', function() {
                    $me.css({ marginTop: '0' });
                });
            });
        });
        $back.on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
            $(this).animate({ left: "50px" }, 500, function() {
                // body...
                $main.slideDown('slow');
                $banner.slideDown('slow', function() {
                    $back.css({ left: '0' });
                });
            });
        });
    };
    return {
        init: function() {
            init();
        }
    }
}();
$(document).ready(function() {
    page.init();
});
