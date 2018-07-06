$(function(){
    var sumWidth =$(".submenu>ol>li").length*130;
    $(".submenu").width(sumWidth);

    /* 返回顶部   */
    if ($('.p_ScrollTopBtn').length == 0) {
        var gotop = " <a class = 'p_ScrollTopBtn'> </a>";
        $('body').append(gotop);
        $(".p_ScrollTopBtn").css({
            width: '40px',
            height: '40px',
            bottom: '200px',
            right: '15px',
            position: 'fixed',
            cursor: 'pointer',
            zIndex: '999999',
            background: "url(./images/bg.png) no-repeat center"
        });

        $(".p_ScrollTopBtn").hide();

        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $(".p_ScrollTopBtn").show();
            } else {
                $(".p_ScrollTopBtn").hide();
            }
        });

        $(".p_ScrollTopBtn").click(function () {
            $('body,html').stop().animate({
                scrollTop: 0
            }, 1000, function () {
                $('body,html').stop();
            });
            var bh = $(window).height() - 186;
            $(".p_ScrollTopBtn").hide();
        });

    }


    /* table栏切换 */
    navChange(".nav_list>li");
    function navChange(item){
        $(item).each(function(){
            var $this =$(this);
            $this.hover(
                function(){
                    $this.children("a").addClass("red");
                    $this.children(".submenu").css("display", "block");
                    $this.children(".spacer4").css("display", "block");
                },
                function () {
                    $this.children("a").removeClass("red");
                    $this.children(".submenu").css("display", "none");
                    $this.children(".spacer4").css("display", "none");
                }
            )
        })
    }


    $(".site-nav-user").mouseover(function(){
        $(".bd-main").show();
        $(".site-nav-user").css("background","#fff")
    })
    $(".bd-main").mouseover(function(){
        $(".bd-main").show();
        $(".site-nav-user").css("background","#fff")
    })
    $(".site-nav-user").mouseout(function(){
        $(".bd-main").hide();
        $(".site-nav-user").css("background","none")
    })
    $(".bd-main").mouseout(function(){
        $(".bd-main").hide();
        $(".site-nav-user").css("background","none")
    })


});