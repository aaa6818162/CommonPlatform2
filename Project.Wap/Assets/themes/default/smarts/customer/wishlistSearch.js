smart.viewerEngineer.regedit('wishlistSearch', function (model) {
    var plugin = {
        conf: {
            Wishlists: null,   //wishlist列表
            keyword: '',   //搜索内容
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
                $('.Popup_err2').css('visibility', 'hidden');
            },
            //获取wishlist搜索列表
            GetWishlist: function () {
                $.richAjax('/Member/Wishlist/WishlistSearch', { keyword: $('#keyword').val() }, function (result) {
                    if (result.success) {
                        _.conf.Wishlists = result.data;
                    }
                });
            },
            //wishlist搜索页面相关
            Wishlists: function () {
                var data = _.conf.Wishlists;
                if (data.Wishlists != null && data.Wishlists.length > 0) {
                    var html = [];
                    var count = 0;
                    for (var i = 0; i < data.Wishlists.length; i++) {
                        var item = data.Wishlists[i];
                        html.push('<li>')
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
                        $('.wishlist-area').html(html.join(''));
                        $('.wishilist-search-no').hide();
                        $('.wishlist-area').show();
                        count++;
                    }
                    $('#wishlistSearchCount').text(count);
                } else {
                    $('.wishlist-area').hide();
                    $('.wishilist-search-no').show();
                }
            }
        },
        //功能处理
        funcs: {
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            //页面初始化
            _.view.InitView();

            mui('.wishilist-search').on('tap', _.conf.btnWishlistSearch, function () {
                window.location.href = '/Member/Wishlist/Search?keyword=' + (smart.validate.isNullOrEmpty($('#wishlistSearch').val()) ? '' : Base64.encode($('#wishlistSearch').val()).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F'));
            });
        }
    };
    return plugin.init();
});