smart.viewerEngineer.regedit('storeorderdetail', function (model) {
    var viewApi;
    var plugin = {
        conf: {
            btnOrderTracking: '[role=orderTracking]',   //订单跟踪信息
            btnProductdetail: '[role=productdetail]',   //跳转商品详情页
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
                            window.location.href = '/Trading/Order/StoreOrderDetail?orderno=' + orderno;
                        } else { //执行webview后退
                            window.location.href = '/Trading/Order/StoreOrderList';
                        }
                    };
                })(mui);
                var scroll = mui('.mui-scroll-wrapper').scroll();
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

            mui('#setting').on('tap', _.conf.btnOrderTracking, function () {
                viewApi.go('#track');
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