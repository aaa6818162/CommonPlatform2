smart.viewerEngineer.regedit('default', function (model) {
    var _;
    var _container;
    var productListCount;
    var pageindex = 1;
    var plugin = {
        conf: {
            addwishlist: '[role=addwishlist]'
        },
        //验证
        validate: {

        },
        //页面处理
        view: {
            InitView: function () {
                (function ($) {
                    var viewApi = mui('#app').view({
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
                //初始化商品列表
                _.view.GetProductList(1, 6);
                //上拉加载
                _.view.PullOnLoading();
                $("img.lazy").lazyload({
                    effect: "show",
                    failurelimit: 10,
                    threshold: 100,
                    load: function () {
                        $(this).parents(".pos-a").addClass('moudel-animate');
                    }
                });
                $(_.conf.addwishlist).each(function () {
                    var $this = $(this);
                    var id = $this.data('id');
                    var type = $this.data('wishlisttype');
                    if (type == 1) {
                        $.richAjax('/Member/Wishlist/IsExistBySku', { sku: id, type: type }, function (data) {
                            if (data.success) {
                                $this.addClass('active');
                            }
                        }, function () { }, false, true);
                    } else {
                        $.richAjax('/Member/Wishlist/IsExist', { projectId: id, type: type }, function (data) {
                            if (data.success) {
                                $this.addClass('active');
                            }
                        }, function () { }, false, true);
                    }
                });
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
                    }
                });
                var loadMore = function (pullRefresh) {
                    // 加载更多的内容到列表中
                    if (productListCount > 6) {
                        _.view.GetProductList(pageindex, 6);
                        if (productListCount - (pageindex * 6) > 0) {
                            pullRefresh.endPullupToRefresh(false);
                        } else {
                            // 如果没有更多数据了，则关闭上拉加载
                            pullRefresh.endPullupToRefresh(true);
                            pageindex = 1;
                        }
                    } else {
                        //_.view.GetProductList(pageindex, 6);
                        // 如果没有更多数据了，则关闭上拉加载
                        pullRefresh.endPullupToRefresh(true);
                        pageindex = 1;
                    }
                };
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
            },
            GetProductList: function (pageindex, pagesize) {
                var skus = $('#articleSkus').val();
                if (!smart.validate.isNullOrEmpty(skus)) {
                    $.richAjax('/Product/ProductList/GetProductList', { skus: skus, pageindex: pageindex, pagesize: pagesize }, function (result) {
                        if (result.success) {
                            var data = result.data.products;
                            productListCount = result.data.productListCount;
                            if (data != null && data.length > 0) {
                                var html = [];
                                for (var i = 0; i < data.length; i++) {
                                    var item = data[i];
                                    var imageUrl = '';
                                    if (item.ImageList.frontview) {
                                        imageUrl = smart.utility.generateImgUrl(item.ImageList.frontview[0].Url, 290, 290);
                                    } else if (item.ImageList.withscene) {
                                        imageUrl = smart.utility.generateImgUrl(item.ImageList.withscene[0].Url, 290, 290);
                                    }
                                    html.push('<li class="list pos-r ">');
                                    html.push('<a target="_blank" href="/product-detail-' + item.ProductID + '-' + item.Sku + '">');
                                    html.push('<img class="commodity-img" src="' + imageUrl + '" onerror="javascript: this.src = \'/Assets/themes/default/images/default/290_290.jpg\';"/></a>');
                                    if (item.IsHot == 1) {
                                        html.push('<div class="pos-a new">HOT</div>');
                                    }
                                    html.push('<div class="list-name">' + item.Name + '</div>');
                                    if (item.OldPrice != 0 && item.OldPrice > item.Price) {
                                        html.push('<div class="list-price list-discount">');
                                        html.push('<span class="list-op vm"> ￥' + item.OldPrice + '</span>￥' + item.Price + '');
                                    } else {
                                        html.push('<div class="list-price">');
                                        html.push('<span class="vm"> ￥' + item.OldPrice + '</span>');
                                    }
                                    if (item.IsHasGift) {
                                        content.push('<i class="icon iconfont icon-tubiaozhizuomoban3 vm"></i>');
                                    }
                                    if (item.IsWishlist) {
                                        html.push('<i class="fr icon iconfont icon-tubiaozhizuomoban15 active" role="addwishlist" data-id="' + item.Sku + '" data-wishlisttype="1"></i></div>');
                                    } else {
                                        html.push('<i class="fr icon iconfont icon-tubiaozhizuomoban15" role="addwishlist" data-id="' + item.Sku + '" data-wishlisttype="1"></i></div></li>');
                                    }
                                }
                                $('#thelist').append(html.join(''));
                            }
                        }
                    });
                }
            }
        },
        //方法
        funcs: {
            addwishlist: function ($this) {
                var id = $this.data('id');
                var wishlistType = $this.data('wishlisttype');
                if (!smart.validate.isNullOrEmpty(id) && !smart.validate.isNullOrEmpty(wishlistType)) {
                    if ($this.attr('class').indexOf('active') > 0) { //删除收藏
                        $.isLocalLogin(function () {
                            if (wishlistType == '1') {
                                wishlistApis.deleteWishlist(wishlistType, id, function (result) {
                                    if (result.success) {
                                        $this.removeClass('active');
                                    } else {
                                        _.view.message.alert(result.message);
                                    }
                                });
                            } else {
                                wishlistApis.deleteWishlist(wishlistType, id, function (result) {
                                    if (result.success) {
                                        $this.removeClass('active');
                                    } else {
                                        _.view.message.alert(result.message);
                                    }
                                });
                            }
                        }, function () {
                            location.href = '/Member/Account/Login?url=' + window.location.href;
                        });
                    } else {
                        $.isLocalLogin(function () {
                            if (wishlistType == '1') {
                                wishlistApis.addWishlist(wishlistType, id, navigstionId, function (result) {
                                    if (result.success) {
                                        $this.addClass('active');
                                    } else {
                                        _.view.message.alert(result.message);
                                    }
                                });
                            } else {
                                wishlistApis.addWishlist(wishlistType, id, navigstionId, function (result) {
                                    if (result.success) {
                                        $this.addClass('active');
                                    } else {
                                        _.view.message.alert(result.message);
                                    }
                                });
                            }
                        }, function () {
                            location.href = '/Member/Account/Login?url=' + window.location.href;
                        });
                    }
                } else {
                    _.view.message.alert('数据异常，请联系客服');
                }
            }
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            //页面初始化
            _.view.InitView();

            _container.on('tap', _.conf.addwishlist, function () {
                _.funcs.addwishlist($(this));
            });
        }
    };
    return plugin.init();
});