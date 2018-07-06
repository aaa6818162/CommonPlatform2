//初始化单页view	
//(function ($) {
//    var viewApi = mui('#app').view({
//        defaultPage: '#setting'
//    });
//    var view = viewApi.view;
//    //处理view的后退与webview后退
//    var oldBack = $.back;
//    $.back = function () {
//        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
//            viewApi.back();
//        } else { //执行webview后退
//            oldBack();
//        }
//    };
//})(mui);


;
//(function () {
//    mui.init({
//        pullRefresh: {
//            container: "#pullrefreshd",
//            up: {
//                height: 50,
//                auto: false,
//                contentrefresh: "正在加载...",
//                contentnomore: '没有更多数据了',
//                callback: function () {
//                    loadMore(this);
//                }
//            }
//        },
//        gestureConfig: {
//            longtap: true
//        }
//    });
//    var loadMore = function (pullRefresh) {
//        var html = $(".order-list:eq(0)").clone();
//        $("#pullrefreshd .mui-scroll .mui-pull-bottom-pocket").before(html);
//        // 加载更多的内容到列表中
//        console.log('加载数据');
//        // 如果没有更多数据了，则关闭上拉加载
//        pullRefresh.endPullupToRefresh(true);
//        // 如果有更多数据，则继续
//        //pullRefresh.endPullupToRefresh(false);
//    };

//})();
(function () {
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
    mui(".fr").on('tap', '.order-search', function () {
        $(".wishilist-search").addClass('show');
        //$(".order-hd").hide();
        $(".mui-title").hide();
        $(".order-cancel").show().siblings().hide();
    });
    mui(".fr").on('tap', '.order-cancel', function () {
        $(".wishilist-search").removeClass('show');
        //$(".order-hd").show();
        $(".mui-title").show();
        $(".order-cancel").hide().siblings().show();
    });
    mui(".oder-nav").on('tap', '.nav-list', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    mui(".pos-r").on('longtap', '.img-mask', function () {
        $(this).siblings('.del-img').show();
    });

})();
