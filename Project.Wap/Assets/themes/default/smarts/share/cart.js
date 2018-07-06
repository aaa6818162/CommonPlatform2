smart.viewerEngineer.regedit('cart', function (model) {
    var plugin = {
        conf: {
        },
        //验证
        validate: {

        },
        //页面处理
        view: {

        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;
        }
    };
    return plugin.init();
});