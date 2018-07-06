smart.viewerEngineer.regedit('coupon', function (model) {
    var PageIndex = 2;
    var plugin = {
        conf: {
            addwishlist: '[role=addwishlist]',
            getcoupon: '[role=getcoupon]'
        },
        //验证
        validate: {

        },
        //页面处理
        view: {
            init: function () {
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
                    _mui.back = function () {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            window.location.href = "/Member/customer/index";
                        } else { //执行webview后退
                            window.location.href = "/Member/customer/index";
                        }
                    };
                })(mui);
                //初始化绑定iScroll控件 
                mui.init({
                    pullRefresh: {
                        container: "#pullrefreshd",
                        up: {
                            height: 50,
                            auto: false,
                            contentrefresh: "正在加载...",
                            contentnomore: '没有更多数据了',
                            callback: function () {
                                _.view.loadMore(this);
                            }
                        }
                    },
                    gestureConfig: {
                        longtap: true
                    }
                });
                $("#coupon").html('');
                _.view.GetCouponList($("#showType").val());
                $(".mui-pull").hide();// 显示全部 隐藏加载框
            },
            loadMore: function (pullRefresh) { //下拉加载更多
                setTimeout(function () {
                    if (PageIndex == -1) {
                        // 如果没有更多数据了，则关闭上拉加载
                        pullRefresh.endPullupToRefresh(true);
                        return;
                    }
                    var list, url, options;
                    list = $("#couponlist");
                    var showType = $("#showType").val();
                    url = "/Member/Customer/CouponJson";
                    options = {
                        page: PageIndex,
                        showType: showType
                    };
                    $.utility.ajax(url, options, function (data) {
                        if (data.Coupons == "") {    
                            $(".mui-pull").hide();// 显示全部 隐藏加载框
                            PageIndex = -1;
                            return;
                        }
                        var html = "";
                        var content = [];//内容数组
                        for (var i = 0; i < data.Coupons.length; i++) {
                            if (data.Coupons[i].EffectiveDateStart) {
                                data.Coupons[i].EffectiveDateStart = data.Coupons[i].EffectiveDateStart.replace(/-/g, "/");
                                var start = new Date(data.Coupons[i].EffectiveDateStart);
                                data.Coupons[i].EffectiveDateStart = start.format('yyyy-MM-dd');
                            }
                            if (data.Coupons[i].EffectiveDateEnd) {
                                data.Coupons[i].EffectiveDateEnd = data.Coupons[i].EffectiveDateEnd.replace(/-/g, "/");
                                var end = new Date(data.Coupons[i].EffectiveDateEnd);
                                data.Coupons[i].EffectiveDateEnd = end.format('yyyy-MM-dd');
                            }
                            if (showType == "1" || showType == "2") {
                                content.push('<li class="mui-table-view-cell gray">');
                            } else {
                                content.push('<li class="mui-table-view-cell">');
                            }
                            if (data.Coupons[i].Discount > 0) {
                                content.push('<div class="coupon-orice">' + (100 - data.Coupons[i].Discount) + '%OFF</div>');
                            } else {
                                content.push('<div class="coupon-orice"><span>￥</span>' + data.Coupons[i].Ticketvalue + '</div>');
                            }
                            content.push('<div class="coupon-time mt20">有效期：' + data.Coupons[i].EffectiveDateStart + ' 至 ' + data.Coupons[i].EffectiveDateEnd + '</div>');
                            if (smart.validate.isNullOrEmpty(data.Coupons[i].Usedes)) {
                                content.push('<div class="coupon-explain">使用说明：</div><div class="coupon-num fr mt20">券号 ' + data.Coupons[i].Ticketcode + '</div></li>');
                            } else {
                                content.push('<div class="coupon-explain">使用说明：' + data.Coupons[i].Usedes + '</div><div class="coupon-num fr mt20">券号 ' + data.Coupons[i].Ticketcode + '</div></li>');
                            }
                            html = content.join("");
                        }
                        if (html != "") {
                            list.append(html);
                        }
                    },function (error) {
                        _.view.message.alert('服务器连接异常请稍后再试');
                        return;
                    });
                    // 如果有更多数据，则继续
                    pullRefresh.endPullupToRefresh(false);
                    PageIndex++;
                }, 1000);
            },
            GetCouponList: function (showType) {
                var url, options, coupon;
                coupon = $("#coupon");
                url = "/Member/Customer/CouponJson";
                options = {
                    page: 1,
                    showType: showType
                };
                $.utility.ajax(url, options, function (data) {
                    if (data.Coupons == "") {
                        var nohtml = '<div class="coupon-no txta-c"> <img class="no-img" src="/Assets/themes/default/images/account/coupon-no.png" alt="" /><p class="no-txt">您暂时没有该状态下的优惠券</p> </div>';
                        coupon.append(nohtml);
                        return;
                    }
                    var html = '';
                    var content = [];//内容数组
                    content.push('<ul class="mui-table-view" id="couponlist">');
                    for (var i = 0; i < data.Coupons.length; i++) {
                        if (data.Coupons[i].EffectiveDateStart) {
                            data.Coupons[i].EffectiveDateStart = data.Coupons[i].EffectiveDateStart.replace(/-/g, "/");
                            var start = new Date(data.Coupons[i].EffectiveDateStart);
                            data.Coupons[i].EffectiveDateStart = start.format('yyyy-MM-dd');
                        }
                        if (data.Coupons[i].EffectiveDateEnd) {
                            data.Coupons[i].EffectiveDateEnd = data.Coupons[i].EffectiveDateEnd.replace(/-/g, "/");
                            var end = new Date(data.Coupons[i].EffectiveDateEnd);
                            data.Coupons[i].EffectiveDateEnd = end.format('yyyy-MM-dd');
                        }
                        if (showType == "1" || showType == "2") {
                            content.push('<li class="mui-table-view-cell gray">');
                        } else {
                            content.push('<li class="mui-table-view-cell">');
                        }
                        if (data.Coupons[i].Discount > 0) {
                            content.push('<div class="coupon-orice">' + (100 - data.Coupons[i].Discount) + '%OFF</div>');
                        } else {
                            content.push('<div class="coupon-orice"><span>￥</span>' + data.Coupons[i].Ticketvalue + '</div>');
                        }
                        content.push('<div class="coupon-time mt20">有效期：' + data.Coupons[i].EffectiveDateStart + ' 至 ' + data.Coupons[i].EffectiveDateEnd + '</div>');
                        if (smart.validate.isNullOrEmpty(data.Coupons[i].Usedes)) {
                            content.push('<div class="coupon-explain">使用说明：</div><div class="coupon-num fr mt20">券号 ' + data.Coupons[i].Ticketcode + '</div></li>');
                        } else {
                            content.push('<div class="coupon-explain">使用说明：' + data.Coupons[i].Usedes + '</div><div class="coupon-num fr mt20">券号 ' + data.Coupons[i].Ticketcode + '</div></li>');
                        }
                        html = content.join("");
                    }
                    
                    if (html != "") {
                        html += '</ul>';
                        coupon.append(html);
                    }
                },function(error) {
                    _.view.message.alert('服务器连接异常请稍后再试');
                    return;
                });
        },
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);
            _config = this.conf;
            _ = this;
            _container = this.conf.container;

            this.view.init();
        }
    };

    return plugin.init();
});