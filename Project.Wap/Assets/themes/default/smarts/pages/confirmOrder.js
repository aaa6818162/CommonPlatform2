smart.viewerEngineer.regedit('confirmorder', function (model) {
    var _;
    var _config;
    var _container;
    var viewApi;
    var PrdRowJson = "";
    var DiscountTikRowJson = "";
    var ValueTikRowJson = "";
    var cityPicker3;
    var plugin = {
        conf: {

            provinces: null,   //省市区列表
            name: '[role=name]',   //收件人
            address: '[role=address]',   //详细地址
            txtContactAddress: '[role=contactAddress]',   //区域
            postcode: '[role=postcode]',   //邮编
            mobile: '[role=mobile]',   //手机号码
            familytelephone: '[role=familytelephone]',   //固定号码
            isdefault: '[role=isdefault]',   //默认

            currAddress: '[role="currAddress"]',
            addressItem: '[role="addressItem"]', //地址
            selectAddress: '[role="selectAddress"]', //选择地址
            defaultAddress: '[role="defaultAddress"]', //设置默认地址
            deleteAddress: '[role="deleteAddress"]', //删除地址
            editAddress: '[role="editAddress"]', //修改地址
            addAddress: '[role="addAddress"]', //新增地址
            saveAddress: '[role="saveAddress"]', //保存地址


            deliveryEdit: '[role="deliveryEdit"]', //配送方式按钮
            deliveryDisplay: '[role="deliveryDisplay"]', //配送方式显示
            deliveryPanel: '[role="deliveryPanel"]', //配送方式弹出层
            deliveryList: '[role="deliveryList"]', //配送方式
            deliveryItem: '[role="deliveryItem"]', //配送方式项
            shippriceDisplay: '[role="shippriceDisplay"]', //配送运费显示

            installPanel: '[role="installPanel"]', //是否安装
            installItem: '[role="installItem"]', //是否安装项
            yfDesc: '[role="yfDesc"]', //运费说明

            deliveryClose: '[role="deliveryClose"]', //关闭
            deliveryConfirm: '[role="deliveryConfirm"]', //确定


            invoiceEdit: '[role="invoiceEdit"]', //发票按钮
            invoiceDisplay: '[role="invoiceDisplay"]', //发票类型显示
            invoicePanel: '[role="invoicePanel"]', //发票弹出层
            invoiceItem: '[role="invoiceItem"]', //发票项
            invoiceTitleItem: '[role="invoiceTitleItem"]', //发票抬头项：个人、单位
            invoiceTitle: '[role="invoiceTitle"]', //发票抬头输入框
            invoiceInfo1: '[role="invoiceInfo1"]', //发票抬头
            invoiceInfo2: '[role="invoiceInfo2"]', //增值税发票
            invoiceClose: '[role="invoiceClose"]', //关闭
            invoiceConfirm: '[role="invoiceConfirm"]', //确定

            activityPanel: '[role="activityPanel"]', //优惠信息
            activityDisplay: '[role="activityDisplay"]', //优惠信息

            couponCell: '[role="couponCell"]', //使用优惠券项
            couponEdit: '[role="couponEdit"]', //使用优惠券按钮
            couponDisplay: '[role="couponDisplay"]', //优惠券显示

            discounttik: {
                usecoupon: "[role='discounttik.usecoupon']",            //行项目折扣券
                couponPanels: "[role='discounttik.couponPanels']",      //优惠券选择弹出层
                couponPanel: "[role='discounttik.couponPanel']",        //优惠券选择弹出层
                couponlist: "[role='discounttik.couponlist']",          //优惠券列表

                //edittik: "[role='discounttik.edittik']",              //修改
                choosetik: "[role='discounttik.choosetik']",            //选择
                confirmusetik: "[role='discounttik.confirmusetik']",    //确定
                couponclose: "[role='discounttik.couponclose']"         //关闭
            },
            valuetik: {
                couponcell: "[role='valuetik.couponcell']",             //优惠券
                couponDisplay: "[role='valuetik.couponDisplay']",       //优惠券显示
                usecoupon: "[role='valuetik.usecoupon']",               //使用优惠券
                couponPanel: "[role='valuetik.couponPanel']",           //优惠券选择弹出层
                couponlist: "[role='valuetik.couponlist']",             //优惠券列表
                choosetik: "[role='valuetik.choosetik']",               //选择
                couponconfirm: "[role='valuetik.couponconfirm']",       //确认选择
                couponclose: "[role='valuetik.couponclose']",           //关闭
                choosecouponlist: "[role='choosecouponlist']"           //选择的优惠券列表
            },

            deliveryDate: '[role="deliveryDate"]',                      //配送时间选择
            deliveryDateDisplay: '[role="deliveryDateDisplay"]',        //配送时间显示

            remark: '[role="remark"]',                                  //备注
            addorder: '[role="addorder"]'                               //结算
        },
        //验证
        validate: {
            formValidate: function (callback) {
                var name = $.trim($(_.conf.name).val());
                var address = $.trim($(_.conf.address).val());
                var postcode = $.trim($(_.conf.postcode).val());
                var mobile = $.trim($(_.conf.mobile).val());
                //var familytelephone = $.trim($(_.conf.familytelephone).val());
                var familytelephone = $("#tel1").val() + ($("#tel1").val() && $("#tel2").val() != '' ? "-" : "") + $("#tel2").val() + ($("#tel3").val() && $("#tel3").val() != '' ? "-" : "") + $("#tel3").val();
                familytelephone = $.trim(familytelephone);
                var isdefault = $(_.conf.isdefault).prop("checked");
                var addressid = $("#addressId").val();//标识编辑时ID
                var contactAddress = $.trim($(_.conf.txtContactAddress).attr("data-id"));
                var province = contactAddress.split(',')[0];
                var city = contactAddress.split(',')[1];
                var country = contactAddress.split(',')[2];
                if (smart.validate.isNullOrEmpty(name)) {
                    _.view.message.alert('请输入收件人姓名！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(province) || smart.validate.isNullOrEmpty(city) || smart.validate.isNullOrEmpty(country)) {
                    _.view.message.alert('请选择区域！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(address)) {
                    _.view.message.alert('请输入详细地址！');
                    return;
                }

                if (smart.validate.isNullOrEmpty(postcode)) {
                    _.view.message.alert('请输入邮编！');
                    return;
                }

                if (smart.validate.isNullOrEmpty(mobile)) {
                    _.view.message.alert('请输入手机号码！');
                    return;
                }

                if (!smart.validate.isPostCode(postcode)) {
                    _.view.message.alert('请正确的邮编！');
                    return;
                }
                if (!smart.validate.isMobile(mobile)) {
                    _.view.message.alert('请正确的手机号码！');
                    return;
                }
                if (address.lenght > 50) {
                    _.view.message.alert('请输入少于50字的详细地址！');
                    return;
                }
                if (!smart.validate.isNullOrEmpty(familytelephone)) {
                    if (!smart.validate.isTelephone(familytelephone)) {
                        _.view.message.alert('请输入正确的固定电话！');
                        return;
                    }
                }
                var formData = { Id: addressid, Name: name, Prov: province, City: city, Country: country, PropertyInfo: "", Address: address, PostCode: postcode, Mobile: mobile, Tel: familytelephone, IsDefault: isdefault };

                if (callback && typeof callback == 'function')
                    callback(formData);
                else {
                    _.view.message.alert('系统异常,请稍后重试！');
                    return;
                }
            }

        },
        //页面处理
        view: {
            init: function () {
                mui('.mui-scroll-wrapper').scroll();
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);

                //初始化单页view	
                (function (_mui) {
                    viewApi = _mui('#app').view({
                        defaultPage: '#setting'
                    });
                    var view = viewApi.view;
                    //处理view的后退与webview后退
                    var oldBack = _mui.back;
                    //绑定后退事件后，此处重复，导致确认订单页面后退购物车时，后退了2次，返回首页，故此处注释 -- add by shk 2016.4.27
                    _mui.back = function () {
                        //if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                        //    viewApi.back();
                        //} else { //执行webview后退
                        //    oldback();
                        //}
                    };
                    mui('.mui-scroll').on('tap', '.yellow-btn,.mui-btn-block,.ggsk-btn,.mui-table-view a', function () {
                        var isMI = navigator.userAgent.toUpperCase().indexOf('MI') != -1;
                        if (isMI) {
                            $("input").blur();
                            document.removeEventListener('touchend', docTouchend, false);
                        };
                    });
                    //偶先弹出提示后，无法后退问题，故此处加上这个后退事件 -- add by shk 2016.4.27
                    _container.off('tap', '.mui-action-back');
                    _container.on('tap', '.mui-action-back', function () {  //待讨论 但必须加  后退问题
                        //标记在确认订单页面，点后退时，使用window.history.back
                        //解决保存地址时使用viewApi.go("#setting")后，点击后退，返回到修改地址的页面问题
                        //暂时未找到可以连续后退2页的方法，故此处特殊处理
                        if ($(this).attr("role") == "back")
                            window.history.back();
                        else if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            viewApi.back();
                        } else { //执行webview后退
                            oldBack();
                        }
                    });
                })(mui);
                _.address.getProvince();//初始地址数组
                var id = $(_config.currAddress).attr("data-id");
                if (id != '0') {
                    _.address.selectAddress(id);
                }

                //标记在确认订单页面，点后退时，使用window.history.back -- add by shk 2016.4.27
                $(".mui-title").each(function () {
                    if ($(this).text() == "订单信息") {
                        $(this).prev().attr("role", "back");
                    }
                });
            },
            //小数保留位数
            decimal: function (num, v) {
                var vv = Math.pow(10, v);
                return Math.round(num * vv) / vv;
            },
            getAddressHtml: function (data) {
                return '<ul class="mui-table-view mui-table-view-chevron sp-address">\
                    <li class="mui-table-view-cell">\
                        <a href="javascript:void(0);" class="mui-navigate-right">\
                            <p class="add-name"><span>' + data.name + '</span><span class="ml50">' + data.phone + '</span></p>\
                            <p class="add-text">' + data.address + ', ' + data.postcode + '</p>\
                        </a>\
                    </li>\
                </ul>';
            },
            getDeliveryHtml: function (data) {
                var hasShop = data.IsHasShop;
                var isDelivery = data.IsDelivery;
                var isalljfhg = data.IsAlljfhg;//全部是积分换购
                var attr = 'data-isneedinstall="' + data.IsNeedInstall + '"';
                var deliveryHtml = "";
                if (isalljfhg && !isDelivery) {
                    deliveryHtml += '<div class="gg-btn dis-ib" data-value="10" role="deliveryItem">快递发货</div>';
                } else {
                    if (!isDelivery) {
                        deliveryHtml += '<div class="gg-btn dis-ib" data-value="10" role="deliveryItem">快递发货</div>';
                    }

                    if (hasShop) {
                        deliveryHtml += '<div class="gg-btn dis-ib" data-value="3" role="deliveryItem">物流送货</div>';
                    } else {
                        deliveryHtml += '<div class="gg-btn dis-ib" data-value="4" ' + attr + ' role="deliveryItem">物流点自提</div>\
                            <div class="gg-btn dis-ib" data-value="13" ' + attr + ' role="deliveryItem">到付送至物流点</div>\
                            <div class="gg-btn dis-ib" data-value="14" ' + attr + ' role="deliveryItem">到付送至楼下</div>\
                            <div class="gg-btn dis-ib" data-value="6" ' + attr + ' role="deliveryItem">专车服务</div>';
                    }
                }
                return deliveryHtml;
            }
        },
        invoice: {
            edit: function (obj) {
                var val = obj.attr("data-value");//发票类型
                var tv = obj.attr("data-titlevalue");//发票抬头类型
                var title = obj.attr("data-title");//发票抬头名称

                //设置发票类型显示
                _.invoice.selectType($(_config.invoiceItem + '[data-value="' + val + '"]'));

                //发票抬头类型显示
                if (tv)
                    $(_config.invoiceTitleItem + '[data-value="' + tv + '"]').addClass("active").siblings().removeClass("active");

                //抬头名称
                $(_config.invoiceTitle).val(title);

                //弹出发票信息修改层
                mui(_config.invoicePanel).popover('toggle');
            },
            selectType: function (obj) {
                var val = obj.data("value");

                //选中当前项
                obj.addClass("active").siblings().removeClass("active");

                if (val == 1) {
                    //普通发票
                    $(_config.invoiceInfo1).show();
                    $(_config.invoiceInfo2).hide();
                }
                else if (val == 2) {
                    //增值税发票
                    $(_config.invoiceInfo1).hide();
                    $(_config.invoiceInfo2).show();
                } else {
                    //不开发票
                    $(_config.invoiceInfo1).hide();
                    $(_config.invoiceInfo2).hide();
                }
            },
            confirm: function () {
                var val = $(_config.invoiceItem + ".active").data("value");
                var type = $(_config.invoiceItem + ".active").text();
                var tv = $(_config.invoiceTitleItem + ".active").data("value");
                var title = $(_config.invoiceTitle).val();

                if (val == 1 && !title) {
                    _.view.message.alert('请输入抬头名称！');
                    return;
                }
                //不开发票和增值税发票时,去掉发票抬头信息
                if (val == 0 || val == 2) {
                    tv = title = '';
                }

                $(_config.invoiceEdit).attr("data-value", val).attr("data-titlevalue", tv).attr("data-title", title);
                $(_config.invoiceDisplay).text(type);

                mui(_config.invoicePanel).popover('hide');
            }
        },
        address: {
            selectAddress: function (id, item) {
                if (item) {
                    var name = item.data("name");
                    var phone = item.data("phone");
                    var address = item.data("address");
                    var postcode = item.data("postcode");
                    var html = _.view.getAddressHtml({ name: name, phone: phone, address: address, postcode: postcode });
                    $(_config.currAddress).html(html).attr("data-id", id);
                }

                order.shoppingCartInfo(id, function (json) {
                    var result = jQuery.parseJSON(json.Result);
                    var html = _.view.getDeliveryHtml(result);
                    $(_config.deliveryList).html(html);

                    _.orderInfo.clear();
                    _.delivery.clear();

                    if (item)
                        viewApi.back();
                });

            },
            //获取省市区列表
            getProvince: function () {
                $.richAjax('/Member/Customer/GetProvinceList', {}, function (result) {
                    if (result.success && result.data.length > 0)
                        _.conf.provinces = result.data;
                });
            },
            //初始化地址列表
            getAddressListHtml: function () {
                $.richAjax('/Trading/Order/GetAddressList', {}, function (result) {
                    if (result.success) {
                        if (result.data.length > 0) {
                            var firstList = JSLINQ(result.data).OrderByDescending(function (item) { return item.ID; }).items;//先默认id排序 （解决添加显示在头部问题）
                            var addressList = JSLINQ(firstList).OrderByDescending(function (item) { return item.Isdefault; }).items;
                            var addressListUl = $("#addressListUl").html(""); //每次刷新清空
                            $(addressList).each(function (index, data) {
                                var html = "";
                                if (data.Receivername == "" || data.Receivername == null) {
                                    html = "";
                                } else {
                                    var ghclass = "gh";
                                    if (data.Familytelephone == null || data.Familytelephone == "") {
                                        ghclass = "";
                                    }
                                    var address = data.Province.Name + data.City.CityName + data.Country.CountryName + data.Address;
                                    html += '<li class="add-list" role="addressItem" data-id="' + data.ID + '" data-name="' + data.Receivername + '" data-phone="' + data.Mobilephone + '" data-address="' + address + '" data-postcode="' + data.Postcode + '">';
                                    html += '<div class="mz" role="selectAddress"><span>' + (data.Receivername == null ? "" : data.Receivername) + '</span><span class="fr">' + (data.Mobilephone == null ? "" : data.Mobilephone) + '</span></div>';
                                    html += '<div class="' + ghclass + '">' + (data.Familytelephone == null ? "" : data.Familytelephone) + '</div>'
                                    html += '<div class="dz" role="selectAddress">' + address + ', ' + (data.Postcode == null ? "" : data.Postcode) + '</div>';
                                    html += '<div class="cz"><div class="mui-input-row mui-radio mui-left dis-ib vm" data-id="' + data.ID + '" data-isdefault="' + data.Isdefault + '" role="defaultAddress"><label>设为默认</label><input name="adress" value="' + data.ID + '" type="radio" id="adress" ' + (data.Isdefault == "是" ? "checked=\"checked\"" : "") + ' /></div><div class="dis-ib vm fr ml40" role="deleteAddress" data-id="' + data.ID + '"> <span class="mui-icon mui-icon-trash"></span><span>删除</span></div><div class="dis-ib vm fr" role="editAddress" data-id="' + data.ID + '" data-name="' + (data.Receivername == null ? "" : data.Receivername) + '" data-address="' + (data.Address == null ? "" : data.Address) + '" data-postcode="' + (data.Postcode == null ? "" : data.Postcode) + '" data-mobile="' + (data.Mobilephone == null ? "" : data.Mobilephone) + '" data-familytelephone=" ' + (data.Familytelephone == null ? "" : data.Familytelephone) + '" data-isdefault="' + data.Isdefault + '" data-country="' + data.CountryCode + '" data-city="' + data.CityCode + '" data-province="' + data.ProvinceCode + '"><span class="mui-icon mui-icon-compose"></span><span>修改</span></div></div></li>';
                                }
                                addressListUl.append(html);
                            });
                        }
                        else {
                            $("#addressListUl").html(""); //每次刷新清空
                        }
                    }
                });
            },
            //地区初始化
            address: function ($, doc) {
                var str = JSON.stringify(_.conf.provinces);
                var str1 = str.replace(/CountryName/g, 'text');
                var str2 = str1.replace(/CityName/g, 'text');
                var str3 = str2.replace(/Name/g, 'text');
                var str4 = str3.replace(/CityList/g, 'children');
                var str5 = str4.replace(/CountryList/g, 'children');
                var jsonObj = JSON.parse(str5);
                $.init();
                $.ready(function () {
                    cityPicker3 = new $.PopPicker({
                        layer: 3
                    });
                    cityPicker3.setData(jsonObj);
                    var showCityPickerButton = doc.getElementById('showCityPicker3');
                    var cityResult3 = doc.getElementById('cityResult3');
                    showCityPickerButton.addEventListener('tap', function (event) {
                        cityPicker3.show(function (items) {
                            //var item = items;
                            cityResult3.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                            cityResult3.setAttribute('data-id', items[0].ID + ',' + items[1].ID + ',' + items[2].ID);
                            //返回 false 可以阻止选择框的关闭
                            //return false;
                        });
                    }, false);
                });
            },
            //地区赋值
            customerAddress: function (sheng, shi, qu) {
                if (smart.validate.isNullOrEmpty(sheng) || smart.validate.isNullOrEmpty(shi) || smart.validate.isNullOrEmpty(qu)) {//新增初始化地址
                    $('#cityResult3').val(""); //新增还原初始化
                    $('#cityResult3').attr('data-id', "");
                    (function ($, doc) {
                        var str = JSON.stringify(_.conf.provinces);
                        var str1 = str.replace(/CountryName/g, 'text');
                        var str2 = str1.replace(/CityName/g, 'text');
                        var str3 = str2.replace(/Name/g, 'text');
                        var str4 = str3.replace(/CityList/g, 'children');
                        var str5 = str4.replace(/CountryList/g, 'children');
                        var jsonObj = JSON.parse(str5);
                        $.init();
                        $.ready(function () {
                            cityPicker3 = new $.PopPicker({
                                layer: 3
                            });
                            cityPicker3.setData(jsonObj);
                            var showCityPickerButton = doc.getElementById('showCityPicker3');
                            var cityResult3 = doc.getElementById('cityResult3');

                            cityPicker3.pickers[0].setSelectedIndex(0);//默认选择
                            cityPicker3.pickers[1].setSelectedIndex(0);
                            cityPicker3.pickers[2].setSelectedIndex(0);

                            showCityPickerButton.addEventListener('tap', function (event) {
                                cityPicker3.show(function (items) {
                                    //var item = items;
                                    cityResult3.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                                    cityResult3.setAttribute('data-id', items[0].ID + ',' + items[1].ID + ',' + items[2].ID);
                                    //返回 false 可以阻止选择框的关闭
                                    //return false;
                                    event.preventDefault();
                                });
                            }, true);
                        });
                    })(mui, document);
                    return;
                } else { //编辑初始化地址
                    var provinces = _.conf.provinces;
                    var value;
                    var text;
                    var one, two, thire;
                    for (var i = 0; i < provinces.length; i++) {
                        if (sheng == provinces[i].ID) {
                            one = i;
                            value = provinces[i].ID + ',';
                            text = provinces[i].Name + ' ';
                            for (var j = 0; j < provinces[i].CityList.length; j++) {
                                if (shi == provinces[i].CityList[j].ID) {
                                    two = j;
                                    value += provinces[i].CityList[j].ID + ',';
                                    text += provinces[i].CityList[j].CityName + ' ';
                                    for (var y = 0; y < provinces[i].CityList[j].CountryList.length; y++) {
                                        if (qu == provinces[i].CityList[j].CountryList[y].ID) {
                                            thire = y;
                                            value += provinces[i].CityList[j].CountryList[y].ID;
                                            text += provinces[i].CityList[j].CountryList[y].CountryName;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    (function ($, doc) {
                        var str = JSON.stringify(_.conf.provinces);
                        var str1 = str.replace(/CountryName/g, 'text');
                        var str2 = str1.replace(/CityName/g, 'text');
                        var str3 = str2.replace(/Name/g, 'text');
                        var str4 = str3.replace(/CityList/g, 'children');
                        var str5 = str4.replace(/CountryList/g, 'children');
                        var jsonObj = JSON.parse(str5);
                        $.init();
                        $.ready(function () {
                            cityPicker3 = new $.PopPicker({
                                layer: 3
                            });
                            cityPicker3.setData(jsonObj);
                            var showCityPickerButton = doc.getElementById('showCityPicker3');
                            var cityResult3 = doc.getElementById('cityResult3');

                            cityPicker3.pickers[0].setSelectedIndex(one); //默认选择
                            cityPicker3.pickers[1].setSelectedIndex(two);
                            cityPicker3.pickers[2].setSelectedIndex(thire);

                            showCityPickerButton.addEventListener('tap', function (event) {
                                cityPicker3.show(function (items) {
                                    //var item = items;
                                    cityResult3.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                                    cityResult3.setAttribute('data-id', items[0].ID + ',' + items[1].ID + ',' + items[2].ID);
                                    //返回 false 可以阻止选择框的关闭
                                    //return false;
                                    event.preventDefault();
                                });
                            }, true);
                        });
                    })(mui, document);

                    $('#cityResult3').val(text);
                    $('#cityResult3').attr('data-id', value);
                }
            }
        },
        delivery: {
            clear: function () {
                $(_config.deliveryEdit).attr("data-value", '').attr("data-installvalue", '');
                $(_config.deliveryDisplay).text('');
                $(_config.deliveryDate).attr("data-date", $(_config.deliveryDate).data("today"));
                $(_config.deliveryDateDisplay).text('');
                $(_config.installPanel).hide();//
                $(_config.yfDesc).html("");//清空之前选择的信息（重新选择地址后解决本地地址不需要安装)
            },
            edit: function (obj) {
                var addressId = $(_config.currAddress).attr("data-id");
                if (addressId == "0") {
                    _.view.message.alert("请选择送货地址！");
                    return;
                }
                var noaddress = $("#noaddress").val();
                if (noaddress == "false") {
                    _.view.message.alert("请添加送货地址！");
                    return;
                }

                var val = obj.attr("data-value");//配送方式

                //设置配送方式
                if (val)
                    _.delivery.selectType($(_config.deliveryItem + '[data-value="' + val + '"]'));
                else {
                    $(_config.deliveryItem).removeClass("active");
                    $(_config.shippriceDisplay).text("0");
                }

                //弹出配送方式修改层
                mui(_config.deliveryPanel).popover('toggle');
            },
            selectType: function (obj) {
                var addressId = $(_config.currAddress).attr("data-id");
                if (addressId == "0") {
                    _.view.message.alert("请选择送货地址！");
                    return;
                }
                //选中当前项
                obj.addClass("active").siblings().removeClass("active");

                var val = obj.data("value");
                var installval = $(_config.deliveryEdit).attr("data-installvalue");//是否安装

                $(_config.yfDesc).html("");

                //根据地址、配送方式获取是否安装配置
                order.getIsNeedInstall(addressId, val, function (json) {
                    if (json.Success) {
                        var result = jQuery.parseJSON(json.Result);
                        switch (result.IsNeedInstall) {
                            case 1://安装
                                $(_config.installPanel).hide();
                                _.delivery.selectInstall($(_config.installItem + '[data-value=1]'));
                                break;
                            case 2://不安装
                                $(_config.installPanel).hide();
                                _.delivery.selectInstall($(_config.installItem + '[data-value=0]'));
                                break;
                            case -1://选择
                                $(_config.installPanel).show();
                                break;
                        }
                    }
                    else {
                        smart.utility.tips.alert(json.Message);
                    }
                });
            },
            selectInstall: function (obj) {
                //选中当前项
                obj.addClass("active").siblings().removeClass("active");

                var deliveryValue = $(_config.deliveryItem + ".active").data("value");
                var value = obj.data("value");

                if (deliveryValue == "13" || deliveryValue == "14") {
                    $(_config.yfDesc).show();
                    if (value == "1") {
                        $(_config.yfDesc).html("(此费用为安装费，运费到付金额，请联系在线客服为您预估，详情查看物流规则)");
                    } else {
                        $(_config.yfDesc).html("(运费到付金额，请联系在线客服为您预估，详情查看物流规则)");
                    }
                } else {
                    $(_config.yfDesc).hide();
                }

                _.orderInfo.getYf();
            },
            confirm: function () {
                var val = $(_config.deliveryItem + ".active").data("value");
                var type = $(_config.deliveryItem + ".active").text();

                var installval = '';
                if ($(_config.installPanel).css("dispaly") != "none") {
                    installval = $(_config.installItem + ".active").data("value");
                }

                $(_config.deliveryEdit).attr("data-value", val).attr("data-installvalue", installval);
                $(_config.deliveryDisplay).text(type);

                _.orderInfo.stockCheckAll();

                mui(_config.deliveryPanel).popover('toggle');
            }
        },
        orderInfo: {
            valueRuleEntity: {},
            //促销提醒
            GetPromotionInfoNext: function () {
                var jsonDetail = {};
                jsonDetail.orderRowTicket = JSON.stringify(_.product.productJson);//行项目使用的券
                jsonDetail.orderPay = JSON.stringify(_.pay.payJson);
                jsonDetail.delivery = $("input[name='delivery']:checked").val();
                jsonDetail.Isneedinstall = $("input[name='Isneedinstall']:checked").val();
                jsonDetail.addressid = selectAddressId;
                order.getPromotionInfoNext(jsonDetail, function (msg) {
                    json = jQuery.parseJSON(msg.Result);
                    if (json.length > 0) {
                        if (json[0]) {
                            var str = "";
                            for (var i = 0; i < json.length; i++) {
                                str += json[i] + "</br>";
                            }
                            $("#z-car-tishi .z-car-tishihd").html(str);
                            $("#z-car-tishi").css("display", "block");
                            //弹出框
                            $("#z-car-tishi").each(function () {
                                var tsWidth = $(this).find(".z-car-wenxing").width() + 210;
                                var tsHeight = $(this).find(".z-car-wenxing").height() + 280;
                                $(this).find(".z-car-tishibox").css({ 'margin-left': -tsWidth / 2, 'margin-top': -tsHeight / 2 });
                            });
                        } else {
                            _.orderInfo.addOrder();
                        }
                    } else {
                        _.orderInfo.addOrder();
                    }
                });
            },
            init: function () {
                order.getOrderConfirmView(function (json) {
                    var TicInfo = jQuery.parseJSON(json.Result);
                    PrdRowJson = TicInfo.PrdRowJson;
                    DiscountTikRowJson = TicInfo.DiscountTikRowJson;
                    ValueTikRowJson = TicInfo.ValueTikRowJson;
                    for (var i = 0 ; i < PrdRowJson.length; i++) {
                        if (PrdRowJson[i].IsCanUseTicket != "False") {
                            $("#couponIcon_" + PrdRowJson[i].Pkid + "").css("display", "");
                        } else {
                            $("#couponIcon_" + PrdRowJson[i].Pkid + "").css("display", "none");
                        }
                    }

                    //if (ValueTikRowJson == "" || ValueTikRowJson == "[]" || ValueTikRowJson == "[{}]") {
                    //    $(_config.valuetik.couponcell).hide();
                    //} else {
                    //    $(_config.valuetik.couponcell).show();
                    //}
                });

                cart.getCart(function (msg) {
                    var returnResult = jQuery.parseJSON(msg.Result.Result);
                    var productcount = returnResult.productcount;

                    $("#sumproductprice").text(returnResult.totalprice);
                    $("#summemberdiscount").text(returnResult.discount);
                    $("#totalamount").text(returnResult.total);
                    $("#orgtotalamount").text(returnResult.total);
                    $("#productcount").text(productcount);

                    for (var i = 0 ; i < returnResult.products.length ; i++) {
                        $("#Discountmember_" + returnResult.products[i].PKId + "").html(returnResult.products[i].discountmember);
                        $("#PrdTotalamount_" + returnResult.products[i].PKId + "").html(returnResult.products[i].totalamount + returnResult.products[i].discountmembe);
                        $("#Totalamount_" + returnResult.products[i].PKId + "").html(returnResult.products[i].totalamount);
                        if (returnResult.products[i].IsCanUseTicket == false) {
                            $("#divIsCanUseTicket").html("");
                        }
                    }
                });
            },
            clear: function () {
                _.orderInfo.getSpInfo(1);
                _.pay.payJson = { rows: [] };
            },
            //库存检查
            stockCheckAll: function () {
                var addressId = $(_config.currAddress).attr("data-id");
                if (addressId == "0") {
                    _.view.message.alert("请选择送货地址！");
                    return;
                }

                var deliveryVal = $(_config.deliveryEdit).attr("data-value");
                if (!deliveryVal) {
                    _.view.message.alert("请选择配送方式！");
                    return;
                }

                var dateSpan = $(_config.deliveryDateDisplay);

                order.stockCheckAll(addressId, deliveryVal, dateSpan.text(), function (json) {
                    if (json.Success) {
                        _.orderInfo.getSpInfo();

                        if (json.msg != "") {
                            //送货日期
                            $(_config.deliveryDate).attr("data-date", json.Result);
                            dateSpan.text(json.Result);
                        }

                        //$("#btn_Submit1").css("display", "");
                    } else {
                        //$("#btn_Submit1").css("display", "none");
                        _.orderInfo.getSpInfo();
                        _.view.message.alert(json.Message);

                    }
                });
            },
            //获取促销信息
            getSpInfo: function (tag) {
                var addressId = $(_config.currAddress).attr("data-id");
                if (addressId == "0") {
                    _.view.message.alert("请选择送货地址！");
                    return;
                }

                var deliveryVal = $(_config.deliveryEdit).attr("data-value");
                if (!deliveryVal && tag != 1) {
                    _.view.message.alert("请选择配送方式！");
                    return;
                }

                var installVal = $(_config.installItem + ".active").data("value");

                var jsonDetail = {};
                jsonDetail.OrderRowTicketList = _.product.productJson.rows;//行项目使用的券
                jsonDetail.OrderPayTicketList = _.pay.payJson.rows;
                jsonDetail.delivery = deliveryVal;
                jsonDetail.Isneedinstall = installVal;
                jsonDetail.addressid = addressId;
                order.getPromotionInfo(jsonDetail, function (msg) {
                    if (!msg.Success && tag != 1) {
                        _.view.message.alert(msg.Message);
                        return;
                    }
                    var json = jQuery.parseJSON(msg.Result);
                    if (json.status == "success") {
                        if (json.isHasActivity == "0") {
                            $(_config.activityPanel).hide();
                            $(_config.activityDisplay).text('');
                        } else {
                            var info = "";
                            $.each(json.valueRuleList, function (key, obj) {
                                //     var iconhtml = '<span class="couponIcon">' + obj.IconName + '</span>';
                                //     html += '<li' + (obj.msgShow == "0" ? " style=\'display:none\'" : "") + '>' + iconhtml + obj.msg + '\
                                //<div class="coupont_layer">\
                                //     <span class="navArrowTop_Gray"></span>\
                                //     <h6 class="title">' + obj.Activityname + '  (' + obj.DataAreaYear + ')</h6>\
                                //     <p class="info">' + obj.Des + '</p>\
                                //</div>\
                                //</li>';
                                info += obj.msg + ' ';
                            });
                            //var flag = 0;
                            //$("input[name='delivery']").each(function () {
                            //    if ($(this).is(':checked')) {
                            //        flag++;
                            //    }
                            //});
                            //if (flag > 0) {
                            //    $("#ul_Activity").html(html);
                            //}

                            $(_config.activityPanel).show();
                            $(_config.activityDisplay).html(info);
                        }
                    } else {
                        if (tag != 1) {
                            _.view.message.alert(json.msg);
                        }
                    }

                    //重置 过滤掉送券
                    _.orderInfo.valueRuleEntity = json;
                    _.orderInfo.valueRuleEntity.valueRuleList = JSLINQ(_.orderInfo.valueRuleEntity.valueRuleList).Where(function (item) {
                        return item.Ruleid > 0;
                    }).items;

                    //使用券按钮显示控制
                    var responseJson = _.valueTik.GetEntity();
                    if (responseJson.tikGroupJson && responseJson.tikGroupJson.length > 0) {
                        $(_config.valuetik.couponcell).show();
                    } else {
                        $(_config.valuetik.couponcell).hide();
                    }

                    _.price.CountTotal();
                });
            },
            //获取运费，用于配送方式选择时，即时显示运费
            getYf: function () {
                var addressId = $(_config.currAddress).attr("data-id");
                if (addressId == "0") {
                    return;
                }

                var deliveryVal = $(_config.deliveryItem + ".active").data("value");
                if (!deliveryVal) {
                    return;
                }

                var installVal = $(_config.installItem + ".active").data("value");

                var jsonDetail = {};
                jsonDetail.delivery = deliveryVal;
                jsonDetail.Isneedinstall = installVal;
                jsonDetail.addressid = addressId;
                order.getPromotionInfo(jsonDetail, function (msg) {
                    var json = jQuery.parseJSON(msg.Result);
                    if (json.status == "success") {
                        $(_config.shippriceDisplay).text(json.Yf);
                    }
                });
            },
            //结算
            confirm: function (type) {
                var addressId = $(_config.currAddress).attr("data-id");
                if (addressId == "0") {
                    _.view.message.alert("请选择送货地址！");
                    return;
                }

                var deliveryVal = $(_config.deliveryEdit).attr("data-value");
                var installVal = $(_config.deliveryEdit).attr("data-installvalue");
                if (!deliveryVal) {
                    _.view.message.alert("请选择配送方式！");
                    return;
                }

                var deliveryDate = $(_config.deliveryDateDisplay).text();
                if (!deliveryDate) {
                    _.view.message.alert("请选择配送时间！");
                    return;
                }

                var invoice = $(_config.invoiceEdit).attr("data-value");
                var invoiceTitle = $(_config.invoiceEdit).attr("data-title");
                if (invoice == "1" && !invoiceTitle) {
                    _.view.message.alert("请输入发票抬头名称！");
                    return;
                }

                var remark = $(_config.remark).val().replace(/\n/g, ",");
                if (remark.length > 50) {
                    _.view.message.alert("请输入不超过50个字的订单备注信息！");
                    return;
                }

                var jsonDetail = {};
                var jsonOrderHead = {};
                jsonOrderHead.AddressId = addressId;
                jsonOrderHead.Delivery = deliveryVal;
                jsonOrderHead.Deliverydate = deliveryDate;
                jsonOrderHead.Invoice = invoice;

                jsonOrderHead.InvoiceTiltle = invoiceTitle;
                jsonOrderHead.Isneedinstall = installVal || "0";
                jsonOrderHead.Remark = remark;

                jsonDetail.OrderPayTicketList = _.pay.payJson.rows;
                jsonDetail.OrderRowTicketList = _.product.productJson.rows;//行项目使用的券
                jsonDetail.OrderHead = jsonOrderHead;

                if (type == 1) {
                    _.orderInfo.checkStock(jsonOrderHead, function () {
                        _.orderInfo.getPromotionInfoNext(jsonDetail, function () {
                            _.orderInfo.addOrder(jsonDetail);
                        });
                    });
                } else {
                    _.orderInfo.addOrder(jsonDetail);
                }
            },
            checkStock: function (jsonOrderHead, callback) {
                order.stockCheckAll(jsonOrderHead.AddressId, jsonOrderHead.Delivery, jsonOrderHead.Deliverydate, function (msg) {
                    var json = msg;
                    if (json.Success == true) {
                        if (callback && typeof callback == "function") {
                            callback();
                        }
                    } else {
                        _.view.message.alert(json.Message);
                    }
                });
            },
            getPromotionInfoNext: function (jsonDetail, callback) {
                var jsonDetail4Next = {};
                jsonDetail4Next.OrderPayTicketList = jsonDetail.OrderPayTicketList;
                jsonDetail4Next.OrderRowTicketList = jsonDetail.OrderRowTicketList;//行项目使用的券
                jsonDetail4Next.Delivery = jsonDetail.OrderHead.Delivery;
                jsonDetail4Next.IsneedInstall = jsonDetail.OrderHead.Isneedinstall;
                jsonDetail4Next.AddressId = jsonDetail.OrderHead.AddressId;
                order.getPromotionInfoNext(jsonDetail4Next, function (msg) {
                    var json = jQuery.parseJSON(msg.Result);
                    if (json.length > 0) {
                        if (json[0]) {
                            var str = "";
                            for (var i = 0; i < json.length; i++) {
                                str += json[i] + "</br>";
                            }
                            _.view.message.popup({
                                title: '温馨提示',
                                message: str,
                                className: 'Popup_err4',
                                buttons: {
                                    ok: { val: '继续', c: 'err_btn dis-ib' },
                                    cancel: { val: '去商店挑选', c: 'err_btn dis-ib err_btn2' }
                                },
                                callback: {
                                    ok: function () {
                                        callback();
                                    },
                                    cancel: function () {
                                        window.location.href = "/";
                                    }
                                }
                            });
                            //$(_config.promotionInfo).html(str);
                            //mui(_config.promotionPanel).popover("show");
                        } else {
                            if (callback && typeof callback == "function") {
                                callback();
                            }
                        }
                    } else {
                        if (callback && typeof callback == "function") {
                            callback();
                        }
                    }
                });
            },
            addOrder: function (jsonDetail) {
                order.submitOrder(jsonDetail, function (msg) {
                    var json = msg;
                    if (json.Success == true) {
                        //smart.massger.Alert("下单成功，订单号为：" + json.Message + "。");
                        if (_.orderInfo.valueRuleEntity.IsSendZp == "1") {
                            window.location.replace("/Trading/order/cartgift?OrderNo=" + json.Result);
                        } else {
                            setTimeout(function () {
                                window.location.replace("/Trading/Payment?OrderNo=" + json.Result);
                            }, 1000);
                        }
                    } else {
                        _.view.message.alert(json.Message);
                    }
                });
            }
        },
        price: {
            GetEntity: function () {
                var rowtotalamount = 0;//行项目小计
                var discountmember = 0;//会员折扣金额
                var shipprice = _.orderInfo.valueRuleEntity.Yf;//运费
                var sumactivitydiscount = 0;//活动优惠金额

                //行项目小计
                $("span[id^=Totalamount_]").each(
                    function () {
                        rowtotalamount = (parseFloat(rowtotalamount) * 100 + parseFloat($(this).html()) * 100) / 100;
                    }
                );

                //会员折扣金额
                $("span[id^=Discountmember_]").each(
                  function () {
                      discountmember = (parseFloat(discountmember) * 100 + parseFloat($(this).html()) * 100) / 100;
                  }
               );

                //活动优惠金额
                //1 RA来自券的部分 (需要入券的部分)     
                JSLINQ(_.pay.selActivityTikCodeList()).ForEach(function (p) {
                    sumactivitydiscount = (parseFloat(sumactivitydiscount) * 100 + parseFloat(p.TikValue) * 100) / 100;
                });

                //2 RA来自券的部分 (不需要入券的部分)     
                JSLINQ(_.orderInfo.valueRuleEntity.valueRuleList).ForEach(function (p) {
                    if (p.RASendTikNum == 0) {
                        sumactivitydiscount = (parseFloat(sumactivitydiscount) * 100 + parseFloat(p.RADiscountMoney) * 100) / 100;
                    }
                });

                //3 RB来自券的部分 (不需要入券的部分)     
                JSLINQ(_.orderInfo.valueRuleEntity.valueRuleList).ForEach(function (p) {
                    sumactivitydiscount = (parseFloat(sumactivitydiscount) * 100 + parseFloat(p.RBDiscountMoney) * 100) / 100;
                });

                //4 RG来自券的部分 (不需要入券的部分)     
                JSLINQ(_.orderInfo.valueRuleEntity.valueRuleList).ForEach(function (p) {
                    sumactivitydiscount = (parseFloat(sumactivitydiscount) * 100 + parseFloat(p.RGDiscountMoney) * 100) / 100;
                });

                //5 不参加活动的券
                JSLINQ(_.pay.selNotActivityTikCodeList()).ForEach(function (p) {
                    sumactivitydiscount = (parseFloat(sumactivitydiscount) * 100 + parseFloat(p.TikValue) * 100) / 100;
                });

                //当活动优惠金额大于商品金额     
                if ((parseFloat(rowtotalamount) * 100 - parseFloat(sumactivitydiscount) * 100) / 100 < 0) {
                    sumactivitydiscount = rowtotalamount;
                }

                var sumproductprice = (parseFloat(rowtotalamount) * 100 + parseFloat(discountmember) * 100) / 100;//商品金额
                var totalamount = (parseFloat(rowtotalamount) * 100 + parseFloat(shipprice) * 100 - parseFloat(sumactivitydiscount) * 100) / 100;
                totalamount = _.view.decimal(totalamount, 2);
                sumproductprice = _.view.decimal(sumproductprice, 2);
                var responseJson = {};
                responseJson.sumproductprice = sumproductprice; //商品金额（不含运费）
                responseJson.shipprice = shipprice;//运费
                responseJson.summemberdiscount = discountmember;//会员折扣
                responseJson.sumactivitydiscount = sumactivitydiscount;//活动优惠金额
                responseJson.totalamount = totalamount; //总计
                responseJson.leftactivitydiscount = (parseFloat(rowtotalamount) * 100 - parseFloat(sumactivitydiscount) * 100) / 100;//剩余可用折扣的金额

                return responseJson;
            },
            //计算总价
            CountTotal: function () {
                var responseJson = _.price.GetEntity();
                $("#shipprice").text(responseJson.shipprice);
                $("#shipprice_span").text(responseJson.shipprice);
                $("#sumproductprice").html(responseJson.sumproductprice);
                $("#summemberdiscount").html((responseJson.summemberdiscount * 100 + responseJson.summemberdiscount * 100) / 100);
                $("#sumactivitydiscount").html(responseJson.sumactivitydiscount);
                if (responseJson.sumactivitydiscount > 0) {
                    $("#sumactivitydiscount_dl").css("display", "");
                } else {
                    $("#sumactivitydiscount_dl").css("display", "none");
                }
                if (responseJson.sumproductprice == 0) {
                    $("#btn_usetik").css("display", "none");
                } else {
                    $("#btn_usetik").css("display", "");
                }

                //不存在符合活动的券
                if (_.valueTik.GetEntity().tikGroupJson.length == 0) {
                    $("#btn_usetik").css("display", "none");
                }

                $("#totalamount").html(responseJson.totalamount);
            },
            //设置行项目价格
            SerRowPrice: function (Pkid, requestJson) {
                order.countRowPrice(requestJson.shopCardId, requestJson.tikCode, requestJson.discount, function (msg) {
                    if (msg.Success == true) {
                        var json = JSON.parse(msg.Result);

                        $("#PrdPricesubdiscount_" + Pkid).html(json.PrdPricesubdiscount);
                        $("#PrdTotalamount_" + Pkid).html(json.PrdTotalamount);
                        $("#Totalamount_" + Pkid).html(json.Totalamount);
                        $("#Discountmember_" + Pkid).html(json.Discountmember);
                    }
                });
            },
            //设置行项目价格_原价
            SerRowPrice_Org: function (Pkid) {
                var rowJson = _.discountTik.GetEntity(Pkid).rowJson;
                $("#PrdPricesubdiscount_" + Pkid).html(rowJson.PrdPricesubdiscount);
                $("#PrdTotalamount_" + Pkid).html(rowJson.PrdTotalamount);
                $("#Totalamount_" + Pkid).html(rowJson.Totalamount);
                $("#Discountmember_" + Pkid).html(rowJson.Discountmember);
            }
        },
        discountTik: {
            GetEntity: function (Pkid) {
                if (DiscountTikRowJson == null) {
                    DiscountTikRowJson = {};
                }
                var rowJson = JSLINQ(PrdRowJson).Where(function (item) {
                    return item.Pkid == Pkid;
                }).FirstOrDefault();

                JSLINQ(DiscountTikRowJson).ForEach(function (p) {

                    var ifHasSelect = JSLINQ(_.product.productJson.rows).Where(function (item) {
                        return item.TikCode == p.TikCode;
                    }).FirstOrDefault();

                    //已经存在选中的值
                    if (ifHasSelect) {
                        if (ifHasSelect.Pkid == p.Pkid) {
                            p.IfHasChooseBySelfRow = 1;
                        } else {
                            p.IfHasChooseBySelfRow = 0;
                        }
                        p.IfHasChoose = 1;
                    } else {
                        p.IfHasChooseBySelfRow = 0;
                        p.IfHasChoose = 0;
                    }
                });

                var tikJson = JSLINQ(DiscountTikRowJson).Where(function (item) {
                    return item.Pkid == Pkid && item.IfHasChoose == 0;
                }).items;

                var tikGroupJson = JSLINQ(tikJson).Distinct(function (item) {
                    return item.TikName;
                }).items;

                var tikAllJson = JSLINQ(DiscountTikRowJson).Where(function (item) {
                    return item.Pkid == Pkid;
                }).items;

                var tikGroupAllJson = JSLINQ(tikAllJson).Distinct(function (item) {
                    return item.TikName;
                }).items;

                var responseJson = {};
                responseJson.rowJson = rowJson;//当前商品行项目数据 如价格数量
                responseJson.tikJson = tikJson;//当前商品行项目  能使用的券号
                responseJson.tikGroupJson = tikGroupJson;//当前商品行项目 券号分组
                responseJson.tikAllJson = tikAllJson;//当前商品行项目  所有能使用的券号
                responseJson.tikGroupAllJson = tikGroupAllJson;//当前商品行项目  所有能使用的券号
                return responseJson;
            },
            //当前组中还能选的商品
            GetGroupRemainNum: function (list) {
                var remainNum = 0;
                JSLINQ(list).ForEach(function (p) {
                    if (p.IfHasChooseBySelfRow == 1) {
                        remainNum = parseInt(remainNum) + 1;
                    }
                    else if (p.IfHasChoose != 1) {
                        remainNum = parseInt(remainNum) + 1;
                    }
                });
                return remainNum;
            },
            ConfirmUseTik: function (obj) {
                var Pkid = obj.data("pkid");
                var tikCode = $(_config.discounttik.choosetik + '[data-pkid="' + Pkid + '"]' + ".active").eq(0).data("tikcode");
                var discount = $(_config.discounttik.choosetik + '[data-pkid="' + Pkid + '"]' + ".active").eq(0).data("discount");

                var responseJson = _.discountTik.GetEntity(Pkid);
                var needNum = responseJson.rowJson.Quantity;
                var choseNum = $(_config.discounttik.choosetik + '[data-pkid="' + Pkid + '"]' + ".active").length;

                if (choseNum < needNum && choseNum != 0) {
                    _.view.message.alert("您还需选择" + Number(needNum - choseNum) + "张券！");
                    return;
                }

                if (discount) {
                    var requestJson = {};
                    requestJson.shopCardId = Pkid;
                    requestJson.discount = discount;
                    requestJson.tikCode = tikCode;

                    //设置行项目价格
                    _.price.SerRowPrice(Pkid, requestJson);

                    //新增到json中
                    _.product.delProductJson(Pkid);
                    $(_config.discounttik.choosetik + '[data-pkid="' + Pkid + '"]' + ".active").each(function () {
                        _.product.addProductJson({ Pkid: Pkid, TikCode: $(this).data("tikcode") });
                    });

                    //$("#btn_couponadd_" + Pkid).css("display", "none");
                    //$("#btn_couponedit_" + Pkid).css("display", "");
                    //$("#couponIcon_" + Pkid).css("display", "");
                } else {
                    _.price.SerRowPrice_Org(Pkid);
                    _.product.delProductJson(Pkid);

                    //$("#btn_couponadd_" + Pkid).css("display", "");
                    //$("#btn_couponedit_" + Pkid).css("display", "none");
                    //$("#couponIcon_" + Pkid).css("display", "");
                }

                _.discountTik.CoupondivHide(Pkid);
                _.discountTik.GlobalChange();
                _.orderInfo.getSpInfo();
                _.price.CountTotal();
            },
            UseTik: function (Pkid) {
                var sign = true;//标识是否是第一次进入
                var responseJson = _.discountTik.GetEntity(Pkid);
                var rowHtml = "";
                JSLINQ(responseJson.tikGroupAllJson).ForEach(function (item) {
                    var list = JSLINQ(responseJson.tikAllJson).Where(function (p) {
                        return item == p.TikName;
                    }).items;
                    var isChoose = JSLINQ(list).Where(function (p) { return p.IfHasChooseBySelfRow == 1; }).items.length > 0;
                    if (isChoose) {//标明有选择再进入的
                        sign = false;
                        return false;
                    }
                });
                JSLINQ(responseJson.tikGroupAllJson).ForEach(function (item) {
                    var list = JSLINQ(responseJson.tikAllJson).Where(function (p) {
                        return item == p.TikName;
                    }).items;

                    //var isChoose = JSLINQ(list).Where(function (p) { return p.IfHasChooseBySelfRow == 1; }).items.length > 0;

                    var innerHtml = "";
                    JSLINQ(list).ForEach(function (p) {
                        if (p.IfHasChooseBySelfRow == 0 && p.IfHasChoose == 1)
                            return true;
                        var active = "";
                        var gray = "";
                        if (!sign) {
                            var active = p.IfHasChooseBySelfRow == 1 ? " active" : "";
                            var gray = p.IfHasChoose != 1 ? ' gray' : '';
                        }

                        //    if (p.IfHasChooseBySelfRow == 1) {
                        //        innerHtml += '<label>\
                        //<input type="checkbox" checked="checked" name="checkbox_' + Pkid + '_' + p.TikCode + '"  value="' + p.Discount + '"  selfAttr="' + p.TikCode + '"  onclick="_.discountTik.ChooseTik(' + Pkid + ',' + p.TikCode + ')"  >\
                        //' + p.TikCode + '\
                        //</label>';
                        //    }
                        //    else if (p.IfHasChoose != 1) {
                        //        innerHtml += '<label><input type="checkbox" disabled="disabled"  type="checkbox" name="checkbox_' + Pkid + '_' + p.TikCode + '"\
                        //  onclick="_.discountTik.ChooseTik(' + Pkid + ',' + p.TikCode + ')" \
                        //  value="' + p.Discount + '"  selfAttr="' + p.TikCode + '" > ' + p.TikCode + '</label>';
                        //    }

                        innerHtml += '<div class="gg-btn dis-ib' + active + gray + '" data-pkid="' + Pkid + '" data-discount="' + p.Discount + '" data-tikcode="' + p.TikCode + '" role="discounttik.choosetik">' + p.TikCode + '</div>';
                    });

                    var remainNum = _.discountTik.GetGroupRemainNum(list);
                    if (innerHtml != "" && parseInt(responseJson.rowJson.Quantity) <= parseInt(remainNum)) {
                        rowHtml += '<div class="gg">';
                        rowHtml += '<p>' + item + '</p><div class="btn-box">';
                        rowHtml += innerHtml;
                        rowHtml += "</div></div>";
                    }
                });

                //var responseJson = _.discountTik.GetEntity(Pkid);
                //var rowHtml = "";
                //JSLINQ(responseJson.tikGroupJson).ForEach(function (item) {
                //    var list = JSLINQ(responseJson.tikJson).Where(function (p) {
                //        return item == p.TikName;
                //    }).items;

                //    var innerHtml = "";
                //    JSLINQ(list).ForEach(function (p) {
                //        innerHtml += '<label>\
                //    <input type="checkbox" name="checkbox_' + Pkid + '_' + p.TikCode + '"  value="' + p.Discount + '"  selfAttr="' + p.TikCode + '"  onclick="_.discountTik.ChooseTik(' + Pkid + ',' + p.TikCode + ')"  >\
                //    ' + p.TikCode + '\
                //    </label>';

                //        innerHtml += '<div class="gg-btn dis-ib' + active + '"  data-ruleid="' + p.Ruleid + '"  data-tikcode="' + p.TikCode + '" data-tikvalue="' + p.TikValue + '" role="valuetik.choosetik"' + disablestr2 + '>' + p.TikCode + '</div>';
                //    });

                //    var remainNum = _.discountTik.GetGroupRemainNum(list);
                //    if (parseInt(responseJson.rowJson.Quantity) <= parseInt(remainNum)) {
                //        rowHtml += '<div class="gg">';
                //        rowHtml += '<p>' + item + '</p><div class="btn-box">';
                //        rowHtml += innerHtml;
                //        rowHtml += "</div></div>";
                //    }
                //});

                //var html = '<div class="z-quan">\
                //'+ rowHtml + '\
                // <div class="z-yhq-sy"> <p class="fl">温馨提示: 请选择相同折扣的券。您已勾选\
                //<span class="wineRed" id="span_choosenum_' + Pkid + '">0</span> 张，还需勾选 \_.view.message.popup
                //<span class="wineRed" id="span_surplusnum_' + Pkid + '">' + responseJson.rowJson.Quantity + '</span> 张。</p>\
                //<p class="fr" onclick="_.discountTik.ConfirmUseTik(' + Pkid + ')" >确定</p>\
                //</div>';
                var couponlist = $(_config.discounttik.couponlist + '[data-pkid="' + Pkid + '"]');
                if (couponlist.length > 0)
                    couponlist.html(rowHtml);
                else {
                    var html = '<div role="discounttik.couponPanel" data-pkid="' + Pkid + '" class="mui-popover mui-popover-action mui-popover-bottom sp-action">\
                        <div class="mui-scroll-wrapper">\
                            <div class="mui-scroll">\
                                <a href="javascript:void(0);" role="discounttik.couponclose" data-pkid="' + Pkid + '" class="close pos-a"><img src="/Assets/themes/default/images/goodDetail/gd-close.png" /></a>\
                                <div class="action-wrap">\
                                    <div class="action-title">使用优惠券</div>\
                                    <div role="discounttik.couponlist" data-pkid="' + Pkid + '">\
                                    '+ rowHtml + '\
                                    </div>\
                                </div>\
                                <div class="ggsk-btn">\
                                    <a href="javascript:void(0);" role="discounttik.confirmusetik" data-pkid="' + Pkid + '">确&nbsp;定</a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';
                    $(_config.discounttik.couponPanels).append(html);
                    mui('.mui-scroll-wrapper').scroll();//js加载出来的 必须初始化
                }

                //$("#div_discountcoupon_" + Pkid).html(html);
                _.discountTik.CoupondivShow(Pkid);
            },
            EditTik: function (Pkid) {
                var responseJson = _.discountTik.GetEntity(Pkid);
                var rowHtml = "";
                JSLINQ(responseJson.tikGroupAllJson).ForEach(function (item) {

                    var list = JSLINQ(responseJson.tikAllJson).Where(function (p) {
                        return item == p.TikName;
                    }).items;

                    var innerHtml = "";
                    JSLINQ(list).ForEach(function (p) {
                        if (p.IfHasChooseBySelfRow == 1) {
                            innerHtml += '<label>\
                    <input type="checkbox" checked="checked" name="checkbox_' + Pkid + '_' + p.TikCode + '"  value="' + p.Discount + '"  selfAttr="' + p.TikCode + '"  onclick="_.discountTik.ChooseTik(' + Pkid + ',' + p.TikCode + ')"  >\
                    ' + p.TikCode + '\
                    </label>';
                        }
                        else if (p.IfHasChoose != 1) {
                            innerHtml += '<label><input type="checkbox" disabled="disabled"  type="checkbox" name="checkbox_' + Pkid + '_' + p.TikCode + '"\
                      onclick="_.discountTik.ChooseTik(' + Pkid + ',' + p.TikCode + ')" \
                      value="' + p.Discount + '"  selfAttr="' + p.TikCode + '" > ' + p.TikCode + '</label>';
                        }
                    });

                    var remainNum = _.discountTik.GetGroupRemainNum(list);
                    if (innerHtml != "" && parseInt(responseJson.rowJson.Quantity) <= parseInt(remainNum)) {
                        rowHtml += '<dl>';
                        rowHtml += '<dt>' + item + '</dt><dd>';
                        rowHtml += innerHtml;
                        rowHtml += "</dd></dl>";
                    }
                });

                var html = '<div class="z-quan">\
                    '+ rowHtml + '\
                    <div class="z-yhq-sy"> <p class="fl">温馨提示: 请选择相同折扣的券。您已勾选 \
                    <span class="wineRed" id="span_choosenum_' + Pkid + '">' + responseJson.rowJson.Quantity + '</span> 张，还需勾选\
                    <span class="wineRed" id="span_surplusnum_' + Pkid + '">0</span> 张。</p>\
                    <div class="opts"><button id="btn_Confrim_' + Pkid + '"  onclick="_.discountTik.ConfirmUseTik(' + Pkid + ')"  class="btn s2 onsure" >确定</button>\
                    <button id="btn_Cancel_' + Pkid + '" onclick="_.discountTik.CoupondivHide(' + Pkid + ')"   class="btn oncancel">取消</button>\
                    </div>';
                $("#div_discountcoupon_" + Pkid).html(html);
                _.discountTik.CoupondivShow(Pkid);

            },
            ChooseTik: function (obj) {
                if (obj.hasClass('gray'))
                    return;

                if (obj.hasClass('active'))
                    obj.removeClass("active");
                else
                    obj.addClass("active");

                var Pkid = obj.data("pkid");
                var tikCode = obj.data("tikcode");
                var discount = obj.data("discount");

                var responseJson = _.discountTik.GetEntity(Pkid);
                var needNum = responseJson.rowJson.Quantity;
                var choseNum = $(_config.discounttik.choosetik + '[data-pkid="' + Pkid + '"]' + ".active").length;

                $("#span_choosenum_" + Pkid).html(choseNum);
                $("#span_surplusnum_" + Pkid).html(needNum - choseNum);

                if (choseNum > 0 && needNum != choseNum) {
                    //$(_config.discounttik.confirmusetik + '[data-pkid="' + Pkid + '"]').attr("disabled", "disabled").parent().addClass("gray");

                    $(_config.discounttik.choosetik + '[data-pkid="' + Pkid + '"]').each(function () {
                        var d = $(this).data("discount");
                        if (d != discount)
                            $(this).addClass("gray");
                        else
                            $(this).removeClass("gray");
                    });

                } else if (choseNum > 0 && needNum == choseNum) {
                    //$(_config.discounttik.confirmusetik + '[data-pkid="' + Pkid + '"]').removeAttr("disabled").parent().removeClass("gray");


                    $(_config.discounttik.choosetik + '[data-pkid="' + Pkid + '"]').each(function () {
                        var d = $(this).data("discount");
                        if (!$(this).hasClass('active'))
                            $(this).addClass("gray");
                    });
                } else {
                    //$(_config.discounttik.confirmusetik + '[data-pkid="' + Pkid + '"]').removeAttr("disabled").parent().removeClass("gray");

                    $(_config.discounttik.choosetik + '[data-pkid="' + Pkid + '"].gray').removeClass("gray");
                }
            },
            //确认使用券之后全局  有些行项目的券已经没的选了
            GlobalChange: function () {
                //_.valueTik.CoupondivHide();//作用待讨论

                JSLINQ(DiscountTikRowJson).ForEach(function (p) {
                    var ifHasSelect = JSLINQ(_.product.productJson.rows).Where(function (item) {
                        return item.TikCode == p.TikCode;
                    }).FirstOrDefault();

                    //已经存在选中的值
                    if (ifHasSelect) {
                        if (ifHasSelect.Pkid == p.Pkid) {
                            p.IfHasChooseBySelfRow = 1;
                        } else {
                            p.IfHasChooseBySelfRow = 0;
                        }
                        p.IfHasChoose = 1;
                    } else {
                        p.IfHasChoose = 0;
                        p.IfHasChooseBySelfRow = 0;
                    }
                });

                JSLINQ(PrdRowJson).Where(function (p) {
                    return p.IsCanUseTicket == "True";
                }).ForEach(function (p) {
                    var canUse = JSLINQ(DiscountTikRowJson).Where(function (item) { //购物车条目可用的优惠劵
                        return ((item.Pkid == p.Pkid && item.IfHasChoose == 0) || (item.Pkid == p.Pkid && item.IfHasChooseBySelfRow == 1))
                    });
                    var entity = _.discountTik.GetEntity(p.Pkid);


                    //var selNum = JSLINQ(DiscountTikRowJson).Count(function (item) {
                    //    return item.IfHasChooseBySelfRow == 1;
                    //});
                    var isShow = false;//标识是否显示 
                    for (var i = 0; i < entity.tikGroupAllJson.length; i++) { //可用的优惠劵种类分类。对每一种可使用的优惠劵和当前数量比较。
                        var canUseNum = JSLINQ(canUse.items).Count(function (item) {
                            return item.TikName == entity.tikGroupAllJson[i];
                        });
                        if (parseInt(canUseNum) >= parseInt(p.Quantity)) {
                            //if (selNum == 0) {
                            isShow = true;
                            break;;
                            //}
                        }
                    }
                    if (isShow) {
                        $("#couponIcon_" + p.Pkid).css("display", "");

                    } else {
                        $("#couponIcon_" + p.Pkid).css("display", "none");
                    }
                    //if (parseInt(canUseNum) >= parseInt(p.Quantity)) {
                    //    if (selNum == 0) {
                    //        $("#btn_couponadd_" + p.Pkid).css("display", "");
                    //    }
                    //} else {
                    //    $("#btn_couponadd_" + p.Pkid).css("display", "none");
                    //}
                });
                _.discountTik.GetEntity();
                //_.pay.payJson = { rows: [] };//待讨论
            },
            //显示优惠券列表
            CoupondivShow: function (Pkid) {
                mui(_config.discounttik.couponPanel + '[data-pkid="' + Pkid + '"]').popover('show');

                //$("li[id^=div_discountcoupon_]").css("display", 'block');
                ////先隐藏所有
                //$("ul[id^=ulCoupon_]").each(
                //    function () {
                //        var obj = $(this);
                //        if (obj.css("display") != "none") {
                //            obj.css("display", "none");
                //        }
                //    }
                //);

                //$("#ulCoupon_" + Pkid).css("display", "block");
            },
            //隐藏优惠券列表
            CoupondivHide: function (Pkid) {
                mui(_config.discounttik.couponPanel + '[data-pkid="' + Pkid + '"]').popover('hide');
                //$("#ulCoupon_" + Pkid).css("display", "none");
            }
        },
        valueTik: {
            GetEntity: function () {
                if (ValueTikRowJson == null) {
                    ValueTikRowJson = {};
                }

                var rules = _.orderInfo.valueRuleEntity.valueRuleList;
                JSLINQ(ValueTikRowJson).ForEach(function (p) {
                    var ifHasSelect = JSLINQ(_.pay.payJson.rows).Where(function (item) {
                        return item.TikCode == p.TikCode;
                    }).FirstOrDefault();
                    //已经存在选中的值
                    if (ifHasSelect) {
                        p.IfHasChoose = 1;
                    } else {
                        p.IfHasChoose = 0;
                    }
                });

                //正在参加活动的券和礼金券
                var tikJson = JSLINQ(ValueTikRowJson).Where(function (item) {
                    var ifhasRule = JSLINQ(rules).Count(function (i) {
                        return i.Ruleid == item.Ruleid;
                    }) > 0;
                    if (ifhasRule || item.Ruleid == 0) {
                        return true;
                    } else {
                        return false;
                    }
                }).items;

                var tikGroupJson = JSLINQ(tikJson).Distinct(function (item) {
                    return item.TikName + "_" + item.Ruleid;
                }).items;

                var responseJson = {};
                responseJson.tikJson = tikJson;//当前商品行项目  能使用的券号
                responseJson.tikGroupJson = tikGroupJson;//当前商品行项目 券号分组
                return responseJson;
            },
            UseTik: function () {
                var selRuleList = _.pay.getSelRuleList();//当前已经选中的券
                var responseJson = _.valueTik.GetEntity();
                var rowHtml = "";
                if (responseJson.tikGroupJson.length == 0) {
                    _.view.message.alert("没有可用的优惠劵");
                    return;
                } else {
                    JSLINQ(responseJson.tikGroupJson).ForEach(function (item) {
                        var itemtemp = item.split('_');
                        var str = itemtemp[1] > 0 ? "(活动)" : "";

                        rowHtml += '<div class="gg" role="choosecouponlist">';
                        rowHtml += '<p>' + itemtemp[0] + str + '</p><div class="btn-box">';
                        var list = JSLINQ(responseJson.tikJson).Where(function (p) {
                            return (p.TikName + "_" + p.Ruleid) == item;
                        }).items;

                        JSLINQ(list).ForEach(function (p) {
                            var active = p.IfHasChoose == 1 ? " active" : "";
                            var gray = "";
                            var selRule = JSLINQ(selRuleList).Where(function (item) {
                                return item.Ruleid == p.Ruleid;
                            }).FirstOrDefault();

                            if (p.IfHasChoose != 1 && selRule && selRule.IfSelAll == 1) {
                                gray = " gray";
                            }

                            rowHtml += '<div class="gg-btn dis-ib' + active + gray + '"  data-ruleid="' + p.Ruleid + '"  data-tikcode="' + p.TikCode + '" data-tikvalue="' + p.TikValue + '" role="valuetik.choosetik">' + p.TikCode + '</div>';

                        });
                        rowHtml += "</div></div>";
                    });
                }
                //var html = '<div class="z-quan">\
                //   ' + rowHtml + '<div class="z-yhq-sy"><p class="fl">温馨提示: 请选择相同折扣的券。您已勾选 <span class="wineRed" id="valueTikSelNum">0</span> 张</p> <p class="fr" onclick="_.valueTik.CoupondivHide()">关闭</p></div></div>';
                //$("#div_valuecoupon").html(html);
                $(_config.valuetik.couponlist).html(rowHtml);
                _.valueTik.CoupondivShow();

                //注释一下代码，用于点击确认后进行优惠计算，执行CouponConfirm方法 -- add by shk 2017.8.7
                //_.valueTik.TikNumShow();
            },
            ChooseTik: function (obj) {
                if (obj.hasClass('gray'))
                    return;

                if (obj.hasClass('active'))
                    obj.removeClass("active");
                else
                    obj.addClass("active");

                var tikCode = obj.data("tikcode");
                var tikValue = obj.data("tikvalue");
                var ruleId = obj.data("ruleid");

                var ifCheck = obj.hasClass('active');
                var ifCheckActivity = ruleId != "0";
                var checkRuleId = ruleId;

                //注释一下代码，用于点击确认后进行优惠计算，执行CouponConfirm方法 -- add by shk 2017.8.7
                //if (ifCheck) {
                //    var tikEntity = {};
                //    tikEntity.TikCode = tikCode;
                //    tikEntity.Ruleid = checkRuleId;
                //    tikEntity.TikValue = tikValue;
                //    _.pay.addPayJson(tikEntity);
                //} else {
                //    _.pay.delPayJsonByTikCode(tikCode);
                //}

                //当选中非活动的券 如果减去的金额之后没有再折扣的余地 其他变灰
                if (!ifCheckActivity) {
                    //临时保存原选择的券数据，计算折扣金额后，重新还原数据
                    var temp = _.pay.payJson.rows;
                    _.valueTik.setPayJson();
                    var leftactivitydiscount = _.price.GetEntity().leftactivitydiscount;
                    _.pay.payJson.rows = temp;

                    if (leftactivitydiscount == 0) {
                        $(_config.valuetik.choosetik + '[data-ruleid="0"]').each(function () {
                            if (!$(this).hasClass("active"))
                                $(this).addClass("gray");
                        });
                    } else {
                        $(_config.valuetik.choosetik + '[data-ruleid="0"].gray').removeClass("gray");
                    }
                }

                //当选中的是活动券
                if (ifCheckActivity) {
                    var selRuleEntity = JSLINQ(_.orderInfo.valueRuleEntity.valueRuleList).Where(function (p) {
                        return p.Ruleid == checkRuleId;
                    }).FirstOrDefault();

                    var RASendTikNum = selRuleEntity.RASendTikNum;
                    var choseNum = $(_config.valuetik.choosetik + '[data-ruleid="' + checkRuleId + '"]' + ".active").length;

                    if (choseNum >= RASendTikNum) {
                        $(_config.valuetik.choosetik + '[data-ruleid="' + checkRuleId + '"]').each(function () {
                            if (!$(this).hasClass("active"))
                                $(this).addClass("gray");
                        });
                    } else {
                        $(_config.valuetik.choosetik + '[data-ruleid="' + checkRuleId + '"].gray').removeClass("gray");
                    }
                } else {//选中非活动的价值券
                    //注释一下代码，用于点击确认后进行优惠计算，执行CouponConfirm方法 -- add by shk 2017.8.7
                    //_.valueTik.GlobalChange();
                }
                //注释一下代码，用于点击确认后进行优惠计算，执行CouponConfirm方法 -- add by shk 2017.8.7
                //_.valueTik.TikNumShow();
                //_.price.CountTotal();
            },
            CouponConfirm: function () {
                _.pay.payJson.rows = [];

                $(_config.valuetik.choosetik + '.active').each(function () {
                    var tikCode = $(this).data("tikcode");
                    var tikValue = $(this).data("tikvalue");
                    var ruleId = $(this).data("ruleid");

                    var tikEntity = {};
                    tikEntity.TikCode = tikCode;
                    tikEntity.Ruleid = ruleId;
                    tikEntity.TikValue = tikValue;
                    _.pay.addPayJson(tikEntity);
                });

                _.valueTik.GlobalChange();
                _.valueTik.TikNumShow();
                _.price.CountTotal();
                _.valueTik.CoupondivHide();
            },
            setPayJson: function () {
                _.pay.payJson.rows = [];

                $(_config.valuetik.choosetik + '.active').each(function () {
                    var tikCode = $(this).data("tikcode");
                    var tikValue = $(this).data("tikvalue");
                    var ruleId = $(this).data("ruleid");

                    var tikEntity = {};
                    tikEntity.TikCode = tikCode;
                    tikEntity.Ruleid = ruleId;
                    tikEntity.TikValue = tikValue;
                    _.pay.addPayJson(tikEntity);
                });
            },
            //涉及重新刷新券列表
            GlobalChange: function () {
                var orgrules = _.orderInfo.valueRuleEntity.valueRuleList;//活动改变前的规则
                _.orderInfo.getSpInfo();
                var newrules = _.orderInfo.valueRuleEntity.valueRuleList;//活动改变后的规则

                var ifHasValueRule = JSLINQ(_.orderInfo.valueRuleEntity.valueRuleList).Count() > 0;
                if (ifHasValueRule) {//当前有满足的活动存在           
                    var delrules = [];//已经被删除的规则
                    JSLINQ(orgrules).ForEach(function (p) {
                        var ifhasRule = JSLINQ(newrules).Count(function (i) {
                            return i.Ruleid == p.Ruleid && i.RASendTikNum == p.RASendTikNum;
                        }) > 0;

                        if (!ifhasRule) {
                            delrules.push(p.Ruleid);
                        }
                    });

                    JSLINQ(delrules).ForEach(function (p) {
                        _.pay.delPayJsonByRuleid(p);
                    });

                    _.valueTik.UseTik();
                }
            },
            TikNumShow: function () {
                var choosecouponlistshow = "";
                $(_config.valuetik.choosecouponlist).each(function () {
                    $(this).find(_config.valuetik.choosetik).each(function () {
                        if ($(this).hasClass("active")) {
                            choosecouponlistshow += $(this).parent().parent().find('p').text() + " ";
                            return false;
                        }
                    });
                });
                $("#choosecouponlistshow").html(choosecouponlistshow);
            },
            //显示优惠券列表
            CoupondivShow: function () {
                mui(_config.valuetik.couponPanel).popover('show');
                //$("#div_valuecoupon").css("display", "block");
                //$("#div_valuecoupon").parent().css("display", "block");
            },
            //隐藏优惠券列表
            CoupondivHide: function () {
                mui(_config.valuetik.couponPanel).popover('hide');
                //$("#div_valuecoupon").css("display", "none");
                //$("#div_valuecoupon").parent().css("display", "none");
            }
        },
        pay: {
            payJson: { rows: [] },
            addPayJson: function (rowJson) {
                _.pay.payJson.rows.push(rowJson);
            },
            delPayJsonByTikCode: function (TikCode) {
                var obj = this;
                var i = 0;
                JSLINQ(_.pay.payJson.rows).ForEach(function (item) {
                    if (item.TikCode == TikCode) {
                        obj.payJson.rows.splice(i, 1);
                    }
                    i++;
                });
            },
            delPayJsonByRuleid: function (Ruleid) {
                _.pay.payJson.rows = JSLINQ(_.pay.payJson.rows).Where(function (item) {
                    return item.Ruleid != Ruleid;
                }).items;
            },
            //该规则当前选中的券数量
            countPayJsonByRuleid: function (Ruleid) {
                return JSLINQ(_.pay.payJson.rows).Count(function (item) {
                    return item.Ruleid == Ruleid;
                });
            },
            //参加活动的券
            selActivityTikCodeList: function () {
                return JSLINQ(_.pay.payJson.rows).Where(function (item) {
                    return item.Ruleid != 0;
                }).items;
            },
            //非参加活动的券
            selNotActivityTikCodeList: function () {
                return JSLINQ(_.pay.payJson.rows).Where(function (item) {
                    return item.Ruleid == 0;
                }).items;
            },
            //统计选中的规则信息
            getSelRuleList: function () {
                var selRuleList = [];
                JSLINQ(_.orderInfo.valueRuleEntity.valueRuleList).ForEach(function (item) {
                    if (item.Ruleid > 0) {
                        var count = _.pay.countPayJsonByRuleid(item.Ruleid);

                        if (count >= item.RASendTikNum) {
                            selRuleList.push({ Ruleid: item.Ruleid, IfSelAll: 1 });
                        } else {
                            selRuleList.push({ Ruleid: item.Ruleid, IfSelAll: 0 });
                        }
                    }
                });

                var leftactivitydiscount = _.price.GetEntity().leftactivitydiscount;
                if (leftactivitydiscount == 0) {
                    selRuleList.push({ Ruleid: 0, IfSelAll: 1 });
                } else {
                    selRuleList.push({ Ruleid: 0, IfSelAll: 0 });
                }

                return selRuleList;
            }
        },

        // Pkid 行项目号+券号+商品编号
        product: {
            productJson: { rows: [] },
            addProductJson: function (rowJson) {
                _.product.productJson.rows.push(rowJson);
            },
            delProductJson: function (Pkid) {
                _.product.productJson.rows = JSLINQ(_.product.productJson.rows).Where(function (item) {
                    return item.Pkid != Pkid;
                }).items;
            }
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);
            this.validate = $.extend(_layout.validate, this.validate);

            _ = this;
            _config = this.conf;
            _container = this.conf.container;

            //初始化
            _.view.init();

            //订单信息初始化
            _.orderInfo.init();

            //进入地址列表或新增地址页面
            _container.on('tap', _config.currAddress, function () {
                var id = $(this).attr('data-id');
                var isdelete = $(this).attr('data-isdelete');
                if (id == "0") {
                    if (isdelete == 'true') {
                        _.address.getAddressListHtml();
                        viewApi.go("#addressList");
                    } else {
                        _.address.customerAddress($(null, null, null)); //必须设置默认值 不然单页面有缓存
                        $(_.conf.name).val("");
                        $(_.conf.address).val("");
                        $(_.conf.postcode).val("");
                        $(_.conf.mobile).val("");
                        //固定电话赋值
                        $("#tel1").val("");
                        $("#tel2").val("");
                        $("#tel3").val("");
                        viewApi.go("#addAddress");
                    }
                } else {
                    _.address.getAddressListHtml();
                    viewApi.go("#addressList");
                }
            });
            //选择地址
            _container.on('tap', _config.selectAddress, function () {
                var item = $(this).parents(_config.addressItem);
                var id = item.data('id');
                _.address.selectAddress(id, item);
                $("#choosecouponlistshow").html(""); //清空之前选择的总优惠劵
            });
            //进入添加地址页面
            _container.on('tap', _config.addAddress, function () {
                if ($(this).attr("count") >= 15) {
                    _.view.message.alert('您的收货地址已有15条，如需新增，请先删除已有地址。');
                    return;
                }
                $("#addressId").val("");//标识ID为空

                $(_.conf.name).val("");
                $(_.conf.address).val("");
                $(_.conf.postcode).val("");
                $(_.conf.mobile).val("");
                //固定电话赋值
                $("#tel1").val("");
                $("#tel2").val("");
                $("#tel3").val("");
                //$(_.conf.familytelephone).val("");
                //$(_.conf.isdefault).attr('checked', false);
                $("#cityResult3").val("");
                _.address.customerAddress($(null, null, null));//必须设置默认值 不然单页面有缓存
                viewApi.go("#addAddress");
                $(".mui-navbar-center").find("h1").text("新增地址");
            });
            //修改页面
            _container.on('tap', _config.editAddress, function () {
                var addressid = $(this).data('id');
                $("#addressId").val(addressid);//标识编辑时ID

                $(_.conf.name).val($(this).data('name'));
                $(_.conf.address).val($(this).data('address'));
                $(_.conf.postcode).val($(this).data('postcode'));
                $(_.conf.mobile).val($(this).data('mobile'));
                var familytelephone = $(this).data('familytelephone');
                familytelephone = $.trim(familytelephone);
                //固定电话赋值
                if (familytelephone != "" && familytelephone != " ") {
                    var t = familytelephone.split("-");
                    $("#tel1").val(t[0]);
                    $("#tel2").val(t[1]);
                    $("#tel3").val(t[2]);
                } else {
                    //固定电话赋值
                    $("#tel1").val("");
                    $("#tel2").val("");
                    $("#tel3").val("");
                }
                _.address.customerAddress($(this).data('province'), $(this).data('city'), ($(this).data('country')));
                var isdefault = $(this).data('isdefault');
                var isDefaultHtml = $("#isDefaultHtml");
                isDefaultHtml.html(""); //强制更新radio按钮内容 （不然下面赋值有问题）
                var html = '<label>设为默认</label><input value="Item" type="radio" role="isdefault">';
                isDefaultHtml.append(html);
                if (isdefault == "是") {
                    $(_.conf.isdefault).attr('checked', true);
                } else {
                    $(_.conf.isdefault).attr('checked', false);
                }
                viewApi.go("#addAddress");
                $(".mui-navbar-center").find("h1").text("修改地址");
            });
            //添加修改地址
            _container.on('tap', _conf.saveAddress, function () {
                var contactAddress = $.trim($(_.conf.txtContactAddress).val());
                contactAddress = contactAddress.split(' ')[0] + contactAddress.split(' ')[1] + contactAddress.split(' ')[2];
                _.validate.formValidate(function (formData) {
                    var id = formData.Id;
                    var name = formData.Name;
                    var phone = formData.Mobile;
                    var address = contactAddress + formData.Address;
                    var postcode = formData.PostCode;
                    customer.saveDeliverAddress(formData, function (data) {
                        if (data.Success) {
                            if (data.Result.IsSuccess) {
                                var noaddress = $("#noaddress").val();
                                if (noaddress == "false") { //第一次没有地址的时候添加 情况处理
                                    window.location.reload(true);
                                } else {
                                    //解决增加维护收货信息刷新页面回到收货页面问题
                                    _.address.getAddressListHtml(); //更新列表页面
                                    //viewApi.back();
                                    mui('#scroll1').scroll().scrollTo(0, 0, 100); //100毫秒滚动到顶    
                                    $("#choosecouponlistshow").html(""); //清空之前选择的总优惠劵
                                    var html = _.view.getAddressHtml({ name: name, phone: phone, address: address, postcode: postcode }); //从新初始化
                                    if (id == "" || id == null) { //新增地址 获取最新的地址id
                                        $.richAjax('/Trading/Order/GetAddressList', {}, function (result) {
                                            if (result.success && result.data.length > 0) {
                                                var firstList = JSLINQ(result.data).OrderByDescending(function (item) { return item.ID; }).items; //先默认id排序
                                                id = firstList[0].ID;
                                            }
                                        });
                                    }
                                    $(_config.currAddress).html(html).attr("data-id", id);
                                    order.shoppingCartInfo(id, function (json) {
                                        var result = jQuery.parseJSON(json.Result);
                                        var html = _.view.getDeliveryHtml(result);
                                        $(_config.deliveryList).html(html);
                                        _.orderInfo.clear();
                                        _.delivery.clear();
                                    });
                                    viewApi.go('#setting');
                                }

                            } else {
                                _.view.message.alert(data.Result.Message);
                                return;
                            }
                        } else {
                            if (data.Message == "授权失败!" && data.Code == "401") {
                                _.view.message.alert('授权失败 登录超时请 重新登录"');
                                return;
                            } else {
                                _.view.message.alert(data.Message);
                                return;
                            }
                        }
                    }, "true", function (error) {
                        _.view.message.alert('服务器连接异常请稍后再试');
                        return;
                    });
                });
            });
            //删除
            _container.on('tap', _config.deleteAddress, function () {
                var id = $(this).data('id');
                _.view.message.confirm('删除后数据无法恢复，确定删除吗？', function () {
                    //TODO:调用接口删除收货地址               
                    customer.delDeliverAddress(id, function (data) {
                        if (data.Success) {
                            if (data.Result.IsSuccess) {
                                _.address.getAddressListHtml();
                                mui('#scroll1').scroll().scrollTo(0, 0, 100);//100毫秒滚动到顶
                                var addressId = $(_config.currAddress).attr("data-id");
                                if (id == addressId) {//删除当前选择的地址
                                    var html = '<ul class="mui-table-view mui-table-view-chevron sp-address">\
                    <li class="mui-table-view-cell">\
                        <a href="javascript:void(0);" class="mui-navigate-right">\
                            <p class="add-name"><span class="ml50">地址已删除，请重新选择</span></p>\
                        </a>\
                    </li>\
                </ul>' //从新初始化
                                    $(_config.currAddress).html(html);
                                    $(_config.currAddress).attr("data-id", "0");
                                    $(_config.currAddress).attr("data-isdelete", "true");
                                }
                            }
                            else {
                                _.view.message.alert(data.Result.Message);
                                return;
                            }
                        }
                        else {
                            if (data.Message == "授权失败!" && data.Code == "401") {
                                _.view.message.alert('授权失败 登录超时请 重新登录"');
                                return;
                            }
                            else {
                                _.view.message.alert('data.Message"');
                                return;
                            }
                        }
                    }, "true", function (error) {
                        _.view.message.alert('服务器连接异常请稍后再试');
                        return;
                    });
                });
            });
            //设为默认
            _container.on('tap', _config.defaultAddress, function () {
                if (!$(this).find('#adress').prop("checked"))//
                {
                    var id = $(this).data('id');
                    customer.defaultDeliverAddress(id, function (data) {
                        if (data.Success) {
                            if (data.Result.IsSuccess) {
                                //解决增加维护收货信息刷新页面回到收货页面问题
                                _.address.getAddressListHtml();
                                mui('#scroll1').scroll().scrollTo(0, 0, 100);//100毫秒滚动到顶
                            } else {
                                _.view.message.alert(data.Result.Message);
                                return;
                            }
                        } else {
                            if (data.Message == "授权失败!" && data.Code == "401") {
                                _.view.message.alert('授权失败 登录超时请 重新登录"');
                                return;
                            } else {
                                _.view.message.alert('data.Message"');
                                return;
                            }
                        }
                    }, "true", function (error) {
                        _.view.message.alert('服务器连接异常请稍后再试');
                        return;
                    });
                }
                else {
                    _.view.message.alert('已为默认地址');
                    return;
                }
            });
            //添加页面是否设置默认
            _container.on('click', _conf.isdefault, function () {
                if ($(this).attr('checked') == 'checked') {
                    $(this).attr('checked', false)
                    //$(this).removeAttr("checked");
                    return;
                } else {
                    $(this).attr('checked', true)
                    return;
                }
            });
            //编辑配送方式
            _container.on('tap', _config.deliveryEdit, function () {
                _.delivery.edit($(this));
            });
            //配送方式选择
            _container.on('tap', _config.deliveryItem, function () {
                _.delivery.selectType($(this));
            });
            //是否安装选择
            _container.on('tap', _config.installItem, function () {
                _.delivery.selectInstall($(this));
            });
            //关闭
            _container.on('tap', _config.deliveryClose, function () {
                mui(_config.deliveryPanel).popover('hide');
            });
            //确定
            _container.on('tap', _config.deliveryConfirm, function () {
                _.delivery.confirm();
            });

            //编辑发票
            _container.on('tap', _config.invoiceEdit, function () {
                _.invoice.edit($(this));
            });
            //发票类型选择
            _container.on('tap', _config.invoiceItem, function () {
                _.invoice.selectType($(this));
            });
            //发票抬头类型选择
            _container.on('tap', _config.invoiceTitleItem, function () {
                $(this).addClass("active").siblings().removeClass("active");
            });
            //关闭
            _container.on('tap', _config.invoiceClose, function () {
                mui(_config.invoicePanel).popover('hide');
            });
            //确定
            _container.on('tap', _config.invoiceConfirm, function () {
                _.invoice.confirm();
            });

            //选择送货日期_config
            _container.on('tap', _config.deliveryDate, function () {

                var options = { type: "date" };
                var date = $(this).attr("data-date");
                if (date) {
                    options.beginDate = new Date(Date.parse(date.replace(/-/g, "/")));
                }

                var span = $(this).find("span");
                var picker = new mui.DtPicker(options);
                picker.show(function (rs) {
                    span.text(rs.text);
                    picker.dispose();
                });
            });

            //使用行项目折扣券
            _container.on('click', _config.discounttik.usecoupon, function () {
                var deliveryVal = $(_config.deliveryEdit).attr("data-value");
                if (!deliveryVal) {
                    _.view.message.alert("请选择配送方式！");
                    return;
                }

                var pkid = $(this).data("pkid");
                _.discountTik.UseTik(pkid);
            });
            //_container.on('tap', _config.discounttik.edittik, function () {
            //    if (!$("input[name='delivery']:checked").val()) {
            //        smart.massger.Alert('请选择配送方式！');
            //        return false;
            //    }

            //    var pkid = $(this).data("pkid");
            //    _.discountTik.EditTik(pkid);
            //});
            _container.on('tap', _config.discounttik.choosetik, function () {
                _.discountTik.ChooseTik($(this));
            });
            _container.on('tap', _config.discounttik.confirmusetik, function () {
                _.discountTik.ConfirmUseTik($(this));
            });
            _container.on('tap', _config.discounttik.couponclose, function () {
                var pkid = $(this).data("pkid");
                _.discountTik.CoupondivHide(pkid);
            });

            //使用现金折扣券
            _container.on('tap', _config.valuetik.usecoupon, function () {
                var deliveryVal = $(_config.deliveryEdit).attr("data-value");
                if (!deliveryVal) {
                    _.view.message.alert("请选择配送方式！");
                    return;
                }

                _.valueTik.UseTik();
            });
            _container.on('tap', _config.valuetik.choosetik, function () {
                _.valueTik.ChooseTik($(this));
            });
            _container.on('tap', _config.valuetik.couponclose, function () {
                _.valueTik.CoupondivHide();
            });
            _container.on('tap', _config.valuetik.couponconfirm, function () {
                _.valueTik.CouponConfirm();
            });


            //结算
            _container.on('tap', _config.addorder, function () {
                _.orderInfo.confirm(1);
            });
        }
    };
    return plugin.init();
});