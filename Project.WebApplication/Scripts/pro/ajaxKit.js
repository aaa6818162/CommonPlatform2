


var pro = pro || {};
(function () {

    var defaultConfig = {
        url: "",
        dataType: 'json',//收到服务器数据的格式
        type: 'POST',
        contentType: 'application/json',//主要设置你发送给服务器的格式
        contentType2: 'application/x-www-form-urlencoded',//主要设置你发送给服务器的格式
        async: false,
        beforSubmit: function () {
            return true;
        },
        successHd: function (data) {

        },
        errorHd: function (error) {

        }
    };

    pro.ajaxKit = pro.ajaxKit || {};
    pro.ajaxKit = {

        post: function (paramter) {

            var newparamter = $.extend({}, defaultConfig, paramter);

            if (newparamter.beforSubmit()) {


                $.ajax(newparamter).done(
                    function (data) {



                    }
                ).fail(function (data) {


                });


            }

        }

    };
})();


pro.ajaxKit.post({

});