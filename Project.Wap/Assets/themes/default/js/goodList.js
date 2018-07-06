var PageIndex = 2;
var LoadFlag = true;//增加加载状态判断，避免当前页未加载完成情况下开始加载下一页
var $grid;
var myScroll;
(function () {
    var pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

    /**
     * 滚动翻页 （自定义实现此方法）
     * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
     */
    function pullUpAction() {
        setTimeout(function () {
            if (PageIndex == -1) {
                return;
            }
            var list, url, options;
            $(".list-price").unbind(".icon-tubiaozhizuomoban2");
            list = $("#thelist");
            url = $("#Url").val();
            options = {
                pageindex: PageIndex,
                id: $("#CategoryId").val(),
                url: $("#CategoryUrl").val(),
                wishlistsortvalue:$("#Wishlistsortvalue").val(),
            };
            if (!LoadFlag)
                return;
            LoadFlag = false;
            $.utility.ajax(url, options, function (JsonResult) {
                if (JsonResult == "") {
                    $("#pullUp").hide();// 显示全部 隐藏加载框
                    PageIndex = -1;
                    return;
                }
                var html = "";
                var content = [];//内容数组
                for (var i = 0 ; i < JsonResult.length; i++) {
                    if (JsonResult[i].Sku.indexOf("Ad") < 0) {
                        var imageUrl;
                        content.push('<li class="list-li dis-ib pos-r">');
                        if (JsonResult[i].ImageList.frontview) {
                            imageUrl = smart.utility.generateImgUrl(JsonResult[i].ImageList.frontview[0].Url, 180, 180);
                        } else if (JsonResult[i].ImageList.withscene) {
                            imageUrl = smart.utility.generateImgUrl(JsonResult[i].ImageList.withscene[0].Url, 180, 180);
                        }
                        //错误的图片等待上传后加载，不然页面闪动
                        //Html += '<a target="_blank" href="/product-detail-' + JsonResult[i].ProductID + '-' + JsonResult[i].Sku + '"><img class="commodity-img"src="' + imageUrl + '" onerror="javascript: this.src = \'/Assets/themes/default/image/default/320_320.jpg\';" />';
                        content.push('<a target="_blank" href="/product-detail-' + JsonResult[i].ProductID + '-' + JsonResult[i].Sku + '"><img class="commodity-img" src="' + imageUrl + '"onerror="javascript: this.src = \'/Assets/themes/default/images/default/180_180.jpg\';" /></a>');
                        if (JsonResult[i].IsNew == 1) {
                            content.push('<div class="pos-a new">NEW</div>');
                        }
                        if (JsonResult[i].IsHot == 1) {
                            content.push('<div class="pos-a new">HOT</div>');
                        }
                        content.push('<div class="list-name">' + JsonResult[i].Name + '</div>');
                        if (JsonResult[i].OldPrice != 0 && JsonResult[i].OldPrice > JsonResult[i].Price) {
                            content.push('<div class="list-price list-discount">');
                            content.push('<span class="list-op vm"> ￥' + JsonResult[i].OldPrice + '</span>￥' + JsonResult[i].Price + '');
                        }
                        else {
                            content.push('<div class="list-price">');
                            content.push('<span class="vm"> ￥' + JsonResult[i].Price + '</span>');
                        }
                        if (JsonResult[i].IsHasGift) {
                            content.push('<i class="icon iconfont icon-tubiaozhizuomoban3 vm"></i>');
                        }
                        if (JsonResult[i].IsWishlist) {
                            content.push('<i class="fr icon iconfont icon-tubiaozhizuomoban2 active"></i></div>');
                        }
                        else {
                            content.push('<i class="fr icon iconfont icon-tubiaozhizuomoban2"></i></div>');
                        }
                        content.push('</li>');
                    }
                    else if (JsonResult[i].Url != "" && JsonResult[i].Url.indexOf('|') != -1) {
                        content.push('<li class="list-li dis-ib pos-r">');
                        if (JsonResult[i].Url.split('|')[0] != "") {
                            content.push('<a href="' + JsonResult[i].Url.split("|")[0] + '">');
                        }
                        content.push('<img class="sale-img" src="' + JsonResult[i].Url.split('|')[1] + '" onerror="javascript: this.src = \'/Assets/themes/default/images/default/180_180.jpg\';"/>');
                        if (JsonResult[i].Url.split('|')[0] != "") {
                            content.push('</a>');
                        }
                        content.push(' </li>');
                    }
                }
                html = content.join("");
                if (html != "") {
                    list.append(html);
                }
            });
            LoadFlag = true;
            PageIndex++;
            myScroll.refresh();
        }, 1000);
        $(".list-price").delegate(".icon-tubiaozhizuomoban2", "click", function () {
            $(this).toggleClass('active');
        });
    }

    /**
     * 初始化iScroll控件
     */
    function loaded() {
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;

        myScroll = new iScroll('wrapper', {
            scrollbarClass: 'myScrollbar', /* 重要样式 */
            useTransition: false, /* 此属性不知用意，本人从true改为false */
            onRefresh: function () {
                if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                }
            },
            onScrollMove: function () {
                if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                    myScroll.refresh();
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    this.maxScrollY = pullUpOffset;
                }
            },
            onScrollEnd: function () {
                if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                    pullUpAction();
                }
            }
        });

        setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
    }
    //初始化绑定iScroll控件 
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    document.addEventListener('DOMContentLoaded', loaded, false);

})();
