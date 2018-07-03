var pro = pro || {};
(function () {
    pro.ConfirmPage = pro.ConfirmPage || {};
    pro.ConfirmPage = {
        initPage: function () {
            $("#btn_OrderConfirm").click(function () {
                pro.ConfirmPage.Confirm();
            });

            pro.ConfirmPage.initAddress();



            $('#div_useticket').on('change', "input[name=TicketCode]", function () {


                var result = pro.ConfirmPage.CountYfAndPromotion();
                if (!result) {
                    $(this).attr("checked", false);
                  
                }


            });

        },
        initAddress: function () {
            $("#btn_Confirm").click(function () {
                // var orgCheck = $("input[name=CustomerAddressId]:checked").val();

                var result = pro.ConfirmPage.Address.SaveAddress();

                if (result.status) {
                    pro.ConfirmPage.Address.GetAddresAreaHtml();
                    $("#div_AddressEdit").css("display", "none");

                    $("input[type='radio'][name='CustomerAddressId'][value='" + result.pkId + "']").attr("checked", "checked");
                    pro.ConfirmPage.CountYfAndPromotion();
                }
            });


            $("#btn_Cancel").click(function () {
                $("#div_AddressEdit").css("display", "none");
            });


            $('#div_AddressList').on('click', "input[name=CustomerAddressId]", function () {

                $("#div_AddressEdit").css("display", "none");

                pro.ConfirmPage.CountYfAndPromotion();
            });


            $('#div_AddressList').on('click', "input[name=btn_SetDefaultAddress]", function () {
                var pkId = $(this).attr("for");
                pro.ConfirmPage.Address.SetDefaultAddress(pkId);
                // window.location.reload();
                pro.ConfirmPage.Address.GetAddresAreaHtml();

                $("#div_AddressEdit").css("display", "none");
            });

            $('#div_AddressList').on('click', "input[name=btn_EditAddress]", function () {
                var pkId = $(this).attr("for");
                $("#Command").val("UpdateAddress");
                $("#PkId").val(pkId);
                var textArea = $("#AddressJson_" + pkId).val();
                var bindEntity = JSON.parse(textArea);

                $("[name=ReceiverName]").val(bindEntity["ReceiverName"]);
                $("[name=Address]").val(bindEntity["Address"]);
                $("[name=IsDefault]").val(bindEntity["IsDefault"]);
                $("[name=Mobilephone]").val(bindEntity["Mobilephone"]);
                $("[name=FamilyTelephone]").val(bindEntity["FamilyTelephone"]);
                $("[name=PostCode]").val(bindEntity["PostCode"]);

                pro.AreaControl.getProvinceData(bindEntity["ProvinceId"], bindEntity["CityId"], bindEntity["AreaId"]);
                $("#div_AddressEdit").css("display", "");
            });

            $('#div_AddressList').on('click', "input[name=btn_AddAddress]", function () {
                pro.AreaControl.getProvinceData();

                var bindField = pro.bindKit.getHeadJson();

                for (var filedname in bindField) {
                    $("[name=" + filedname + "]").val("");
                }

                $("#Command").val("AddAddress");
                $("#PkId").val("");

                $("#div_AddressEdit").css("display", "");

            });

        },
        Address: {
            SaveAddress: function () {
                var command = $("#Command").val();//UpdateAddress AddAddress
                var postData = {};
                postData.RequestEntity = pro.submitKit.getHeadJson();

                if (postData.RequestEntity.ReceiverName == "") {
                    layer.alert("收货人姓名必填！", { time: 1000 });
                    return;
                }

                if (postData.RequestEntity.Address == "") {
                    layer.alert("详细地址必填！", { time: 1000 });
                    return;
                }

                if (postData.RequestEntity.Mobilephone == "" && postData.RequestEntity.FamilyTelephone == "") {
                    layer.alert(" 联系电话必填！", { time: 1000 });
                    return;
                }

                var data = $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    url: "/UserCenter/" + command,
                    data: JSON.stringify(postData),
                    cache: false,
                    async: false
                }).responseText;

                data = jQuery.parseJSON(data);

                if (data.success) {
                    return { status: true, pkId: data.result.PkId };
                } else {
                    return { status: false, pkId: 0 };
                }
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

            },
            GetAddresAreaHtml: function () {
                $.ajax({
                    dataType: 'html',
                    type: 'Get',
                    contentType: 'application/json',
                    url: "/Order/GetAddressList",
                    cache: false,
                    async: false,
                    success: function (data) {
                        $("#div_AddressList").html(data);
                    }
                });
            }

        },
        Confirm: function () {
            var customerAddressId = $("input[name=CustomerAddressId]:checked").val();

            if (!customerAddressId) {
                layer.alert("请选择送货地址！", { time: 1000 });
                return false;
            }


            var ticketCodes = "";
            $("input[name=TicketCode]:checked").each(
                function () {
                    ticketCodes += $(this).val() + ",";
                }
            );


            var postData = {};
            postData.RequestEntity = {
                CustomerAddressId: customerAddressId,
                InvoiceTitle: $("#InvoiceTitle").val(),
                LinkmanRemark: $.trim(Base64.encode($("#LinkmanRemark").val())),
                GoodsCode: pro.commonKit.getUrlParam("goodsCode"),
                GoodsId: pro.commonKit.getUrlParam("goodsId"),
                Num: pro.commonKit.getUrlParam("Num"),
                TicketCodes: ticketCodes
            };

            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/Order/AddOrder",
                data: JSON.stringify(postData),
                cache: false,
                async: false,
                success: function (data) {
                    //alert(JSON.stringify(data));
                    if (data.success) {
                        window.location.href = "/Order/Pay?OrderNo=" + data.result;
                    } else {
                        layer.alert(data.error.message);
                        return false;
                    }
                }
            });

        },

        CountYfAndPromotion: function () {
            var pkId = $("input[name=CustomerAddressId]:checked").val();
            if (!pkId) {
                layer.alert("请选择送货地址");
                return;
            }

            var ticketCodes = "";
            $("input[name=TicketCode]:checked").each(
                function() {
                    ticketCodes +=$(this).val()+ ",";
                }
            );


            var textArea = $("#AddressJson_" + pkId).val();
            var bindEntity = JSON.parse(textArea);

            var linkmanAreaId = bindEntity["AreaId"];
            var goodsId = pro.commonKit.getUrlParam("goodsId");
            var goodsCode = pro.commonKit.getUrlParam("goodsCode");
            var num = pro.commonKit.getUrlParam("num");

            var postData = { linkmanAreaId: linkmanAreaId, goodsId: goodsId, goodsCode: goodsCode, num: num, ticketCodes: ticketCodes };

            var returndata = $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                url: "/Order/CountYfAndPromotion",
                data: JSON.stringify(postData),
                cache: false,
                async: false
            }).responseText;

            var returndataJson = JSON.parse(returndata);

            if (returndataJson.success) {
                var data = returndataJson.result;

                if (parseInt(data.Yf) > 0) {

                    $("#div_yf").html( '<dt>运费：</dt><dd>￥' + data.Yf + '</dd>' );
                }

                if (parseInt(data.DiscountMoney) < 0) {

                    $("#div_discount").html('<dt>活动折扣：</dt><dd>￥' + data.DiscountMoney + '</dd>');

                }


                if (parseInt(data.TicketNum) > 0) {

                    $("#div_ticket").html('<h5>您享受的优惠信息：</h5>\
                   <ul class="Coupon-info">\
                       <li style="color:red">您将获得价值' + data.TicketValue + '的券' + data.TicketNum + '张</li>\
                   </ul>');
                }


                if (data.TotalMoney < 0) {
                    layer.alert("超出订单金额", { time: 1000 });
                    return false;
                }

                var sumMoney = pro.commonKit.returnFloat(data.TotalMoney);
                $("#span_SumPrdMoney").html(sumMoney);
                return true;
            } else {
                layer.alert("系统异常");
                return false;
            }


        }
    };
})();


$(function () {
    pro.ConfirmPage.initPage();
});

