smart.viewerEngineer.regedit('changePassword', function (model) {
    var viewApi;
    var state = false;
    var plugin = {
        conf: {
            txtPassword: '[role=password]',   //旧密码
            txtNewPassword: '[role=newPassword]',   //新密码
            txtRePassword: '[role=rePassword]',   //确认密码
            btnSubmit: '[role=btnSubmit]'   //提交
        },
        //验证
        validate: {
            formValida: function (callback) {
                var password = $.trim($(_.conf.txtPassword).val());
                var newPassword = $.trim($(_.conf.txtNewPassword).val());
                var rePassword = $.trim($(_.conf.txtRePassword).val());
                var flag = true;
                if (smart.validate.isNullOrEmpty(password)) {
                    _.view.message.alert('请输入旧密码！');
                    state = false;
                    return;
                } else {
                    //调用接口检验密码是否正确
                    customer.checkPassword(password, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.message.alert('抱歉，您输入的密码有误！');
                                flag = false; state = false;
                            }
                        } else {
                            _.view.message.alert('系统异常,请稍后重试！');
                            flag = false; state = false;
                        }
                    }, false);
                }
                if (!flag)
                    return;
                if (smart.validate.isNullOrEmpty(newPassword)) {
                    _.view.message.alert('请输入新密码！');
                    state = false;
                    return;
                } else if (!smart.validate.isPassword(newPassword)) {
                    _.view.message.alert('密码由6-20位数字、英文或符号组成，区分大小写！');
                    state = false;
                    return;
                }
                if (newPassword != rePassword) {
                    _.view.message.alert('两次密码输入不一致！');
                    state = false;
                    return;
                }

                var formData = { password: password, newPassword: newPassword, rePassword: rePassword };
                if (callback && typeof callback == 'function')
                    callback(formData);
                else {
                    _.view.message.alert('系统异常,请稍后重试！');
                    state = false;
                    return;
                }
            }
        },
        //页面处理
        view: {
            InitView: function () {
                (function (_mui) {
                    viewApi = mui('#app').view({
                        defaultPage: "#setting"
                    });
                    var view = viewApi.view;
                    //处理view的后退与webview后退
                    var oldBack = _mui.back;
                    _mui.back = function () {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            $([_.conf.txtPassword, _.conf.txtNewPassword, _.conf.txtRePassword].join(',')).val('');
                            state = false;
                            viewApi.back();
                        } else { //执行webview后退
                            oldBack();
                        }
                    };
                })(mui)
            }
        },
        //功能处理
        funcs: {
            changePassword: function () {
                _.validate.formValida(function (formData) {
                    //TODO:调用接口修改密码
                    customer.changePassword(formData.password, formData.newPassword, _.view.passwordLevel(formData.newPassword), function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                state = false;
                                _.view.message.alert(data.Result.Message);
                            }
                            else {
                                viewApi.go('#result');
                            }
                        }
                        else {
                            state = false;
                            _.view.message.alert('系统异常,请稍后重试！');
                        }
                    });
                });
            }
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            //初始化页面
            _.view.InitView();

            mui('#setting').on('tap', _.conf.btnSubmit, function () {
                if (state)
                    return;
                state = true;
                _.funcs.changePassword();
            });
        }
    };
    return plugin.init();
});