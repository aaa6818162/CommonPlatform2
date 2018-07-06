smart.viewerEngineer.regedit('payment', function (model) {
    var _;
    var _config;
    var _container;
    var _canpay = false;
    var _flag = false;
    var plugin = {
        conf: {
            payTypeItem: '[role="payTypeItem"]',
            pay: '[role="pay"]'
        },
        //验证
        validate: {
            isNumber: function (obj) {
                if (isNaN(obj)) {
                    return false;
                }
                try {
                    var number = parseInt(obj);
                    if (number > 0) {
                        return true;
                    }
                } catch (e) { }
                return false;
            },
            hasJsApiParams: function () {
                return wxJsApiParam;
            }
        },
        //页面处理
        view: {
            init: function () {
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);

                var android = navigator.userAgent.toLowerCase().indexOf("android");
                var uc = navigator.userAgent.toLowerCase().indexOf("ucbrowser");
                if (android > -1 && uc > -1) {
                    $(".errorPrompt").show();
                }

                //初始化单页view	
                (function (_mui) {
                    var viewApi = _mui('#app').view({
                        defaultPage: '#setting'
                    });
                    var view = viewApi.view;
                    //处理view的后退与webview后退
                    var oldBack = _mui.back;
                    _mui.back = function () {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            viewApi.back();
                        } else {
                            oldBack();
                        }
                    };
                })(mui);
            },
            initWechat: function () {
                if (_.validate.hasJsApiParams() && wx) {
                    wx.config({
                        debug: false,
                        appId: wxJsApiParam.AppId,
                        timestamp: wxJsApiParam.Timestampe,
                        nonceStr: wxJsApiParam.NonceStr,
                        signature: wxJsApiParam.Signature,
                        jsApiList: ['chooseWXPay']
                    });

                    wx.error(function (res) {
                        //console.log(res);
                        //$.alert(res);
                        _canpay = false;
                    });

                    wx.ready(function () {
                        _canpay = true;

                        if (isAutoWechatPay == "1") {
                            _.events.wechatpay();
                        }
                    });
                }
            }
        },
        events: {
            checkPayment: function (paycode) {
                if (!_.validate.isNumber(orderNo)) {
                    _.view.message.alert('订单号有误，请刷新页面重新支付！');
                    return false;
                }
                if (paycode == "" || typeof paycode == "undefined") {
                    _.view.message.alert('请选择支付方式！');
                    return false;
                }
                if (!_.validate.isNumber(paycode)) {
                    _.view.message.alert('支付方式有误，请刷新页面重新选择支付方式！');
                    return false;
                }
                return true;
            },
            pay: function () {
                var payCode = $("#payCode").val();
                var flag = _.events.checkPayment(payCode);
                if (flag) {
                    payment.confirmPay(orderNo, payCode, function (msg) {
                        var json = msg;
                        if (json.Success == true) {
                            if (json.Result == "NeedPay") {
                                if (payCode == wechatPayCode) {
                                    if (model.isWechat == "1") {
                                        _.events.checkAuth(function () {
                                            _.events.wechatpay();
                                        });
                                    } else {
                                        _.events.wechatpay();
                                    }
                                } else {
                                    $("#payconfirm").submit();
                                }
                            } else if (json.Result == "NoNeedPay") {
                                window.location.replace("/trading/payment/success?OrderNo=" + orderNo);
                                return false;
                            } else {
                                window.location.replace("/trading/payment/success?OrderNo=" + orderNo);
                                return false;
                            }
                        } else {
                            _.view.message.alert(json.Message);
                            return false;
                        }
                    }, false);

                } else {
                    return false;
                }
            },
            wechatpay: function () {
                if (model.isWechat == "1" && !_canpay)
                    return;
                if (_flag)
                    return;
                _flag = true;

                $.ajax({
                    type: "post",
                    url: "/trading/payment/confirm",
                    data: { OrderNo: orderNo, payCode: $("#payCode").val(), subPayCode: $("#subPayCode").val() },
                    success: function (result) {
                        if (result.IsError) {
                            _.view.message.alert(result.Message);
                            _flag = false;
                            return;
                        }
                        else {
                            if (model.isWechat == "1") {
                                var data = result.Data;
                                wx.chooseWXPay({
                                    timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                    nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                                    package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                    signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                    paySign: data.paysign, // 支付签名
                                    success: function (res) {
                                        //支付成功后的回调函数
                                        if (res.errMsg == "chooseWXPay:ok") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                            window.location.replace("/trading/payment/success?OrderNo=" + orderNo);
                                        } else {
                                            window.location.replace("/trading/payment/unpay?OrderNo=" + orderNo);
                                        }
                                    },
                                    cancel: function (res) {
                                        window.location.replace("/trading/payment/unpay?OrderNo=" + orderNo);
                                    }
                                });
                            } else {
                                window.location.replace(result.Data.Url);
                            }
                        }
                    },
                    error: function () {
                        _flag = false;
                    }
                });
                //if (typeof WeixinJSBridge == "undefined") {
                //    if (document.addEventListener) {
                //        document.addEventListener('WeixinJSBridgeReady', _.events.jsapicall, false);
                //    }
                //    else if (document.attachEvent) {
                //        document.attachEvent('WeixinJSBridgeReady', _.events.jsapicall);
                //        document.attachEvent('onWeixinJSBridgeReady', _.events.jsapicall);
                //    }
                //}
                //else {
                //    _.events.jsapicall();
                //}
            },
            //jsapicall: function () {
            //    WeixinJSBridge.invoke('getBrandWCPayRequest',
            //      wxJsApiParam,//josn串
            //        function (res) {
            //            if (res.err_msg == "get_brand_wcpay_request:ok") {
            //                window.location.replace("/trading/payment/success?OrderNo=" + orderNo);
            //            } else {
            //                window.location.replace("/trading/payment/unpay?OrderNo=" + orderNo);
            //            }
            //            //_.view.message.alert(res.errMsg);
            //            //alert(res.err_code + res.err_desc + res.err_msg);
            //        });
            //},
            reSelect: function () {
                window.location.reload(true);
            },
            checkAuth: function (callback) {
                $.post("/auth/checkauth", "", function (result) {
                    if (result.IsAuth) {
                        callback();
                    } else {
                        window.location.replace("/trading/payment/wechatpay?OrderNo=" + orderNo);
                    }
                });
            }
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _config = this.conf;
            _container = this.conf.container;

            _.view.init();

            _.view.initWechat();

            if (parseFloat(totalAmount) == 0) {
                $(_config.payTypeItem).attr("disabled", "disabled");
                $(_config.pay).attr("disabled", "disabled");
            }

            _container.on('tap', _config.payTypeItem, function () {
                $("#payCode").val($(this).data("paycode"));
                $("#subPayCode").val($(this).data("subpaycode"));
                $(this).find(":radio").prop("checked", true);
            });

            _container.on('tap', _config.pay, function () {
                if ($(this).attr("disabled"))
                    return;

                _.events.pay();
            });
        }
    };
    return plugin.init();
});