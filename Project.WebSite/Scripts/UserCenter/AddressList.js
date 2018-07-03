var pro = pro || {};
(function () {
    pro.AddressListPage = pro.AddressListPage || {};
    pro.AddressListPage = {
        initPage: function () {

            $("#btn_Confirm").click(function () {
                pro.AddressListPage.SaveAddress();
                window.location.reload();
            });


            $(".btn_red").click(function () {
                var pkId = $(this).attr("for");
                pro.AddressListPage.DelAddress(pkId);

                $(this).parents(".add-list").remove();

                // window.location.reload();
            });

            $("input[name=btn_SetDefaultAddress]").click(function () {

                var pkId = $(this).attr("for");
                pro.AddressListPage.SetDefaultAddress(pkId);
                window.location.reload();
            });

            $("a[name=btn_EditAddress]").click(function () {

                $(".tplayer").fadeIn(500);
                $(".address_layer").fadeIn(500);

                var pkId = $(this).attr("for");
                $("#Command").val("UpdateAddress");
                $("#PkId").val(pkId);
                var textArea = $("#AddressJson_" + pkId).val();

                var bindField = pro.bindKit.getHeadJson();
                var bindEntity = JSON.parse(textArea);

                $("[name=ReceiverName]").val(bindEntity["ReceiverName"]);
                $("[name=Address]").val(bindEntity["Address"]);
                $("[name=IsDefault]").val(bindEntity["IsDefault"]);
                $("[name=Mobilephone]").val(bindEntity["Mobilephone"]);



                pro.AreaControl.getProvinceData(bindEntity["ProvinceId"], bindEntity["CityId"], bindEntity["AreaId"]);

            });


            $("#btn_AddAddress").click(function () {

                pro.AreaControl.getProvinceData();

                var bindField = pro.bindKit.getHeadJson();

                for (var filedname in bindField) {
                    $("[name=" + filedname + "]").val("");
                }

                $("#Command").val("AddAddress");
                $("#PkId").val("");
                // window.location.reload();
            });

        },
        SaveAddress: function () {
            var command = $("#Command").val();//UpdateAddress AddAddress
            var postData = {};
            postData.RequestEntity = pro.submitKit.getHeadJson();

            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/UserCenter/" + command,
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                   // alert(JSON.stringify(data));
                    if (data.success) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });

            window.location.reload();
        },
        DelAddress: function (i) {
            var postData = { pkId: i };
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/UserCenter/DelAddress",
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                    // alert(JSON.stringify(data));
                    if (data.success) {
                        window.location.reload();
                        return true;
                    } else {
                        return false;
                    }
                }
            });

        },

        SetDefaultAddress: function (i) {

            var postData = { pkId: i };
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/UserCenter/SetDefaultAddress",
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
    pro.AddressListPage.initPage();
});

