smart.viewerEngineer.regedit('email', function (model) {
    var plugin = {
        conf: {
            txtEmail: '[role=email]',   //邮箱
            txtEmailCode: '[role=emailCode]',   //邮箱验证码
            btnGetVerifyCode: '[role=getVerifyCode]',   //获取邮箱验证码
            btnBinding: '[role=btnBinding]'   //绑定
        },
        //验证
        validate: {
            formValida: function (callback) {
                var email = $.trim($(_.conf.txtEmail).val());
                var emailCode = $.trim($(_.conf.txtEmailCode).val());
                var flag = true;
                if (smart.validate.isNullOrEmpty(email)) {
                    _.view.message.alert('请输入邮箱地址！');
                    return;
                } else if (!smart.validate.isEmail(email)) {
                    _.view.message.alert('邮箱地址格式不正确！');
                    return;
                } else {
                    //调用接口检验邮箱地址是否正确
                    customer.checkEmail(email, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.message.alert('邮箱已被绑定！');
                                flag = false;
                            }
                        } else {
                            _.view.message.alert('系统异常,请稍后重试！');
                            flag = false;
                        }
                    }, false);
                }
                if (!flag)
                    return;
                if (smart.validate.isNullOrEmpty(emailCode)) {
                    _.view.message.alert('请输入邮箱验证码！');
                    return;
                } else {
                    //调用接口验证邮箱验证码
                    _.view.verifyCode.verifyEmailCode(email, 'bindingemail', emailCode, function (data) {
                        if (!data.success) {
                            _.view.message.alert('验证码错误！');
                            flag = false;
                        }
                    }, false);
                }
                if (!flag)
                    return;

                var formData = { email: email, emailCode: emailCode };
                if (callback && typeof callback == 'function')
                    callback(formData);
                else {
                    _.view.message.alert('系统异常,请稍后重试！');
                    return;
                }
            }
        },
        //页面处理
        view: {
            InitView: function () {
                (function ($) {
                    viewApi = mui('#app').view({
                        defaultPage: "#setting"
                    });
                    var view = viewApi.view;
                    //处理view的后退与webview后退
                    var oldBack = $.back;
                    $.back = function () {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            viewApi.back();
                        } else { //执行webview后退
                            oldBack();
                        }
                    };
                })(mui)
                $(_.conf.txtEmail).val('');
                $(_.conf.txtEmailCode).val('');
            }
        },
        //功能处理
        funcs: {
            //发送邮箱验证码
            sendEmailCode: function () {
                var email = $.trim($(_.conf.txtEmail).val());
                if (smart.validate.isNullOrEmpty(email)) {
                    _.view.message.alert('请输入邮箱地址！');
                    return;
                } else if (!smart.validate.isEmail(email)) {
                    _.view.message.alert('请输入正确的邮箱地址！');
                    return;
                } else {
                    //调用接口检验邮箱地址是否正确
                    customer.checkEmail(email, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.message.alert('邮箱已被绑定！');
                            } else {
                                //调用接口发送邮箱验证码
                                _.view.verifyCode.sendEmailCode(email, 'bindingemail', function (r) {
                                    if (r.success) {
                                        _.view.verifysRuntime.init({
                                            time: 60,
                                            obj: _.conf.btnGetVerifyCode,
                                            title: '获取验证码',
                                            msg: '秒后重发',
                                            func: _.funcs.sendEmailCode
                                        });
                                    }
                                    else
                                        _.view.message.alert(r.msg);
                                }, true);
                            }
                        } else {
                            _.view.message.alert('系统异常,请稍后重试！');
                        }
                    });
                }
            },
            bindingEmail: function () {
                _.validate.formValida(function (formData) {
                    //TODO:调用接口，绑定邮箱号
                    customer.bindEmail(formData.email, formData.emailCode, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess)
                                _.view.message.alert('邮箱绑定失败！');
                            else
                                viewApi.go('#result');
                        } else {
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

            mui('#setting').on('tap', _.conf.btnBinding, function () {
                _.funcs.bindingEmail();
            });

            _container.on('click', _.conf.btnGetVerifyCode, function () {
                _.funcs.sendEmailCode();
            });
        }
    };
    return plugin.init();
});