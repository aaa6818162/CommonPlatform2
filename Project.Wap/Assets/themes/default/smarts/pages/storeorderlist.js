smart.viewerEngineer.regedit('storeorderlist', function (model) {
    var OrderCount;
    var keyword = '';
    var pageindex = 1;
    var plugin = {
        conf: {
            btnOrderSearch: '[role=orderSearch]',  //订单查询
            btnOrderDetail: '[role=orderDetail]'   //门店订单详情页
        },
        //验证
        validate: {

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
                            viewApi.back();
                        } else { //执行webview后退
                            oldBack();
                        }
                    };
                })(mui);
                //var scroll = mui('.mui-scroll-wrapper').scroll();
                _.view.GetOrderLsit(1, 10, '');
            },
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
            //获取订单列表
            GetOrderLsit: function (pageindex, pagesize, keyword) {
                $.richAjax('/Trading/Order/GetStoreOrderList', { pageindex: pageindex, pagesize: pagesize, keyword: keyword }, function (result) {
                    if (result.success) {
                        var data = result.data;
                        OrderCount = data.OrderCount;
                        if (data.OrderList != null && data.OrderList.length > 0) {
                            var html = [];
                            for (var i = 0; i < data.OrderList.length; i++) {
                                var item = data.OrderList[i];
                                html.push('<div class="order-list">');
                                html.push('<div class="order-num" role="orderDetail">');
                                if (smart.validate.isNullOrEmpty(item.SapOrderNo)) {
                                    html.push('<span class="fl">订单号<span id="itemorderno" data-orderno="' + item.OrderNo + '">' + item.OrderNo + '</span></span></div>');
                                } else {
                                    html.push('<span class="fl">订单号<span id="itemorderno" data-orderno="' + item.OrderNo + '">' + item.SapOrderNo + '</span></span></div>');
                                }
                                for (var y = 0; y < item.OrderProductDetailList.length; y++) {
                                    var product = item.OrderProductDetailList[y];
                                    if (product.PosSalesMark != "02") {
                                        html.push('<div class="order-det" role="orderDetail">');
                                        var skuImg = product.SkuImagePath;
                                        skuImg = smart.validate.isNullOrEmpty(skuImg) ? '/Assets/themes/default/images/default/180_180.jpg' : smart.utility.generateImgUrl(skuImg, 180, 180);
                                        html.push('<div class="det-img dis-ib vm">');
                                        html.push('<img src="' + skuImg + '" onerror="javascript:this.src=\'' + smart.utility.generateDefaultImgUrl(180, 180) + '\'" alt=""></div>');
                                        html.push('<div class="det-ifm dis-ib vm">');
                                        html.push('<div class="text-1">');
                                        html.push('' + product.ProductName + '</div>');
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
                                        html.push('</div></div>');
                                    }
                                }
                                html.push('<div class="order-price" role="orderDetail">');
                                html.push('<span class="price-num">共' + item.QuantitySum + '件</span>');
                                html.push('<span class="fr">实付款：<span class="red">¥<i>' + item.TotalamountSum + '</i></span></span></div>');
                                html.push('</div>');
                            }
                            if (pageindex > 1) {
                                $(html.join('')).insertBefore('.mui-pull-bottom-pocket');
                            } else {
                                if ($('.mui-pull-bottom-pocket').length > 0) {
                                    $(html.join('')).insertBefore('.mui-pull-bottom-pocket');
                                } else {
                                    $('#muiscroll').html(html.join(''));
                                }
                            }
                            _.view.PullOnLoading();
                            //$('#muiscroll').html(html.join(''));
                            $('.order-nosearch').hide();
                            $('#muiscroll').show();
                        } else {
                            $('.order-nosearch').show();
                            $('#muiscroll').hide();
                        }
                    }
                    if (data.OrderCount <= 10) {
                        $('.mui-pull-caption').text('');
                        $('.mui-pull-caption-nomore').text('');
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

            //订单查询
            _container.on('click', _.conf.btnOrderSearch, function () {
                mui('#pullrefreshd').pullRefresh().scrollTo(0, 0, 100);
                mui('#pullrefreshd').pullRefresh().refresh(true);
                $('.order-list').remove(); pageindex = 1;
                var keyword = $('#orderSearch').val();
                _.view.GetOrderLsit(1, 10, keyword);
            });

            //门店订单详情页
            mui('#setting').on('tap', _.conf.btnOrderDetail, function () {
                var orderno = $(this).parent('.order-list').find('#itemorderno').data('orderno');
                location.href = '/Trading/Order/StoreOrderDetail?orderno=' + orderno;
            });
        }
    };
    return plugin.init();
});