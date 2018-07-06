smart.viewerEngineer.regedit('changeEmail', function (model) {
    var plugin = {
        conf: {
            txtEmail: '[role=email]',   //邮箱
            txtEmailCode: '[role=emailCode]',   //邮箱验证码
            btnGetVerifyCode: '[role=getVerifyCode]',   //获取邮箱验证码
            btnEmailVerify: '[role=emailVerify]',   //验证旧邮箱

            txtPassword: '[role=password]',   //密码
            txtImgCode: '[role=imgCode]',   //图片验证码
            imgVerify: '[role=imgVerify]',   //切换图片验证码
            btnPasswordVerify: '[role=passwordVerify]',   //通过登录密码验证

            txtNewEmail: '[role=newEmail]',   //新邮箱
            txtNewEmailCode: '[role=newEmailCode]',   //新邮箱验证码
            btnNewGetVerifyCode: '[role=newGetVerifyCode]',   //获取新邮箱验证码
            btnSubmit: '[role=btnSubmit]'   //绑定
        },
        //验证
        validate: {
            formValida: function (callback) {
                var password = $.trim($(_.conf.txtPassword).val());
                var imgCode = $.trim($(_.conf.txtImgCode).val());
                var flag = true;
                if (smart.validate.isNullOrEmpty(password)) {
                    _.view.message.alert('请输入登录密码！');
                    return;
                } else {
                    //调用接口检验密码是否正确
                    customer.checkPassword(password, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.message.alert('密码错误，请重新输入！');
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
                if (smart.validate.isNullOrEmpty(imgCode)) {
                    _.view.message.alert('请输入验证码！');
                    return;
                } else {
                    //调用方法验证图片验证码
                    _.view.imgGetVerify(imgCode, function (r) {
                        if (!r.success) {
                            _.view.message.alert('验证码错误！');
                            flag = false;
                        }
                    }, false);
                }
                if (!flag)
                    return;

                var formData = { password: password, imgCode: imgCode };
                if (callback && typeof callback == 'function')
                    callback(formData);
                else {
                    _.view.message.alert('系统异常,请稍后重试！');
                    return;
                }
            },
            submitValidate: function (callback) {
                var newEmail = $.trim($(_.conf.txtNewEmail).val());
                var newEmailCode = $.trim($(_.conf.txtNewEmailCode).val());
                var flag = true;
                if (smart.validate.isNullOrEmpty(newEmail)) {
                    _.view.message.alert('请输入新邮箱地址！');
                    return;
                } else if (!smart.validate.isEmail(newEmail)) {
                    _.view.message.alert('邮箱地址格式不正确！');
                    return;
                } else {
                    //调用接口检验邮箱地址是否正确
                    customer.checkEmail(newEmail, function (data) {
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
                if (smart.validate.isNullOrEmpty(newEmailCode)) {
                    _.view.message.alert('请输入邮箱验证码！');
                    return;
                } else {
                    //调用接口验证邮箱验证码
                    _.view.verifyCode.verifyEmailCode(newEmail, 'changeemail', newEmailCode, function (data) {
                        if (!data.success) {
                            _.view.message.alert('验证码错误！');
                            flag = false;
                        }
                    }, false);
                }
                if (!flag)
                    return;

                var formData = { newEmail: newEmail, newEmailCode: newEmailCode };
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
                $(_.conf.txtEmailCode).val('');
                $(_.conf.txtPassword).val('');
                $(_.conf.txtImgCode).val('');
                $(_.conf.txtNewEmail).val('');
                $(_.conf.txtNewEmailCode).val('');
                _.view.InitImgCode();
            },
            InitImgCode: function () {
                $(".yzm").attr("src", "/VerifyCode?height=30&date=" + Math.random());
                $(_.conf.txtImgCode).val("").focus();
            }
        },
        //功能处理
        funcs: {
            //发送旧邮箱验证码
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
                                _.view.verifyCode.sendEmailCode(email, 'changeemail', function (r) {
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

            //发送新邮箱验证码
            sendNewEmailCode: function () {
                var email = $.trim($(_.conf.txtNewEmail).val());
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
                                _.view.verifyCode.sendEmailCode(email, 'changeemail', function (r) {
                                    if (r.success) {
                                        _.view.verifysRuntime.init({
                                            time: 60,
                                            obj: _.conf.btnNewGetVerifyCode,
                                            title: '生成验证邮件',
                                            msg: '秒后重发',
                                            func: _.funcs.sendNewEmailCode
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

            //修改绑定邮箱
            changeEmail: function () {
                _.validate.submitValidate(function (formData) {
                    //TODO:调用接口，绑定邮箱号
                    customer.changeEmail(formData.newEmail, formData.newEmailCode, function (data) {
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

            //通过邮箱验证码验证
            mui('#setting').on('tap', _.conf.btnEmailVerify, function () {
                var email = $.trim($(_.conf.txtEmail).val());
                var emailCode = $.trim($(_.conf.txtEmailCode).val());
                if (smart.validate.isNullOrEmpty(emailCode)) {
                    _.view.message.alert('请输入邮箱验证码！');
                    return;
                } else {
                    //调用接口验证邮箱验证码
                    _.view.verifyCode.verifyEmailCode(email, 'changeemail', emailCode, function (data) {
                        if (data.success) {
                            viewApi.go('#new-email');
                        } else {
                            _.view.message.alert('验证码错误！');
                        }
                    }, true);
                }
            });

            //通过登录密码验证
            mui('#ch-email').on('tap', _.conf.btnPasswordVerify, function () {
                _.validate.formValida(function (formData) {
                    viewApi.go('#new-email');
                });
            });

            //获取旧邮箱验证码
            _container.on('click', _.conf.btnGetVerifyCode, function () {
                _.funcs.sendEmailCode();
            });

            //获取新邮箱验证码
            _container.on('click', _.conf.btnNewGetVerifyCode, function () {
                _.funcs.sendNewEmailCode();
            });

            //修改绑定邮箱
            mui('#new-email').on('tap', _.conf.btnSubmit, function () {
                _.funcs.changeEmail();
            });

            //刷新图片验证码
            _container.on('click', _.conf.imgVerify, function () {
                _.view.InitImgCode();
            });
        }
    };
    return plugin.init();
});