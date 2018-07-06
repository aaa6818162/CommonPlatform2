var pro = pro || {};
(function () {
    pro.ListPage = pro.ListPage || {};
    pro.ListPage = {
        initPage: function () {
            //if (!$('.calBtn a').hasClass('btn_sty')) {
            //    $('.calBtn a').addClass('btn_sty');
            //}

            //if ($('.calBtn a').hasClass('btn_sty')) {
            //    $('.calBtn a').removeClass('btn_sty');
            //}
        },
        DelCart: function (i) {
            var postData = { pkId: i };
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/ShopCart/DelCart",
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                    if (data.success) {
                        // $("#carrow_" + i).remove();
                        window.location.reload();
                        return true;
                    } else {
                        return false;
                    }
                }
            });

        },
        UpdateCartNum: function (i) {
            var postData = { pkId: i, num: $("#Num_" + i).val() };
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/ShopCart/UpdateCartNum",
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                    if (data.success) {
                        window.location.reload();
                        return true;
                    } else {
                       // alert(data.error.message);
                        window.location.reload();
                        return false;
                    }
                }
            });

        },
        UpdateCartCheck: function (i) {
            var postData = { pkId: i, isCheck: $("#IsCheck_" + i).is(':checked') ? 1 : 2 };
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/ShopCart/UpdateCartCheck",
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                    if (data.success) {
                        window.location.reload();
                        return true;
                    } else {
                        return false;
                    }
                }
            });

        },
        CheckAll: function () {
            var isCheck = 0;
            if ($('#all').is(':checked')) {
                isCheck = 1;
            } else {
                isCheck = 0;
            }

            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/ShopCart/CheckBatch?isCheck=" + isCheck,
                cache: false,
                async: false,
                success: function (data) {
                    if (data.success) {
                        window.location.reload();
                        return true;
                    } else {
                        return false;
                    }
                }
            });

        },

        AddOrder: function () {
            if ($("#CheckNum").html() <= 0) {
                layer.alert("至少选中一件商品", { time: 1000 });
                return false;
            }

            window.location.href = "/Order/Confirm";
        },
        AddNum: function (i) {
            var nowNum = $("#Num_" + i).val();
            var nextNum = parseInt(nowNum) + 1;
            if (nextNum == 0) {
                nextNum = 1;
            }
            $("#Num_" + i).val(nextNum);
            pro.ListPage.UpdateCartNum(i);
        },
        MinusNum: function (i) {
            var nowNum = $("#Num_" + i).val();
            var nextNum = parseInt(nowNum) - 1;
            if (nextNum == 0) {
                nextNum = 1;
            }
            $("#Num_" + i).val(nextNum);
            pro.ListPage.UpdateCartNum(i);
        },
        ChangeNum: function (i) {
            var nowNum = $("#Num_" + i).val();
            var nextNum = nowNum;
            if (nextNum == 0) {
                nextNum = 1;
            }
            $("#Num_" + i).val(nextNum);
            pro.ListPage.UpdateCartNum(i);
        }

    };
})();


$(function () {
    pro.ListPage.initPage();
});

