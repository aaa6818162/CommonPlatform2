
var pro = pro || {};
(function () {
    pro.UserInfoDetailPage = pro.UserInfoDetailPage || {};
    pro.UserInfoDetailPage = {
        initPage: function () {

            $("#btn_Confrim").click(
                function () {

                    var postData = {};
                    postData.RequestEntity = { CustomerName: $("#CustomerName").val(), Gender: $("#Gender").val(), Birthday: $("#Birthday").val(), Familytelephone: $("#Familytelephone").val() };


                    $.ajax({
                        dataType: 'json',
                        type: 'POST',
                        contentType: 'application/json',
                        url: "/UserCenter/SaveUserInfoDetail",
                        data: JSON.stringify(postData),
                        cache: false,
                        async: false,
                        success: function (data) {
                          //  alert(JSON.stringify(data));

                            if (data.success) {
                                layer.alert("保存成功", { time: 1000 });
                            }

                        }
                    });


                }
            );
        }

    };
})();



$(function () {
    pro.UserInfoDetailPage.initPage();
});