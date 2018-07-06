smart.viewerEngineer.regedit('catalogDetail', function (model) {
    var plugin = {
        conf: {
            List: {},//目录册集合
            textCatalogId: "#catalogId"
        },

        //页面加载函数
        view: {
            catalogInit: function () {
                window.addEventListener("orientationchange", function () {
                    if (window.orientation == 0) {
                        //竖屏
                        $("body").removeClass('landscape');
                    } else {
                        //横屏
                        $("body").addClass('landscape');
                    }
                }, false);

                mui(".mui-pages").on('tap', '.menu', function () {
                    $(".slider-box").toggle();
                });

                var CatalogId = $(_.conf.textCatalogId).val();
                $.ajax({
                    type: "POST",
                    url: "/Content/Catalog/CatalogDetail",
                    data: "id=" + CatalogId + "",
                    cache: false,
                    async: false,
                    success: function (json) {
                        if (json.success && json.data.length > 0) {
                            _.conf.List = json;
                            var timer = setInterval(changeImg, 500);
                            function changeImg() {
                                $(".detail-arrow").toggleClass('black');
                            };
                            var gallery = mui('.mui-slider1');
                            var gallery2 = mui('.mui-slider2');
                            //初始化绑定数据
                            //顶部大图部分
                            var html1 = [];
                            html1.push('<div class="mui-slider-item mui-slider-item-duplicate">');
                            html1.push('<img data-original="' + _.conf.List.data[_.conf.List.data.length - 1].Photo + '"></div>');
                            for (var i = 0; i < _.conf.List.data.length; i++) {
                                html1.push('<div class="mui-slider-item"><img class="lazy" data-original="' + _.conf.List.data[i].Photo + '" onerror="javascript: this.src = \'/Assets/themes/default/images/default/180_180.jpg\';"/></div>');
                            };
                            html1.push('<div class="mui-slider-item mui-slider-item-duplicate">');
                            html1.push('<img data-original="' + _.conf.List.data[0].Photo + '"></div>');
                            $('#slider-1').html(html1.join(''));
                            if (_.conf.List.data[0].Subsets.length < 1) {
                                $(".slider-box , .cat-text").hide();
                            } else {
                                //商品清单部分
                                for (var i = 0; i < Math.ceil(_.conf.List.data[0].Subsets.length / 3) ; i++) {
                                    var smallImg = "<div class='mui-slider-item'><ul class='mui-table-view mui-grid-view commodityList'></ul></div>";
                                    $("#slider-2").append(smallImg);
                                };
                                for (var j = 0; j < _.conf.List.data[0].Subsets.length; j++) {

                                    var li = "";
                                    if (smart.validate.isNullOrEmpty(_.conf.List.data[0].Subsets[j].ProductId)) {
                                        li = "";
                                    } else if (smart.validate.isNullOrEmpty(_.conf.List.data[0].Subsets[j].Sku)) {
                                        li = "";
                                    } else if (smart.validate.isNullOrEmpty(_.conf.List.data[0].Subsets[j].Image)) {
                                        li = "<li class='mui-table-view-cell mui-media'><a href=/product-detail-" + _.conf.List.data[0].Subsets[j].ProductId + '-' + _.conf.List.data[0].Subsets[j].Sku + "><img class='mui-media-object' src='/Assets/themes/default/images/default/180_180.jpg'></a></li>";
                                        var num = Math.floor(j / 3);
                                        $("#slider-2  .commodityList").eq(num).append(li);
                                    }
                                    else {
                                        img = smart.validate.isNullOrEmpty(_.conf.List.data[0].Subsets[j].Image) ? '/Assets/themes/default/images/default/180_180.jpg' : smart.utility.generateImgUrl(_.conf.List.data[0].Subsets[j].Image, 180, 180);

                                        li = "<li class='mui-table-view-cell mui-media'><a href=/product-detail-" + _.conf.List.data[0].Subsets[j].ProductId + '-' + _.conf.List.data[0].Subsets[j].Sku + "><img class='mui-media-object' src=" + img + "  onerror=\"javascript: this.src = \'/Assets/themes/default/images/default/180_180.jpg\';\"/></a></li>";
                                        var num = Math.floor(j / 3);
                                        $("#slider-2  .commodityList").eq(num).append(li);
                                    }



                                };
                            };
                            //图片滑动绑定数据
                            gallery2.slider();
                            $("img.lazy").lazyload({
                                effect: "fadeIn",
                                failurelimit: 10,
                                threshold: 100
                            });
                            document.querySelector('.mui-slider1').addEventListener('slide', function (event) {
                                var num = gallery.slider().getSlideNumber() + 1;
                                $(".num").html(num); //监听滑动 当前页数
                                $("#slider-2").html('');
                                if (_.conf.List.data[gallery.slider().getSlideNumber()].Subsets.length < 1) {
                                    $(".slider-box , .cat-text").hide();
                                } else {
                                    if (window.orientation == 0) {
                                        $(".slider-box , .cat-text").show();
                                        for (var i = 0; i < Math.ceil(_.conf.List.data[num - 1].Subsets.length / 3) ; i++) {
                                            var smallImg = "<div class='mui-slider-item'><ul class='mui-table-view mui-grid-view commodityList'></ul></div>";
                                            $("#slider-2").append(smallImg);
                                        };
                                        for (var j = 0; j < _.conf.List.data[gallery.slider().getSlideNumber()].Subsets.length; j++) {
                                            var li = "";
                                            if (smart.validate.isNullOrEmpty(_.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].ProductId)) {
                                                li = "";
                                            } else if (smart.validate.isNullOrEmpty(_.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].Sku)) {
                                                li = "";
                                            } else if (smart.validate.isNullOrEmpty(_.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].Image)) {

                                                //img = smart.validate.isNullOrEmpty(img) ? '/Assets/themes/default/images/default/180_180.jpg' : smart.utility.generateImgUrl(img, 180, 180);
                                                li = "<li class='mui-table-view-cell mui-media'><a href=/product-detail-" + _.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].ProductId + '-' + _.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].Sku + "><img class='mui-media-object lazy' data-original='/Assets/themes/default/images/default/180_180.jpg'></a></li>";
                                                var num = Math.floor(j / 3);
                                                $("#slider-2  .commodityList").eq(num).append(li);

                                            } else {
                                                img = smart.validate.isNullOrEmpty(_.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].Image) ? '/Assets/themes/default/images/default/180_180.jpg' : smart.utility.generateImgUrl(_.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].Image, 180, 180);

                                                li = "<li class='mui-table-view-cell mui-media'><a href=/product-detail-" + _.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].ProductId + '-' + _.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].Sku + "><img class='mui-media-object lazy' data-original=" + img + "  onerror=\"javascript: this.src = \'/Assets/themes/default/images/default/180_180.jpg\';\"/></a></li>";
                                                var num = Math.floor(j / 3);
                                                $("#slider-2  .commodityList").eq(num).append(li);
                                            }

                                        };
                                    } else {
                                        for (var i = 0; i < Math.ceil(_.conf.List.data[num - 1].Subsets.length / 3) ; i++) {
                                            var smallImg = "<div class='mui-slider-item'><ul class='mui-table-view mui-grid-view commodityList'></ul></div>";
                                            $("#slider-2").append(smallImg);
                                        };
                                        for (var j = 0; j < _.conf.List.data[gallery.slider().getSlideNumber()].Subsets.length; j++) {
                                            var _img = smart.validate.isNullOrEmpty(_.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].Image) ? '/Assets/themes/default/images/default/180_180.jpg' : smart.utility.generateImgUrl(_.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].Image, 180, 180);
                                            var li = "<li class='mui-table-view-cell mui-media'><a href=/product-detail-" + _.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].ProductId + '-' + _.conf.List.data[gallery.slider().getSlideNumber()].Subsets[j].Sku + "><img class='mui-media-object lazy' data-original=" + _img + "  onerror=\"javascript: this.src = \'/Assets/themes/default/images/default/180_180.jpg\';\"/></a></li>";
                                            var num = Math.floor(j / 3);
                                            $("#slider-2  .commodityList").eq(num).append(li);
                                        };
                                    }
                                }
                                gallery2.slider();
                                $("img.lazy").lazyload({
                                    effect: "fadeIn",
                                    failurelimit: 10,
                                    threshold: 100
                                });
                            });
                            $(".sum").html(_.conf.List.data.length); //总页数
                            $(".num").html(gallery.slider().getSlideNumber() + 1); //当前页数
                            mui(".detail-conten").on('tap', '.cat-home', function () {
                                gallery.slider().gotoItem(0); //跳转到第index张图片，index从0开始；
                            });
                            mui(".slider-box").on('tap', '.mui-icon-arrowright', function () {
                                mui('.mui-slider2').slider().nextItem();
                            });
                            mui(".slider-box").on('tap', '.mui-icon-arrowleft', function () {
                                mui('.mui-slider2').slider().prevItem();
                            });
                        }
                    }
                });


            },

        },
        //按钮事件
        funcs: {

        },

        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;
            _.view.catalogInit();

        }
    };
    return plugin.init();
});