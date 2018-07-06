var pro = pro || {};
(function () {
    pro.PayHd = pro.PayHd || {};
    pro.PayHd = {
        
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

            var result = pro.PayHd.CheckPay();
            var payCode = $("input[name='Paycode']:checked").val();
            if (result) {

                if (pro.PayHd.isWechatNativePay()) {

                    pro.PayHd.wechatNativePay($("#OrderNo").val(), payCode);

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
            alert(subPayCode);
            return (payCode + subPayCode) == "WechatPay01";
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
                       
                        //$(".z-weixin-ewm").attr("src", "data:image/png;base64," + result.data.QRCode);
                        window.location.href = result.data.Url;

                    }
                }
            });
        }

    };
})();


$(function () {
    pro.PayHd.initPage();
});




