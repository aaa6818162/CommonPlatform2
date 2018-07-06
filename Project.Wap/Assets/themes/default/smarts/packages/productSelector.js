var ProductSelector = (function () {
    function ProductSelector(panel) {
        this.panel = panel;
    }

    ProductSelector.prototype = {
        initSizeItem: function () {
            $(this.panel).each(function () {
                var currentGroup = $(this).data('group');
                var proUI;
                if (currentGroup == 'main') {
                    proUI = $$('product');
                } else {
                    proUI = $$('product.' + currentGroup);
                }
                if (proUI) {
                    var pSizes = proUI.getUniqueAttrValues('PSize');
                    var panel = $(this).find('[role="PSizeItems"]');
                    panel.html('');

                    var currPSize = $(this).data("psize");
                    var currsku = $(this).data("sku"); //默认的sku
                    for (var i = 0; i < pSizes.length; i++) {
                        //未上架商品暂时隐藏，2017年8月28日 15:38:11，赵勋涛
                        var skus = proUI.getSkus({ name: 'PSize', value: pSizes[i] });
                        if (JSLINQ(skus).Count(function (item) { return item.OnSale == 1; }) > 0)
                            panel.append('<div class="gg-btn dis-ib ' + (currPSize == pSizes[i] ? 'active' : '') + '" role ="PSizeItem" data-value="' + pSizes[i] + '">' + pSizes[i] + '</div>');
                    }

                    ProductSelector.initStyleItem(proUI, $(this), currPSize, currsku);
                }
            });
        },
        selectSize: function (domSize, callback) {
            $(this.panel).on("click", domSize, function () {
                var group = $(this).parents('[role="proPanel"]').data('group');
                if (group === 'main') {
                    this.proUI = $$('product');
                } else {
                    this.proUI = $$('product.' + group);
                }
                var pSizeValue = $(this).text();
                $(this).addClass("active").siblings().removeClass('active');
                var styles = this.proUI.getSkus({ name: 'PSize', value: pSizeValue });
                var anySku = this.proUI.getAnySku({ name: 'PSize', value: pSizeValue });
                if (anySku && anySku.OnSale == 2) {
                    var tmpSku = JSLINQ(styles).Where(function (item) { return item.OnSale == 1; }).FirstOrDefault();
                    if (tmpSku)
                        anySku = tmpSku;
                }

                ProductSelector.initStyleItem(this.proUI, $(this).parents('[role="proPanel"]'), pSizeValue, "");

                if (typeof callback == 'function') {
                    callback(styles, pSizeValue, anySku.Code, $(this));
                }
            });
        },
        selectStyle: function (domStyle, callback) {
            $(this.panel).on("click", domStyle, function () {
                var group = $(this).parents('[role="proPanel"]').data('group');

                if (group === 'main') {
                    this.proUI = $$('product');
                } else {
                    this.proUI = $$('product.' + group);
                }
                var text = $(this).text();
                var skuCode = $(this).data('sku');
                var sku = this.proUI.getSkuByCode(skuCode);
                if (typeof callback == 'function') {
                    callback(skuCode, text, $(this), sku.OnSale);
                }
            });
        }
    }

    ProductSelector.initStyleItem = function (proUI, detailPanel, pSize, currsku) {
        var styles = proUI.getSkus({ name: 'PSize', value: pSize });
        var anySku = proUI.getAnySku({ name: 'PSize', value: pSize });
        if (anySku && anySku.OnSale == 2) {
            var tmpSku = JSLINQ(styles).Where(function (item) { return item.OnSale == 1; }).FirstOrDefault();
            if (tmpSku)
                anySku = tmpSku;
        }
        var panelStyle = detailPanel.find('[role="StyleItems"]');
        panelStyle.html('');
        for (var i = 0; i < styles.length; i++) {
            var sku = styles[i];

            var img = smart.utility.generateDefaultImgUrl(80, 80);

            //色款对应的图片
            if (sku.Images.length > 0) { //注意 详情页sku.Images.ProductImageType为数字。购物袋则是描述  分别适配
                //面料材质图  ProductImageType = 5    //色块  ProductImageType = 6   //正面图  ProductImageType = 2
                var imgMaterialView = JSLINQ(sku.Images).Where(function (item) { return item.ProductImageType == "5" || item.ProductImageType == "MaterialView"; }).FirstOrDefault();
                //如果没有面料材质图
                if (!imgMaterialView)
                    imgMaterialView = JSLINQ(sku.Images).Where(function (item) { return item.ProductImageType == "3" || item.ProductImageType == "4" || item.ProductImageType == "1" || item.ProductImageType == "AngleView" || item.ProductImageType == "DetailView" || item.ProductImageType == "WithScene"; }).FirstOrDefault();
                if (imgMaterialView)
                    img = smart.utility.generateImgUrl(imgMaterialView.Items[0].Url, 80, 80);
            }

            var defaultsku = currsku; //是否有默认的sku 有默认
            if (defaultsku == "") {
                defaultsku = anySku.Code;
            }
            //未上架商品暂时隐藏，2017年8月28日 15:38:11，赵勋涛
            if (sku.OnSale == 1)
                panelStyle.append('<li role="StyleItem" data-sku="' + sku.Code + '" data-style="' + sku.Attributes.Material + sku.Attributes.Color + '" class="list-img dis-ib' + (sku.Code == defaultsku ? ' active' : '') + '" data-onsale="' + sku.OnSale + '"><img src="' + img + '" onerror="javascript:this.src=\'' + smart.utility.generateDefaultImgUrl(80, 80) + '\'" ' + (sku.OnSale == 1 ? '' : 'class="gray"') + ' /></li>');
        }
    };



    return ProductSelector;
}())