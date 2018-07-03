var pro = pro || {};
(function () {
    pro.PayPage = pro.PayPage || {};
    pro.PayPage = {
        initPage: function () {
            $("#btn_ConfirmPay").click(function () {
                pro.PayPage.ConfirmPay();
            });

            //关闭模态框
            $('.closeModel').click(function () {
                $('.model_bg').fadeOut(300);
                $('.my_model').fadeOut(300);
            });
            $('.dialog-close').click(function () {
                $('.model_bg').fadeOut(300);
                $('.my_model').fadeOut(300);
            });
            $('.opBtn').click(function () {
                $('.model_bg').fadeOut(300);
                $('.my_model').fadeOut(300);
                window.location.href = "/Order/Success";
            });
        },
        CheckPay: function () {
            var orderNo = $("#OrderNo").val();
            var payCode = $("input[name='Paycode']:checked").val();
            if (payCode == "") {
                layer.alert("请选择一种支付方式");
                return;
            }

            var postData = { orderNo: orderNo, payCode: payCode };
            var flag = true;
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/Order/CheckPay",
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                    if (data.success) {
                        flag= true;
                    } else {
                        flag= false;
                    }
                }
            });

            return flag;
        },
        ConfirmPay: function () {

            var result = pro.PayPage.CheckPay();
            var payCode = $("input[name='Paycode']:checked").val();
            if (result) {

                if (pro.PayPage.isWechatNativePay()) {

                    pro.PayPage.wechatNativePay($("#OrderNo").val(), payCode);

                    $(".z-weixin-ewm").css("display","");
                    $('.model_bg').fadeIn(300);
                    $('.my_model').fadeIn(300);

                } else {


                    $(".z-weixin-ewm").css("display", "none");
                    $('.model_bg').fadeIn(300);
                    $('.my_model').fadeIn(300);
                    $("#btn_ConfirmPay_Submit").trigger("click");
                }
            }
        },
        PaySuccess: function() {

        },
        isWechatNativePay: function () {
            var payCode = $("input[name='Paycode']:checked").val();
            var subPayCode = $("input[name='Paycode']:checked").data("subpaycode");

            return (payCode + subPayCode) == "WechatPay02";
        },
        wechatNativePay: function (orderNo, payCode) {
            var subPayCode = $("input[name='Paycode']:checked").data("subpaycode");
            $.ajax({
                type: "post",
                url: "/Order/ConfirmPay",
                data: { orderNo: orderNo, payCode: payCode, subPayCode: subPayCode },
                success: function (result) {
                    if (result.IsError) {
                       alert(result.message);
                    } else {
                       
                        $(".z-weixin-ewm").attr("src", "data:image/png;base64," + result.data.QRCode);
                      

                    }
                }
            });
        }

    };
})();


$(function () {
    pro.PayPage.initPage();
});




