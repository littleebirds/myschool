
$(document).ready(function() {
    $('head meta[name=viewport]').remove();
    $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />');

    var timelines = [];
    var currentPage = 0;

    $(window).on("resize", function () {
        resize();
        $("#wrapper header").css("opacity","1");
    });

    setInterval(function () {
        $(window).trigger("resize");
    }, 500);

    var scroll = new IScroll($('.wrapper').get(0), {
        scrollX: false,
        scrollY: true,
        snap: true,
        snapSpeed: 1000,
        click: true,
        momentum: false
    });

    scroll.on('scrollEnd', $.proxy(initPage, this));

    initPage();

    function resize() {

        var layoutWidth = 750; // iPhone 6 width
        var layoutHeight = 1134;// iPhone 6 height - Wechat bar - bar= 1334 - 118-82



        var ww = $(window).width();
        var wh = $(window).height();




        // reset header
        $('.bank-l').width(ww * 312 / 640);
        $('.bank-l').height(ww * 66 / 640);
        $(".bank-l").css("background-size", 0.95 * 500 * ww / 640 + "px");


        $('.buy-r').width(ww * 173 / 640);
        $('.buy-r').height(ww * 66 / 640);
        $(".buy-r").css("background-size", 0.95 * 500 * ww / 640 + "px");

        $('#headerTop').height(ww * 66 / 640);


        if ($("#logolink").size() > 0) {
            $("#logolink").remove();
            $('header').append('<div class="logolink"></div>');
        }
        $('.logolink').height(ww * 16 / 640).css("background-color", "#03357C");


        $("#wrapper header").width(ww);
        $("#wrapper").width(ww);







        if ($("header").css("display") == "none") {
            wh = $(window).height();
            $("#content").height($(window).height());
            $("#content1").show();
        }
        else {
            wh = $(window).height() - ($("#headerTop").height() + $(".logolink").height());
            $("#content").height($(window).height() - ($("#headerTop").height() + $(".logolink").height()));
            $("#content1").show();
        }

        //$(".ban_2").height($(".banner img").height());

        $(".h1_con").height($(".p2").height())

        this.fitOn = "width";

        if (wh / ww > layoutHeight / layoutWidth) {
            w = ww;
        }
        else {
            w = wh / (layoutHeight / layoutWidth);
        }

        var h = w * layoutHeight / layoutWidth;

        var th = ($(".wrap1_1_bg").size() > 0) ? $(".wrap1_1_bg img").height() : 0;





        /*20151218 end*/

        $(".wrapper").width(ww);
        $(".wrapper").height(wh);

        $(".item").height(wh);


        $(".content").width(w);
        $(".content").css("left", (ww - w) / 2);

     /*   $(".content1").width(w);
        $(".content1").css("left", (ww - w) / 2);*/


        $(".outer").width(Math.min($("#content").width(), $(window).height() * 750 / 1109));

        $(".overlay").width($(window).width());
        $(".overlay").height($(window).height());
        if (ww > wh) {
            $(".wrapper").height(h);
        }

        if ($("header").css("display") == "none") {
            $(".wrapper").css("top", (0) + "px");
            $(".nav").css("top", (th-1) + "px");
            $(".btn1 img").css("top","139%");
            //$(".btn").css("top",$(".outer").height()+33+'px')
        }
        else {
            $(".wrapper").css("top", ($("#headerTop").height() + $(".logolink").height()) + "px");
            $(".nav").css("top", ($("#headerTop").height() + $(".logolink").height() + th-1) + "px");
            $(".btn1 img").css("top","135%");
            //$(".btn").css("top",$(".outer").height()+33+'px')
        };
        var ratio = 1;

        if (this.fitOn == "width") {
            ratio = w / layoutWidth;
        }
        else if (this.fitOn == "height") {
            ratio = h / layoutHeight;
        }

        if (scroll && !scroll.moved) {

            scroll.refresh();

        }
    }

    function initPage() {

       /* console.log(currentPage);
        console.log(scroll.currentPage.pageY);*/


        $("input, textarea, select").trigger("blur");


        if (scroll.currentPage.pageY != currentPage) {


            console.log(currentPage);

            if (!scroll.currentPage.pageY) {
                currentPage = 0;
            }
            else {

                currentPage = scroll.currentPage.pageY;
            }



            console.log(currentPage);
            if(currentPage == 1){
                $("#content1").height($("#content1 .qus_list").height());

                var scroll1 = new IScroll($('.item2').get(0), {
                    scrollX: false,
                    scrollY: true,
                    snap: false,
                    click: true,
                    momentum: true,
                    snapThreshold: 0.1
                });

                scroll1.enable();
                scroll1.on('scrollEnd',function(){
                    if(scroll1.y == 0){
                        scroll.enable();
                    }else{
                        scroll.disable();
                    }
                });

            }


            for (var i=0; i<timelines.length; i++) {

                timelines[i].seek(0);
                timelines[i].stop();

                if (currentPage == i) {
                    timelines[i].play();
                }

            }

        }

    }




    /*设置 font*/

    function setFont(size){
        $("body").append('<span id="test-font" style="font-size: 96px">黑</span>');
        var scalingFactor = size * (96 / $("#test-font").width());
        $("#test-font").remove();
        return scalingFactor;
    }

    $(".wrapper").css("font-size",setFont(12));

});
