smart.viewerEngineer.regedit('regedit', function (model) {
    var state = true;
    var plugin = {
        conf: {
            ssoRegedit: '',//注册地址
            timeout: 20,   //登录超时时间，默认20分钟
            txtMobile: '[role=mobile]',  //手机号
            txtMobileCode: '[role=mobileCode]',   //验证码
            btnGetVerifyCode: '[role=getVerifyCode]',   //获取验证码
            txtPassword: '[role=password]',   //密码
            txtRePassword: '[role=rePassword]',   //确认密码
            btnRegister: '[role=btnRegister]',   //注册
            btnContinueRegister: '[role=btnContinueRegister]',   //继续注册
            btnLogin: '[role=btnLogin]',   //链接到登录
            errorPrompt: '[role=errorPrompt]'   //错误提示

        },
        //验证
        validate: {
            formValidate: function (callback) {
                var txtMobile = $.trim($(_.conf.txtMobile).val());
                var txtMobileCode = $.trim($(_.conf.txtMobileCode).val());
                var txtPassword = $.trim($(_.conf.txtPassword).val());
                var txtRePassword = $.trim($(_.conf.txtRePassword).val());
                var flag = false;
                if (smart.validate.isNullOrEmpty(txtMobile)) {
                    _.view.tips.after(_.conf.errorPrompt, '手机号码不能为空！');
                    state = true;
                    return;
                } else if (!smart.validate.isMobile(txtMobile)) {
                    _.view.tips.after(_.conf.errorPrompt, '手机号码格式不正确！');
                    state = true;
                    return;
                } else {
                    _.view.tips.right(_.conf.errorPrompt);
                    state = false;
                }
                if (smart.validate.isNullOrEmpty(txtMobileCode)) {
                    _.view.tips.after(_.conf.errorPrompt, '验证码不能为空！');
                    state = true;
                    return;
                } else {
                    //调用接口验证手机验证码
                    _.view.verifyCode.verifyMobileCode(txtMobile, 'register', txtMobileCode, function (m) {
                        if (m.success) {
                            _.view.tips.right(_.conf.errorPrompt);
                            flag = true; state = false;
                        }
                        else {
                            _.view.tips.after(_.conf.errorPrompt, '验证码不正确！');
                            flag = false; state = true;
                        }
                    }, false);
                }
                if (!flag)
                    return;
                if (smart.validate.isNullOrEmpty(txtPassword)) {
                    _.view.tips.after(_.conf.errorPrompt, '密码不能为空！');
                    state = true;
                    return;
                } else if (!smart.validate.isPassword(txtPassword)) {
                    _.view.tips.after(_.conf.errorPrompt, '密码由6-20位数字、英文或符号组成，区分大小写！');
                    state = true;
                    return;
                } else {
                    _.view.tips.right(_.conf.errorPrompt);
                    state = false;
                }
                if (txtPassword != txtRePassword) {
                    _.view.tips.after(_.conf.errorPrompt, '两次密码输入不一致，请重新输入！');
                    state = true;
                    return;
                } else {
                    _.view.tips.right(_.conf.errorPrompt);
                    state = false;
                }
                var formData = { txtMobile: txtMobile, txtMobileCode: txtMobileCode, txtPassword: txtPassword, txtRePassword: txtRePassword };

                if (callback && typeof callback == 'function')
                    callback(formData);
                else {
                    _.view.tips.after(_.conf.errorPrompt, '系统异常,请稍后重试！');
                    state = true;
                    return;
                }
            }
        },
        //页面处理
        view: {
            InitView: function () {
                var scroll = mui('.mui-scroll-wrapper').scroll();
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
                $('.mui-pages').attr('style', 'display:block');
                $(_.conf.btnRegister).css('display', 'block');
                $(_.conf.btnContinueRegister).parent('div').css('display', 'none');
                $('#registerSuccess').css('display', 'none');
                $(_.conf.errorPrompt).css('display', 'none');
                $(_.conf.txtMobile).val('');
                $(_.conf.txtMobileCode).val('');
                $(_.conf.txtPassword).val('');
                $(_.conf.txtRePassword).val('');
                $(_.conf.btnGetVerifyCode).text('获取验证码');
            }
        },
        //功能处理
        funcs: {
            //发送短信验证码
            sendMobileCode: function () {
                var txtMobile = $.trim($(_.conf.txtMobile).val());
                if (smart.validate.isNullOrEmpty(txtMobile)) {
                    _.view.tips.after(_.conf.errorPrompt, '手机号码不能为空！');
                    return;
                } else if (!smart.validate.isMobile(txtMobile)) {
                    _.view.tips.after(_.conf.errorPrompt, '手机号码格式不正确！');
                    return;
                } else {
                    //调用接口检验账号是否存在
                    _.view.verifyCode.sendMobileCode(txtMobile, 'register', function (r) {
                        if (r.success) {
                            _.view.verifysRuntime.init({
                                time: 60,
                                obj: _.conf.btnGetVerifyCode,
                                title: '获取验证码',
                                msg: '秒后重发',
                                func: _.funcs.sendMobileCode
                            });
                            _.view.tips.after(_.conf.errorPrompt, '验证码已发送，请查收短信！');
                        }
                        else
                            _.view.tips.after(_.conf.errorPrompt, r.msg);
                    }, true);
                }
            },
            //注册
            register: function () {
                _.validate.formValidate(function (formData) {
                    //调用接口验证账号是否存在
                    customer.checkAccount(formData.txtMobile, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.tips.after(_.conf.errorPrompt, '该号码已被注册，确定继续注册？');
                                $(_.conf.btnRegister).css('display', 'none');
                                $(_.conf.btnContinueRegister).parent('div').css('display', 'block');
                            } else {
                                var gotoUrl = $('#gotoUrl').val();
                                var data = {
                                    appid: _.conf.siteId, sp: _.conf.defaultSP, authmode: 0, timeout: _.conf.timeout, username: formData.txtMobile, password: formData.txtPassword,
                                    pwdlevel: _.view.passwordLevel(formData.txtPassword), cardtype: 'IA', gotoUrl: gotoUrl
                                };
                                $.richAjaxPost(_.conf.ssoRegedit, data, function (r) {
                                    if (!r.IsError) {
                                        var expiresDate = new Date();
                                        expiresDate.setTime(expiresDate.getTime() - 1000);
                                        $.cookie('sync_token', null, { expires: expiresDate, path: '/' });
                                        $.cookie('sync_userid', null, { expires: expiresDate, path: '/' });

                                        if (r.Data == null) {
                                            window.location.href = "/Member/Account/login?url=" + _.conf.host;
                                        } else if (r.Data.Token && r.Data.UserId) {
                                            $.cookie('sync_token', r.Data.Token, { expires: _.conf.ssoLocalExpires, path: '/' });
                                            $.cookie('sync_userid', r.Data.UserId, { expires: _.conf.ssoLocalExpires, path: '/' });
                                            if (smart.validate.isNullOrEmpty(r.Data.Url)) {
                                                $('#registerSuccess').css('display', 'block');
                                            } else {
                                                window.location.href = r.Data.Url;
                                            }
                                        }
                                    } else {
                                        _.view.tips.after(_.conf.errorPrompt, r.Message);
                                        state = true;
                                    }
                                });
                            }
                        } else {
                            _.view.tips.after(_.conf.errorPrompt, data.Message);
                            state = true;
                        }
                    });
                });
            },
            //继续注册
            continueRegister: function () {
                _.validate.formValidate(function (formData) {
                    var gotoUrl = $('#gotoUrl').val();
                    var data = {
                        appid: _.conf.siteId, sp: _.conf.defaultSP, authmode: 0, timeout: _.conf.timeout, username: formData.txtMobile, password: formData.txtPassword,
                        pwdlevel: _.view.passwordLevel(formData.txtPassword), cardtype: 'IA', gotoUrl: gotoUrl
                    };
                    $.richAjaxPost(_.conf.ssoRegedit, data, function (r) {
                        if (!r.IsError) {
                            var expiresDate = new Date();
                            expiresDate.setTime(expiresDate.getTime() - 1000);
                            $.cookie('sync_token', null, { expires: expiresDate, path: '/' });
                            $.cookie('sync_userid', null, { expires: expiresDate, path: '/' });

                            if (r.Data == null) {
                                window.location.href = "/Member/Account/login?url=" + _.conf.host;
                            } else if (r.Data.Token && r.Data.UserId) {
                                $.cookie('sync_token', r.Data.Token, { expires: _.conf.ssoLocalExpires, path: '/' });
                                $.cookie('sync_userid', r.Data.UserId, { expires: _.conf.ssoLocalExpires, path: '/' });
                                if (smart.validate.isNullOrEmpty(r.Data.Url)) {
                                    $('#registerSuccess').css('display', 'block');
                                } else {
                                    window.location.href = r.Data.Url;
                                }
                            }
                        } else {
                            _.view.tips.after(_.conf.errorPrompt, r.Message);
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

            this.conf.ssoRegedit = this.conf.ssoHost + '/Home/_Regedit';
            /**
             * appid:站点标识
             * sp:站点定位表示
             * authmode：授权方式0账号注册；1数字签名；99第三方
             * timeout:超时时间
             * username:用户名
             * password:密码
             * pwdlevel:密码等级
             * cardtype:卡类型
             * gotoUrl:回跳地址
             */

            //页面初始化
            _.view.InitView();

            //获取短信验证码
            _container.on('click', _.conf.btnGetVerifyCode, function () {
                _.funcs.sendMobileCode();
            });

            //注册
            _container.on('click', _.conf.btnRegister, function () {
                if (state) {
                    state = false;
                    _.funcs.register();
                }
            });

            //继续注册
            _container.on('click', _.conf.btnContinueRegister, function () {
                _.funcs.continueRegister();
            });

            //是否选中注册条款
            _container.on('click', 'input[name=agreement]', function () {
                var checked = $(this).is(':checked');
                if (!checked) {
                    $(_.conf.btnRegister).attr('disabled', 'disabled');
                } else {
                    $(_.conf.btnRegister).removeAttr('disabled');
                }
            });

            //跳转登录页面
            _container.on('click', _.conf.btnLogin, function () {
                var gotoUrl = $('#gotoUrl').val();
                window.location.href = '/Member/Account/Login?url=' + gotoUrl;
            });
        }
    };
    return plugin.init();
});