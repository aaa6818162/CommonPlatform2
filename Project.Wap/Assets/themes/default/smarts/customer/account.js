smart.viewerEngineer.regedit('account', function (model) {
    var plugin = {
        conf: {
        },
        //验证
        validate: {
        },
        //页面处理
        view: {
            Init: function () {
                var scroll = mui('.mui-scroll-wrapper').scroll();
                $('.customer-wrap').attr('style', 'display:block');
            },
            upload: function () {
                document.querySelector('#file').addEventListener('change', function () {
                    var that = this;
                    lrz(that.files[0])
                        .then(function (rst) {
                            // 处理成功会执行
                            var img = new Image();
                            img.onload = function () {
                                $(".fail-img").attr("src", img.src);
                            };
                            img.src = rst.base64;
                            $.richAjax('/Upload/UploadWap', { base64: rst.base64, uploadFile: "/UploadFile/" + $('#area').val() + "/UserHeader", allowFileSuffixs: "jpg|gif|png|jpeg|bmp" }, function (result) {
                                if (result.success) {
                                    //调用接口更新个人信息头像
                                    customer.updateHeadPortrait(result.data.Path, function (data) {
                                        if (data.Success && data.Result.IsSuccess) {
                                            $('.fail-img').attr('src', result.data.Path);
                                        }
                                    });
                                } else {
                                    _.view.message.alert(result.Message);
                                }
                            });
                        })
                        .catch(function (err) {
                            // 处理失败会执行
                        })
                        .always(function () {
                            // 不管是成功失败，都会执行
                        });
                });
            }
        },
        //功能处理
        funcs: {
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            //页面初始化
            _.view.Init();
            _.view.upload();

        }
    };
    return plugin.init();
});