smart.viewerEngineer.regedit('orderlist', function (model) {
    var viewApi;
    var PosSalesMark;
    var OrderCount;
    var OrderChildNo;
    var Issearch = false;
    var state = '';
    var keyword = '';
    var pageindex = 1;
    var plugin = {
        conf: {
            orderList: null,   //订单列表
            provinces: null,   //省市区列表
            txtName: '[role=name]',   //收件人
            txtAddress: '[role=address]',   //详细地址
            txtPostCode: '[role=postcode]',   //邮编
            txtMobilePhone: '[role=mobilephone]',   //手机
            txtTelPhone: '[role=telphone]',   //固话
            btnSubmit: '[role=btnSubmit]',   //确认

            btnAllOrder: '[role=allOrder]',   //全部订单
            btnNotPaid: '[role=notPaid]',   //未付款
            btnIncomplete: '[role=incomplete]',   //未完成
            btnCompleted: '[role=completed]',   //已完成
            btnOrderPay: '[role=orderPay]',   //付款
            btnCancelOrder: '[role=cancelOrder]',   //取消订单
            btnConfrimOrderReciver: '[role=confrimOrderReciver]',   //确认收货
            btnEditAddress: '[role=editAddress]',   //修改信息
            btnBuyAgain: '[role=buyAgain]',   //再次购买

            btnOrderSearch: '[role=orderSearch]',   //订单查询

            btnOrderDetail: '[role=orderDetail]'   //订单详情页
        },
        //验证
        validate: {
            formVlidate: function (callback) {
                var txtName = $.trim($(_.conf.txtName).val());
                var txtAddress = $.trim($(_.conf.txtAddress).val());
                var province = $.trim($('#cityResult3').text());
                //var address = province + txtAddress;
                var txtPostCode = $.trim($(_.conf.txtPostCode).val());
                var txtMobilePhone = $.trim($(_.conf.txtMobilePhone).val());
                //var txtTelPhone = $.trim($(_.conf.txtTelPhone).val());
                var familytelephone = $("#tel1").val() + ($("#tel1").val() && $("#tel2").val() != '' ? "-" : "") + $("#tel2").val() + ($("#tel3").val() && $("#tel3").val() != '' ? "-" : "") + $("#tel3").val();
                familytelephone = $.trim(familytelephone);
                var deliveryDate = $.trim($('#result').val());
                if (smart.validate.isNullOrEmpty(txtName)) {
                    _.view.message.alert('请输入收件人！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(txtAddress)) {
                    _.view.message.alert('请输入详细地址！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(province)) {
                    _.view.message.alert('请选择地区！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(txtPostCode)) {
                    _.view.message.alert('请输入邮编！');
                    return;
                } else if (!smart.validate.isPostCode(txtPostCode)) {
                    _.view.message.alert('请输入正确的邮编！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(txtMobilePhone)) {
                    _.view.message.alert('请输入手机号！');
                    return;
                } else if (!smart.validate.isMobile(txtMobilePhone)) {
                    _.view.message.alert('请输入正确的手机号！');
                    return;
                }
                if (!smart.validate.isNullOrEmpty(familytelephone)) {
                    if (!smart.validate.isTelephone(familytelephone)) {
                        _.view.message.alert('请输入正确的固定电话！');
                        return;
                    }
                }

                var formData = { OrderNo: OrderChildNo, Linkman: txtName, Linkmanaddress: txtAddress, Linkmanpostcode: txtPostCode, Linkmanmobilephone: txtMobilePhone, Linkmantel: familytelephone, Deliverydate: deliveryDate };

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
            InitView: function () {
                (function ($) {
                    viewApi = mui('#app').view({
                        defaultPage: '#setting'
                    });
                    var view = viewApi.view;
                    //处理view的后退与webview后退
                    var oldBack = $.back;
                    $.back = function () {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            window.location.href = '/Trading/Order/OrderList';
                        } else { //执行webview后退
                            window.location.href = '/Member/Customer/Index';
                        }
                    };
                })(mui);
                $('#pullrefreshd').attr('style', 'display:none');
                var scroll = mui('.mui-scroll-wrapper').scroll();
                $('#pullrefreshd').attr('class', 'mui-scroll-wrapper order1-wrap');
                _.view.GetOrderLsit(1, 10, keyword, state);
                (function ($, doc) {
                    _.view.getProvince();
                    //_.view.address($, doc);
                })(mui, document);
                //日期初始化
                (function ($) {
                    var result = $('#result')[0];
                    var btns = $('.J-btn');
                    btns.each(function (i, btn) {
                        btn.addEventListener('tap', function () {
                            var optionsJson = this.getAttribute('data-options') || '{}';
                            var options = { "type": "date", "beginDate": new Date(1950, 00, 01) };
                            var id = this.getAttribute('id');
                            var picker = new $.DtPicker(options);
                            picker.show(function (rs) {
                                result.value = rs.text;
                                picker.dispose();
                            });
                        }, false);
                    });
                })(mui);
            },
            //上拉加载
            PullOnLoading: function () {

                mui.init({
                    pullRefresh: {
                        container: "#pullrefreshd",
                        up: {
                            height: 50,
                            auto: false,
                            contentrefresh: "正在加载...",
                            contentnomore: '没有更多数据了',
                            callback: function () {
                                pageindex++;
                                loadMore(this);
                            }
                        }
                    },
                    gestureConfig: {
                        longtap: true
                    }
                });
                var loadMore = function (pullRefresh) {
                    // 加载更多的内容到列表中
                    if (OrderCount > 10) {
                        _.view.GetOrderLsit(pageindex, 10, keyword, state);
                        if (OrderCount - (pageindex * 10) > 0) {
                            // 如果有更多数据，则继续
                            pullRefresh.endPullupToRefresh(false);
                        } else {
                            // 如果没有更多数据了，则关闭上拉加载
                            pullRefresh.endPullupToRefresh(true);
                            pageindex = 1;
                        }
                    } else {
                        if (OrderCount - (pageindex * 10) > 0) {
                            // 如果有更多数据，则继续
                            pullRefresh.endPullupToRefresh(false);
                        } else {
                            // 如果没有更多数据了，则关闭上拉加载
                            pullRefresh.endPullupToRefresh(true);
                            pageindex = 1;
                        }
                        $('.mui-pull-caption').text('');
                        $('.mui-pull-caption-nomore').text('');
                    }
                };
            },
            //获取省市区列表
            getProvince: function () {
                $.richAjax('/Member/Customer/GetProvinceList', {}, function (result) {
                    if (result.success && result.data.length > 0)
                        _.conf.provinces = result.data;
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
                    var cityPicker3 = new $.PopPicker({
                        layer: 3
                    });
                    cityPicker3.setData(jsonObj);
                    var showCityPickerButton = doc.getElementById('showCityPicker3');
                    var cityResult3 = doc.getElementById('cityResult3');
                    showCityPickerButton.addEventListener('tap', function (event) {
                        cityPicker3.show(function (items) {
                            cityResult3.innerText = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                            cityResult3.setAttribute('data-id', items[0].ID + ',' + items[1].ID + ',' + items[2].ID);
                            //返回 false 可以阻止选择框的关闭
                            //return false;
                        });
                    }, false);
                });
            },
            //地区通过ID赋值
            customerAddressByName: function (sheng, shi, qu) {
                if (smart.validate.isNullOrEmpty(sheng) || smart.validate.isNullOrEmpty(shi) || smart.validate.isNullOrEmpty(qu)) {
                    return;
                }
                var provinces = _.conf.provinces;
                var value; var text;
                for (var i = 0; i < provinces.length; i++) {
                    if (sheng == provinces[i].Name) {
                        value = provinces[i].ID + ',';
                        text = provinces[i].Name + ' ';
                        for (var j = 0; j < provinces[i].CityList.length; j++) {
                            if (shi == provinces[i].CityList[j].CityName) {
                                value += provinces[i].CityList[j].ID + ',';
                                text += provinces[i].CityList[j].CityName + ' ';
                                for (var y = 0; y < provinces[i].CityList[j].CountryList.length; y++) {
                                    if (qu == provinces[i].CityList[j].CountryList[y].CountryName) {
                                        value += provinces[i].CityList[j].CountryList[y].ID;
                                        text += provinces[i].CityList[j].CountryList[y].CountryName;
                                    }
                                }
                            }
                        }
                    }
                }
                $('#cityResult3').text(text);
                $('#cityResult3').attr('data-id', value);
            },
            //修改信息初始化
            editAddress: function (OrderChildNo) {
                var data = _.conf.orderList;
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        if (item.OrderChildNo == OrderChildNo) {
                            if (item.ReceivingInfo != null) {
                                $(_.conf.txtName).val(item.ReceivingInfo.Linkman);
                                var address = item.ReceivingInfo.LinkmanFullAddress.split(' ');
                                $(_.conf.txtAddress).val(address[3]);
                                _.view.customerAddressByName(address[0], address[1], address[2]);
                                $(_.conf.txtPostCode).val(item.ReceivingInfo.LinkmanPostcode);
                                $(_.conf.txtMobilePhone).val(item.ReceivingInfo.LinkmanMobile);
                                //$(_.conf.txtTelPhone).val(item.ReceivingInfo.LinkmanTel);
                                familytelephone = item.ReceivingInfo.LinkmanTel;
                                if (!smart.validate.isNullOrEmpty(familytelephone)) {
                                    var t = familytelephone.split("-");
                                    $("#tel1").val(t[0]);
                                    $("#tel2").val(t[1]);
                                    $("#tel3").val(t[2]);
                                }
                                $('#deliveryDate').val(item.DeliveryDate);
                            }
                        }
                    }
                }
            },
            //获取头部
            GetOrderHeader: function (data) {
                var header = [];
                if (data != null) {
                    if (smart.validate.isNullOrEmpty(data.State)) {
                        header.push('<div class="nav-list dis-ib active" role="allOrder">');
                    } else {
                        header.push('<div class="nav-list dis-ib" role="allOrder">');
                    }
                    header.push('<div class="nav-num">' + data.AllOrder + '</div>');
                    header.push('<div class="nav-text">全部订单</div></div>');
                    if (data.State == "0") {
                        header.push('<div class="nav-list dis-ib active" role="notPaid">');
                    } else {
                        header.push('<div class="nav-list dis-ib" role="notPaid">');
                    }
                    header.push('<div class="nav-num">' + data.NotPaid + '</div>');
                    header.push('<div class="nav-text">未付款</div></div>');
                    if (data.State == "1") {
                        header.push('<div class="nav-list dis-ib active" role="incomplete">');
                    } else {
                        header.push('<div class="nav-list dis-ib" role="incomplete">');
                    }
                    header.push('<div class="nav-num">' + data.Incomplete + '</div>');
                    header.push('<div class="nav-text">未完成</div></div>');
                    if (data.State == "2") {
                        header.push('<div class="nav-list dis-ib active" role="completed">');
                    } else {
                        header.push('<div class="nav-list dis-ib" role="completed">');
                    }
                    header.push('<div class="nav-num">' + data.Completed + '</div>');
                    header.push('<div class="nav-text">已完成</div></div>');
                    $('.oder-nav').html(header.join(''));
                }
            },
            //获取订单列表
            GetOrderLsit: function (pageindex, pagesize, keyword, state) {
                $.richAjax('/Trading/Order/GetOrderList', { pageindex: pageindex, pagesize: pagesize, keyword: keyword, state: state }, function (result) {
                    if (result.success) {
                        var data = result.data;
                        _.conf.orderList = result.data.OrderList;
                        OrderCount = data.OrderCount;
                        _.view.GetOrderHeader(data);
                        if (data.OrderList != null && data.OrderList.length > 0) {
                            var html = [];
                            for (var i = 0; i < data.OrderList.length; i++) {
                                var item = data.OrderList[i];
                                html.push('<div class="order-list">');
                                html.push('<div class="order-num" role="orderDetail">');
                                if (smart.validate.isNullOrEmpty(item.SapOrderNo)) {
                                    html.push('<span class="fl">订单号<span id="itemorderno" data-orderno="' + item.OrderNo + '">' + item.OrderNo + '</span></span>');
                                } else {
                                    html.push('<span class="fl">订单号<span id="itemorderno" data-orderno="' + item.OrderNo + '">' + item.SapOrderNo + '</span></span>');
                                }
                                html.push('<span class="fr">' + item.StateCN + '</span></div>');
                                html.push('<div class="comb-box">');
                                for (var y = 0; y < item.OrderProductDetailList.length; y++) {
                                    var product = item.OrderProductDetailList[y];
                                    if (product.IsCombineProduct == 1) {
                                        html.push('<div class="comb-border">');
                                        for (var d = 0; d < product.ProductList.length; d++) {
                                            var combine = product.ProductList[d];
                                            html.push('<div class="order-det" role="orderDetail">');
                                            html.push('<div class="det-img dis-ib vm">');
                                            var img = combine.PicturePath;
                                            img = smart.validate.isNullOrEmpty(img) ? '/Assets/themes/default/images/default/180_180.jpg' : smart.utility.generateImgUrl(img, 180, 180);
                                            html.push('<img src="' + img + '" onerror="javascript:this.src=\'' + smart.utility.generateDefaultImgUrl(180, 180) + '\'" alt="" ></div>');
                                            html.push('<div class="det-ifm dis-ib vm">');
                                            html.push('<div class="text-1">');
                                            html.push('' + combine.Name + '</div>');
                                            html.push('<div class="text-2 mt20">￥<span class="number">' + combine.OldPrice + '</span></div></div></div>');
                                        }
                                        if (product.PromotionPrice > 0 && product.Price > product.PromotionPrice) {
                                            html.push('<div class="order-comb">');
                                            html.push(' 组合价：￥<div class="text-2 dis-ib">');
                                            html.push('<span class="yj"><span class="num">' + product.Price + '</span></span>');
                                            html.push('<span class="xj">￥<span class="num">' + product.PromotionPrice + '</span></span></div>');
                                            html.push('<span class="fr">×&nbsp;' + product.NewQuantity + '</span></div>');
                                        } else {
                                            html.push('<div class="order-comb">');
                                            html.push('组合价：￥<span class="num">' + product.Price + '</span>');
                                            html.push('<span class="fr">×&nbsp;' + product.NewQuantity + '</span></div>');
                                            html.push('');
                                        }
                                        html.push('</div>');
                                    } else {
                                        html.push('<div class="order-det" role="orderDetail">');
                                        var skuImg = product.SkuImagePath;
                                        skuImg = smart.validate.isNullOrEmpty(skuImg) ? '/Assets/themes/default/images/default/180_180.jpg' : smart.utility.generateImgUrl(skuImg, 180, 180);
                                        html.push('<div class="det-img dis-ib vm">');
                                        html.push('<img src="' + skuImg + '" alt=""></div>');
                                        html.push('<div class="det-ifm dis-ib vm">');
                                        html.push('<div class="text-1">');
                                        html.push('' + product.ProductName + '</div>');
                                        PosSalesMark += product.PosSalesMark + ',';
                                        if (product.PosSalesMark != "02") {
                                            if (product.PromotionPrice > 0 && product.Price > product.PromotionPrice) {
                                                html.push('<div class="text-2">');
                                                html.push('<span class="yj">￥<span class="num">' + product.Price + '</span></span>');
                                                html.push('<span class="xj">￥<span class="num">' + product.PromotionPrice + '</span></span>');
                                                html.push('<span class="fr">×&nbsp;' + product.NewQuantity + '</span></div>');
                                            } else {
                                                html.push('<div class="text-2 mt20">');
                                                html.push('￥<span class="number">' + product.Price + '</span>');
                                                html.push('<span class="fr">×&nbsp;' + product.NewQuantity + '</span></div>');
                                            }
                                        } else {
                                            html.push('<div class="text-2">');
                                            html.push('<span class="yj">￥<span class="num">' + product.Price + '</span></span>');
                                            html.push('<i class="icon iconfont icon-tubiaozhizuomoban3 vm"></i>');
                                            html.push('<span class="fr">×&nbsp;' + product.NewQuantity + '</span></div>');
                                        }
                                        html.push('</div></div>');
                                    }
                                }
                                html.push('</div>');
                                html.push('<div class="order-price" role="orderDetail">');
                                html.push('<span class="price-num">共' + item.QuantitySum + '件</span>');
                                html.push('<span class="fr">实付款：<span class="red">¥<i>' + item.TotalamountSum + '</i></span></span></div>');
                                html.push('<div class="order-btn txta-r">');
                                if (item.State == "0") {
                                    html.push('<button type="button" role="cancelOrder" data-orderno="' + item.OrderNo + '" class="btn btn-1 mui-btn mui-btn-outlined">取消订单</button>');
                                    html.push('<button type="button" role="orderPay" data-orderno="' + item.OrderNo + '" class="btn btn-2 mui-btn mui-btn-danger mui-btn-outlined">付款</button>');
                                }
                                else if (item.SendState == "Yes" && item.State != "-1" && item.IsConfirmoOrder != 1 && item.State != "-2") {
                                    html.push('<button type="button" role="confrimOrderReciver" data-orderno="' + item.OrderChildNo + '" class="btn btn-2 mui-btn mui-btn-danger mui-btn-outlined">确认收货</button>');
                                }
                                else if ((item.SendState == "No" || item.SendState == "" || item.SendState == null) && item.State != "-1" && item.State != "-2") {
                                    html.push('<button type="button" role="editAddress" data-orderno="' + item.OrderChildNo + '" class="btn btn-1 mui-btn mui-btn-outlined">修改信息</button>');
                                }
                                else {
                                    html.push('<button type="button" role="buyAgain" data-orderno="' + item.OrderNo + '" class="btn btn-1 mui-btn mui-btn-outlined">再次购买</button>');
                                }
                                html.push('</div></div>');
                            }
                            if (pageindex > 1) {
                                $(html.join('')).insertBefore('.mui-pull-bottom-pocket');
                            } else {
                                if ($('.mui-pull-bottom-pocket').length > 0) {
                                    $(html.join('')).insertBefore('.mui-pull-bottom-pocket');
                                } else {
                                    //$('.order-list').remove();
                                    $('#muiscroll').append(html.join(''));
                                }
                            }
                            $('.order-nosearch').hide();
                            $('#muiscroll').show();
                            $('#pullrefreshd').attr('style', 'display:block');
                            if (Issearch) {
                                $('.oder-nav').hide();
                                $('#pullrefreshd').attr('class', 'mui-scroll-wrapper order1-wrap');
                            }
                            else {
                                $('.oder-nav').show();
                                $('#pullrefreshd').attr('class', 'mui-scroll-wrapper order1-wrap');
                            }
                            _.view.PullOnLoading();
                        } else {
                            $('#pullrefreshd').attr('style', 'display:block');
                            $('.order-nosearch').show();
                            //$('#muiscroll').hide();
                            if (Issearch) {
                                $('.oder-nav').hide();
                                $('#pullrefreshd').attr('class', 'mui-scroll-wrapper order1-wrap');
                            }
                            else {
                                $('.oder-nav').show();
                                $('#pullrefreshd').attr('class', 'mui-scroll-wrapper order1-wrap');
                            }
                        }
                        if (data.OrderCount <= 10) {
                            $('.mui-pull-caption').text('');
                            $('.mui-pull-caption-nomore').text('');
                        }
                    }
                });
            }
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            //初始化页面
            _.view.InitView();

            mui('#setting').on('tap', _.conf.btnAllOrder, function () {
                mui('#pullrefreshd').pullRefresh().scrollTo(0, 0, 100);
                mui('#pullrefreshd').pullRefresh().refresh(true);
                $('.order-list').remove(); pageindex = 1;
                _.view.GetOrderLsit(1, 10, keyword, '');
                state = '';
            });

            mui('#setting').on('tap', _.conf.btnNotPaid, function () {
                mui('#pullrefreshd').pullRefresh().scrollTo(0, 0, 100);
                mui('#pullrefreshd').pullRefresh().refresh(true);
                $('.order-list').remove(); pageindex = 1;
                _.view.GetOrderLsit(1, 10, keyword, '0');
                state = '0';
            });

            mui('#setting').on('tap', _.conf.btnIncomplete, function () {
                mui('#pullrefreshd').pullRefresh().scrollTo(0, 0, 100);
                mui('#pullrefreshd').pullRefresh().refresh(true);
                $('.order-list').remove(); pageindex = 1;
                _.view.GetOrderLsit(1, 10, keyword, '1');
                state = '1';
            });

            mui('#setting').on('tap', _.conf.btnCompleted, function () {
                mui('#pullrefreshd').pullRefresh().scrollTo(0, 0, 100);
                mui('#pullrefreshd').pullRefresh().refresh(true);
                $('.order-list').remove(); pageindex = 1;
                _.view.GetOrderLsit(1, 10, keyword, '2');
                state = '2';
            });

            //付款
            mui('#setting').on('tap', _.conf.btnOrderPay, function () {
                var orderNo = $(this).data('orderno');
                order.isNeedSendZp(orderNo, function (msg) {
                    if (msg.Success == true) {
                        window.location.href = "/Trading/Order/cartGift?OrderNo=" + orderNo;
                    } else {
                        window.location.href = "/Trading/Payment?OrderNo=" + orderNo;
                    }
                }, false);
            });

            //取消订单
            mui('#setting').on('tap', _.conf.btnCancelOrder, function () {
                var orderNo = $(this).data('orderno');
                _.view.message.confirm('您确认要取消订单吗？',
                                    function () {
                                        order.cancelOrder(orderNo, function (msg) {
                                            if (msg.Success == true) {
                                                window.location.reload(true);
                                            } else {
                                                _.view.massger.alert(msg.Message);
                                            }
                                        });
                                    });
            });

            //确认收货
            mui('#setting').on('tap', _.conf.btnConfrimOrderReciver, function () {
                var orderNo = $(this).data('orderno');
                order.confrimOrderRecive(orderNo, function (msg) {
                    if (msg.Success == true) {
                        window.location.reload(true);
                    } else {
                        _.view.massger.alert(msg.Message);
                    }
                });
            });

            //修改信息初始化
            mui('#setting').on('tap', _.conf.btnEditAddress, function () {

                OrderChildNo = $(this).data('orderno');
                _.view.editAddress(OrderChildNo);
                viewApi.go('#xz');
                $('.order-hd,.order-search').hide();
            });

            mui('#xz').on('tap', _.conf.btnSubmit, function () {
                _.validate.formVlidate(function (formData) {
                    //调用接口修改配送信息
                    order.changeOrderDeliveryInfo(formData, function (result) {
                        if (result.Success) {
                            window.location.reload(true);
                        } else {
                            _.view.message.alert(result.Message);
                        }
                    });
                });
            });

            //再次购买
            mui('#setting').on('tap', _conf.btnBuyAgain, function () {
                var orderNo = $(this).data('orderno');
                if (!smart.validate.isNullOrEmpty(orderNo)) {
                    $.ajax({
                        type: "POST",
                        url: "/Trading/Order/GetDeliverAddress", //原有方法，实际返回的是订单信息 by shk 2016-08-18
                        data: {
                            OrderNo: orderNo
                        },
                        cache: false,
                        async: false,
                        success: function (msg) {
                            var json = msg;
                            var returnCount = 0;//已调用添加购物车接口的数量

                            //遍历订单中的商品明细
                            $.each(json.OrderProductDetailList, function (i, item) {
                                //添加商品到购物车中
                                cart.add(item.ProductCode, 1, '01', function (r) {
                                    returnCount++;
                                }, function (err) {
                                    returnCount++;
                                });
                            });

                            var sI = setInterval(function () {
                                //判断所有商品已完成添加到购物车的接口调用
                                if (returnCount == json.OrderProductDetailList.length) {
                                    //结束定时器
                                    clearInterval(sI);
                                    //跳转到购物车界面
                                    window.location.href = "/Trading/Shopping/";
                                }
                            }, 1000);
                        }
                    });
                } else {
                    _.view.message.alert('再次购买失败！');
                }
            });

            //订单查询
            _container.on('click', _.conf.btnOrderSearch, function () {
                keyword = $('#orderSearch').val();
                mui('#pullrefreshd').pullRefresh().scrollTo(0, 0, 100);
                mui('#pullrefreshd').pullRefresh().refresh(true);
                $('.order-list').remove(); pageindex = 1;
                Issearch = true;
                _.view.GetOrderLsit(1, 10, keyword, state);
            });

            //订单详情页
            mui('#setting').on('tap', _.conf.btnOrderDetail, function () {
                var orderno = $(this).parents('.order-list').find('#itemorderno').data('orderno');
                location.href = '/Trading/Order/OrderDetail?orderno=' + orderno;
            });
        }
    };
    return plugin.init();
});