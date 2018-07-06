var pro = pro || {};
(function () {
    pro.PayPage = pro.PayPage || {};
    pro.PayPage = {
        initPage: function () {

            document.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);

            var android = navigator.userAgent.toLowerCase().indexOf("android");
            var uc = navigator.userAgent.toLowerCase().indexOf("ucbrowser");
            if (android > -1 && uc > -1) {
                $(".errorPrompt").show();
            }





            $("#btn_ConfirmPay").click(function () {
                pro.PayPage.ConfirmPay();
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
                        flag = true;
                    } else {
                        flag = false;
                    }
                }
            });

            return flag;
        },
        ConfirmPay: function () {
            alert(1);
           // var result = pro.PayPage.CheckPay();
            var payCode = $("input[name='Paycode']:checked").val();
            if (1==1) {

                //选中微信支付方式
                if (pro.PayPage.isWechatNativePay()) {
                    alert(2);
                    //是否是微信客户端
                    if (1==1) {

                        //授权获取openid
                        var result = true;//checkAuth();

                        if (result) {
                            //扫码支付
                            pro.PayPage.wechatNativePay($("#OrderNo").val(), payCode);
                            alert(3);
                        } else {
                            window.location.replace("/payment/wechatpay?OrderNo=" + orderNo);
                        }

                    } else {
                        //H5支付
                        pro.PayPage.wechatNativePay($("#OrderNo").val(), payCode);
                    }


                } else {


                    $(".z-weixin-ewm").css("display", "none");
                    $('.model_bg').fadeIn(300);
                    $('.my_model').fadeIn(300);
                    $("#btn_ConfirmPay_Submit").trigger("click");
                }
            }
        },
        PaySuccess: function () {

        },
        isWechatNativePay: function () {
            return true;

            var payCode = $("input[name='Paycode']:checked").val();
            var subPayCode = $("input[name='Paycode']:checked").data("subpaycode");
          
            return (payCode + subPayCode) == "WechatPay01";
        },
        wechatNativePay: function (orderNo, payCode) {
            var subPayCode = $("input[name='Paycode']:checked").data("subpaycode");

            $.ajax({
                type: "post",
                url: "/Payment/ConfirmPay",
                data: { orderNo: orderNo, payCode: payCode, subPayCode: subPayCode },
                success: function (result) {
                    if (result.IsError) {
                        alert(result.message);
                    } else {

                        if (model.isWechat == "1") {
                            var data = result.Data;
                            wx.chooseWXPay({
                                timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                paySign: data.paysign, // 支付签名
                                success: function (res) {
                                    //支付成功后的回调函数
                                    if (res.errMsg == "chooseWXPay:ok") {
                                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                        window.location.replace("/trading/payment/success?OrderNo=" + orderNo);
                                    } else {
                                        window.location.replace("/trading/payment/unpay?OrderNo=" + orderNo);
                                    }
                                },
                                cancel: function (res) {
                                    window.location.replace("/trading/payment/unpay?OrderNo=" + orderNo);
                                }
                            });
                        } else {
                            window.location.replace(result.Data.Url);
                        }

                    }
                }
            });
        },
        checkAuth: function () {

            return false;

            $.post("/auth/checkauth", "", function (result) {
                if (result.IsAuth) {
                    callback();
                } else {
                    window.location.replace("/payment/wechatpay?OrderNo=" + orderNo);
                }
            });
        }

    };
})();


$(function () {
    pro.PayPage.initPage();
});




