(function ($) {
    $(function () {
        myfunload();
    });
})(jQuery);
$("#requestForm").on('submit', function () {
    setTimeout(function () {
        if (!$("input, textarea, select").hasClass("input-validation-error")) {
            $(".loading_div").css("display", "block");
        }
    }, 100);
});
function onSuccess() {
    $(".loading_div").css("display", "none");
    $("#divUpdateMessage").removeClass("alert alert-danger").addClass("alert alert-success");
}
function onFailure() {
    $(".loading_div").css("display", "none");
    $("#divUpdateMessage").addClass("alert alert-danger");
}
//function===============================================================================================
/*=============================fun=========================================*/
function myfunload() {
    // Active nav item based on current page
    var path = window.location.pathname;
    $('#menu > li > a').each(function () {
        var href = $(this).attr('href');
        if (href && href !== 'javascript:void(0);') {
            if (path === href || (href !== '/vi/' && href !== '/en/' && path.indexOf(href) === 0)) {
                $(this).parent().addClass('active');
            }
        }
    });

    $(".panel-a").mobilepanel();
    $("#menu > li").not(".li-home").clone().appendTo($("#menuMobiles"));
    $("#menuMobiles input").remove();
    $("#menuMobiles > li > a").append('<span class="fa fa-chevron-circle-right iconar"></span>');
    $("#menuMobiles li li a").append('<span class="fa fa-angle-right iconl"></span>');
    $("#menu > li:last-child").addClass("last");
    $("#menu > li:first-child").addClass("fisrt");
    $("#menu > li").find("ul").addClass("menu-level");
    $(".wrap-content p").each(function () {
        if ($(this).html() === "") {
            $(this).html("&nbsp;");
        }
    });
    $("ul.ul-job > li > a").click(function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("active");
    });
    /*=====banner-slider=====*/
    $(".slide-banners").owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplaytimeout: 10000,
        autoplayHoverPause: true
    });
    $(".slide-services").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        navText: ["<img src='/images/arr-prev.png' alt='prev' />", "<img src='/images/arr-next.png' alt='next' />"],
        dots: false,
        autoplay: true,
        autoplaytimeout: 10000,
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    $(".more-image").owlCarousel({
        margin: 10,
        lazyLoad: true,
        loop: false,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 3
            },
            480: {
                items: 3
            },
            600: {
                items: 4
            },
            1000: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });

    $(".slide-jobs").owlCarousel({
        loop: false,
        margin: 30,
        nav: true,
        navText: ["<i data-lucide='chevron-left'></i>", "<i data-lucide='chevron-right'></i>"],
        dots: false,
        autoplay: true,
        autoplaytimeout: 10000,
        onInitialized: function() {
            if (window.lucide) {
                lucide.createIcons();
            }
        },
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    $(".more-product").owlCarousel({
        margin: 30,
        lazyLoad: true,
        loop: true,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            641: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });
    $(".tin-title").click(function () {
        $(".tin-title").removeClass('active');
        $accordion = $(this).next();
        if ($accordion.is(':hidden') === true) {
            $(".tin-content").slideUp();
            $accordion.slideDown();
            $(this).addClass('active');
        } else {
            $accordion.slideUp();
            $(".tin-title").removeClass('active');
        }
    });

}
/*=========================================================================*/
//================== scroll top
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
});
$('.scroll-to-top').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 138) {
        $('.main-nav').addClass('bot-head-scroll');
    }
    else {
        $('.main-nav').removeClass('bot-head-scroll');
    }
});