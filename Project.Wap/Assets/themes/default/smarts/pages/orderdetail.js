smart.viewerEngineer.regedit('orderdetail', function (model) {
    var viewApi;
    var plugin = {
        conf: {
            btnOrderTracking: '[role=orderTracking]',   //订单跟踪信息
            btnRefunds: '[role=refunds]',   //退货，退款
            btnProductdetail: '[role=productdetail]',   //跳转商品详情页
            btnOrderPay: '[role=orderPay]'   //确认付款
        },
        //验证
        validate: {
        },
        //页面处理
        view: {
            InitView: function () {
                var orderno = $('#orderNoDetail').text();
                (function ($) {
                    viewApi = mui('#app').view({
                        defaultPage: '#setting'
                    });
                    var view = viewApi.view;
                    //处理view的后退与webview后退
                    var oldBack = $.back;
                    $.back = function () {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            window.location.href = '/Trading/Order/OrderDetail?orderno=' + orderno;
                        } else { //执行webview后退
                            window.location.href = '/Trading/Order/OrderList';
                        }
                    };
                })(mui);
                var scroll = mui('.mui-scroll-wrapper').scroll();
            }
        },
        //功能处理
        funcs: {
            Refunds: function (id, orderno, productCode, SendState) {
                if (SendState == "部分发货") {
                    _.view.message.alert("该商品状态暂不支持退货/退款，请及时联系客服处理！");
                }
                else if (SendState == "已发货" || SendState == "已收货") {
                    window.location.href = '/Trading/OrderAudit/ReturnGoods?orderId=' + id + '&orderNo=' + orderno + '&productCode=' + productCode;
                }
                else {
                    window.location.href = '/Trading/OrderAudit/Refundment?orderId=' + id + '&orderNo=' + orderno + '&productCode=' + productCode;
                }

            },
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            //初始化页面
            _.view.InitView();

            mui('#setting').on('tap', _.conf.btnOrderTracking, function () {
                viewApi.go('#track');
            });

            //退货/退款
            mui('#setting').on('tap', _.conf.btnRefunds, function () {
                var detailid = $(this).data("detailid");
                var orderno = $(this).data("orderno");
                var sku = $(this).data("sku");
                var sendstate = $(this).data("sendstate");
                _.funcs.Refunds(detailid, orderno, sku, sendstate);
            });

            mui('#setting').on('tap', _.conf.btnOrderPay, function () {
                var orderno = $(this).data('orderno');
                order.isNeedSendZp(orderno, function (msg) {
                    if (msg.Success == true) {
                        window.location.href = "/Trading/Order/cartGift?OrderNo=" + orderno;
                    } else {
                        window.location.href = "/Trading/Payment?OrderNo=" + orderno;
                    }
                }, false);
            });

            mui('#setting').on('tap', _.conf.btnProductdetail, function () {
                var productId = $(this).data('productid');
                var sku = $(this).data('sku');
                window.location.href = '/product-detail-' + productId + '-' + sku + '';
            });
        }
    };
    return plugin.init();
});