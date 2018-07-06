$(function(){
    /*数量加减*/
    $('.buy-num').blur(function () {
        if ($(this).val() == '') {
            $(this).val(1);
        };
        if ($(this).val() == '0') {
            $(this).val(1);
        };
    });
    $(".btn-add").click(function () {
        var newObj = $(this).parent().siblings(".buy-num");
        var s = newObj.val();//获得同一index的元素的值
        newObj.val(parseInt(s) + 1);  //做加法
    });
    $(".btn-reduce").click(function () {
        var newObj = $(this).parent().siblings(".buy-num");
        var s = newObj.val();
        if (s > 1) {
            newObj.val(parseInt(s) - 1);
        };
    });

        /*选中状态*/

     function add(obj){
         $(obj).each(function(i){
             $(this).click(function(){
                 $(this).siblings().removeClass("active");
                 $(this).addClass("active");
             });
         });
     }
    add(".si-size>li");
    add(".si-color>li");
    add(".tab-main>li");

    $('.tab-main li').click(function(){
        var liindex = $('.tab-main li').index(this);
        $(this).addClass('current').siblings().removeClass('current');
        $('.tab-con .item').eq(liindex).fadeIn(150).siblings('.item').hide();
       /* var liWidth = $('.tab-main li').width();*/
        var liWidth =150;
        $('.tab-main  p').stop(false,true).animate({'left' : liindex * liWidth + 'px'},300);
    });

        /*放大镜功能*/
    var smallImg = $(".smallBox li");
    var arr = ["images/product/1.jpg","images/product/2.jpg","images/product/3.jpg","images/product/1.jpg","images/product/2.jpg","images/product/3.jpg"];
    var oarr = ["images/product/111.jpg","images/product/222.jpg","images/product/333.jpg","images/product/111.jpg","images/product/222.jpg","images/product/333.jpg"];

    smallImg.each(function(i){
        $(this).click(function(){
            $(".midImg").attr("src",arr[i]);
            $(".bigImg").attr("src",oarr[i]);
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        });

        $(".midBox").mousemove(function(a){
            var evt = a || window.event;
            $(".bigBox").css('display','block');
            var ot = evt.clientY-( $(".midBox").offset().top- $(document).scrollTop() )-$(".mask").width()/2;
            var ol = evt.clientX-($(".midBox").offset().left- $(document).scrollLeft())-$(".mask").width()/2;
            if(ol<=0){
                ol = 0;
            }
            if(ot<=0){
                ot = 0;
            }
            if(ol>=$(".midBox").width()-$(".mask").width()){
                ol=$(".midBox").width()-$(".mask").width()
            }
            if(ot>=$(".midBox").height()-$(".mask").height()){
                ot=$(".midBox").height()-$(".mask").height()
            }
            $(".mask").css({'left':ol,'top':ot});

            var bigimgmove=$(".bigImg").width()-$(".bigBox").width();
            var maskmove= $(".midBox").width()-$(".mask").width();
            var rate=bigimgmove/maskmove;
            var ott = ot*rate;
            var oll = ol*rate;
            $(".bigImg").css({'left':-oll,'top':-ott})
        });
        $(".midBox").mouseout(function(){
            $(".bigBox").css('display','none')
        })
    })






});