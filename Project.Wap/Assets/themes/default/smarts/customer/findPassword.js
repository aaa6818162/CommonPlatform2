smart.viewerEngineer.regedit('findPassword', function (model) {
    var viewApi;
    var plugin = {
        conf: {
            byValue: {},

            txtMobile: '[role=mobile]',   //注册手机
            txtMobileCode: '[role=mobileCode]',   //短信验证码
            btnGetVerifyCode: '[role=getVerifyCode]',   //获取验证码
            btnValidate: '[role=btnValidate]',   //验证

            txtNewPassword: '[role=newPassword]',   //新密码
            txtRePassword: '[role=rePassword]',   //确认密码
            btnSubmit: '[role=btnSubmit]'   //确认提交
        },
        //验证
        validate: {
            formValidate: function (callback) {
                var txtMobile = $.trim($(_.conf.txtMobile).val());
                var txtMobileCode = $.trim($(_.conf.txtMobileCode).val());
                var flag = true;
                if (smart.validate.isNullOrEmpty(txtMobile)) {
                    _.view.message.alert('请输入手机号码！');
                    return;
                } else if (!smart.validate.isMobile(txtMobile)) {
                    _.view.message.alert('手机号码格式不正确！');
                    return;
                } else {
                    //调用接口验证手机号码是否存在
                    customer.checkAccount(txtMobile, function (data) {
                        if (data.Success) {
                            if (data.Result.IsSuccess) {
                                _.view.message.alert('该手机号码未注册！');
                                flag = false;
                            }
                        } else {
                            _.view.message.alert(data.Message);
                            flag = false;
                        }
                    }, false);
                }
                if (!flag)
                    return;
                if (smart.validate.isNullOrEmpty(txtMobileCode)) {
                    _.view.message.alert('请输入短信验证码！');
                    return;
                } else {
                    //调用接口验证手机验证码
                    _.view.verifyCode.verifyMobileCode(txtMobile, 'findpwd', txtMobileCode, function (m) {
                        if (m.success) {
                        }
                        else {
                            _.view.message.alert('验证码不正确！');
                            flag = false;
                        }
                    }, false);
                }
                if (!flag)
                    return;

                var formData = { txtMobile: txtMobile, txtMobileCode: txtMobileCode };
                if (callback && typeof callback == 'function')
                    callback(formData);
                else {
                    _.view.message.alert('系统异常,请稍后重试！');
                    return;
                }
            },
            submitValidate: function (callback) {
                var txtNewPassword = $.trim($(_.conf.txtNewPassword).val());
                var txtRePassword = $.trim($(_.conf.txtRePassword).val());
                var txtAccount = _.conf.byValue.txtMobile;
                var txtMobileCode = _.conf.byValue.txtMobileCode;
                var txtAccountId = _.conf.byValue.AccountId;
                if (smart.validate.isNullOrEmpty(txtNewPassword)) {
                    _.view.message.alert('新密码不能为空！');
                    return;
                } else if (!smart.validate.isPassword(txtNewPassword)) {
                    _.view.message.alert('密码由6-20位数字、英文或符号组成，区分大小写！');
                    return;
                }
                if (txtNewPassword != txtRePassword) {
                    _.view.message.alert('两次密码输入不一致，请重新输入！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(txtMobileCode)) {
                    _.view.message.alert('短信验证码已过期，请重新获取！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(txtAccount) || smart.validate.isNullOrEmpty(txtAccountId)) {
                    _.view.message.alert('登录超时，请重新登录！');
                    return;
                }
                var submitData = { txtNewPassword: txtNewPassword, txtAccount: txtAccount, txtMobileCode: txtMobileCode, txtAccountId: txtAccountId };
                if (callback && typeof callback == 'function')
                    callback(submitData);
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
                $('.header').attr('style', 'z-index:99');
                $(_.conf.btnGetVerifyCode).text('获取验证码');
                $(_.conf.txtMobile).val('');
                $(_.conf.txtMobileCode).val('');
                $(_.conf.txtNewPassword).val('');
                $(_.conf.txtRePassword).val('');
                $(_.conf.boxPrompt).css('display', 'none');
            }
        },
        //功能处理
        funcs: {
            //发送短信验证码
            sendMobileCode: function () {
                var txtMobile = $.trim($(_.conf.txtMobile).val());
                if (smart.validate.isNullOrEmpty(txtMobile)) {
                    _.view.message.alert('手机号码不能为空！');
                    return;
                } else if (!smart.validate.isMobile(txtMobile)) {
                    _.view.message.alert('手机号码格式不正确！');
                    return;
                } else {
                    //调用接口验证手机号码是否存在
                    customer.checkAccount(txtMobile, function (data) {
                        if (data.Success) {
                            if (data.Result.IsSuccess) {
                                _.view.message.alert('该手机号码未注册！');
                                return;
                            } else {
                                //调用接口检验账号是否存在
                                _.view.verifyCode.sendMobileCode(txtMobile, 'findpwd', function (r) {
                                    if (r.success) {
                                        _.view.verifysRuntime.init({
                                            time: 60,
                                            obj: _.conf.btnGetVerifyCode,
                                            title: '获取验证码',
                                            msg: '秒后重发',
                                            func: _.funcs.sendMobileCode
                                        });
                                    }
                                    else {
                                        _.view.message.alert(r.msg);
                                        return;
                                    }
                                }, true);
                            }
                        } else {
                            _.view.message.alert(data.Message);
                            return;
                        }
                    });
                }
            },
            validate: function () {
                _.validate.formValidate(function (formData) {
                    $.richAjax("/Member/Account/GetAccountId?account=" + formData.txtMobile, "", function (r) {
                        if (r.success) {
                            var accountId = r.data.AccountId;
                            _.conf.byValue = { AccountId: accountId, txtMobile: formData.txtMobile, txtMobileCode: formData.txtMobileCode };
                            viewApi.go("#new-password");
                        } else {
                            _.view.message.alert(r.message);
                        }
                    });
                });
            },
            submit: function () {
                _.validate.submitValidate(function (submitData) {
                    //TODO:调用接口重置密码
                    customer.findPassword({
                        AccountId: submitData.txtAccountId,
                        Account: submitData.txtAccount,
                        Password: submitData.txtNewPassword,
                        PasswordLevel: _.view.passwordLevel(submitData.txtNewPassword),
                        VerifyType: 'mobile',
                        VerifyCode: submitData.txtMobileCode
                    }, function (m) {
                        if (m.Success) {
                            if (m.Result.IsSuccess) {
                                viewApi.go("#change-success");
                            }
                            else {
                                _.view.message.alert(m.Result.Message);
                            }
                        }
                        else { _.view.message.alert(m.Message); }
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

            //发送短信验证码
            _container.on('click', _.conf.btnGetVerifyCode, function () {
                _.funcs.sendMobileCode();
            });

            //提交
            mui("#new-password").on('tap', _.conf.btnSubmit, function () {
                _.funcs.submit();
            });

            //验证
            mui("#setting").on('tap', _.conf.btnValidate, function () {
                _.funcs.validate();
            });

        }
    };
    return plugin.init();
});