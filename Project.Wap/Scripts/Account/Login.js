
var pro = pro || {};
(function () {
    pro.LoginPage = pro.LoginPage || {};
    pro.LoginPage = {
        initPage: function () {

            $("#btn_Login").click(
                function () {

                    var postData = { LoginName: $("#AccountName").val(), Password: $("#Password").val() };

                    $.ajax({
                        dataType: 'json',
                        type: 'POST',
                        contentType: 'application/json',
                        url: "http://localhost:8133/api/Author/Login",
                        data: JSON.stringify(postData),
                        cache: false,
                        async: false,
                        success: function (data) {
                            alert(JSON.stringify(data));

                           

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