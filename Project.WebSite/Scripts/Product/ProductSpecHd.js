

var pro = pro || {};
(function () {
    pro.Product = pro.Product || {};
    pro.Product.ProductSpecHd = pro.Product.ProductSpecHd || {};
    pro.Product.ProductSpecHd = {
        opData: {
            speclist: [],
            chooseSpecList: [],
            skuList: [],
            lastChooseSpec: { SpecId: "", SpecValueId: "" },
            bindEntity: {}
        },
        init: function () {
            this.opData.speclist = JSON.parse($("#SpecVmList").val());

            this.initSpecChooseArea();
            this.initEvent();

            if ($("#BindEntity").val()) {
                var bindEntity = JSON.parse($("#BindEntity").val());
                pro.Product.ProductSpecHd.opData.bindEntity = bindEntity;
                pro.Product.ProductSpecHd.opData.skuList = bindEntity.GoodsEntityList;
            }
        },
        initEvent: function () {

        },
        //初始化规格选择区域
        initSpecChooseArea: function () {

            var html = "";
            JSLINQ(this.opData.speclist).ForEach(function (spec) {

                var specValueHtml = "";
                JSLINQ(spec.SpecValueList).ForEach(function (specValue) {

                    if (specValue.IfCanChoose == 1) {
                        //图片类型
                        var imageHmtl = "";
                        specValueHtml += '<li id="spec_' + specValue.SpecId + '_' + specValue.SpecValueId + '" name="spec_' + specValue.SpecId + '"    value="' + specValue.SpecValueId + '"    onclick="pro.Product.ProductSpecHd.chooseSpec(this)">\
                        ' + specValue.SpecValueName + '\
                        <input  style="display:none" for="spec_' + specValue.SpecId + '_' + specValue.SpecValueId + '" type="text" value="' + specValue.SpecValueName + '"  orgValue="' + specValue.SpecValueName + '"/>\
                    </li>';
                    }

                });

                html += '<div class="summary-item is-size clearfix">\
                         <div class="si-tit">\
                           ' + spec.SpecName + '：\
                        </div>\
                          <div class="si-warp">\
                             <ul class="si-size">\
                             '+ specValueHtml + '\
                             </ul>\
                        </div>\
                         </div>';

            });

            $("#specArea").html(html);


        },
        //选中规格
        chooseSpec: function (i) {

            pro.Product.ProductSpecHd.opData.chooseSpecList = [];

            if (!$(i).hasClass("active")) {
                $(i).attr("class","active");
            } else {
                $(i).removeClass("active");
            }


            if ($(i).hasClass("active")) {
                var name = $(i).attr("name");
                $("li[name=" + name + "]").each(
                    function () {
                        $(this).removeClass("active");
                    });
                $(i).attr("class", "active");

                var pkid = $(i).attr("Id");
                var pkidArr = pkid.split('_');
                var specId = pkidArr[1];
                var specValueId = pkidArr[2];
                pro.Product.ProductSpecHd.opData.lastChooseSpec.SpecId = specId;
                pro.Product.ProductSpecHd.opData.lastChooseSpec.SpecValueId = specValueId;
            } else {
                pro.Product.ProductSpecHd.opData.lastChooseSpec.SpecId = "";
                pro.Product.ProductSpecHd.opData.lastChooseSpec.SpecValueId = "";
            }

            $("li[name^=spec_]").each(
                function () {

                    if ($(this).hasClass("active")) {

                        var pkid = $(this).attr("Id");
                        var pkidArr = pkid.split('_');
                        var specId = pkidArr[1];
                        var specValueId = pkidArr[2];

                        var specValueOtherName = $("input[for=" + pkid + "]").val();
                        var specValueName = $("input[for=" + pkid + "]").attr("orgValue");
                        var chooseSpecJson = { PkId: pkid, SpecId: specId, SpecValueId: specValueId, SpecValueName: specValueName, SpecValueOtherName: specValueOtherName };

                        pro.Product.ProductSpecHd.opData.chooseSpecList.push(chooseSpecJson);
                    }
                }
            );
            this.chooseSku();
        },
        //新增Sku
        chooseSku: function () {

            JSLINQ(pro.Product.ProductSpecHd.opData.skuList).ForEach(
                     function (item) {
                         var ifHasGoods = true;
                         JSLINQ(pro.Product.ProductSpecHd.opData.chooseSpecList).ForEach(function (chooseSpec) {
                             var tempItem = JSLINQ(item.GoodsSpecValueList).Where(function (goodsSpec) {
                                 return goodsSpec.SpecValueId == chooseSpec.SpecValueId;
                             }).FirstOrDefault();
                             //alert(JSON.stringify(tempItem));
                             if (tempItem == undefined) {
                                 ifHasGoods = false;
                             }
                         });

                         if (ifHasGoods) {
                             item.IfCanChoose = 1;
                         } else {
                             item.IfCanChoose = 0;
                         }
                     }
                 );

            //可选商品清单
            var chooseGoodsList = JSLINQ(pro.Product.ProductSpecHd.opData.skuList).Where(function (item) {
                return item.IfCanChoose == 1;
            }).items;

          //  console.log("可选商品清单:" + JSON.stringify(chooseGoodsList));

            var needSpec = pro.Product.ProductSpecHd.opData.speclist;
            var chooseSpec = pro.Product.ProductSpecHd.opData.chooseSpecList;
            var notChooseSpec = JSLINQ(pro.Product.ProductSpecHd.opData.speclist).Where(function (item) {
                var ifHasSpec = JSLINQ(chooseSpec).Where(function (spec) {
                    //alert(spec.SpecId + "spec.SpecId == item.SpecId;" + item.SpecId);
                    return spec.SpecId == item.SpecId;
                }).FirstOrDefault();

                if (ifHasSpec == null) {
                    return true;
                } else {
                    return false;
                }
            }).items;

         //   console.log("不可选商品清单" + JSON.stringify(notChooseSpec));
        
            //重置数据
            $("#GoodsPrice").html(pro.commonKit.returnFloat(pro.Product.ProductSpecHd.opData.bindEntity.SellPrice));
            $(".goods_num").html(pro.Product.ProductSpecHd.opData.bindEntity.StockNum);
            $("#GoodsId").val("");

            //已经取到最终结果
            if (needSpec.length == chooseSpec.length) {

                //如果没有匹配的重置
                if (chooseGoodsList.length <= 0) {

                    notChooseSpec = JSLINQ(pro.Product.ProductSpecHd.opData.speclist).Where(function (item) {
                        return item.SpecId != pro.Product.ProductSpecHd.opData.lastChooseSpec.SpecId;
                    }).items;

                    JSLINQ(notChooseSpec).ForEach(function (item) {
                        $("li[name=spec_" + item.SpecId + "]").each(
                            function () {
                                $(this).attr("class", "disactive");
                            });
                    });

                    var SpecId = pro.Product.ProductSpecHd.opData.lastChooseSpec.SpecId;
                    var SpecValueId = pro.Product.ProductSpecHd.opData.lastChooseSpec.SpecValueId;

                    $('#spec_' + SpecId + '_' + SpecValueId).attr("class", "");
                    $('#spec_' + SpecId + '_' + SpecValueId).trigger("click");

                  

                } else {

                    $("#GoodsPrice").html(pro.commonKit.returnFloat(chooseGoodsList[0].GoodsPrice));
                    $(".goods_num").html(chooseGoodsList[0].GoodsStock);
        
                    $("#GoodsId").val(chooseGoodsList[0].PkId);
                }

            } else {

             

                JSLINQ(notChooseSpec).ForEach(function (item) {

                    $("li[name=spec_" + item.SpecId + "]").each(
                   function () {
                       $(this).attr("class", "disactive");

                   });

                    JSLINQ(chooseGoodsList).ForEach(function (item2) {

                        JSLINQ(item2.GoodsSpecValueList).ForEach(function (item3) {
                            if (item.SpecId == item3.SpecId) {
                                $("#spec_" + item3.SpecId + "_" + item3.SpecValueId).removeClass("disactive");
                            }
                        });
                    });

                });


            }


        },
        //组合最终的sku集合
        combineSku: function () {

            //新sku
            //var newSkuList = [];

            //JSLINQ(pro.combinationCount.combinationResult).ForEach(function (spec) {
            //    var skuRow = { CombineId: "Sku", GoodsSpecValueList: spec, GoodsPrice: "", GoodsStock: "", GoodsCode: "", SkuCode: "", IsUse: 1, Op: 'Add' };
            //    JSLINQ(spec).ForEach(function (specValue) {
            //        skuRow.CombineId += "_" + specValue.SpecValueId;
            //    });

            //    var orgRow = JSLINQ(pro.Product.ProductSpecHd.opData.skuHistoryList).Where(function (item) {
            //        return item.CombineId == skuRow.CombineId;
            //    }).FirstOrDefault();


            //    if (orgRow != null) {
            //        newSkuList.push(orgRow);
            //    } else {
            //        newSkuList.push(skuRow);
            //        pro.Product.ProductSpecHd.opData.skuHistoryList.push(skuRow);
            //    }

            //    //if (!ifExist) {
            //    //    skuList.push(skuRow);
            //    //}
            //});

            //pro.Product.ProductSpecHd.opData.skuList = newSkuList;



        }


    }
})();


$(function () {
    pro.Product.ProductSpecHd.init();

});




