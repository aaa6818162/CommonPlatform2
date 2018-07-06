/*全部订单*/
$(".time-list>ol>li").each(function(i){
    $(this).hover(function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

    });
    $(this).click(function(){
        var val =$(this).text();
        console.log(val)
        $(".time-tit").text(val)
    });
});
$(".order-fil").hover(function(){
    $(".time-txt").children(".iconfont").toggleClass("icon-jiantou12");
    $(".time-txt").children(".iconfont").toggleClass("icon-jiantou11")
});
/*全部状态*/
$(".state-list>ol>li").each(function(i){
    $(this).hover(function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

    });
    $(this).click(function(){
        var val =$(this).text();
        console.log(val)
        $(".state-tit").text(val)
    });
});
$(".all-state").hover(function(){
    $(".state-txt").children(".iconfont").toggleClass("icon-jiantou12");
    $(".state-txt").children(".iconfont").toggleClass("icon-jiantou11")
});
/*用户设置*/
$(".set-content>ol>li").each(function(i){
    $(this).hover(function(){
        $(this).siblings().children("a").removeClass("active");
        $(this).children("a").addClass("active");

    });

});
$(".account-set").hover(function(){
    $(".set-tit").children(".iconfont").toggleClass("icon-jiantou12");
    $(".set-tit").children(".iconfont").toggleClass("icon-jiantou11")
})

