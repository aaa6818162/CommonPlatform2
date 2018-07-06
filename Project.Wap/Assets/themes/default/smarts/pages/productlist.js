smart.viewerEngineer.regedit('productList', function (model) {
    var PageIndex = 2;
    var LoadFlag = true;//增加加载状态判断，避免当前页未加载完成情况下开始加载下一页
    var $container;
    var plugin = {
        conf: {
            addwishlist: '[role=addwishlist]',
        },
        //验证
        validate: {

        },
        //页面处理
        view: {
            init: function () {
                var sortindex = $("#sortindex").val(); //排序数目
                if (sortindex == "1") {
                    $(".filter").attr("class", "filter2"); //收藏占位一个（2的时候样式修改）
                };
                var sort = $("#isSort").val(); //是否有排序
                if (sort == "not") {
                    $("#wrapper").css("top", "1.5125rem"); //没有排序 顶部上拉
                };
                $(".list-price").unbind(".icon-tubiaozhizuomoban15");
                //排序样式设置
                $('#arrowdown').attr('style', 'visibility: hidden;');
                var url = $("#CategoryUrl").val();
                if (url.indexOf("--PriceSort-Descending") >= 0) {
                    $("#pricesort").find('a').css("color", "#D0173F");
                    var newurl = url.replace("Descending", "Ascending");
                    $("#pricesort").find('a').attr('href', newurl);
                    $('#arrowdown').removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown');
                    $('#arrowdown').css("color", "#D0173F");
                    $('#arrowdown').attr('style', 'visibility: visible;');
                    //$("#pricesort").find('.arrow-down').removeClass('active');
                };
                if (url.indexOf("--PriceSort-Ascending") >= 0) {
                    $("#pricesort").find('a').css("color", "#D0173F");
                    var newurl = url.replace("Ascending", "Descending");
                    $("#pricesort").find('a').attr('href', newurl);
                    $('#arrowdown').removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup');
                    $('#arrowdown').css("color", "#D0173F");
                    $('#arrowdown').attr('style', 'visibility: visible;');
                    //$("#pricesort").find('.arrow-up').removeClass('active');
                };

                if (url.indexOf("--SalesSort-Descending") >= 0) {
                    $("#salessort").find('a').css("color", "#D0173F");
                    $("#salessort").find('a').attr('href', url);
                };
                if (url.indexOf("--NewSort-Descending") >= 0) {
                    $("#newsort").find('a').css("color", "#D0173F");
                    $("#newsort").find('a').attr('href', url);
                };
                if (url.indexOf("--RankSort-Descending") >= 0) {
                    $("#ranksort").find('a').css("color", "#D0173F");
                    $("#ranksort").find('a').attr('href', url);
                };
                if (url.indexOf("--WshlistSort-Descending") >= 0) {
                    $("#wishlistsort").find('a').css("color", "#D0173F");
                    $("#wishlistsort").find('a').attr('href', url);
                };

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
                $container = $('#thelist');
                $container.imagesLoaded(function () {
                    $container.masonry({
                        columnWidth: '.grid-sizer',
                        itemSelector: '.grid-item',
                        isAnimated: true,
                        gutter: '.list-margin'

                    });
                });
                $(window).resize(function () {
                    setTimeout(function () {
                        var $grid = $('.grid').masonry({
                            columnWidth: '.grid-sizer',
                            itemSelector: '.grid-item',
                            isResizable: true,
                            gutter: '.list-margin'
                        });
                        $grid.masonry('layout');
                    }, 500);
                });
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);

                //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                //document.addEventListener('DOMContentLoaded', _.view.loaded(), false);
            },
            loadMore: function (pullRefresh) { //下拉加载更多
                if (PageIndex == -1) {
                    return;
                }
                $(".list-price").unbind(".icon-tubiaozhizuomoban15");
                var list, url, options;
                url = $("#Url").val();
                if (url.indexOf("DasProductList") >= 0) {
                    options = {
                        dasName: $("#DasName").val(),
                        pageindex: PageIndex,
                        id: $("#CategoryId").val(),
                        url: $("#CategoryUrl").val(),
                    };
                }
                else {
                    options = {
                        pageindex: PageIndex,
                        id: $("#CategoryId").val(),
                        url: $("#CategoryUrl").val(),
                    }
                };
                $.utility.ajax(url, options, function (JsonResult) {
                    if (JsonResult == "") {
                        // 如果没有更多数据了，则关闭上拉加载
                        pullRefresh.endPullupToRefresh(true);
                        //$("#pullUp").hide();// 显示全部 隐藏加载框
                        PageIndex = -1;
                        return;
                    }
                    var html = "";
                    var content = [];//内容数组
                    for (var i = 0 ; i < JsonResult.length; i++) {
                        if (JsonResult[i].Sku.indexOf("Ad") < 0) {
                            var imageUrl = "";
                            content.push('<li class="list-li dis-ib pos-r grid-item">');
                            if (JsonResult[i].ImageList.frontview) {
                                imageUrl = smart.utility.generateImgUrl(JsonResult[i].ImageList.frontview[0].Url, 290, 290);
                            } else if (JsonResult[i].ImageList.withscene) {
                                imageUrl = smart.utility.generateImgUrl(JsonResult[i].ImageList.withscene[0].Url, 290, 290);
                            }
                            //错误的图片等待上传后加载，不然页面闪动
                            //Html += '<a target="_blank" href="/product-detail-' + JsonResult[i].ProductID + '-' + JsonResult[i].Sku + '"><img class="commodity-img"src="' + imageUrl + '" onerror="javascript: this.src = \'/Assets/themes/default/image/default/320_320.jpg\';" />';
                            content.push('<a target="_blank" href="/product-detail-' + JsonResult[i].ProductID + '-' + JsonResult[i].Sku + '"><img class="commodity-img" src="' + imageUrl + '"onerror="javascript: this.src = \'/Assets/themes/default/images/default/290_290.jpg\';" />');

                            if (JsonResult[i].IsNew == 1 && JsonResult[i].IsHot == 1) {
                                content.push('<div class="pos-a new">HOT</div>');
                            } else {
                                if (JsonResult[i].IsNew == 1) {
                                    content.push('<div class="pos-a new">NEW</div>');
                                }
                                if (JsonResult[i].IsHot == 1) {
                                    content.push('<div class="pos-a new">HOT</div>');
                                }
                            }

                            content.push('<div class="list-name">' + JsonResult[i].Name + '</div></a>');
                            if (JsonResult[i].OldPrice != 0 && JsonResult[i].OldPrice > JsonResult[i].Price) {
                                content.push('<div class="list-price list-discount">');
                                content.push('<span class="list-op vm"> ￥' + JsonResult[i].OldPrice + '</span>￥' + JsonResult[i].Price + '');
                            } else {
                                content.push('<div class="list-price">');
                                content.push('<span class="vm"> ￥' + JsonResult[i].OldPrice + '</span>');
                            }
                            if (JsonResult[i].IsHasGift) {
                                content.push('<i class="icon iconfont icon-tubiaozhizuomoban3 vm"></i>');
                            }
                            if (JsonResult[i].IsWishlist) {
                                content.push('<a href="javascript:void(0);" role="addwishlist" data-id="' + JsonResult[i].ProductID + '" data-sku="' + JsonResult[i].Sku + '" data-wishlisttype="1"><i class="fr icon iconfont icon-tubiaozhizuomoban15 active"></i></a></div>');
                            } else {
                                content.push('<a href="javascript:void(0);" role="addwishlist" data-id="' + JsonResult[i].ProductID + '" data-sku="' + JsonResult[i].Sku + '" data-wishlisttype="1"><i class="fr icon iconfont icon-tubiaozhizuomoban15"></i></a></div>');
                            }
                            content.push('</li>');
                        } else {
                            if (JsonResult[i].CollectCount == 2) {
                                if (JsonResult[i].Keyword == "across") {
                                    content.push('<li class="list-BigAdvert grid-item grid-item--width2">');
                                    if (JsonResult[i].Url.split('|')[0] != "") {
                                        content.push('<a target="_blank" href="' + JsonResult[i].Url.split("|")[0] + '"> <img src="' + JsonResult[i].Url.split('|')[1] + '" onerror="javascript: this.src = \'/Assets/themes/default/images/default/290_290.jpg\';"/></a></li>');
                                    } else {
                                        content.push('<img src="' + JsonResult[i].Url.split('|')[1] + '" onerror="javascript: this.src = \'/Assets/themes/default/images/default/290_290.jpg\';"/></li>');
                                    }
                                } else {
                                    content.push('<li class="list-li dis-ib pos-r grid-item grid-item--width3">');
                                    if (JsonResult[i].Url.split('|')[0] != "") {
                                        content.push('<a target="_blank" href="' + JsonResult[i].Url.split("|")[0] + '"> <img class="sale-img" src="' + JsonResult[i].Url.split('|')[1] + '" onerror="javascript: this.src = \'/Assets/themes/default/images/default/290_290.jpg\';"/></a></li>');
                                    } else {
                                        content.push('<img  class="sale-img" src="' + JsonResult[i].Url.split('|')[1] + '" onerror="javascript: this.src = \'/Assets/themes/default/images/default/290_290.jpg\';"/></li>');
                                    }
                                }
                            } else {
                                content.push('<li class="list-li dis-ib pos-r grid-item">');
                                if (JsonResult[i].Url.split('|')[0] != "") {
                                    content.push('<a target="_blank" href="' + JsonResult[i].Url.split("|")[0] + '"> <img class="sale-img" src="' + JsonResult[i].Url.split('|')[1] + '" onerror="javascript: this.src = \'/Assets/themes/default/images/default/290_290.jpg\';"/></a></li>');
                                } else {
                                    content.push('<img  class="sale-img" src="' + JsonResult[i].Url.split('|')[1] + '" onerror="javascript: this.src = \'/Assets/themes/default/images/default/290_290.jpg\';"/></li>');
                                }
                            }
                        }
                    }
                    html = content.join("");
                    if (html != "") {
                        $container = $('#thelist');
                        $container.append(html).masonry('appended', html);
                        $container.imagesLoaded(function () {
                            $container = new Masonry('.grid', {
                                columnWidth: '.grid-sizer',
                                itemSelector: '.grid-item',
                                isResizable: true,
                                gutter: '.list-margin'
                            });
                        });
                    }
                    // 如果有更多数据，则继续
                    pullRefresh.endPullupToRefresh(false);
                });
                PageIndex++;
            },
        },
        //初始化
        init: function () {
            var pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            this.view.init();
            //收藏事件绑定
            _container.on('tap', _.conf.addwishlist, function () {
                var sku = $(this).data("sku");
                var wish = $(this);
                if (wish.find('i').attr("class").indexOf("active") >= 0) {  //删除收藏
                    $.isLocalLogin(function () {
                        smart.packages("wishlist", function () {
                            wishlist.deleteWishlist(1, sku, function (result) {
                                if (result.success) {
                                    wish.find('i').removeClass('active');
                                } else {
                                    _.view.message.alert(result.message);
                                }
                            });
                        });
                    }, function () {
                        window.location.href = '/Member/Account/Login?url=' + window.location.href;

                    });
                }
                else {
                    $.isLocalLogin(function () {
                        smart.packages("wishlist", function () {
                            wishlist.addWishlist(1, sku, function (result) {
                                if (result.success) {
                                    wish.find('i').addClass('active');
                                } else {
                                    _.view.message.alert(result.message);
                                }
                            });
                        });
                    }, function () {
                        window.location.href = '/Member/Account/Login?url=' + window.location.href;
                    });
                }
            });
            //add wishlist
        }
    };

    return plugin.init();
});