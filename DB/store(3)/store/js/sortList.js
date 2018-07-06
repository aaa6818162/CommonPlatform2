$(function(){
/*点击切换图标*/
$(".crumb-r").click(function(){
    $(".groups").slideToggle();
    $(this).children("span").toggleClass("icon-jiantou11");
    $(this).children("span").toggleClass("icon-jiantou12");
    /*if($(this).children("span").hasClass("icon-arrowdown")){
        $(".filter").css("marginTop",7)
    }else{
        $(".filter").css("marginTop",h);
        console.log($(".groups").height())
    }*/
});

/*筛选*/
    var dlNum  =$(".listIndex");
    for (i = 0; i < dlNum.length; i++) {
        $(".hasBeenSelected .clearList").append("<div class=\"selectedInfor selectedShow\" style=\"display:none\"><label></label><em></em></div>");
    }
    var refresh = "true";

    $(".listIndex a ").on("click",function(){
        var text =$(this).text();
        var selectedShow = $(".selectedShow");
        var textTypeIndex =$(this).parents("dl").index();
        index = textTypeIndex -(2);
        $(".clearDd").show();
        $(".selectedShow").eq(index).show();
        $(this).addClass("selected").siblings().removeClass("selected");

        selectedShow.eq(index).find("label").text(text);
        var show = $(".selectedShow").length - $(".selectedShow:hidden").length;
        if (show > 1) {
            $(".eliminateCriteria").show();
        }

    });
    $(".selectedShow em").on("click",function(){
        $(this).parents(".selectedShow").hide();
        var textTypeIndex =$(this).parents(".selectedShow").index();
        index = textTypeIndex;
        $(".listIndex").eq(index).find("a").removeClass("selected");

        if($(".listIndex .selected").length < 2){
            $(".eliminateCriteria").hide();
        }
    });

    $(".eliminateCriteria").on("click",function(){
        $(".selectedShow").hide();
        $(this).hide();
        $(".listIndex a ").removeClass("selected");
    });



    /*点击追加价格*/
    $(".droplist .sort a").click(function(){
        var val=$(this).text();
        $(".trigger .link .text").text(val)
    });

});