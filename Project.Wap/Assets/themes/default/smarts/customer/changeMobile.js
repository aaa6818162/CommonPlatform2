smart.viewerEngineer.regedit('changeMobile', function (model) {
    var plugin = {
        conf: {
            txtMobile: '[role=mobile]',   //手机号
            txtMobileCode: '[role=mobileCode]',   //短信验证码
            btnGetVerifyCode: '[role=getVerifyCode]',   //获取短信验证码
            btnMobileVerify: '[role=mobileVerify]',   //验证旧邮箱

            txtPassword: '[role=password]',   //密码
            txtImgCode: '[role=imgCode]',   //图片验证码
            imgVerify: '[role=imgVerify]',   //切换图片验证码
            btnPasswordVerify: '[role=passwordVerify]',   //通过登录密码验证

            txtNewMobile: '[role=newMobile]',   //新手机号
            txtNewMobileCode: '[role=newMobileCode]',   //新短信验证码
            btnNewGetVerifyCode: '[role=newGetVerifyCode]',   //获取新短信验证码
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
                var newMobile = $.trim($(_.conf.txtNewMobile).val());
                var newMobileCode = $.trim($(_.conf.txtNewMobileCode).val());
                var flag = true;
                if (smart.validate.isNullOrEmpty(newMobile)) {
                    _.view.message.alert('请输入新手机号码！');
                    return;
                } else if (!smart.validate.isMobile(newMobile)) {
                    _.view.message.alert('手机号码格式不正确！');
                    return;
                } else {
                    //调用接口检验手机号码是否存在
                    customer.checkMobile(newMobile, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.message.alert('手机号已被绑定！');
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
                if (smart.validate.isNullOrEmpty(newMobileCode)) {
                    _.view.message.alert('请输入短信验证码！');
                    return;
                } else {
                    //调用接口验证短信验证码
                    _.view.verifyCode.verifyMobileCode(newMobile, 'changemobile', newMobileCode, function (data) {
                        if (!data.success) {
                            _.view.message.alert('验证码错误！');
                            flag = false;
                        }
                    }, false);
                }
                if (!flag)
                    return;

                var formData = { newMobile: newMobile, newMobileCode: newMobileCode };
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
                $(_.conf.txtMobileCode).val('');
                $(_.conf.txtPassword).val('');
                $(_.conf.txtImgCode).val('');
                $(_.conf.txtNewMobile).val('');
                $(_.conf.txtNewMobileCode).val('');
                _.view.InitImgCode();
            },
            InitImgCode: function () {
                $(".yzm").attr("src", "/VerifyCode?height=30&date=" + Math.random());
                $(_.conf.txtImgCode).val("").focus();
            }
        },
        //功能处理
        funcs: {
            //原手机发送短信验证码
            sendMobileCode: function () {
                var mobile = $.trim($(_.conf.txtMobile).val());
                if (smart.validate.isNullOrEmpty(mobile)) {
                    _.view.message.alert('请输入手机号码！');
                    return;
                } else if (!smart.validate.isMobile(mobile)) {
                    _.view.message.alert('请输入正确的手机号码！');
                    return;
                } else {
                    //调用接口检验手机号码是否存在
                    customer.checkMobile(mobile, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.message.alert('手机号已被绑定！');
                            } else {
                                //调用接口发送短信验证码
                                _.view.verifyCode.sendMobileCode(mobile, 'changemobile', function (r) {
                                    if (r.success) {
                                        _.view.verifysRuntime.init({
                                            time: 60,
                                            obj: _.conf.btnGetVerifyCode,
                                            title: '获取验证码',
                                            msg: '秒后重发',
                                            func: _.funcs.sendMobileCode
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

            //新手机发送短信验证码
            sendNewMobileCode: function () {
                var mobile = $.trim($(_.conf.txtNewMobile).val());
                if (smart.validate.isNullOrEmpty(mobile)) {
                    _.view.message.alert('请输入手机号码！');
                    return;
                } else if (!smart.validate.isMobile(mobile)) {
                    _.view.message.alert('请输入正确的手机号码！');
                    return;
                } else {
                    //调用接口检验手机号码是否存在
                    customer.checkMobile(mobile, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.message.alert('手机号已被绑定！');
                            } else {
                                //调用接口发送短信验证码
                                _.view.verifyCode.sendMobileCode(mobile, 'changemobile', function (r) {
                                    if (r.success) {
                                        _.view.verifysRuntime.init({
                                            time: 60,
                                            obj: _.conf.btnNewGetVerifyCode,
                                            title: '获取验证码',
                                            msg: '秒后重发',
                                            func: _.funcs.sendNewMobileCode
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

            //修改绑定手机
            changeMobile: function () {
                _.validate.submitValidate(function (formData) {
                    //TODO:调用接口，绑定手机号
                    customer.changeMobile(formData.newMobile, formData.newMobileCode, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess)
                                _.view.message.alert('手机号绑定失败！');
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

            //通过短信验证码验证
            mui('#setting').on('tap', _.conf.btnMobileVerify, function () {
                var mobile = $.trim($(_.conf.txtMobile).val());
                var mobileCode = $.trim($(_.conf.txtMobileCode).val());
                if (smart.validate.isNullOrEmpty(mobileCode)) {
                    _.view.message.alert('请输入短信验证码！');
                    return;
                } else {
                    //调用接口验证短信验证码
                    _.view.verifyCode.verifyMobileCode(mobile, 'changemobile', mobileCode, function (data) {
                        if (data.success) {
                            viewApi.go('#new-mobile');
                        } else {
                            _.view.message.alert('验证码错误！');
                        }
                    }, true);
                }
            });

            //通过登录密码验证
            mui('#ch-mobile').on('tap', _.conf.btnPasswordVerify, function () {
                _.validate.formValida(function (formData) {
                    viewApi.go('#new-mobile');
                });
            });

            //获取旧手机号验证码
            _container.on('click', _.conf.btnGetVerifyCode, function () {
                _.funcs.sendMobileCode();
            });

            //获取新手机号验证码
            _container.on('click', _.conf.btnNewGetVerifyCode, function () {
                _.funcs.sendNewMobileCode();
            });

            //修改绑定手机
            mui('#new-mobile').on('tap', _.conf.btnSubmit, function () {
                _.funcs.changeMobile();
            });

            //刷新图片验证码
            _container.on('click', _.conf.imgVerify, function () {
                _.view.InitImgCode();
            });
        }
    };
    return plugin.init();
});