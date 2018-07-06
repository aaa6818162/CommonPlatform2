;
(function() {
	mui.init({
		pullRefresh: {
			container: "#pullrefreshd",
			up: {
				height: 50,
				auto: false,
				contentrefresh: "正在加载...",
				contentnomore: '没有更多数据了',
				callback: function() {
					loadMore(this);
				}
			},
			down: {
				height: 100,
				auto: false,
				contentdown: "下拉可以返回",
				contentover: "释放立即返回",
				contentrefresh: "正在返回...",
				callback: function() {
					$(".gd-main:eq(1)").animate({
						top: "100%"
					}, 800);
					$(".gd-main:eq(0)").animate({
						top: "0"
					}, 800);
					mui('#pullrefreshd').pullRefresh().endPulldownToRefresh();
				}
			}
		}
	});
	var loadMore = function(pullRefresh) {
		// 加载更多的内容到列表中
		var el, li, i;
		//el = $("#thelist");
		//for(i = 0; i < 4; i++) {
		//    li = "<li class='list-li dis-ib pos-r'><a href='#'><img class='commodity-img' src='Assets/themes/default/images/goodList/goodlist-1.jpg'></a><div class='pos-a new'>NEW</div><div class='list-name'>ART单人沙发</div><div class='list-price list-discount'><span class='list-op vm'>￥2999</span>￥1999<i class='fr icon iconfont icon-tubiaozhizuomoban2 active'></i></div></li>";
		//    el.append(li);
		//}

		// 如果没有更多数据了，则关闭上拉加载
		pullRefresh.endPullupToRefresh(true);
		// 如果有更多数据，则继续
		//pullRefresh.endPullupToRefresh(false);
	};

})();
//单页切换
//初始化单页view	
(function($) {
	var viewApi = mui('#app').view({
		defaultPage: '#setting'
	});
	var view = viewApi.view;
	//处理view的后退与webview后退
	var oldBack = $.back;
	$.back = function() {
		if(viewApi.canBack()) { //如果view可以后退，则执行view的后退
			viewApi.back();
		} else { //执行webview后退
			oldBack();
		}
	};
})(mui)
//事件处理
;
(function() {
	var scroll = mui('.mui-scroll-wrapper').scroll();
	var startX = 0;
	var startY = 0;
	var diffX = 0;
	var diffY = 0;
	var pullrefresht = document.getElementById('pullrefresh');
	//上拉加载详情
	pullrefresht.addEventListener("touchstart", function(e) {
		var touches = e.touches;
		startY = touches[0].pageY;
	}, false);
	pullrefresht.addEventListener("touchmove", function(e) {
		var touches = e.touches;
		diffY = scroll[0].maxScrollY - scroll[0].y;

		if(diffY > 30) {
			$(".pullUpLabel").html('松手加载商品详情');
		} else {
			$(".pullUpLabel").html('上拉查看商品详细信息');
		}
	}, false);
	pullrefresht.addEventListener("touchend", function(e) {
		if($(".pullUpLabel").html() == '松手加载商品详情') {
			$(this).parent().animate({
				top: "-100%"
			}, 800);
			$(this).parent().siblings().animate({
				top: "0"
			}, 800);
			$(".pullUpLabel").html('上拉查看商品详细信息');
		}
	}, false);
	$("#CountInfor").blur(function () {
	    var number = $(this).val();
	    if (number == 0) {
	        $(this).val(1);
	        mui.toast('<img src="/Assets/themes/default/images/goodDetail/gd-icon.png" alt=""><div>数量大于0</div>', {
	            duration: 'long(1000ms)',
	            type: 'div'
	        })
	    }
	});
})();