var ProductSelector=(function() {
    function ProductSelector(panel) {
        this.panel = panel;
    }
    ProductSelector.prototype= {
        initSizeItem : function() {
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
                    var panel = $('[role=PSize][data-group=' + currentGroup + ']').find('.btn-box');
                    panel.html('');
                    for (var i = 0; i < pSizes.length; i++) {
                        panel.append('  <div class="gg-btn dis-ib" role ="PSizeItem" data-value="' + pSizes[i] + '" style="cursor:pointer" ><p>' + pSizes[i] + '</p></div>');

                    }
                }
            });
        },
        selectSize : function(domSize, callback) {
            $(this.panel).on("click", domSize, function () {
                var group = $(this).parents('[role=PSize]').data('group');
                if (group === 'main') {
                    this.proUI = $$('product');
                } else {
                    this.proUI = $$('product.' + group);
                }
                var pSizeValue = $(this).data('value');
                var styles = this.proUI.getSkus({ name: 'PSize', value: pSizeValue });
                var anySku = this.proUI.getAnySku({ name: 'PSize', value: pSizeValue });
                if (typeof callback == 'function') {
                    callback(styles, pSizeValue, anySku.Code, $(this));
                }
            });
        },
        selectStyle : function (domStyle, callback) {
            $(this.panel).on("click", domStyle, function () {
                var group = $(this).parents('[role=Style]').data('group');
           
                if (group === 'main') {
                    this.proUI = $$('product');
                } else {
                    this.proUI = $$('product.' + group);
                }
                var text = $(this).data('text');
                var skuCode = $(this).data('sku');
                var sku = this.proUI.getSkuByCode(skuCode);
                if (typeof callback == 'function') {
                    callback(skuCode, text, $(this), sku.OnSale);
                }
            });
        }
    }
    return ProductSelector;
}())