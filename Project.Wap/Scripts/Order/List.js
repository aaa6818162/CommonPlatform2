var pro = pro || {};
(function () {
    pro.ListPage = pro.ListPage || {};
    pro.ListPage = {
        initPage: function () {
            $("#btn_OrderSearch").click(function () {
                pro.ListPage.List();
            });




        },
        List: function () {
            var CreateStart = $("#CreateStart").val();
            var CreateEnd = $("#CreateEnd").val();
            var OrderNo = $("#OrderNo").val();
            window.location.href = (window.location.pathname + "?CreateStart=" + CreateStart + "&CreateEnd=" + CreateEnd + "&OrderNo=" + OrderNo);
        },
        Cancel: function (orderNo) {
            var data = $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/Order/Cancel?orderNo=" + orderNo,
                cache: false,
                async: false
            }).responseText;

            data = jQuery.parseJSON(data);

            if (data.success) {
                window.location.reload();
            } else {
                layer.alert("操作失败");
            }
        },
        Confirm: function (orderNo) {
            var data = $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/Order/Confirm?orderNo=" + orderNo,
                cache: false,
                async: false
            }).responseText;

            data = jQuery.parseJSON(data);

            if (data.success) {
                window.location.reload();
            } else {
                layer.alert("操作失败");
            }
        },
        Pay: function (orderNo) {
            window.location.href = "/Order/Pay?orderNo=" + orderNo;
        },
        ReturnPay: function (orderNo) {
            window.location.href = "/OrderReturn/ReturnPay?orderNo=" + orderNo;
        },
        ReturnProduct: function (orderNo) {
            window.location.href = "/OrderReturn/ReturnProduct?orderNo=" + orderNo;
        },
        WriteReturnProductSend: function (orderNo) {
            window.location.href = "/OrderReturn/WriteReturnProductSend?orderNo=" + orderNo;
        }



    };
})();


$(function () {
    pro.ListPage.initPage();
});

