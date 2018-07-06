smart.viewerEngineer.regedit('productDetail', function (model) {
    var scroll;
    var plugin = {
        conf: {
            proPanel: '[role="proPanel"]',//规格色款选择区域
            confirmEdit: "[role=confirmEdit]",//选择规格色款后确定按钮
            detailPanel: '[role=proPanel]',
            size: '[role=PSizeItem]',
            style: '[role=StyleItem]',
            domSize: '[role=PSizeItem]',
            sizeValue: "",
            colorValue: "",
            sku: "",
            styleItem: '[role=StyleItem]',
            addCar: '[role=AddCar]',
            closeSize: '[role=CloseSize]',
            makeSure: '[role=MakeSure]',
            addCount: '[role=AddCount]',
            cutCount: '[role=CutCount]',
            addwishlist: '[role=Addwishlist]',
            share: '[role=Share]',
            btnBuy: '[role=buy]',
            choseSize: '[role=ChoseSize]',
            choseDisPro: '[role=ChoseDisPro]',
            disProAddCart: '[role=DisProAddCart]',
            addwish: '[role=AddWish]',
            zsStyleItem: '[role=ZsStyleItem]',//定制商品
        },
        //验证
        validate: {
        },
        //页面处理
        view: {
            loadMore: function (pullRefresh) {
                // 如果没有更多数据了，则关闭上拉加载
                pullRefresh.endPullupToRefresh(true);
                // 如果有更多数据，则继续
                //pullRefresh.endPullupToRefresh(false);
            },
            pullUp: function () {
                scroll = mui('.mui-scroll-wrapper').scroll();
                var startX = 0;
                var startY = 0;
                var diffX = 0;
                var diffY = 0;
                var pullrefresht = document.getElementById('pullrefresh');
                //上拉加载详情
                pullrefresht.addEventListener("touchstart", function (e) {
                    var touches = e.touches;
                    startY = touches[0].pageY;
                }, false);
                pullrefresht.addEventListener("touchmove", function (e) {
                    var touches = e.touches;
                    diffY = scroll[0].maxScrollY - scroll[0].y;

                    if (diffY > 30) {
                        $(".pullUpLabel").html('松手加载商品详情');
                    } else {
                        $(".pullUpLabel").html('上拉查看商品详细信息');
                    }
                }, false);
                pullrefresht.addEventListener("touchend", function (e) {
                    if ($(".pullUpLabel").html() == '松手加载商品详情') {
                        $(this).parent().animate({
                            top: "-100%"
                        }, 800);
                        $(this).parent().siblings('.gd-main').animate({
                            top: "0"
                        }, 800);
                        $(".pullUpLabel").html('上拉查看商品详细信息');
                    }
                }, false);
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
            },
            selectSizeItem: function (styles, pSizeValue, code, obj) {
                $(_.conf.confirmEdit).attr('class', 'ggsk-btn');
                _conf.sizeValue = pSizeValue; //确定固定判断值(默认值)
                var proPanel = obj.parents(_conf.proPanel);
                var group = proPanel.data('group');
                var proUI;
                if (group === 'main') {
                    proUI = model;
                } else {
                    proUI = $$('product.' + group);
                }
                var sku = proUI.getSkuByCode(code);
                _conf.colorValue = sku.Attributes.Material + sku.Attributes.Color;//确定固定判断值(默认值)
                _conf.sku = code;//默认的suk
                $("#gosku").val(code);
                if (sku.OnSale == 2) {
                    $(_.conf.confirmEdit).addClass('gray');
                } else {
                    $(_.conf.confirmEdit).removeClass('gray');
                }
                //定制商品
                if (sku.SaleModel == "ZS") {
                    proPanel.find('[role="StyleItems"]').append('<li class="list-img dis-ib list-dz" id="ZsStyle" role="ZsStyleItem" zssku="' + code + '" style="cursor:pointer">定制</li>');
                }
                //proPanel.find(_conf.style).removeClass('active'); //不默认选择色款
                _.view.bindPopSkuInfo(proPanel, sku);
            },

            selectStyleItem: function (sku, text, obj, onSale) {
                //选择色款时，下架的不能点击
                if (onSale == 2) {
                    //$(_.conf.confirmEdit).addClass('gray');
                    return;
                }
                _conf.colorValue = obj.attr("data-style");//确定固定判断值
                _conf.sku = sku;
                $("#gosku").val(sku);//固定重新加载页面跳转的值
                var proPanel = obj.parents(_conf.proPanel);
                var group = proPanel.data('group');
                var proUI;
                if (group === 'main') {
                    proUI = model;
                } else {
                    proUI = $$('product.' + group);
                }
                var currSku = proUI.getSkuByCode(sku);

                obj.addClass('active').siblings().removeClass('active');
                _.view.bindPopSkuInfo(proPanel, currSku);
            },
            bindPopSkuInfo: function (proPanel, sku) {
                var img = JSLINQ(sku.Images).Where(function (item) { return item.ProductImageType == "2"; }).FirstOrDefault();
                if (!img)
                    img = JSLINQ(sku.Images).Where(function (item) { return item.ProductImageType == "1"; }).FirstOrDefault();

                var defImage = smart.utility.generateDefaultImgUrl(180, 180);
                var image = img ? smart.utility.generateImgUrl(img.Items[0].Url, 180, 180) : defImage;

                proPanel.find('[role="productImage"]').attr('src', image).attr('alt', sku.Alias);
                proPanel.find('[role="productName"]').text(sku.Alias);

                var priceHtml = '';
                if (sku.Price != sku.OldPrice && sku.Price < sku.OldPrice) {
                    priceHtml = ' <p role="productPrice" class="hd-price"><span class="vip-1">￥<i>' + sku.OldPrice + '</i></span><span class=\"vip-2\">￥<i>' + sku.Price + '</i></span></p>';
                } else {

                    priceHtml = '<p role="productPrice" class="hd-price">￥<span class="price-1"> ' + sku.OldPrice + '</span></p>';
                }
                proPanel.find('[role="productPrice"]').html(priceHtml);
                //proPanel.attr('data-newsku', sku.Code);
            },
            detailBottom: function () {
                var pid = $('#pid').val();
                var sku = $('#sku').val();
                var htmls = '<nav class="mui-bar mui-bar-tab J-ft">';
                if (pid == 0)
                    htmls += '<i class="icon iconfont icon-tubiaozhizuomoban15 vm" data-sku="' + sku + '" role="Addwishlist"></i>';
                else
                    htmls += '<i class="icon iconfont icon-tubiaozhizuomoban15 vm active" data-sku="' + sku + '" role="Addwishlist"></i>';
                htmls += '<i class="icon iconfont icon-tubiaozhizuomoban7 vm" role="Share"></i>';
                htmls += '<button type="button" class="sp-buy mui-btn fr mui-btn-black" role="buy" id="directbuy">直接购买</button>';
                htmls += '<button type="button" role="AddCar" class="sp-cart mui-btn fr mui-btn-warning">加入购物车</button>';
                htmls += '</nav>';
                $('#setting').after(htmls);
            },
            init: function () {
                (function($) {
                    viewApi = mui('#app').view({
                        defaultPage: "#setting"
                    });
                    var view = viewApi.view;
                    //处理view的后退与webview后退
                    var oldBack = $.back;
                    $.back = function() {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            viewApi.back();
                        } else { //执行webview后退
                            if (history.length == 1) {
                                window.location.href = '/';
                            } else {
                                oldBack();
                            }
                        }
                    };
                })(mui);
                _.view.pullUp();

                var skuCode = $('#skucode').text();
                //是否需要安装服务
                _.view.needInstall(skuCode);

                //赠品信息
                _.view.getGiftList(skuCode);
                //数量输入事件监听
                $('#CountInfor').bind('input propertychange', function () {
                    if ($(this).val() >= 999) {
                        mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>最大数量999</div>', {
                            duration: 'long(1000ms)',
                            type: 'div'
                        });
                        $(this).val(999);
                        return;
                    }
                });
                var url = 'http://' + window.location.host + window.location.pathname + window.location.search;
                $("#register").attr('href', "/Member/Account/Register?url=" + url + "");//注册回调地址

                _.view.detailBottom();

                var nativeShare = function (elementNode, config) {
                    if (!document.getElementById(elementNode)) {
                        return false;
                    }

                    var qApiSrc = {
                        lower: "//3gimg.qq.com/html5/js/qb.js",
                        higher: "//jsapi.qq.com/get?api=app.share"
                    };
                    var bLevel = {
                        qq: { forbid: 0, lower: 1, higher: 2 },
                        uc: { forbid: 0, allow: 1 }
                    };
                    var UA = navigator.appVersion;
                    var isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
                    var isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;
                    var version = {
                        uc: "",
                        qq: ""
                    };
                    var isWeixin = false;

                    config = config || {};
                    this.elementNode = elementNode;
                    this.url = config.url || document.location.href || '';
                    this.title = config.title || document.title || '';
                    this.desc = config.desc || document.title || '';
                    this.img = config.img || document.getElementsByTagName('img').length > 0 && document.getElementsByTagName('img')[0].src || '';
                    this.img_title = config.img_title || document.title || '';
                    this.from = config.from || window.location.host || '';
                    this.ucAppList = {
                        sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
                        weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
                        weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
                        QQ: ['kQQ', 'QQ', '4', 'QQ好友'],
                        QZone: ['kQZone', 'QZone', '3', 'QQ空间']
                    };
                    this.share = function (to_app) {
                        var title = this.title, url = this.url, desc = this.desc, img = this.img, img_title = this.img_title, from = this.from;
                        if (isucBrowser) {
                            to_app = to_app == '' ? '' : (platform_os == 'iPhone' ? this.ucAppList[to_app][0] : this.ucAppList[to_app][1]);
                            if (to_app == 'QZone') {
                                B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url=" + img + "&title=" + title + "&description=" + desc + "&url=" + url + "&app_name=" + from;
                                k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
                                    k && k.parentNode && k.parentNode.removeChild(k)
                                }, 5E3);
                            }
                            if (typeof (ucweb) != "undefined") {
                                ucweb.startRequest("shell.page_share", [title, title, url, to_app, "", "@" + from, ""])
                            } else {
                                if (typeof (ucbrowser) != "undefined") {
                                    ucbrowser.web_share(title, title, url, to_app, "", "@" + from, '')
                                } else {
                                }
                            }
                        } else {
                            if (isqqBrowser && !isWeixin) {
                                to_app = to_app == '' ? '' : this.ucAppList[to_app][2];
                                var ah = {
                                    url: url,
                                    title: title,
                                    description: desc,
                                    img_url: img,
                                    img_title: img_title,
                                    to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
                                    cus_txt: "请输入此时此刻想要分享的内容"
                                };
                                ah = to_app == '' ? '' : ah;
                                if (typeof (browser) != "undefined") {
                                    if (typeof (browser.app) != "undefined" && isqqBrowser == bLevel.qq.higher) {
                                        browser.app.share(ah);
                                    }
                                } else {
                                    if (typeof (window.qb) != "undefined" && isqqBrowser == bLevel.qq.lower) {
                                        window.qb.share(ah);
                                    } else {
                                    }
                                }
                            } else {
                            }
                        }
                    };

                    this.html = function () {
                        var position = document.getElementById(this.elementNode);
                        var html = '<div class="label txta-c">分享到</div>' +
                            '<div class="list clearfix">' +
                            '<span data-app="sinaWeibo" class="nativeShare weibo"><i></i>新浪微博</span>' +
                            '<span data-app="weixin" class="nativeShare weixin"><i></i>微信好友</span>' +
                            '<span data-app="weixinFriend" class="nativeShare weixin_timeline"><i></i>微信朋友圈</span>' +
                            '<span data-app="QQ" class="nativeShare qq"><i></i>QQ好友</span>' +
                            '<span data-app="QZone" class="nativeShare qzone"><i></i>QQ空间</span>' +
                            '<span data-app="" class="nativeShare more"><i></i>更多</span>' +
                            '</div>';
                        position.innerHTML = html;
                    };

                    this.isloadqqApi = function () {
                        if (isqqBrowser) {
                            var b = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher;
                            var d = document.createElement("script");
                            var a = document.getElementsByTagName("body")[0];
                            d.setAttribute("src", b);
                            a.appendChild(d);
                        }
                    };

                    this.getPlantform = function () {
                        ua = navigator.userAgent;
                        if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
                            return "iPhone";
                        }
                        return "Android";
                    };

                    this.is_weixin = function () {
                        var a = UA.toLowerCase();
                        if (a.match(/MicroMessenger/i) == "micromessenger") {
                            return true;
                        } else {
                            return false;
                        }
                    };

                    this.getVersion = function (c) {
                        var a = c.split("."), b = parseFloat(a[0] + "." + a[1]);
                        return b;
                    };

                    this.init = function () {
                        platform_os = this.getPlantform();
                        version.qq = isqqBrowser ? this.getVersion(UA.split("MQQBrowser/")[1]) : 0;
                        version.uc = isucBrowser ? this.getVersion(UA.split("UCBrowser/")[1]) : 0;
                        isWeixin = this.is_weixin();
                        if ((isqqBrowser && version.qq < 5.4 && platform_os == "iPhone") || (isqqBrowser && version.qq < 5.3 && platform_os == "Android")) {
                            isqqBrowser = bLevel.qq.forbid;
                        } else {
                            if (isqqBrowser && version.qq < 5.4 && platform_os == "Android") {
                                isqqBrowser = bLevel.qq.lower;
                            } else {
                                if (isucBrowser && ((version.uc < 10.2 && platform_os == "iPhone") || (version.uc < 9.7 && platform_os == "Android"))) {
                                    isucBrowser = bLevel.uc.forbid;
                                }
                            }
                        }
                        this.isloadqqApi();
                        if (isqqBrowser || isucBrowser) {
                            this.html();
                            $(".J-ft").addClass('gd-ft');
                        } else {
                            $(".icon-tubiaozhizuomoban7").hide();
                        }
                    };
                    this.init();
                    var share = this;
                    var items = document.getElementsByClassName('nativeShare');
                    for (var i = 0; i < items.length; i++) {
                        items[i].onclick = function () {
                            share.share(this.getAttribute('data-app'));
                        }
                    }
                    return this;
                }; //分享js
                var config = {
                    url: document.URL, // 分享的网页链接
                    title: 'INK+IVY', // 标题
                    desc: 'INK+IVY', // 描述
                    img_title: 'INK+IVY', // 图片标题
                    from: 'INK+IVY' // 来源
                };
                var share_obj = new nativeShare('nativeShare', config);
            },
            needInstall: function (sku) {
                activity.sapInfo(sku, function (json) {
                    if (json.Success) {
                        var result = eval("(" + json.Result + ")");
                        if (result.IsNeedinstall) {
                            $('.ifm-install').show();
                        }
                        else {
                            $('.ifm-install').hide();
                        }
                    }
                    else {
                        $('.ifm-install').hide();
                    }
                }, function () {
                    $('.ifm-install').hide();
                });
            },
            getGiftList: function (sku) {
                $.ajax({
                    type: "post",
                    url: "/product/productdetail/getgiftlist",
                    data: { sku: sku },
                    success: function (result) {
                        if (result && result.length > 0) {
                            $(".gd-sale").show();
                            $(".sale_1").html("可获赠" + result.length + "件赠品");
                            return;
                        }
                    }
                });
            },
            directbuy: function (sku, num) {
                cart.add(sku, num, '01', function (r) {
                    if (r.Result.IsSuccess == true) {
                        var cartList = [];
                        cartList.push({
                            Sku: sku,
                            Quantity: num,
                            SalesMark: '01'
                        });
                        //如果购物车有同样商品，则更新购物车数量
                        cart.changeQuantity(sku, num, '01', function (msg) {
                            var json = msg;
                            if (json.Result.IsSuccess == true) {
                                var submitJson = { CartSubmitSubList: cartList };
                                //提交到确认订单页面
                                cart.submitCart(submitJson, function (msg) {
                                    var json = msg;
                                    if (json.Result.IsSuccess == true) {
                                        //解决下单界面返回按钮直接购买问题
                                        $.cookie("product_buy_sku", '');
                                        $.cookie("product_buy_num", '');
                                        $("#gosku").val("");
                                        $("#gonumber").val("");
                                        $("#color").html("");
                                        _.conf.sizeValue = "";
                                        _conf.colorValue = "";
                                        _conf.sk = "";
                                        smart.packages('productSelector', function () {
                                            var selector = new ProductSelector(_conf.detailPanel);
                                            selector.initSizeItem();
                                            selector.selectSize(_.conf.size, function (styles, pSizeValue, code, obj) {
                                                _.view.selectSizeItem(styles, pSizeValue, code, obj);
                                            });
                                            selector.selectStyle(_.conf.style, function (skuCode, text, obj, onSale) {
                                                _.view.selectStyleItem(skuCode, text, obj, onSale);
                                            });
                                        });
                                        mui('#stylesroll').scroll().refresh();
                                        window.location.href = "/Trading/Order/ConfirmOrder";
                                    } else if (json.status == "notauthorized") {
                                        window.location.href = json.Result.loginUrl;
                                    } else {
                                        var returnMsg = jQuery.parseJSON(json.Result.Message);
                                        var notStockList = returnMsg.notinstock;
                                        if (notStockList != "" && notStockList != undefined) {
                                            $(notStockList).each(function (index, data) {
                                                var item = "#item_" + data.pid + "_" + data.salesmark;
                                                var maxstocknum = parseInt(data.maxstocknum);

                                                if (maxstocknum == 0) {
                                                    mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>该商品暂无库存</div>', {
                                                        duration: 'long(1000ms)',
                                                        type: 'div'
                                                    });
                                                    //_.tips.error($this, "该商品暂无库存");
                                                } else {
                                                    mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>商品数量不能大于+ ' + maxstocknum + '</div>', {
                                                        duration: 'long(1000ms)',
                                                        type: 'div'
                                                    });
                                                    //_.tips.error($this, "商品数量不能大于" + maxstocknum);
                                                }

                                                if (maxstocknum > 0) {
                                                    shoppingcart.changeQuantity(data.pid, maxstocknum, data.salesmark);
                                                }
                                            });
                                        }
                                    }
                                });
                            } else {

                                //_.tips.error($this, "直接购买失败");
                                mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>直接购买失败</div>', {
                                    duration: 'long(1000ms)',
                                    type: 'div'
                                })
                            }
                        });
                    } else {
                        //_.tips.error($this, r.Result.Message);
                        mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>' + r.Result.Message + '</div>', {
                            duration: 'long(1000ms)',
                            type: 'div'
                        });
                    }
                }, function (err) {
                    //_.tips.error($this, "加入购物车失败");
                    mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>加入购物车失败</div>', {
                        duration: 'long(1000ms)',
                        type: 'div'
                    });
                });
            },
            afterAddCartList: function (r) {
                if (r.Success) {
                    if (r.Result.IsSuccess) {
                        //_.view.afterAddCartList(r, $this);
                        mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon2.png" alt=""><div>加入成功</div>', {
                            duration: 'long(1000ms)',
                            type: 'div'
                        });
                        $.top_refresh();
                    } else {
                        mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>' + r.Result.Message + '</div>', {
                            duration: 'long(1000ms)',
                            type: 'div'
                        });
                    }
                } else {
                    mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>' + r.Message + '</div>', {
                        duration: 'long(1000ms)',
                        type: 'div'
                    });
                }

            }

        },
        //初始化
        init: function () {
            var pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            this.view.init();

            smart.packages('productSelector', function () {
                var selector = new ProductSelector(_conf.detailPanel);
                selector.initSizeItem();
                selector.selectSize(_.conf.size, function (styles, pSizeValue, code, obj) {
                    _.view.selectSizeItem(styles, pSizeValue, code, obj);
                });
                selector.selectStyle(_.conf.style, function (skuCode, text, obj, onSale) {
                    _.view.selectStyleItem(skuCode, text, obj, onSale);
                });
            });
            //绑定确认事件
            _container.on('tap', _.conf.confirmEdit, function () {
                if ($(this).attr('class').indexOf("gray") > 0) {//灰色的情况
                    return;
                }
                if ($("#CountInfor").val() == "") {//
                    mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>请选择数量</div>', {
                        duration: 'long(1000ms)',
                        type: 'div'
                    });
                    return;
                }
                if (!smart.validate.isInteger($("#CountInfor").val())) {//字母时  默认为1加入购物车
                    $("#CountInfor").val(1);
                }
                if (parseInt($("#CountInfor").val()) <= 0) {
                    $("#CountInfor").val(1);
                }
                if (($("#CountInfor").val()) == '0') {//0时  默认为1加入购物车
                    mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>数量不能为0</div>', {
                        duration: 'long(1000ms)',
                        type: 'div'
                    });
                    return;
                }
                if (_conf.sizeValue == "") {  // 固定判断值
                    mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>请选择尺寸</div>', {
                        duration: 'long(1000ms)',
                        type: 'div'
                    });
                    return;
                }
                if (_conf.colorValue == "") {
                    //_.view.message.alert("请选择色款");
                    mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>请选择色款</div>', {
                        duration: 'long(1000ms)',
                        type: 'div'
                    });
                    return;
                }
                var show = _.conf.sizeValue + _conf.colorValue;
                if (show.length >= 18) {
                    show = show.substr(0, 18) + "..";
                }
                $("#color").html(show);
                $("#gonumber").val($("#CountInfor").val());
                if ($(_.conf.confirmEdit).attr('type') == 'gobuy') {////直接购买
                    mui('#picture').popover('hide'); //隐藏面板
                    var sku = $("#gosku").val();
                    var num = $("#gonumber").val();
                    var url = 'http://' + window.location.host + window.location.pathname + window.location.search;
                    $.isLocalLogin(function () {
                        _.view.directbuy(sku, num);
                        //解决下单界面返回后重新调回下单界面的问题
                        $.cookie("product_buy_sku", '');
                        $.cookie("product_buy_num", '');
                    }, function () {
                        //解决当点击直接购买跳转登录界面后但未登陆情况下，进入商品详情界面自动跳转登录的问题
                        if ($.cookie("product_buy_sku")) {
                            $.cookie("product_buy_num", '');
                        }
                        else {
                            //解决下单界面返回后重新调回下单界面的问题
                            $.cookie("product_buy_sku", sku);
                            $.cookie("product_buy_num", num);
                            _.view.ssounAuthorized(url);
                        }
                    });
                }
                else if ($(_.conf.confirmEdit).attr('type') == 'addcart') {////加入购物车
                    var sku = _conf.sku;
                    var num = $("#CountInfor").val();
                    cart.add(sku, num, '01', function (r) {
                        _.view.afterAddCartList(r);
                    }, function (err) {
                        //_.view.failAddCartList(err, $this);
                        mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>' + err + '</div>', {
                            duration: 'long(1000ms)',
                            type: 'div'
                        });
                    });
                    mui('#picture').popover('hide');//隐藏面板
                }
                else if ($(_.conf.confirmEdit).attr('type') == 'choosewishlist') { ////加入wishlist
                    var sku = $('#skucode').text();//之前的sku 不是最新选择的Sku（加入默认的sku）
                    smart.packages("wishlist", function () {
                        wishlist.addWishlist(1, sku, function (result) {
                            if (result.success) {
                                $(_conf.addwishlist).addClass('active');
                                mui('#picture').popover('hide'); //隐藏面板

                            } else {
                                _.view.message.alert(result.message);
                            }
                        });
                    });
                }
                else { //加入购物车
                    mui('#picture').popover('hide'); //隐藏面板
                }
            });
            //绑定取消事件
            _container.on('tap', _.conf.closeSize, function () {
                mui('#picture').popover('hide');
                //$(".gg-btn").removeClass("active");
                //$(".list-img").removeClass("active");
                //_.conf.sizeValue = ""; //清空选择
                //_conf.colorValue == ""
            });
            //弹出选择规格面板事件
            _container.on('tap', _.conf.choseSize, function () {
                mui('#picture').popover('show');
                $(_.conf.confirmEdit).attr('type', 'choose');//设置类型
            });
            //定制商品事件
            _container.on('tap', _.conf.zsStyleItem, function () {
                $(this).addClass('active');
                $(_conf.style).removeClass('active'); //不默认选择色款
                _conf.colorValue = "定制";
                _conf.sku = $(_.conf.zsStyleItem).attr('zssku');
                $("#gosku").val($("#ZsStyle").attr('zssku'));//固定重新加载页面跳转的值
            });
            //绑定增加数量事件
            _container.on('tap', _.conf.addCount, function () {
                var count = $("#CountInfor").val();
                if (count >= 999) {
                    mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>最大数量999</div>', {
                        duration: 'long(1000ms)',
                        type: 'div'
                    });
                    return;
                }
                if (!smart.validate.isInteger(count)) {
                    $("#CountInfor").val(1);
                    return;
                }
                if (count <= 0) {
                    $("#CountInfor").val(1);
                    return;
                }
                if (count == "") {
                    $("#CountInfor").val(1);
                    return;
                }
                count = parseInt(count) + parseInt(1);
                $("#CountInfor").val(count);
            });
            //绑定减少数量事件
            _container.on('tap', _.conf.cutCount, function () {
                var count = $("#CountInfor").val();
                if (count == 0) {
                    $("#CountInfor").val(1);
                    return;
                }
                if (!smart.validate.isInteger(count)) {
                    $("#CountInfor").val(1);
                    return;
                }
                if (count == "") {
                    $("#CountInfor").val(1);
                    return;
                }
                count = parseInt(count) - parseInt(1);
                if (count <= 0) {
                    $("#CountInfor").val(1);
                    return;
                }
                else {
                    $("#CountInfor").val(count);
                }
            });
            //绑定组合商品加入购物车事件
            _container.on('tap', _.conf.disProAddCart, function () {
                var sku = $(this).data("sku");
                var num = $(this).data("number");
                cart.add(sku, num, '01', function (r) {
                    _.view.afterAddCartList(r);
                }, function (err) {
                    //_.view.failAddCartList(err, $this);
                    mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>' + err + '</div>', {
                        duration: 'long(1000ms)',
                        type: 'div'
                    });
                });
                //_.view.message.alert("加入成功");
            });
            //绑定加入购物车事件
            _container.on('tap', _.conf.addCar, function () {
                if ($("#color").html() == "") {
                    mui('#picture').popover('show');
                    $(_.conf.confirmEdit).attr('type', 'addcart');//设置类型
                }
                else {
                    var sku = _conf.sku;
                    var num = $("#CountInfor").val();
                    cart.add(sku, num, '01', function (r) {
                        _.view.afterAddCartList(r);
                    }, function (err) {
                        //_.view.failAddCartList(err, $this);
                        mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>' + err + '</div>', {
                            duration: 'long(1000ms)',
                            type: 'div'
                        });
                    });
                    //_.view.message.alert("加入成功");
                }
            });

            //绑定直接购买事件
            _container.on('tap', _.conf.btnBuy, function () {
                var $this = $(this);
                //var onSale = $($this).attr("onSale");
                if ($("#gosku").val() == "" || $("#gonumber").val() == "") {
                    mui('#picture').popover('show');
                    $(_.conf.confirmEdit).attr('type', 'gobuy');//设置类型
                }
                else {
                    var sku = $("#gosku").val();
                    var num = $("#gonumber").val();
                    //var sku = _conf.sku;
                    //var num = $("#CountInfor").val();
                    var url = 'http://' + window.location.host + window.location.pathname + window.location.search;
                    //url += (url.indexOf('?') >= 0 ? '&' : '?') + 'sku=' + sku + '&num=' + num + window.location.hash;
                    $.isLocalLogin(function () {
                        _.view.directbuy(sku, num);
                        //解决下单界面返回后重新调回下单界面的问题
                        $.cookie("product_buy_sku", '');
                        $.cookie("product_buy_num", '');
                    }, function () {
                        //解决当点击直接购买跳转登录界面后但未登陆情况下，进入商品详情界面自动跳转登录的问题
                        if ($.cookie("product_buy_sku")) {
                            $.cookie("product_buy_sku", '');
                            $.cookie("product_buy_num", '');
                        }
                        else {
                            //解决下单界面返回后重新调回下单界面的问题
                            $.cookie("product_buy_sku", sku);
                            $.cookie("product_buy_num", num);
                            _.view.ssounAuthorized(url);
                        }
                    });
                }

            });

            //收藏事件绑定
            _container.on('tap', _.conf.addwishlist, function () {
                var sku = $(this).data("sku");
                var wish = $(this);
                if ($(this).attr("class").indexOf("active") >= 0) { //删除收藏
                    $.isLocalLogin(function () {
                        smart.packages("wishlist", function () {
                            wishlist.deleteWishlist(1, sku, function (result) {
                                if (result.success) {
                                    wish.removeClass('active');
                                } else {
                                    _.view.message.alert(result.message);
                                }
                            });
                        });
                    }, function () {
                        var url = 'http://' + window.location.host + window.location.pathname + window.location.search;
                        _.view.ssounAuthorized(url);

                    });
                }
                else {
                    $.isLocalLogin(function () {
                        if ($("#color").html() == "") {
                            mui('#picture').popover('show');
                            $(_.conf.confirmEdit).attr('type', 'choosewishlist'); //设置类型 添加wishlist 先选择规格
                        } else {
                            smart.packages("wishlist", function () {
                                wishlist.addWishlist(1, sku, function (result) {
                                    if (result.success) {
                                        wish.addClass('active');
                                    } else {
                                        _.view.message.alert(result.message);
                                    }
                                });
                            });
                        }
                    }, function () {
                        var url = 'http://' + window.location.host + window.location.pathname + window.location.search;
                        _.view.ssounAuthorized(url);

                    });
                }
            });
            //分享
            _container.on('tap', _.conf.share, function () {
                mui('#share').popover('show');
            });

            //推荐商品收藏事件绑定
            _container.on('tap', _.conf.addwish, function () {
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
                        var url = 'http://' + window.location.host + window.location.pathname + window.location.search;
                        _.view.ssounAuthorized(url);

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
                        var url = 'http://' + window.location.host + window.location.pathname + window.location.search;
                        _.view.ssounAuthorized(url);

                    });
                }
            });
            //数量输入事件监听

            //提交结算
            smart.command('buy', 'buy');
        }
    };

    return plugin.init();
});