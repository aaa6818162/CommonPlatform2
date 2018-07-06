smart.viewerEngineer.regedit('shopping', function (model) {
    var _;
    var _config;
    var _container;
    var isLogin = false;
    var isEdit = false;
    var hasChange = false;
    var scrollArea;
    var plugin = {
        conf: {
            cart: '[role="cart"]',//有商品区域
            nocart: '[role="nocart"]',//无商品区域

            selectAll: '[role="selectAll"]',//全选
            checkItem: '[role="checkItem"]',//单选

            cartlink: '[role="cartlink"]',//商品详情链接

            cartItem: '[role="cartItem"]',//购物车商品单行区域
            sizeItemList: '[role="sizeItemList"]',//规格色款编辑区域

            checkOut: '[role="checkOut"]',//结算

            quantityPanel: '[role="quantityPanel"]',
            addQuantity: '[role="addQuantity"]',//+数量
            minusQuantity: '[role="minusQuantity"]',//-数量
            inputQuantity: '[role="inputQuantity"]',//修改数量
            displayQuantity: '[role="displayQuantity"]',//数量显示标签

            changeSku: '[role="changeSku"]',//弹出规格色款选择
            confirmEdit: "[role=confirmEdit]",//选择规格色款后确定按钮
            close: '[role="close"]',//关闭色款选择区域

            editProduct: '[role="editProduct"]',//编辑/完成
            deleteProduct: '[role="deleteProduct"]',//删除

            proPanel: '[role="proPanel"]',//规格色款选择区域
            sizeItems: '[role="PSizeItems"]',//规格选择区域
            sizeItem: '[role="PSizeItem"]',//规格选择项
            styleItems: '[role="StyleItems"]',//色款选择区域
            styleItem: '[role="StyleItem"]',//色款选择项


            addWishlist: '[role="addWishlist"]'//添加wishlist
        },
        //验证
        validate: {

        },
        //页面处理
        view: {
            init: function () {
                scrollArea = mui('#scroll1').scroll();
                document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);//下拉购物车头部不固定的问题 5.3
            },
            selectSizeItem: function (styles, pSizeValue, code, obj) {
                var proPanel = obj.parents(_config.proPanel);
                var group = proPanel.data('group');
                var proUI = $$('product.' + group);

                var sku = proUI.getSkuByCode(code);
                var confirmEdit = proPanel.find(_config.confirmEdit);
                if (sku && sku.OnSale == 2) {
                    confirmEdit.attr("disabled", "disabled").parent().addClass('gray');
                } else {
                    confirmEdit.removeAttr("disabled").parent().removeClass('gray');
                }    
                _.view.bindPopSkuInfo(proPanel, sku);
            },
            selectStyleItem: function (sku, text, obj, onSale) {
                //选择色款时，下架的不能点击
                if (onSale == 2)
                    return;

                var proPanel = obj.parents(_config.proPanel);
                var group = proPanel.data('group');
                var proUI = $$('product.' + group);
                var currSku = proUI.getSkuByCode(sku);

                proPanel.find(_config.styleItem + '[data-sku="' + sku + '"]').addClass("active").siblings().removeClass('active');

                _.view.bindPopSkuInfo(proPanel, currSku);
            },
            bindPopSkuInfo: function (proPanel, sku) {
                var img = JSLINQ(sku.Images).Where(function (item) { return item.ProductImageType == "FrontView"; }).FirstOrDefault();
                if (!img)
                    img = JSLINQ(sku.Images).Where(function (item) { return item.ProductImageType == "WithScene"; }).FirstOrDefault();

                var defImage = smart.utility.generateDefaultImgUrl(180, 180);
                var image = img ? smart.utility.generateImgUrl(img.Items[0].Url, 180, 180) : defImage;

                proPanel.find('[role="productImage"]').attr('src', image).attr('alt', sku.ProductName);
                proPanel.find('[role="productName"]').text(sku.ProductName);

                var priceHtml = '';
                if (sku.Price != sku.OldPrice && sku.Price < sku.OldPrice) {
                    priceHtml = '<span class="vip-1">￥<i>' + sku.OldPrice + '</i></span>';
                    priceHtml += '<span class="vip-2">￥<i>' + sku.Price + '</i></span>';
                } else {
                    priceHtml = '<span class="">￥<i>' + sku.OldPrice + '</i></span>';
                }
                proPanel.find('[role="productPrice"]').html(priceHtml);
                proPanel.attr('data-newsku', sku.Code);
            },
            editSkuView: function (proPanel, cartItem, code) {
                var group = proPanel.data('group');
                var proUI = $$('product.' + group);
                var sku = proUI.getSkuByCode(code);

                var img = JSLINQ(sku.Images).Where(function (item) { return item.ProductImageType == "FrontView"; }).FirstOrDefault();
                if (!img)
                    img = JSLINQ(sku.Images).Where(function (item) { return item.ProductImageType == "WithScene"; }).FirstOrDefault();

                var defImage = smart.utility.generateDefaultImgUrl(180, 180);
                var image = img ? smart.utility.generateImgUrl(img.Items[0].Url, 180, 180) : defImage;

                var possalesmark = cartItem.data("possalesmark");
                var sign = sku.Code + "_" + possalesmark;
                var url = "/product-detail-" + sku.ProductID + "-" + sku.Code;

                cartItem.find('[role="productImage"]').attr('src', image).attr('alt', sku.ProductName);
                cartItem.find('[role="productName"]').text(sku.ProductName);

                var priceHtml = '';
                if (sku.Price != sku.OldPrice && sku.Price < sku.OldPrice) {
                    cartItem.find('[role="productPrice"]').parent().attr("class", "ifm-num");//编辑后同时修改父类的css （有促销价）
                    priceHtml = '<div class="num-1 dis-ib">￥<span>' + sku.OldPrice + '</span></div>';
                    priceHtml += '<div class="num-2 dis-ib">￥<span>' + sku.Price + '</span></div>';
                } else {
                    cartItem.find('[role="productPrice"]').parent().attr("class", "ifm-price");//编辑后同时修改父类的css（么有促销价）
                    priceHtml = '<div class="num-2 dis-ib">￥<span>' + sku.OldPrice + '</span></div>';
                }
                cartItem.find('[role="productPrice"]').html(priceHtml);

                cartItem.find('[id="PSize"]').text(sku.Attributes.PSize);
                cartItem.find('[role="Style"]').text(sku.Attributes.Material + ";" + sku.Attributes.Color);
                cartItem.find(_config.checkItem).val(sign);
                cartItem.attr('data-sku', sku.Code).attr('data-href', url).attr('data-isdown', sku.OnSale == 2 ? "1" : "0").removeClass("cart-dshelf");
                cartItem.find(_config.quantityPanel).show();
                cartItem.find(".fail-img").remove();

                proPanel.attr('data-sku', sku.Code).attr("id", sign).attr('data-psize', sku.Attributes.PSize).attr('data-style', sku.Attributes.Material + sku.Attributes.Color);
                proPanel.find(_conf.close).attr('id', sign);  //关闭id变化
                proPanel.find(_conf.confirmEdit).attr('id', sign); //确定按钮的ID变化 （确认之前再一次编辑的情况）
            },
            emptyCart: function () {
                $("#cartcount").text("0");
                //$("#cartEmpty").removeClass("hide");
                //$("#cartShow").addClass("hide");
                //$(_config.selectAll).prop("checked", false);

                $(_config.nocart).show();
                $(_config.cart).hide();
            },
            getCartList: function (t) {
                //t：0所有的，1过滤下架的
                t = t || 0;
                var cartList = [];
                $(_config.checkItem + ":checked").each(function () {
                    var isdown = $(this).parents(_config.cartItem).attr("data-isdown") == "1";
                    if (!isdown || t == 0) {
                        var sku = $(this).parents(_config.cartItem).attr("data-sku");
                        var salesmark = $(this).parents(_config.cartItem).attr("data-possalesmark");
                        cartList.push({
                            Sku: sku,
                            Quantity: 0,
                            SalesMark: salesmark
                        });
                    }
                });
                return cartList;
            },
            getCartHtml: function (data) {
                var isCollected = data.IsCollected;
                var isDown = data.Status == "下架";

                var url = !data.IsGroupProduct ? "/product-detail-" + data.ProductId + "-" + data.Productcode : "";

                var image = smart.utility.generateImgUrl(data.PicturePath, 180, 180);
                var defImage = smart.utility.generateDefaultImgUrl(180, 180);
                if (!image) {
                    image = defImage;
                }

                var sign = data.Productcode + '_' + data.Possalesmark;

                var countHtml = '<div class="count" role="quantityPanel">\
                            <span class="plus dis-ib" role="minusQuantity">-</span><input type="text" class="ct-num dis-ib" role="inputQuantity" value="' + data.Quantity + '" /><span class="reduce dis-ib" role="addQuantity">+</span>\
                        </div>';

                var html = '';
                var priceHtml = '';
                var priceHtml1 = '';
                if (data.Price != data.PrdPriceSubDiscount && data.Price > data.PrdPriceSubDiscount) { //原价大于促销价 显示 否则 不显示
                    priceHtml = '<div class="num-1 dis-ib">￥<span>' + data.Price + '</span></div>';
                    priceHtml += '<div class="num-2 dis-ib">￥<span>' + data.PrdPriceSubDiscount + '</span></div>';

                    priceHtml1 = '<span class="vip-1">￥<i>' + data.Price + '</i></span>';
                    priceHtml1 += '<span class="vip-2">￥<i>' + data.PrdPriceSubDiscount + '</i></span>';
                } else {
                    priceHtml = '<div class="num-2 dis-ib">￥<span>' + data.Price + '</span></div>';
                    priceHtml1 = '<span class="">￥<i>' + data.Price + '</i></span>';
                }

                if (data.IsGroupProduct) {
                    html = '<div role="cartItem" class="cart-list' + (isDown ? ' cart-dshelf' : '') + '" data-sku="' + data.Productcode + '" data-possalesmark="' + data.Possalesmark + '" data-isdown="' + (isDown ? '1' : '0') + '">';

                    var groupCheck = '<div class="mui-input-row mui-checkbox mui-left list-checkbox dis-ib comb-radio">\
                        <input class="cart-radio" type="checkbox" role="checkItem" checked="checked" value="' + sign + '">\
                    </div>';

                    var groupPrice = '<div class="' + (data.Price != data.PrdPriceSubDiscount && data.Price > data.PrdPriceSubDiscount ? 'ifm-num' : 'ifm-price') + '">组合价 :\
                        ' + priceHtml + '\
                        <div class="num-3 dis-ib fr">× <span role="displayQuantity">' + data.Quantity + '</span></div>\
                    </div>';

                    $.each(data.ProductList, function (i, item) {
                        var itemUrl = "/product-detail-" + item.ProductID + "-" + item.Sku;

                        var itemImage = smart.utility.generateImgUrl(item.PicturePath, 180, 180);
                        if (!itemImage) {
                            itemImage = defImage;
                        }

                        html += '<div class="pos-r">\
                        '+ (i == 0 ? groupCheck : '') + '\
                        <div class="dis-ib list-img ' + (i == 0 ? '' : 'ml65') + ' pos-r" role="cartlink" data-href="' + itemUrl + '">\
                            <img role="productImage" class="cm-img" alt="' + item.Name + '"  src="' + itemImage + '" onerror="javascript: this.src = \'' + defImage + '\'" >\
                            ' + (isDown ? '<div class="pos-a shelves-txt">已下架</div>' : '') + '\
                        </div>\
                        <div class="dis-ib list-ifm" role="cartlink" data-href="' + itemUrl + '">\
                            <div class="ifm-name">\
                                <div class="dis-ib nametxt" role="productName">' + item.Name + '</div>\
                            </div>\
                            <div class="ifm-gg" role="PSize">' + item.ProductStandard + '</div>\
                            <div class="ifm-sk">\
                                <div class="dis-ib sktxt" role="Style">' + item.ProductMaterial + ';' + item.ProductColor + '</div>\
                            </div>\
                            <div class="ifm-price">\
                                <div class="num-2 dis-ib">￥<span class="num-zc">' + item.OldPrice + '</span></div>\
                                <div class="num-3 dis-ib fr">X ' + item.Quantity + '</div>\
                            </div>\
                            ' + (i == data.ProductList.length - 1 ? countHtml : '') + '\
                            ' + (i == data.ProductList.length - 1 ? groupPrice : '') + '\
                        </div>\
					</div>';
                    });
                    html += '</div>';
                } else {

                    html = '<div role="cartItem" class="cart-list pos-r' + (isDown ? ' cart-dshelf' : '') + '" data-sku="' + data.Productcode + '" data-possalesmark="' + data.Possalesmark + '" data-isdown="' + (isDown ? '1' : '0') + '">\
                    <div class="mui-input-row mui-checkbox mui-left list-checkbox dis-ib" comb-radio>\
                        <input class="cart-radio" type="checkbox" role="checkItem" checked="checked" value="' + sign + '">\
                    </div>\
                    <div class="dis-ib list-img pos-r" role="cartlink" data-href="' + url + '">\
                        <img role="productImage" class="cm-img" alt="' + data.ProductName + '"  src="' + image + '" onerror="javascript: this.src = \'' + defImage + '\'" >\
                    ' + (isDown ? '<div class="pos-a shelves-txt">已下架</div>' : '') + '\
                    </div>\
                    <div class="dis-ib list-ifm" role="cartlink" data-href="' + url + '">\
                        <div class="ifm-name">\
                            <div class="dis-ib nametxt" role="productName">' + data.ProductName + '</div>\
                        </div>\
                        '+ countHtml + '\
                        <div class="ifm-gg" role="changeSku" id="PSize">' + data.ProductStandard + '</div>\
                        <div class="ifm-sk" role="changeSku">\
                            <div class="dis-ib sktxt" role="Style">' + data.ProductMaterial + ';' + data.ProductColor + '</div><span class="mui-icon mui-icon-arrowdown fr"></span>\
                        </div>\
                        <div class="' + (data.Price != data.PrdPriceSubDiscount && data.Price > data.PrdPriceSubDiscount ? 'ifm-num' : 'ifm-price') + '">\
                            <span role="productPrice" id="msg-'+ data.Productcode + '">\
                            ' + priceHtml + '\
                            </span>\
                            <div class="num-3 dis-ib fr">× <span role="displayQuantity">' + data.Quantity + '</span></div>\
                        </div>\
                    </div>\
					<div class="list-icon">\
						<i class="fr icon iconfont icon-tubiaozhizuomoban15 pos-a' + (isCollected ? ' active' : '') + '" ' + (isCollected ? '' : 'role="addWishlist"') + '></i>\
					</div>\
                </div>';
                }

                if (!data.IsGroupProduct) {
                    var sizeItemHtml = '<div id="' + sign + '" role="proPanel" data-group="' + data.ProductId + '" data-sku="' + data.Productcode + '" data-psize="' + data.ProductStandard + '" data-style="' + data.ProductMaterial + data.ProductColor + '" class="mui-popover mui-popover-action mui-popover-bottom gd-ggsk picture" style="display: none;">\
                    <div class="mui-scroll-wrapper">\
                        <div class="mui-scroll">\
                            <a href="javascript:void(0);" class="close pos-a" role="close" id="' + sign + '"><img src="/Assets/themes/default/images/goodDetail/gd-close.png"></a>\
                            <div class="ggsk-box">\
                                <div class="ggsk-main">\
                                    <div class="picturn-hd">\
                                        <div class="dis-ib vm"><img role="productImage" src="' + image + '" alt="' + data.ProductName + '" onerror="javascript: this.src = \'' + defImage + '\'" ></div>\
                                        <div class="dis-ib vm">\
                                            <p class="hd-title" role="productName">' + data.ProductName + '</p>\
                                            <p class="hd-price" role="productPrice">\
                                            ' + priceHtml1 + '\
                                            </p>\
                                        </div>\
                                    </div>\
                                    <div class="gg">\
                                        <p>规格</p>\
                                        <div class="btn-box" role="PSizeItems">\
                                        </div>\
                                    </div>\
                                    <div class="sk">\
                                        <p>色款</p>\
                                        <ul class="sk-list" role="StyleItems">\
                                        </ul>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="ggsk-btn">\
                                <a href="javascript:void(0);" role="confirmEdit" id="' + sign + '" data-href="#' + sign + '">确&nbsp;定</a>\
                            </div>\
                        </div>\
                    </div>\
                </div>';
                    $(_config.sizeItemList).append(sizeItemHtml);
                }
                //console.log(html);
                return html;
            }
        },
        events: {
            splitProductData: function (str) {
                var data = [];
                if (str.indexOf("_") > -1) {
                    var p = str.split("_");
                    data.push({
                        sku: p[0],
                        salesmark: p[1]
                    });
                }
                return data;
            },
            selectAll: function (isChecked) {
                var cartCheckData = [];
                if (isChecked) {
                    $(_config.checkItem).each(function () {
                        var sku = $(this).parents(_config.cartItem).attr("data-sku");
                        var isDown = $(this).parents(_config.cartItem).attr("data-isdown") == "1";
                        cartCheckData.push({
                            Sku: sku,
                            IsCheck: isDown ? "0" : "1"
                        });

                        $(this).prop("checked", true);
                    });
                } else {
                    $(_config.checkItem).each(function () {
                        var sku = $(this).parents(_config.cartItem).attr("data-sku");
                        cartCheckData.push({
                            Sku: sku,
                            IsCheck: "0"
                        });
                        $(this).prop("checked", false);
                    });

                    $("#totalPrice").text('0');
                    //$("#discount").text('0');
                    $("#totalamount").text('0');
                }
                _.events.asyncCartCheck(cartCheckData);
            },
            selectItem: function (sku, isChecked, isdown) {
                var cartCheckData = [];
                if (sku != "") {
                    var cks = $(_config.checkItem).length;
                    var ckd = $(_config.checkItem + ":checked").length;
                    if (!isChecked) {
                        cartCheckData.push({
                            Sku: sku,
                            IsCheck: "0"
                        });
                        $(_config.selectAll).prop("checked", false);

                    } else {
                        var isDown = $(_config.cartItem + '[data-sku="' + sku + '"]').attr("data-isdown") == "1";
                        cartCheckData.push({
                            Sku: sku,
                            IsCheck: isDown ? "0" : "1"
                        });
                    }
                    if (cks == ckd) {
                        $(_config.selectAll).prop("checked", true);
                    }

                    if (!isdown)
                        _.events.asyncCartCheck(cartCheckData);
                }
            },
            editQuantity: {
                minusQuantity: function (sku, salesmark, num) {
                    if (_.validate.checkNumber(num)) {
                        num = parseInt(num) - 1;
                        if (num <= 0) {
                            return;
                        }
                        //修改购物车内购买商品数量时，先清空当前商品行中的错误信息
                        //此方法不放在changeQuantity中，因为在checkOut中会判断商品数量超库存提示【错误信息】后然后调changeQuantity修改为最大库存，不能将之前的信息给清了
                        //_.events.editQuantity.clearMessage(sku, salesmark);
                        _.events.editQuantity.changeQuantity(sku, num, salesmark);
                    }
                },
                addQuantity: function (sku, salesmark, num) {
                    if (_.validate.checkNumber(num)) {
                        num = parseInt(num) + 1;
                        //修改购物车内购买商品数量时，先清空当前商品行中的错误信息
                        //_.events.editQuantity.clearMessage(sku, salesmark);
                        _.events.editQuantity.changeQuantity(sku, num, salesmark);
                    }
                },
                inputQuantity: function (sku, salesmark, num) {
                    var isNumber = _.validate.checkNumber(num);
                    if (!isNumber)
                        num = 1;
                    else
                        num = parseInt(num); //解决数字后加.调用接口出现错误的问题 by shk 2016-08-19

                    //修改购物车内购买商品数量时，先清空当前商品行中的错误信息
                    //_.events.editQuantity.clearMessage(sku, salesmark);
                    _.events.editQuantity.changeQuantity(sku, num, salesmark);
                },
                changeQuantity: function (sku, quantity, salesmark) {
                    if (sku != "" && parseInt(quantity) > 0) {
                        if (quantity > 999) {
                            quantity = 999;
                        }

                        cart.changeQuantity(sku, quantity, salesmark, function (msg) {
                            var json = msg;
                            var sign = "item_" + sku + "_" + salesmark;
                            if (json.Result.IsSuccess == true) {
                                $.top_refresh();

                                $(_config.cartItem + '[data-sku=' + sku + '] ' + _config.inputQuantity).val(quantity);
                                $(_config.cartItem + '[data-sku=' + sku + '] ' + _config.displayQuantity).text(quantity);

                                _.events.resetCartAmount();
                            } else {
                                //TODO 弹出错误提示
                                //$("#" + sign).find("i[name='msg']").text(json.Result.Message);

                                //判断库存不足情况下，设置当前商品数量为最大库存数
                                if (json.Result.Message.indexOf("库存不足") != -1 && _.validate.checkNumber(json.Result.Result)) {
                                    mui.toast('库存不足！', {
                                        duration: 'long(1000ms)',
                                        type: 'div'
                                    });
                                    var num = parseInt(json.Result.Result);
                                    _.events.editQuantity.changeQuantity(sku, num, salesmark);
                                }
                            }
                        });
                    }
                },
                //清空商品行中的提示信息
                clearMessage: function (sku, salesmark) {
                    //var sign = "item_" + sku + "_" + salesmark;
                    //$("#" + sign).find("i[name='msg']").text('');
                }
            },

            getCart: function () {
                $(_config.editProduct).text('编辑');
                isEdit = hasChange = false;

                var cartList = [];
                $.ajax({
                    type: "POST",
                    url: "/Shopping/GetCart",
                    cache: false,
                    async: false,
                    data: "cart=" + JSON.stringify(cartList),
                    success: function (msg) {
                        var json = jQuery.parseJSON(msg);
                        pageConfig.setProductArray(json.products);
                        if (json.status == "success") {
                            if (json.Cart.Customerid != "" && json.Cart.Customerid != undefined) {
                                isLogin = true;
                                var cartCheckData = [];
                                var product = json.Cart.ShoppingCartProductList;
                                $(product).each(function (index, data) {
                                    if (data.Status == "正常销售") {
                                        cartCheckData.push({
                                            Sku: data.Productcode,
                                            IsCheck: "1"
                                        });
                                    } else {
                                        cartCheckData.push({
                                            Sku: data.Productcode,
                                            IsCheck: "0"
                                        });
                                    }
                                });
                                if (cartCheckData.length > 0) {
                                    cart.changeCartCheck(cartCheckData, function (msg) {
                                        if (msg.Result.IsSuccess == true) {
                                            cart.getCart(function (msg) {
                                                var returnResult = jQuery.parseJSON(msg.Result.Result);
                                                productcount = returnResult.productcount;
                                                //$("#items").empty();
                                                $("#totalPrice").text(returnResult.totalprice);
                                                //$("#discount").text(returnResult.discount);
                                                $("#totalamount").text(returnResult.total);
                                                $("#productcount").text(productcount);

                                                $(_config.nocart).hide();
                                                $(_config.cart).show();

                                                for (var i = 0; i < json.Cart.ShoppingCartProductList.length; i++) {
                                                    var ProductUnit = JSLINQ(returnResult.products).Where(function (item) {
                                                        return item.productcode == json.Cart.ShoppingCartProductList[i].Productcode;
                                                    }).FirstOrDefault();
                                                    if (ProductUnit != undefined) {
                                                        json.Cart.ShoppingCartProductList[i].Possalesmark = ProductUnit.salesmark;
                                                        json.Cart.ShoppingCartProductList[i].IsGroupProduct = ProductUnit.isGroupProduct; //(ProductUnit.isGroupProduct == "1");
                                                        if (json.Cart.ShoppingCartProductList[i].Status != "下架") {
                                                            json.Cart.ShoppingCartProductList[i].Status = ProductUnit.status;
                                                        } else {
                                                            json.Cart.ShoppingCartProductList[i].ProductStandard = ProductUnit.productstandard;
                                                            json.Cart.ShoppingCartProductList[i].ProductMaterial = ProductUnit.productmaterial;
                                                            json.Cart.ShoppingCartProductList[i].ProductColor = ProductUnit.productcolor;
                                                            json.Cart.ShoppingCartProductList[i].ProductName = ProductUnit.productname;
                                                            json.Cart.ShoppingCartProductList[i].Price = ProductUnit.price;
                                                            json.Cart.ShoppingCartProductList[i].PrdPriceSubDiscount = ProductUnit.pricesubdiscount;
                                                            json.Cart.ShoppingCartProductList[i].ProductId = ProductUnit.productid;
                                                        }
                                                    }
                                                }

                                                //此处使用购物车商品数量进行判断，解决当购物车中只存在一个下架商品时，不显示的问题
                                                if (json.Cart.ShoppingCartProductList.length > 0) {
                                                    var html = "";
                                                    var product = JSLINQ(json.Cart.ShoppingCartProductList).OrderByDescending(function (item) { return item.Status; }).items;
                                                    $(product).each(function (index, data) {
                                                        html += _.view.getCartHtml(data);
                                                    });
                                                    $("#items").html(html);
                                                    _.events.productSelector();
                                                    if (json.Cart.ShoppingCartProductList.length > 0) {
                                                        $(_config.selectAll).prop("checked", true);
                                                    }

                                                    scrollArea.scrollTo(0, 0, 100);
                                                } else {
                                                    _.view.emptyCart();
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                            else {
                                isLogin = false;
                                //$("#items").empty();
                                $("#totalPrice").text(json.Cart.TotalPrice);
                                //$("#discount").text(json.Cart.Discount);
                                $("#totalamount").text(json.Cart.Total);
                                var productcount = json.Cart.Quantity;
                                $("#productcount").text(productcount);

                                $(_config.nocart).hide();
                                $(_config.cart).show();

                                if (json.Cart.ShoppingCartProductList.length > 0) {
                                    var html = "";
                                    var product = JSLINQ(json.Cart.ShoppingCartProductList).OrderByDescending(function (item) { return item.Status; }).items;
                                    $(product).each(function (index, data) {
                                        html += _.view.getCartHtml(data);
                                    });

                                    $("#items").html(html);
                                    _.events.productSelector();
                                    if (json.Cart.ShoppingCartProductList.length > 0) {
                                        $(_config.selectAll).prop("checked", true);
                                    }
                                    scrollArea.scrollTo(0, 0, 100);
                                } else {
                                    _.view.emptyCart();
                                }
                            }


                        } else {
                            _.view.message.alert(json.msg);
                        }
                    }
                });
            },

            resetCartAmount: function () {
                if (isLogin) {
                    cart.getCart(function (msg) {
                        var returnResult = jQuery.parseJSON(msg.Result.Result);
                        var productcount = returnResult.productcount;
                        $("#totalPrice").text(returnResult.totalprice);
                        //$("#discount").text(returnResult.discount);
                        $("#totalamount").text(returnResult.total);
                        $("#productcount").text(productcount);
                    });
                } else {
                    var CheckedSkus = "";
                    var cartList = _.view.getCartList(1);
                    if (cartList.length > 0) {
                        for (var item in cartList) {
                            CheckedSkus += cartList[item].Sku + ",";
                        }
                    } else {
                        CheckedSkus = "999999";
                    }

                    $.ajax({
                        type: "POST",
                        url: "/Shopping/GetCart",
                        cache: false,
                        async: false,
                        data: "CheckedSkus=" + CheckedSkus,
                        success: function (msg) {
                            var json = jQuery.parseJSON(msg);
                            if (json.status == "success") {
                                $("#totalPrice").text(json.Cart.TotalPrice);
                                //$("#discount").text(json.Cart.Discount);
                                $("#totalamount").text(json.Cart.Total);
                                var productcount = json.Cart.Quantity;
                                $("#productcount").text(productcount);
                            }
                        }
                    });
                }
            },

            removeCart: function (skus) {
                if (skus.length == 0)
                    return;
                $.each(skus, function (i, item) {
                    cart.remove(item.Sku, 0, item.SalesMark, function (msg) {
                        var json = msg;
                        if (json.Success && json.Result.IsSuccess) {
                            $(_config.cartItem + '[data-sku=' + item.Sku + ']').remove();
                            scrollArea.scrollTo(0, 0, 100);//100毫秒滚动到顶
                        } else {
                            _.view.message.alert("移除购物车失败。");
                        }
                    }, false);
                });

                $.top_refresh();
                _.events.getCart();
                if ($(_config.checkItem).length == 0) {
                    _.view.emptyCart();
                }
            },

            productSelector: function () {
                smart.packages('productSelector', function () {
                    var selector = new ProductSelector(_config.proPanel);
                    selector.initSizeItem();
                    selector.selectSize(_config.sizeItem, function (styles, pSizeValue, code, obj) {
                        _.view.selectSizeItem(styles, pSizeValue, code, obj);
                    });
                    selector.selectStyle(_config.styleItem, function (skuCode, text, obj, onSale) {
                        _.view.selectStyleItem(skuCode, text, obj, onSale);
                    });
                });
            },

            asyncCartCheck: function (data) {
                if (data.length > 0) {
                    cart.changeCartCheck(data, function (msg) {
                        if (msg.Result.IsSuccess == true) {
                            _.events.resetCartAmount();
                        }
                    });
                } else {
                    $(_config.selectAll).prop("checked", false);
                    $("#totalPrice").text("0");
                    //$("#discount").text("0");
                    $("#totalamount").text("0");
                    $("#productcount").text("0");
                }
            },

            checkOut: function () {
                $.isLocalLogin(function () {
                    var cartList = _.view.getCartList(1);
                    if (cartList.length > 0) {
                        var submitJson = {
                            CartSubmitSubList: cartList
                        }
                        cart.submitCart(submitJson, function (msg) {
                            var json = msg;
                            if (json.Result.IsSuccess == true) {
                                window.location.href = "/Trading/Order/ConfirmOrder";
                            } else if (json.status == "notauthorized") {
                                window.location.href = json.Result.loginUrl;
                            } else {
                                try {
                                    var returnMsg = jQuery.parseJSON(json.Result.Message);
                                    var notStockList = returnMsg.notinstock;
                                    if (notStockList != "" && notStockList != undefined) {
                                        $(notStockList).each(function (index, data) {
                                            //var item = "#item_" + data.pid + "_" + data.salesmark;
                                            //$(item).find("input[name='quantity']").val(maxstocknum);
                                            var msg = "#msg-" + data.pid;
                                            var maxstocknum = parseInt(data.maxstocknum);
                                            if (maxstocknum == 0) {
                                                $(msg).append('<div class="num-2 dis-ib" style="color:red" id="itemmsg"><span>该商品暂无库存</span></div>');
                                                //$(item).find("i[name='msg']").text("该商品暂无库存");
                                            } else {
                                                $(msg).append('<div class="num-2 dis-ib" style="color:red" id="itemmsg"><span>商品数量不能大于' + maxstocknum + '</span></div>');
                                                //$(item).find("i[name='msg']").text("商品数量不能大于" + maxstocknum);
                                            }

                                            if (maxstocknum > 0) {
                                                _.events.editQuantity.changeQuantity(data.pid, maxstocknum, data.salesmark);
                                            }
                                        });
                                    }
                                    _.view.message.alert(returnMsg.msg);
                                } catch (e) {
                                    _.view.message.alert(json.Result.Message);
                                } 
                            }
                        });
                    } else {
                        _.view.message.alert("请至少选中一件商品");
                    }
                }, function () {
                    var url = 'http://' + window.location.host + window.location.pathname + window.location.search;
                    _.view.ssounAuthorized(url);
                });
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

            _.view.init();

            _.events.getCart();

            //全选
            _container.off('click', _config.selectAll);
            _container.on('click', _config.selectAll, function () {
                var isChecked = $(this).is(":checked");
                _.events.selectAll(isChecked);
            });
            //单选
            _container.off('click', _config.checkItem);
            _container.on('click', _config.checkItem, function () {
                var sku = $(this).parents(_config.cartItem).attr("data-sku");
                var isdown = $(this).parents(_config.cartItem).attr("data-isdown") == "1";
                var isChecked = $(this).is(":checked");
                _.events.selectItem(sku, isChecked, isdown);
            });

            //跳转详情页
            _container.off('tap', _config.cartlink);
            _container.on('tap', _config.cartlink, function () {
                if (isEdit)
                    return;
                var href = $(this).attr("data-href");
                if (href)
                    window.location.href = href;
            });

            //编辑/完成
            _container.off('tap', _config.editProduct);
            _container.on('tap', _config.editProduct, function () {
                var txt = $(this).text();
                if (txt == '编辑') {
                    $(_config.cartItem + '[data-isdown="0"]' + " " + _config.quantityPanel + "," + _config.cartItem + '[data-isdown="0"]' + "  .mui-icon-arrowdown").show();
                    $(".ifm-name,.ifm-num,.list-icon,.ifm-price").hide();
                    $(this).text('完成');
                    isEdit = true;
                } else {
                    $(_config.cartItem + " " + _config.quantityPanel + "," + _config.cartItem + "  .mui-icon-arrowdown").hide();
                    $(".ifm-name,.ifm-num,.list-icon,.ifm-price").show();
                    $(this).text('编辑');
                    isEdit = false;
                    if (hasChange) {
                        hasChange = false;
                        $(_config.sizeItemList).html("");//必须清理之前的items;不然内容重复导致错误。
                        _.events.getCart();
                    } else {
                        scrollArea.scrollTo(0, 0, 100);//100毫秒滚动到顶
                    }
                }
            });
            //选择规格、色款
            _container.off('tap', _config.changeSku);
            _container.on('tap', _config.changeSku, function () {
                if (!isEdit)
                    return;
                var isdown = $(this).parents(_config.cartItem).attr("data-isdown") == "1";
                if (isdown)
                    return;

                var salesmark = $(this).parents(_config.cartItem).data("possalesmark");
                var sku = $(this).parents(_config.cartItem).attr("data-sku");
                mui('.mui-scroll-wrapper').scroll();//必须初始化 
                mui("#" + sku + "_" + salesmark).popover('toggle');
            });

            //关闭选择规格、色款
            _container.off('tap', _config.close);
            _container.on('tap', _config.close, function () {
                var id = $(this).attr("id");//当前面板id
                mui("#" + id).popover('hide');
            });
            //确定修改
            _container.off('tap', _config.confirmEdit);
            _container.on('tap', _config.confirmEdit, function () {
                if (!isEdit)
                    return;

                if ($(this).attr("disabled"))
                    return;

                var id = $(this).attr("id"); //当前面板id
                mui("#" + id).popover('hide');

                var proPanel = $(this).parents(_config.proPanel);
                var sku = proPanel.attr("data-sku");
                var newsku = proPanel.attr("data-newsku");
                if (!newsku || sku == newsku)
                    return;
                var onsale = proPanel.find(_config.styleItem + '[data-sku="' + newsku + '"]').data("onsale");
                if (onsale == "2")
                    return;

                hasChange = true;
                var cartItem = $(_config.cartItem + '[data-sku="' + sku + '"]');
                var num = cartItem.find(_config.inputQuantity).val();

                cart.changeCartProduct(sku, newsku, num, function (r) {
                    if (r.Result.IsSuccess) {
                        _.view.editSkuView(proPanel, cartItem, newsku);
                    } else {
                        _.view.message.alert(r.Result.Message);
                    }
                });
            });
            //删除
            _container.off('tap', _config.deleteProduct);
            _container.on('tap', _config.deleteProduct, function () {
                var cartList = _.view.getCartList();
                if (cartList.length == 0) {
                    _.view.message.alert('请选择需要删除的商品！');
                    return;
                }

                _.view.message.confirm("您确定要删除该商品吗？", function () { _.events.removeCart(cartList); });
            });

            //减少数量
            _container.off('tap', _config.minusQuantity);
            _container.on('tap', _config.minusQuantity, function () {
                if (!isEdit)
                    return;

                var salesmark = $(this).parents(_config.cartItem).data("possalesmark");
                var sku = $(this).parents(_config.cartItem).attr("data-sku");
                var num = $(this).parents(_config.cartItem).find(_config.inputQuantity).val();
                _.events.editQuantity.minusQuantity(sku, salesmark, num);
            });
            //修改数量
            _container.off('change', _config.inputQuantity);
            _container.on('change', _config.inputQuantity, function () {
                if (!isEdit)
                    return;
                var salesmark = $(this).parents(_config.cartItem).data("possalesmark");
                var sku = $(this).parents(_config.cartItem).attr("data-sku");
                var num = $(this).val();
                _.events.editQuantity.inputQuantity(sku, salesmark, num);
            });
            //增加数量
            _container.off('tap', _config.addQuantity);
            _container.on('tap', _config.addQuantity, function () {
                if (!isEdit)
                    return;

                var salesmark = $(this).parents(_config.cartItem).data("possalesmark");
                var sku = $(this).parents(_config.cartItem).attr("data-sku");
                var num = $(this).parents(_config.cartItem).find(_config.inputQuantity).val();
                _.events.editQuantity.addQuantity(sku, salesmark, num);
            });

            //结算
            _container.off('tap', _config.checkOut);
            _container.on('tap', _config.checkOut, function () {
                _.events.checkOut();
            });

            //add wishlist
            _container.off('tap', _config.addWishlist);
            _container.on('tap', _config.addWishlist, function () {
                var salesmark = $(this).parents(_config.cartItem).data("possalesmark");
                var sku = $(this).parents(_config.cartItem).attr("data-sku");
                $.isLocalLogin(function () {
                    smart.packages("wishlist", function () {
                        wishlist.addWishlist(1, sku, function (result) {
                            if (result.success) {
                                mui.toast('<div>成功移入Wishlist，您可以在“个人中心-我的Wishlist”中找到</div>', { duration: 'long', type: 'div' });
                                _.events.removeCart([{ Sku: sku, SalesMark: salesmark }]);
                            } else {
                                _.view.message.alert(result.message);
                            }
                        });
                    });
                }, function () {
                    var url = 'http://' + window.location.host + window.location.pathname + window.location.search;
                    _.view.ssounAuthorized(url);
                });
            });
        }
    };
    return plugin.init();
});