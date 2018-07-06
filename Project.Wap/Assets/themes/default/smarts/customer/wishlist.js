smart.viewerEngineer.regedit('wishlist', function (model) {
    var plugin = {
        conf: {
            Wishlists: null,   //wishlist列表
            btnCancel: '[role=btnCancel]',   //取消
            btnSubmit: '[role=btnSubmit]',   //确定
            btnWishlistSearch: '[role=wishlistSearch]'   //搜索
        },
        //验证
        validate: {
        },
        //页面处理
        view: {
            InitView: function () {
                (function ($) {
                    viewApi = mui('#app').view({
                        defaultPage: "#setting"
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
                var scroll = mui('.mui-scroll-wrapper').scroll();
                _.view.GetWishlist();
                _.view.Wishlists();
            },
            //获取wishlist列表
            GetWishlist: function () {
                $.richAjax('/Member/Wishlist/Wishlists', {}, function (result) {
                    if (result.success) {
                        _.conf.Wishlists = result.data;
                    }
                });
            },
            //wishlist页面相关
            Wishlists: function () {
                var data = _.conf.Wishlists;
                if (data.Wishlists != null && data.Wishlists.length > 0) {
                    var html = [];
                    for (var i = 0; i < data.Wishlists.length; i++) {
                        var item = data.Wishlists[i];
                        html.push('<li>');
                        html.push('<div class="mui-input-row mui-checkbox mui-left list-checkbox dis-ib">');
                        html.push('<input class="cart-radio" data-wishlistId="' + item.Id + '" name="checkboX 1" value="Item 1" type="checkbox">');
                        html.push('</div>');
                        if (item.OnSale == 1)
                            html.push('<div class="wishlist-img dis-ib vm">');
                        else
                            html.push('<div class="wishlist-img dis-ib vm pos-r">');
                        var img = item.Image;
                        img = smart.validate.isNullOrEmpty(img) ? '/Assets/themes/default/images/default/180_180.jpg' : img;
                        html.push('<a href="' + (item.IsExpired || item.OnSale == 2 ? '' : item.Url) + '">');
                        html.push('<img src="' + img + '" onerror="javascript:this.src=\'' + smart.utility.generateDefaultImgUrl(180, 180) + '\'" alt="" /></a>');
                        if (item.OnSale == 2)
                            html.push('<div class="pos-a shelves-txt">已下架</div>');
                        html.push('</div>');
                        html.push('<div class="wishlist-ifm dis-ib vm">');
                        if (item.OnSale == 2)
                            html.push('<div class="text-1 shelves">' + item.Title + '</div>');
                        else
                            html.push('<div class="text-1">' + item.Title + '</div>');
                        if (item.WishlistType == 1) {
                            if (item.OldPrice != item.Price) {
                                if (item.OnSale == 2)
                                    html.push('<div class="text-2 shelves">');
                                else
                                    html.push('<div class="text-2">');
                                html.push('<span class="yj">￥<span class="num">' + item.OldPrice + '</span></span>');
                                html.push('<span class="xj">￥<span class="num">' + item.Price + '</span></span>');
                                html.push('</div>');
                            } else {
                                if (item.OnSale == 2)
                                    html.push('<div class="text-2 shelves">');
                                else
                                    html.push('<div class="text-2">');
                                html.push('￥<span class="num">' + item.OldPrice + '</span>');
                                html.push('</div>');
                            }
                        }
                        else {
                            if (smart.validate.isNullOrEmpty(item.Intro)) {
                                html.push('<div class="text-4 shelves"></div>');
                            } else {
                                html.push('<div class="text-4 shelves">' + item.Intro + '</div>');
                            }
                        }
                        html.push('<div class="text-3">' + item.CategoryName + '<span class="date fr">' + item.CreateTime + '</span></div>');
                        html.push('</div>');
                        html.push('</li>');
                    }
                    $('.wishlist-area').html(html.join(''));
                    $('.wishlist-no').hide();
                    $('.wishilist-control').show();
                    $('.wishlist-area').show();
                } else {
                    $('.wishlist-area').hide();
                    $('.wishilist-control').hide();
                    $('.wishlist-no').show();
                }
            }
        },
        //功能处理
        funcs: {
            GetWishlistId: function () {
                var ids = '';
                $(".cart-radio").each(function () {
                    var checked = $(this).is(":checked");
                    if (checked) {
                        ids += $(this).data('wishlistid') + ',';
                    }
                });
                return ids;
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

            //瀑布流加载
            //_.view.waterfallFolw.init(_.view.Wishlists, 1, $(".mui-scroll-wrapper"));

            mui(".wishilist-control").on('tap', '.J-edit', function () {
                var text = $(this).html();
                if (text == "编辑") {
                    $(".cart-radio").show();
                    $(this).html('完成');
                } else {
                    $(".cart-radio").hide();
                    $(this).html('编辑');
                }
            });
            mui(".wishilist-control").on('tap', '.J-del', function () {
                var wishlistcount = 0;
                $(".cart-radio").each(function () {
                    var checked = $(this).is(":checked");
                    if (checked) {
                        $(".Popup_err2").css("visibility", "visible");
                        wishlistcount++;
                    }
                })
                if (wishlistcount == 0) {
                    _.view.message.alert('请选择需要删除的wishlist！');
                }
            });
            mui('.Popup_err').on('tap', _.conf.btnSubmit, function () {
                var ids = _.funcs.GetWishlistId();
                if (!smart.validate.isNullOrEmpty(ids)) {
                    $.richAjax('/Member/Wishlist/DelWishlist', { ids: ids }, function (result) {
                        if (result.success) {
                            mui.toast('<img src="/Assets/themes/default/images/account/wishlist-hookpng.png" alt=""><div>已删除</div>', {
                                duration: 'long(1000ms)',
                                type: 'div'
                            })
                            window.location.reload();
                        } else {
                            $(".Popup_err2").css("visibility", "hidden");
                            _.view.message.alert('删除失败！');
                        }
                    });

                } else {
                    $(".Popup_err2").css("visibility", "hidden");
                    _.view.message.alert('请选择需要删除的wishlist！');
                    return;
                }
            });
            mui('.Popup_err').on('tap', _.conf.btnCancel, function () {
                $(".Popup_err2").css("visibility", "hidden");
            });

            mui('.wishilist-search').on('tap', _.conf.btnWishlistSearch, function () {
                window.location.href = '/Member/Wishlist/Search?keyword=' + (smart.validate.isNullOrEmpty($('#wishlistSearch').val()) ? '' : Base64.encode($('#wishlistSearch').val()).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F'));
            });
        }
    };
    return plugin.init();
});