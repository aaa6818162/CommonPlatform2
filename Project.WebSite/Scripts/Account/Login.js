
var pro = pro || {};
(function () {
    pro.LoginPage = pro.LoginPage || {};
    pro.LoginPage = {
        initPage: function () {

            $("#btn_Login").click(
                function () {
                    var postData = { AccountName: $("#AccountName").val(), Password: $("#Password").val() };

                    $.ajax({
                        dataType: 'json',
                        type: 'POST',
                        contentType: 'application/json',
                        url: "/Account/Login",
                        data: JSON.stringify(postData),
                        cache: false,
                        async: false,
                        success: function (data) {
                            //alert(JSON.stringify(data));

                            var returnUrl = $("#returnUrl").val();
                            if (data.success) {
                                
                                window.location.href = (returnUrl != "" ? returnUrl : "/Home/Index");
                            } else {
                                $("#LoginErrorPlace").css("display","");
                            }

                        }
                    });

                    return;
                }
            );
        }

    };
})();



$(function () {
    pro.LoginPage.initPage();
});