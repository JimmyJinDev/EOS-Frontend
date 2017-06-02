$(document).on('angular-ready', function () {
return;
    var lastScrollTop = 0;
    $('.sidebar-body').scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            console.log('down');
            // downscroll code
            $('#navbar-app-navbar-responsive').css('margin-top', '-170px')
        } else {
            // upscroll code
            console.log('up');
            $('#navbar-app-navbar-responsive').css('margin-top', '0px')
        }
        lastScrollTop = st;
    });
})