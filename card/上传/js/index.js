$(document).ready(function () {
   var $menu=$('#content1 .wrap a');
   var $page1=$('#content1 .page1');
   var $page2=$('#content1 .page2');

    $('body').css('opacity',1);

    //alert($('#content1 .wrap img:eq(2)').attr("src"))
    /*页面刷新判断*/
   var iHash=window.location.hash;
    if(iHash=='#page2'){
        change2(1,$('#content1 .wrap a:eq(1)'));
    }else{

        change2(0,$('#content1 .wrap a:eq(0)'));
    }



   /*底部图标切换加页面显示隐藏*/
   $menu.click(function (event) {

       change2($(this).index(),$(this));
      // event.preventDefault();
   });

    function change(obj) {
        for(var i=0;i<$menu.length;i++){
            $menu[i].className='';
        }
        obj.className='active';
    }
    function change2(num,obj) {

        change(obj[0]);
        switch (num){
            case 0:
                if(obj.hasClass('active')){
                    $(".dic1,.dip2,.dip3").show();
                    $(".dip1,.dic2,.dic3").hide();

                    $page1.css('display','block');
                    $page2.css('display','none');
                }
                break;
            case 1:
                if(obj.hasClass('active')){
                    $(".dip1,.dic2,.dip3").show();
                    $(".dic1,.dip2,.dic3").hide();
                    $page1.css('display','none');
                    $page2.css('display','block');
                }
                break;
            case 2:
                $(".dip1,.dip2,.dic3").show();
                $(".dic1,.dic2,.dip3").hide();

                break;
        }
    }

    $(".wrapper").css("font-size",setFont(12));

    /*设置 font*/

    function setFont(size){
        $("body").append('<span id="test-font" style="font-size: 96px">黑</span>');
        var scalingFactor = size * (96 / $("#test-font").width());
        $("#test-font").remove();

        return scalingFactor;
    }


});
