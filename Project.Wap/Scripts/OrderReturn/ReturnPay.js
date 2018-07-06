
var pro = pro || {};
(function () {
    pro.ReturnPayPage = pro.ReturnPayPage || {};
    pro.ReturnPayPage = {
        data: { delayTime: 120 },
        initPage: function () {

            $("#btn_SendMobileCode").click(function () {
                var mobile = $.trim($("#AccountName").val());
                var status = pro.ReturnPayPage.sendMobileCode(mobile);
                if (status) {
                    $("#btn_SendMobileCode").val("120秒后重新获取");
                    $("#btn_SendMobileCode").attr("disabled", "disabled");
                    //$("#mobilecode_valid").removeClass().addClass("field-validation-error DarkGray");
                    //$("#mobilecode_valid").html("<span class='yes_icon'></span>验证码已发送，请查收！");
                    setTimeout(pro.ReturnPayPage.countDown, 1000);
                } else {
                    $("#mobilecode_valid").removeClass().addClass("field-validation-error");
                    $("#mobilecode_valid").html("<span>发送失败</span>");
                }
            });

            $("#btn_ReturnPay").click(function () {
                pro.ReturnPayPage.ReturnPay();
            });


        },
        countDown: function () {
            pro.ReturnPayPage.data.delayTime--;
            $("#btn_SendMobileCode").val(pro.ReturnPayPage.data.delayTime + "秒后重新获取");
            if (pro.ReturnPayPage.data.delayTime == 0) {
                pro.ReturnPayPage.data.delayTime = 120;
                // verifyCodeState = false;
                //$("#mobilecode_valid").empty();
                //$("#mobilecode_valid").removeClass().addClass("field-validation-error");
                $("#btn_SendMobileCode").val("获取短信验证码");
                $("#btn_SendMobileCode").removeClass().addClass("btn btn_LightGray fl btn_h_30").removeAttr("disabled");
            } else {
                setTimeout(pro.ReturnPayPage.countDown, 1000);
            }
        },
        sendMobileCode: function (i) {

            var postData = { mobile: i, authType: "ReturnPay" };
            var result = false;
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/SystemSet/SendMobileCode",
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                    //alert(JSON.stringify(data));
                    if (data.success) {
                        result = true;
                    } else {
                        result = false;
                    }
                }
            });

            return result;
        },
        ReturnPay: function () {


            var postData = { accountName: $("#AccountName").val(), password: $("#Password").val(), authCode: $("#MobileCode").val() };
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/Account/ReturnPay",
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                    //alert(JSON.stringify(data));
                    if (data.success) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });

        }


    };
})();



$(function () {
    pro.ReturnPayPage.initPage();
});