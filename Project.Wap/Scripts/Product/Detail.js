var pro = pro || {};
(function () {
    pro.DetailPage = pro.DetailPage || {};
    pro.DetailPage = {
        initPage: function () {




            $("#btn_AddCart").click(function () {
                pro.DetailPage.AddCart();
            });

            $("#btn_AddOrder").click(function () {
                pro.DetailPage.AddOrder();
            });


            $("li[name=SmallPic]").each(
                function() {

                    $(this).click(function() {

                        $("li[name=SmallPic]").each(
                          function () {
                              $(this).removeClass("active");
                          }
                      );

                        $(this).addClass("active");

                        var src= $(this).find("img").attr("src");

                        $(".midImg").attr("src", src);

                    });

                }
            );

            $('.buy-num').blur(function () {
                if ($(this).val() == '') {
                    $(this).val(1);
                };
                if ($(this).val() == '0') {
                    $(this).val(1);
                };

                if (parseInt($(this).val()) >parseInt( $(".goods_num").html())) {
                    $(this).val($(".goods_num").html());
                }

            });
            $(".btn-add").click(function () {
                var newObj = $(this).parent().siblings(".buy-num");
                var s = newObj.val();//获得同一index的元素的值
                newObj.val(parseInt(s) + 1);  //做加法

                $('.buy-num').trigger("blur");
            });
            $(".btn-reduce").click(function () {
                var newObj = $(this).parent().siblings(".buy-num");
                var s = newObj.val();
                if (s > 1) {
                    newObj.val(parseInt(s) - 1);
                };

                $('.buy-num').trigger("blur");
            });


            ///*放大镜功能*/
            //$(".midBox").mousemove(function (a) {
            //    var evt = a || window.event;
            //    $(".bigBox").css('display', 'block');
            //    var ot = evt.clientY - ($(".midBox").offset().top - $(document).scrollTop()) - $(".mask").width() / 2;
            //    var ol = evt.clientX - ($(".midBox").offset().left - $(document).scrollLeft()) - $(".mask").width() / 2;
            //    if (ol <= 0) {
            //        ol = 0;
            //    }
            //    if (ot <= 0) {
            //        ot = 0;
            //    }
            //    if (ol >= $(".midBox").width() - $(".mask").width()) {
            //        ol = $(".midBox").width() - $(".mask").width();
            //    }
            //    if (ot >= $(".midBox").height() - $(".mask").height()) {
            //        ot = $(".midBox").height() - $(".mask").height();
            //    }
            //    $(".mask").css({ 'left': ol, 'top': ot });

            //    var bigimgmove = $(".bigImg").width() - $(".bigBox").width();
            //    var maskmove = $(".midBox").width() - $(".mask").width();
            //    var rate = bigimgmove / maskmove;
            //    var ott = ot * rate;
            //    var oll = ol * rate;
            //    $(".bigImg").css({ 'left': -oll, 'top': -ott });
            //});
            //$(".midBox").mouseout(function () {
            //    $(".bigBox").css('display', 'none');
            //});


        },
        AddCart: function () {

            if ($("#GoodsId").val() == "") {
                layer.alert("请选择商品", { time: 1000 });
                return;
            }

            if ($("input[name=number]").val() <= 0) {
                layer.alert("商品数量大于0", { time: 1000 });
                return;
            }

            if ($("input[name=number]").val() > $(".goods_num").html()) {
                layer.alert("大于可用库存", { time: 1000 });
                return;
            }


            var postData = { goodsId: $("#GoodsId").val(), num: $("input[name=number]").val() };
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/ShopCart/AddCart",
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                    if (data.success) {
                        layer.alert("添加成功", { time: 1500 });
                        return true;
                    } else {
                        pro.commonKit.noLogHd(data);
                    }
                }
            });

        },
        AddOrder: function () {

            if ($("#GoodsId").val() == "") {
                layer.alert("请选择商品", { time: 1000 });
                return;
            }

            if ($("input[name=number]").val() <= 0) {
                layer.alert("商品数量大于0", { time: 1000 });
                return;
            }

            if ($("input[name=number]").val() > $(".goods_num").html()) {
                layer.alert("大于可用库存", { time: 1000 });
                return;
            }

            window.location.href = "/Order/Confirm?goodsId=" + $("#GoodsId").val() + "&num=" + $("input[name=number]").val();

        },




    };
})();


$(function () {
    pro.DetailPage.initPage();
});

