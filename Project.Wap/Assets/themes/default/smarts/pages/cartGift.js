smart.viewerEngineer.regedit('cartgift', function (model) {
    var _;
    var _config;
    var _container;

    var _productList;
    var _zpRuleList;
    var index = 0;
    var _giftRuleGroupData = new Array();//已选赠品
    var _giftData;
    var plugin = {
        conf: {
            giftList: '[role="giftList"]',
            giftGroupItem: '[role="giftGroupItem"]',
            productItem: '[role="productItem"]',
            giftAdd: '[role="giftAdd"]',
            giftDelete: '[role="giftDelete"]',
            chooseInfo: '[role="chooseInfo"]',

            addQuantity: '[role="addQuantity"]',//+数量
            minusQuantity: '[role="minusQuantity"]',//-数量
            inputQuantity: '[role="inputQuantity"]',//修改数量

            showGifts: '[role="showGifts"]',
            giftListAdded: '[role="giftListAdded"]',

            selectSku: '[role="selectSku"]',    //修改Sku
            proPanels: '[role="proPanels"]',    //商品选择弹出层内容块
            proPanel: '[role="proPanel"]',      //商品选择弹出层
            pSizeItems: '[role="pSizeItems"]',  //规格选择块
            pSizeItem: '[role="pSizeItem"]',    //规格项
            styleItems: '[role="styleItems"]',  //色款选择块
            styleItem: '[role="styleItem"]',    //色款项
            confirmSku: '[role="confirmSku"]',  //确定选择

            next: '[role="next"]'//下一步
        },
        //验证
        validate: {

        },
        //页面处理
        view: {
            init: function () {
                mui('.mui-scroll-wrapper').scroll();
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);

                //初始化单页view	
                (function ($$) {
                    var viewApi = mui('#app').view({
                        defaultPage: '#setting'
                    });
                    var view = viewApi.view;
                    //处理view的后退与webview后退
                    var oldBack = $$.back;
                    $$.back = function () {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            viewApi.back();
                        } else {
                            oldBack();
                        }
                    };
                })(mui);

                order.getGiftView(orderNo, function (data) {
                    var GiftData = jQuery.parseJSON(data.Result);
                    _giftData = GiftData.ZpList;
                    $.ajax({
                        type: "POST",
                        url: "/Order/GetGiftProduct",
                        cache: false,
                        async: false,
                        data: "GiftData=" + data.Result,
                        success: function (msg) {
                            _productList = $.parseJSON(msg);

                            _zpRuleList = GiftData.ZpRuleList;
                            _.view.showChooseInfo();
                            _.view.createZpHtmlInfo(_zpRuleList, _productList);
                        }
                    });
                });
            },
            //初始化页面数据
            createZpHtmlInfo: function (zpRuleList, productList) {
                var defImage = smart.utility.generateDefaultImgUrl(180, 180);
                var zpHtmlStr = '';
                var proPanels = '';
                for (var i = 0; i < zpRuleList.length; i++) {
                    var ruleInfo = '';
                    ruleInfo = '<div class="cart-list"><header class="cart-hd">\
                                    <div class="gift-sale">\
                                        <div class="sale-text"><i class="icon iconfont icon-tubiaozhizuomoban3 vm"></i><span class="vm">' + zpRuleList[i].Msg + '</span></div>\
                                    </div>\
                                </header>';

                    zpHtmlStr += ruleInfo;
                    var grouplist = JSLINQ(productList).Where(function (item) { return item.Ruleid == zpRuleList[i].Ruleid; }).Distinct(function (item) { return item.Groupno }).ToArray();
                    $.each(grouplist, function (n, value) {
                        var tempProductList = JSLINQ(productList).Where(function (item) { return item.Ruleid == zpRuleList[i].Ruleid; }).Where(function (item) { return item.Groupno == value; }).ToArray();
                        if (tempProductList.length == 0)
                            return true;

                        var groupInfo = '<div role="giftGroupItem" data-groupid="' + tempProductList[0].GiftRuleGroupId + '" data-sendzpnum="' + zpRuleList[i].SendZpNum + '">';
                        for (var j = 0; j < tempProductList.length; j++) {
                            var groupZpInfo = '';
                            var isOneProduct = tempProductList[j].Products.length == 1;
                            if (j == 0) {
                                groupInfo += '\
                                <div class="list-box1">\
                                    <div class="mui-input-row mui-checkbox mui-left vm dis-ib">\
                                        <label>' + tempProductList[j].Groupname + '</label>\
                                    </div>\
                                    <div class="fr">\
                                        <div class="count dis-ib">\
                                            <span class="plus dis-ib vm" role="minusQuantity">-</span><input class="ct-num dis-ib vm" type="text" value="1" number="1" role="inputQuantity" /><span class="reduce dis-ib vm" role="addQuantity">+</span>\
                                        </div>\
                                        <div class="ct-btn dis-ib vm" role="giftAdd">添加</div>\
                                    </div>\
                                </div>';

                                //groupTitleInfo = '<div class="z-cartcontent z-cartgift-content"><div class="giftcontent"><label>' + tempProductList[j].Groupname + '</label><span class="tianjia fr" id = "btnAddGroup_' + tempProductList[j].GiftRuleGroupId + '" >添加</span><div class="z-car-cell mt40 fr"><span class="z-cart-jianhao" >-</span>';
                                //groupTitleInfo += '<input class ="num" id = "numgroup_' + tempProductList[j].GiftRuleGroupId + '" value="1"><input type = "hidden" value = "' + zpRuleList[i].SendZpNum + '" ><span class = "z-cart-jiahao">+</span></div></div><p class="line"></p>';
                            }

                            //var ggStr = '<dd class="z-guige"><div class="god-pecif" id="z-guige_' + tempProductList[j].GiftSelectorId + '"><p>长x宽x高  单位: cm </p>';
                            //var skStr = '<dd class="z-sekuan"><div class="god-pecif" id="z-sekuan_' + tempProductList[j].GiftSelectorId + '">';
                            //for (var jj = 0; jj < tempProductList[j].Products.length; jj++) {
                            //    ggStr += '<p class="s-sku">' + tempProductList[j].Products[jj].Specification + '</p>';
                            //}
                            //if (isOneProduct) {
                            //    for (var jj = 0; jj < tempProductList[j].Products.length; jj++) {
                            //        skStr += '<p class="s-sku"><img src="' + tempProductList[j].Products[jj].Photos[1] + '" onerror="javascript:this.src=\'/Assets/themes/default/image/default/84_84.jpg\'" /><span>' + tempProductList[j].Products[jj].Color + '</span></p>';
                            //    }
                            //}

                            //ggStr += '</div></dd>';
                            //skStr += '</div></dd>';


                            var selectSku = '<a href="javascript:void(0);"><span class="mui-icon mui-icon-arrowdown fr"></span></a>';

                            groupZpInfo += '\
                            <div class="list-box2" role="productItem" data-sku="' + tempProductList[j].ChosedSku + '" data-psize="' + tempProductList[j].Products[0].Specification + '" data-style="' + tempProductList[j].Products[0].Material + tempProductList[j].Products[0].Color + '" data-giftselectorid="' + tempProductList[j].GiftSelectorId + '">\
                                <div class="dis-ib list-img" role="productImageInfo">\
                                    <img class="cm-img" src="' + tempProductList[j].Products[0].Photos[0] + '" alt="' + tempProductList[j].Products[0].Name + '" onerror="javascript:this.src=\'' + defImage + '\';" />\
                                </div>\
                                <div class="dis-ib list-ifm"' + (isOneProduct ? '' : ' role="selectSku"') + '>\
                                    <div class="ifm-name">\
                                        <div class="dis-ib nametxt" role="productNameInfo">' + tempProductList[j].Products[0].Name + '</div>\
                                    </div>\
                                    <div class="ifm-gg" role="productPSizeInfo">' + tempProductList[j].Products[0].Specification + '</div>\
                                    <div class="ifm-sk">\
                                        <div class="dis-ib sktxt" role="productStyleInfo">' + tempProductList[j].Products[0].Material + ';' + tempProductList[j].Products[0].Color + '</div>\
                                        ' + (isOneProduct ? '' : selectSku) + '\
                                    </div>\
                                </div>\
                            </div>';

                            if (!isOneProduct) {
                                var sign = tempProductList[j].GiftSelectorId;
                                var data = tempProductList[j].Products[0];

                                //var pSizeList = [], styleList = [];
                                //var pSizeStr = '', styleStr = '';
                                //$.each(tempProductList[j].Products, function () {
                                //    if ($.inArray(this.Specification, ggList) == -1)
                                //        pSizeList.push(this.Specification);
                                //});

                                //$.each(styleList, function () {
                                //    pSizeStr += '<div class="gg-btn dis-ib' + (this == data.Specification ? ' active' : '') + '" role="pSizeItem">' + this + '</div>';
                                //});

                                //styleList = _.view.getStyles(sign, data.Specification);
                                //$.each(styleList, function () {
                                //    styleStr += '<li class="list-img dis-ib' + (this.Style == (data.Material + data.Color) ? ' active' : '') + '" role="styleItem"><img src="' + this.Image + '" alt="" /></li>';
                                //});

                                proPanels += '\
                                <div id="' + sign + '" role="proPanel" data-giftselectorid="' + sign + '" data-psize="' + data.Specification + '" data-style="' + data.Material + data.Color + '" class="mui-popover mui-popover-action mui-popover-bottom gd-ggsk picture" style="display: none;">\
                                    <div class="mui-scroll-wrapper">\
                                        <div class="mui-scroll">\
                                            <a href="#' + sign + '" class="close pos-a"><img src="/Assets/themes/default/images/goodDetail/gd-close.png"></a>\
                                            <div class="ggsk-box">\
                                                <div class="ggsk-main">\
                                                    <div class="picturn-hd">\
                                                        <div class="dis-ib vm" role="imageInfo"><img src="' + data.Photos[0] + '" alt="" onerror="javascript:this.src=\'' + defImage + '\';" /></div>\
                                                        <div class="dis-ib vm">\
                                                            <p class="hd-title" role="nameInfo">' + data.Name + '</p>\
                                                        </div>\
                                                    </div>\
                                                    <div class="gg">\
                                                        <p>规格</p>\
                                                        <div class="btn-box" role="pSizeItems">\
                                                        </div>\
                                                    </div>\
                                                    <div class="sk">\
                                                        <p>色款</p>\
                                                        <ul class="sk-list" role="styleItems">\
                                                        </ul>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                            <div class="ggsk-btn">\
                                                <a href="javascript:void(0);" role="confirmSku">确&nbsp;定</a>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>';
                            }


                            //groupZpInfo += '<div class="z-cart-xiangxi " role="proPanel"><a target="_blank" class="tu" href="/product-detail-' + tempProductList[j].Products[0].Productid + '-' + tempProductList[j].Products[0].Sku + '"><img src=" ' + tempProductList[j].Products[0].Photos[0] + '" onerror="javascript:this.src=\'/Assets/themes/default/image/default/150_150.jpg\'" /></a><div class="z-cartgiftbox"><span class="z-cart-name">' + tempProductList[j].Products[0].Name + '</span><input type ="hidden" class="choseSku_' + tempProductList[j].GiftRuleGroupId + '" id = "choseSku_' + tempProductList[j].GiftSelectorId + '" value =' + tempProductList[j].ChosedSku + '><dl class="z-product z-pod-pos" role="PSize" data-group="<!=ProductId!>">';

                            //if (tempProductList[j].Products.length == 1) {
                            //    groupZpInfo += '<dt><i id = "text_gg_' + tempProductList[j].GiftSelectorId + '">' + tempProductList[j].Products[0].Specification + '</i><span><img src="/Assets/themes/default/image/icon/jt.png" /></span></dt>' + ggStr + '</dl><br/><dl class="z-product  z-pod-pos" role="Style" data-group="<!=ProductId!>"><dt><i id = "text_sk_' + tempProductList[j].GiftSelectorId + '">' + tempProductList[j].Products[0].Color + '</i><span><img src="/Assets/themes/default/image/icon/jt.png" /></span></dt>';
                            //} else {
                            //    groupZpInfo += '<dt><i id = "text_gg_' + tempProductList[j].GiftSelectorId + '">规格</i><span><img src="/Assets/themes/default/image/icon/jt.png" /></span></dt>' + ggStr + '</dl><br/><dl class="z-product  z-pod-pos" role="Style" data-group="<!=ProductId!>"><dt><i id = "text_sk_' + tempProductList[j].GiftSelectorId + '">色款</i><span><img src="/Assets/themes/default/image/icon/jt.png" /></span></dt>';
                            //}
                            //groupZpInfo += skStr + '</dl></div></div>';
                            groupInfo += groupZpInfo;
                        }
                        groupInfo += "</div>";
                        zpHtmlStr += groupInfo;
                        //zpHtmlStr += '</div>';
                    });
                    zpHtmlStr += '</div>';       
                }
                $(_config.giftList).html(zpHtmlStr);
                $(_config.proPanels).html(proPanels);
                mui('.mui-scroll-wrapper').scroll();//必须初始化

            },
            //选择赠品组
            selectGroupZpSku: function (giftGroupItem, num) {
                var giftRuleGroupId = giftGroupItem.data("groupid");
                var ruleid = giftRuleGroupId.substr(0, giftRuleGroupId.indexOf("_"));

                var skulist = "";
                giftGroupItem.find(_config.productItem).each(function () {
                    skulist += (skulist ? "," : "") + $(this).attr("data-sku");
                });

                if (_giftRuleGroupData == null || _giftRuleGroupData == "") {
                    var groupInfo = { Id: index, ChoseSkus: skulist, Ruleid: ruleid, RuleGroupId: giftRuleGroupId, Num: num };
                    _giftRuleGroupData.push(groupInfo);
                } else {
                    var sameGroupList = JSLINQ(_giftRuleGroupData).Where(function (item) { return item.Ruleid == ruleid && item.RuleGroupId == giftRuleGroupId; }).ToArray();
                    var groupNum = sameGroupList.length;
                    if (groupNum == 0) {
                        index++;
                        var groupInfo = { Id: index, ChoseSkus: skulist, Ruleid: ruleid, RuleGroupId: giftRuleGroupId, Num: num };
                        _giftRuleGroupData.push(groupInfo);
                    } else {
                        var sameSku = JSLINQ(_giftRuleGroupData).Where(function (item) { return item.Ruleid == ruleid && item.RuleGroupId == giftRuleGroupId && item.ChoseSkus == skulist; }).ToArray();
                        var sameSkuNum = sameSku.length;
                        if (sameSkuNum == 0) {
                            index++;
                            var groupInfo = { Id: index, ChoseSkus: skulist, Ruleid: ruleid, RuleGroupId: giftRuleGroupId, Num: num };
                            _giftRuleGroupData.push(groupInfo);
                        } else {
                            for (var i = 0; i < _giftRuleGroupData.length; i++) {
                                if (_giftRuleGroupData[i].RuleGroupId == giftRuleGroupId && _giftRuleGroupData[i].ChoseSkus == skulist) {
                                    var tempGroupZp = _giftRuleGroupData[i];
                                    tempGroupZp.Num = tempGroupZp.Num + num;
                                    _giftRuleGroupData[i] = tempGroupZp;
                                }
                            }
                        }
                    }
                }
            },
            //验证是否能选某次活动下赠品
            checkCanChoseGroup: function (giftRuleGroupId, num) {
                var ruleid = giftRuleGroupId.substr(0, giftRuleGroupId.indexOf("_"));
                var sendNum = JSLINQ(_zpRuleList).Where(function (item) { return item.Ruleid == ruleid; }).First().SendZpNum;
                if (_giftRuleGroupData == null || _giftRuleGroupData == "") {
                    return sendNum >= num;
                } else {
                    var alreadySendNum = 0;
                    var alreadySendList = JSLINQ(_giftRuleGroupData).Where(function (item) { return item.Ruleid == ruleid; }).ToArray();
                    for (var i = 0; i < alreadySendList.length; i++) {
                        alreadySendNum += alreadySendList[i].Num;
                    }
                    return sendNum >= (num + alreadySendNum);
                }
            },
            //获取单个赠品的详细信息
            getProductInfo: function (ruleGroupId, sku) {
                var productList = JSLINQ(_productList).Where(function (item) { return item.GiftRuleGroupId == ruleGroupId; }).ToArray();
                var product;
                for (var i = 0; i < productList.length; i++) {
                    for (var j = 0; j < productList[i].Products.length; j++) {
                        if (productList[i].Products[j].Sku == sku) {
                            product = productList[i].Products[j];
                        }
                    }
                }
                return product;
            },
            addGift: function () {
                //debugger;
                var jsonDetail = {};
                jsonDetail.GiftInfoList = [];
                jsonDetail.OrderNo = orderNo;
                for (var i = 0; i < _giftRuleGroupData.length; i++) {
                    var skulist = _giftRuleGroupData[i].ChoseSkus.split(",");
                    for (var j = 0; j < skulist.length; j++) {
                        var zpNum = JSLINQ(_giftData).Where(function (item) { return (item.Ruleid + '_' + item.Groupno) == _giftRuleGroupData[i].RuleGroupId && item.Productcode == skulist[j]; }).First().Num;
                        var giftInfo = { ProductCode: skulist[j], Num: _giftRuleGroupData[i].Num * zpNum };
                        jsonDetail.GiftInfoList.push(giftInfo);
                    }
                }
                order.addGift(jsonDetail, function (msg) {
                    var json = msg;
                    if (json.Success == true) {
                        window.location.replace("/Trading/Payment?OrderNo=" + orderNo);
                    } else {
                        _.view.message.alert(json.Message, function () {
                            window.location.reload();
                        });
                    }
                });

            },
            delGroupZp: function (giftRuleGroupId) {
                for (var i = 0; i < _giftRuleGroupData.length; i++) {
                    if (_giftRuleGroupData[i].Id == giftRuleGroupId) {
                        _giftRuleGroupData.splice(i, 1);
                    }
                }
                _.view.showChooseInfo();
                _.view.fillZpList();
            },
            //填充选择赠品数据
            fillZpList: function fillZpList() {
                var zpHtmlStr = '', groupHtmlStr = '';

                var defImage = smart.utility.generateDefaultImgUrl(180, 180);

                if (_giftRuleGroupData) {
                    for (var i = 0; i < _giftRuleGroupData.length; i++) {
                        var skulist = _giftRuleGroupData[i].ChoseSkus.split(",");
                        zpHtmlStr = '';
                        groupHtmlStr += (skulist.length > 1 ? '<div class="inventory-comb">' : '');
                        for (var j = 0; j < skulist.length; j++) {
                            var productInfo = _.view.getProductInfo(_giftRuleGroupData[i].RuleGroupId, skulist[j]);
                            //zpHtmlStr += '<li class="fl"><img src="' + productInfo.Photos[1] + '"  onerror="javascript:this.src=\'/Assets/themes/default/image/default/84_84.jpg\'"/><div class="xsqb-xx"><span>' + productInfo.Name + '</span><span>' + productInfo.Specification + '</span><span>' + productInfo.Color + '</span></div></li>';


                            zpHtmlStr += '\
                            <div class="cart-list">\
                                <div class="list-box2">\
                                    <div class="dis-ib list-img">\
                                        <img class="cm-img" src="' + productInfo.Photos[0] + '" alt="" onerror="javascript:this.src=\'' + defImage + '\';" />\
                                    </div>\
                                    <div class="dis-ib list-ifm">\
                                        <div class="ifm-name">\
                                            <div class="dis-ib nametxt">' + productInfo.Name + '</div>\
                                            ' + (j == 0 ? '<span class="mui-icon mui-icon-trash fr vm" role="giftDelete" data-groupid="' + _giftRuleGroupData[i].Id + '"></span>' : '') + '\
                                        </div>\
                                        <div class="ifm-gg">' + productInfo.Specification + '</div>\
                                        <div class="ifm-sk pos-r">\
                                            <div class="dis-ib sktxt">' + productInfo.Material + ';' + productInfo.Color + '</div>\
                                            <div class="num-3 dis-ib pos-a">X ' + _giftRuleGroupData[i].Num + '</div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>';
                        }
                        //numHtmlStr = _giftRuleGroupData[i].Num;
                        //zpHtmlStr += '<li class="fr"><span class="sl">数量<i>' + numHtmlStr + '</i></span><span class="del">删除</span><input type="hidden" value ="' + _giftRuleGroupData[i].Id + '"></li>';
                        groupHtmlStr += zpHtmlStr + (skulist.length > 1 ? '</div>' : '');
                    }
                    $(_config.giftListAdded).html(groupHtmlStr);
                } else {
                    $(_config.giftListAdded).html(" ");
                }

            },
            //赠品选择结果
            showChooseInfo: function () {
                var allZpNum = JSLINQ(_zpRuleList).Sum(function (item) { return item.SendZpNum; });
                var chosedZPNum = JSLINQ(_giftRuleGroupData).Sum(function (item) { return item.Num; });
                var canChoseZpNum = allZpNum - chosedZPNum;

                $(_config.chooseInfo).html('已选 <span class="red">' + chosedZPNum + '</span> 件赠品，还可选 <span class="red">' + canChoseZpNum + '</span> 件');
            },
            //显示多Sku赠品切换选择弹出层
            showProPanel: function (giftSelectorId, pSize, style) {
                var proPanel = $(_config.proPanel + '[data-giftselectorid="' + giftSelectorId + '"]');
                var pSizeList = _.view.getPSizes(giftSelectorId);
                var pSizeHtml = '', styleHtml = '';
                $.each(pSizeList, function () {
                    pSizeHtml += '<div class="gg-btn dis-ib' + (this == pSize ? ' active' : '') + '" role="pSizeItem">' + this + '</div>';
                });

                var styleList = _.view.getStyles(giftSelectorId, pSize);
                var defImage = smart.utility.generateDefaultImgUrl(180, 180);
                $.each(styleList, function () {
                    styleHtml += '<li class="list-img dis-ib' + (this.Style == style ? ' active' : '') + '" role="styleItem" data-style="' + this.Style + '"><img src="' + this.Image + '" alt="" onerror="javascript:this.src=\'' + defImage + '\';" /></li>';
                });

                proPanel.find(_config.pSizeItems).html(pSizeHtml);
                proPanel.find(_config.styleItems).html(styleHtml);

                var product = _.view.getProduct(giftSelectorId, pSize, style);
                if (product) {
                    proPanel.find('[role="imageInfo"]').html('<img src="' + product.Photos[0] + '" alt="" onerror="javascript:this.src=\'' + defImage + '\';" />');
                    proPanel.find('[role="nameInfo"]').text(product.Name);
                }

                mui(_config.proPanel + '[data-giftselectorid="' + giftSelectorId + '"]').popover('show');
            },
            //选择规格
            selectPSize: function (giftSelectorId, pSize) {
                var proPanel = $(_config.proPanel + '[data-giftselectorid="' + giftSelectorId + '"]');
                var styleHtml = '';
                var styleList = _.view.getStyles(giftSelectorId, pSize);
                var style = styleList[0].Style;
                var defImage = smart.utility.generateDefaultImgUrl(180, 180);
                $.each(styleList, function (i) {
                    styleHtml += '<li class="list-img dis-ib' + (i == 0 ? ' active' : '') + '" role="styleItem" data-style="' + this.Style + '"><img src="' + this.Image + '" alt="" onerror="javascript:this.src=\'' + defImage + '\';" /></li>';
                });
                proPanel.find(_config.styleItems).html(styleHtml);

                var product = _.view.getProduct(giftSelectorId, pSize, style);
                if (product) {
                    proPanel.find('[role="imageInfo"]').html('<img src="' + product.Photos[0] + '" alt="" onerror="javascript:this.src=\'' + defImage + '\';" />');
                    proPanel.find('[role="nameInfo"]').text(product.Name);
                }

            },
            //选择色款
            selectStyle: function (giftSelectorId, pSize, style) {
                var proPanel = $(_config.proPanel + '[data-giftselectorid="' + giftSelectorId + '"]');
                var product = _.view.getProduct(giftSelectorId, pSize, style);
                if (product) {
                    var defImage = smart.utility.generateDefaultImgUrl(180, 180);
                    proPanel.find('[role="imageInfo"]').html('<img src="' + product.Photos[0] + '" alt="" onerror="javascript:this.src=\'' + defImage + '\';" />');
                    proPanel.find('[role="nameInfo"]').text(product.Name);
                }
            },
            //确定选择
            confirmSku: function (giftSelectorId, pSize, style) {
                var proPanel = $(_config.proPanel + '[data-giftselectorid="' + giftSelectorId + '"]');
                var productItem = $(_config.productItem + '[data-giftselectorid="' + giftSelectorId + '"]');

                var product = _.view.getProduct(giftSelectorId, pSize, style);

                if (product) {
                    var defImage = smart.utility.generateDefaultImgUrl(180, 180);
                    productItem.find('[role="productImageInfo"]').html('<img class="cm-img" src="' + product.Photos[0] + '" alt="" onerror="javascript:this.src=\'' + defImage + '\';" />');
                    productItem.find('[role="productNameInfo"]').text(product.Name);
                    productItem.find('[role="productPSizeInfo"]').text(product.Specification);
                    productItem.find('[role="productStyleInfo"]').text(product.Material + ';' + product.Color);

                    productItem.attr("data-sku", product.Sku).attr("data-psize", product.Specification).attr("data-style", product.Material + product.Color);

                    proPanel.attr("data-psize", product.Specification).attr("data-style", product.Material + product.Color);
                }

                mui(_config.proPanel + '[data-giftselectorid="' + giftSelectorId + '"]').popover('hide');
            },
            //获取规格列表
            getPSizes: function (giftSelectorId) {
                var product = JSLINQ(_productList).First(function (item) { return item.GiftSelectorId == giftSelectorId; });

                var pSizeList = [];
                if (!product)
                    return pSizeList;

                $.each(product.Products, function () {
                    if ($.inArray(this.Specification, pSizeList) == -1) {
                        pSizeList.push(this.Specification);
                    }
                });

                return pSizeList;
            },
            //获取色款列表
            getStyles: function (giftSelectorId, pSize) {
                var _product = JSLINQ(_productList).First(function (item) { return item.GiftSelectorId == giftSelectorId; });
                if (!_product)
                    return [];

                var products = JSLINQ(_product.Products).Where(function (item) { return item.Specification == pSize }).items;

                var styleList = [];
                $.each(products, function () {
                    if (this.Specification != pSize)
                        return true;

                    if ($.inArray(this.Material + this.Color, styleList) == -1) {
                        styleList.push({ Style: this.Material + this.Color, Image: this.Photos[1] });
                    }
                });

                return styleList;
            },
            //获取商品信息
            getProduct: function (giftSelectorId, pSize, style) {
                var _product = JSLINQ(_productList).First(function (item) { return item.GiftSelectorId == giftSelectorId; });
                if (!_product)
                    return null;

                return JSLINQ(_product.Products).First(function (item) { return item.Specification == pSize && (item.Material + item.Color == style) });
            }
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);
            this.validate = $.extend(_layout.validate, this.validate);

            _ = this;
            _config = this.conf;
            _container = this.conf.container;

            //初始化
            _.view.init();

            /*添加，减少*/
            //_container.on('click', this.conf.btnJianhao, function () {
            //    if ($(this).next(".num").val() == 0) {
            //        _.view.message.alert("所选赠品不能为负数！");
            //        return;
            //    }
            //    $(this).next(".num").val($(this).next(".num").val() - 1);
            //});
            //_container.on('click', this.conf.btnJiahao, function () {
            //    var zpNum = $(this).prev("input").val();
            //    if ($(this).prev().prev(".num").val() >= zpNum) {
            //        _.view.message.alert("所选赠品超出最大组数！");
            //        return;
            //    }
            //    $(this).prev().prev(".num").val($(this).prev().prev(".num").val() - 1 + 2);
            //});
            //_container.on('click', this.conf.btnDelZpList, function () {
            //    var giftRuleGroupId = $(this).next("input").val();
            //    _.view.delGroupZp(giftRuleGroupId);
            //});

            //+数量
            _container.on('tap', _config.addQuantity, function () {
                var giftGroupItem = $(this).parents(_config.giftGroupItem);
                var giftRuleGroupId = giftGroupItem.data("groupid");

                var input = giftGroupItem.find(_config.inputQuantity);
                var num = Number(input.val()) + 1;

                var isCanSend = _.view.checkCanChoseGroup(giftRuleGroupId, num);
                if (isCanSend)
                    input.val(num).attr("number", num);
            });
            //-数量
            _container.on('tap', _config.minusQuantity, function () {
                var input = $(this).parents(_config.giftGroupItem).find(_config.inputQuantity);
                var num = Number(input.val());
                if (num <= 1)
                    return;

                input.val(num - 1).attr("number", num - 1);
            });
            //修改数量
            _container.on('change', _config.inputQuantity, function () {
                var giftGroupItem = $(this).parents(_config.giftGroupItem);
                var giftRuleGroupId = giftGroupItem.data("groupid");

                var input = giftGroupItem.find(_config.inputQuantity);
                var oldNum = Number(input.attr('number'));
                var num = Number(input.val());

                if (num <= 0)
                    num = 1;

                var isCanSend = _.view.checkCanChoseGroup(giftRuleGroupId, num);
                if (isCanSend)
                    input.attr("number", num);
                else
                    input.val(oldNum);
            });

            //添加赠品
            _container.on('tap', _config.giftAdd, function () {
                var giftGroupItem = $(this).parents(_config.giftGroupItem);
                var giftRuleGroupId = giftGroupItem.data("groupid");
                var num = Number(giftGroupItem.find(_config.inputQuantity).val());

                //var giftRuleGroupId = $(this).attr("id").substr(12);
                //var num = Number($("#numgroup_" + $.trim(giftRuleGroupId)).val());
                if (num == 0) {
                    _.view.message.alert("不能添加0组商品，请至少选择一组商品");
                    return;
                }
                var isCanSend = _.view.checkCanChoseGroup(giftRuleGroupId, num);
                if (!isCanSend) {
                    _.view.message.alert("该活动已超过最大可赠送赠品数，操作失败！");
                    return;
                }

                _.view.selectGroupZpSku(giftGroupItem, num);

                //填充已选赠品
                _.view.showChooseInfo();
                _.view.fillZpList();

                mui.toast('添加成功');
            });
            //删除赠品
            _container.on('tap', _config.giftDelete, function () {
                var giftRuleGroupId = $(this).data("groupid");
                _.view.delGroupZp(giftRuleGroupId);
                mui.toast('删除成功');
                mui('#scroll1').scroll().scrollTo(0, 0, 100);//100毫秒滚动到顶    
                //mui('#scroll1').scroll[0].reLayout();
                //mui('#scroll1').scroll[0].scrollToBottom();
            });

            //弹出规格色款选择层
            _container.on('tap', _config.selectSku, function () {
                var productItem = $(this).parents(_config.productItem);
                var giftSelectorId = productItem.attr("data-giftselectorid");
                var psize = productItem.attr("data-psize");
                var style = productItem.attr("data-style");
                _.view.showProPanel(giftSelectorId, psize, style);
            });
            //选择规格
            _container.on('tap', _config.pSizeItem, function () {
                if ($(this).hasClass("active"))
                    return;
                $(this).addClass("active").siblings().removeClass("active");

                var proPanel = $(this).parents(_config.proPanel);
                var giftSelectorId = proPanel.attr("data-giftselectorid");
                var pSize = $(this).text();

                _.view.selectPSize(giftSelectorId, pSize);
            });
            //选择色款
            _container.on('tap', _config.styleItem, function () {
                if ($(this).hasClass("active"))
                    return;
                $(this).addClass("active").siblings().removeClass("active");

                var proPanel = $(this).parents(_config.proPanel);
                var giftSelectorId = proPanel.attr("data-giftselectorid");
                var pSize = proPanel.find(_config.pSizeItem + ".active").text();
                var style = $(this).data("style");

                _.view.selectStyle(giftSelectorId, pSize, style);
            });
            //确定选择
            _container.on('tap', _config.confirmSku, function () {
                var proPanel = $(this).parents(_config.proPanel);
                var giftSelectorId = proPanel.attr("data-giftselectorid");

                var oldPSzie = proPanel.attr("data-psize");
                var oldStyle = proPanel.attr("data-style");

                var pSize = proPanel.find(_config.pSizeItem + ".active").text();
                var style = proPanel.find(_config.styleItem + ".active").data("style");

                if (oldPSzie == pSize && oldStyle == style) {
                    mui(_config.proPanel + '[data-giftselectorid="' + giftSelectorId + '"]').popover('hide');
                    return;
                }

                _.view.confirmSku(giftSelectorId, pSize, style);
            });

            //显示已选择的赠品
            _container.on('tap', _config.showGifts, function () {
                var icon = $(this).find('.mui-icon');
                $(_config.giftListAdded).toggle();
                if (icon.hasClass('mui-icon-arrowdown')) {
                    icon.removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup');
                } else {
                    icon.removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown');
                    mui('#scroll1').scroll().scrollTo(0, 0, 100);//100毫秒滚动到顶    
                }
            });

            //下一步
            _container.on('tap', _config.next, function () {
                var allZpNum = 0, chosedZPNum = 0, canChoseZpNum = 0;
                for (var i = 0; i < _zpRuleList.length; i++) {
                    allZpNum += _zpRuleList[i].SendZpNum;
                }
                for (var i = 0; i < _giftRuleGroupData.length; i++) {
                    chosedZPNum += _giftRuleGroupData[i].Num;
                }
                canChoseZpNum = allZpNum - chosedZPNum;

                if (canChoseZpNum > 0) {
                    var str = "您还可以选择" + canChoseZpNum + "组赠品，确定要付款吗？";
                    _.view.message.popup({
                        type: 'confirm',
                        title: '温馨提示',
                        message: str,
                        className: 'Popup_err4',
                        callback: {
                            ok: function () {
                                _.view.addGift();
                            }
                        }
                    });
                } else {
                    _.view.addGift();
                }
            });
        }
    };
    return plugin.init();
});