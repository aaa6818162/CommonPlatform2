;
(function () {
    mui.init({
        pullRefresh: {
            container: "#pullrefreshd",
            up: {
                height: 50,
                auto: false,
                contentrefresh: "正在加载...",
                contentnomore: '没有更多数据了',
                callback: function () {
                    loadMore(this);
                }
            }
        }
    });
    var loadMore = function (pullRefresh) {
        // 加载更多的内容到列表中
        var el, li, i;
        el = $("#thelist");
        for (i = 0; i < 2; i++) {
            li = "<li><a href='#'><img class='sale-img' src='/Assets/themes/default/images/goodList/list-sale.jpg'></a></li>";
            el.append("<li class='list dis-ib pos-r'><a href='#'><img class='sale-img' src='/Assets/themes/default/images/goodList/list-sale.jpg'></a></li>");
        }
        // 如果没有更多数据了，则关闭上拉加载
        pullRefresh.endPullupToRefresh(true);
        // 如果有更多数据，则继续
        //pullRefresh.endPullupToRefresh(false);
    };
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
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
        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
            viewApi.back();
        } else { //执行webview后退
            oldBack();
        }
    };
})(mui);

