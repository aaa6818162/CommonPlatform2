$(function(){
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
                    $this.children("a").css("color"," #f42828");
                    $this.children(".submenu").css("display", "block");
                },
                function () {
                    $this.children("a").css("color","");
                    $this.children(".submenu").css("display", "none");
                }
            )
        })
    }

/*模态框*/
    function Popout(){
        var html="   <section class=\"model_bg\"></section>\n" +
            "        <section class=\"my_model\">\n" +
            "            <p class=\"title\">删除宝贝<span class=\"closeModel\">X</span></p>\n" +
            "            <p>您确认要删除该宝贝吗？</p>\n" +
            "            <div class=\"opBtn\"><a href=\"javascript:;\" class=\"dialog-sure\">确定</a><a href=\"javascript:;\" class=\"dialog-close\">关闭</a></div>\n" +
            "        </section>"
        $("body").append( html);

        $('.closeModel').click(function () {
            closeM();
        });
        $('.dialog-close').click(function () {
            closeM();
        });
        function closeM() {
            $('.model_bg').fadeOut(300);
            $('.my_model').fadeOut(300);
        }
    }
    Popout();


    $(".btn").click(function(){
        $('.model_bg').fadeIn(300);
        $('.my_model').fadeIn(300);
    })





});