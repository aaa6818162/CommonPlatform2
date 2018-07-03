
var pro = pro || {};
(function () {
    pro.RegisterPage = pro.RegisterPage || {};
    pro.RegisterPage = {
        data: { delayTime: 120 },
        initPage: function () {

            $("#btn_SendMobileCode").click(function () {
                var mobile = $.trim($("#AccountName").val());
                var status = pro.RegisterPage.sendMobileCode(mobile);
                if (status) {
                    $("#btn_SendMobileCode").val("120秒后重新获取");
                    $("#btn_SendMobileCode").attr("disabled", "disabled");
                    //$("#mobilecode_valid").removeClass().addClass("field-validation-error DarkGray");
                    //$("#mobilecode_valid").html("<span class='yes_icon'></span>验证码已发送，请查收！");
                    setTimeout(pro.RegisterPage.countDown, 1000);
                } else {
                    $("#mobilecode_valid").removeClass().addClass("field-validation-error");
                    $("#mobilecode_valid").html("<span>发送失败</span>");
                }
            });

            $("#btn_Register").click(function () {
                pro.RegisterPage.register();
            });


        },
        countDown: function () {
            pro.RegisterPage.data.delayTime--;
            $("#btn_SendMobileCode").val(pro.RegisterPage.data.delayTime + "秒后重新获取");
            if (pro.RegisterPage.data.delayTime == 0) {
                pro.RegisterPage.data.delayTime = 120;
                // verifyCodeState = false;
                //$("#mobilecode_valid").empty();
                //$("#mobilecode_valid").removeClass().addClass("field-validation-error");
                $("#btn_SendMobileCode").val("获取短信验证码");
                $("#btn_SendMobileCode").removeClass().removeAttr("disabled");
            } else {
                setTimeout(pro.RegisterPage.countDown, 1000);
            }
        },
        sendMobileCode: function (i) {

            var postData = { mobile: i, authType: "register" };
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
                  
                    if (data.success) {
                        result = true;
                    } else {
                        layer.alert(data.msg);
                    }
                }
            });

            return result;
        },
        register: function () {

            if ($("#AccountName").val()=="") {
                layer.alert("请输入账号信息", { time: 1000 });
                return false;
            }

            if ($("#Password").val() == "" || $("#ConfirmPassword").val() == "") {
                layer.alert("密码不能为空", { time: 1000 });
                return false;
            }

            if ($("#Password").val() != $("#ConfirmPassword").val() ) {
                layer.alert("确认密码不一致", { time: 1000 });
                return false;
            }

            var isChecked= $("#Aggree").is(":checked"); 
           if (!isChecked) {
               layer.alert("请确认同意注册条款", { time: 1000 });
               return false;
           }

            var postData = { accountName: $("#AccountName").val(), password: $("#Password").val(), authCode: $("#MobileCode").val() };
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/Account/Register",
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                  
                    if (data.success) {
                        window.location.href = "/Account/Login";
                    } else {
                        layer.alert(data.error.message);
                    }
                }
            });

        }


    };
})();



$(function () {
    pro.RegisterPage.initPage();
});