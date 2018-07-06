smart.viewerEngineer.regedit('Login', function (model) {
    var plugin = {
        conf: {
            ssoLoginApi: '',   //登录地址
            timeout: 20,   //登录超时时间，默认20分钟
            txtUserName: '[role=userName]',   //用户名
            txtPassword: '[role=password]',   //密码
            btnLogin: '[role=btnLogin]',   //登录
            errorPrompt: '[role=errorPrompt]'   //错误提示
        },
        //验证
        validate: {
            formValidate: function (callback) {
                var txtUserName = $.trim($(_.conf.txtUserName).val());
                var txtPassword = $.trim($(_.conf.txtPassword).val());
                var flag = false;
                if (smart.validate.isNullOrEmpty(txtUserName)) {
                    _.view.tips.after(_.conf.errorPrompt, '登录账号不能为空！');
                    return;
                } else if (smart.validate.isInteger(txtUserName)) {
                    if (txtUserName.length == 11) {
                        if (!smart.validate.isMobile(txtUserName)) {
                            _.view.tips.after(_.conf.errorPrompt, '手机号码格式不正确！');
                            return;
                        } else {
                            //调用接口验证手机号是否存在
                            customer.checkAccount(txtUserName, function (data) {
                                if (data.Success) {
                                    if (data.Result.IsSuccess) {
                                        _.view.tips.after(_.conf.errorPrompt, '手机号码或密码不正确！');
                                        flag = true;
                                    } else {
                                        if (data.Result.Code == 404 || data.Result.Code == '404') {
                                            _.view.tips.after(_.conf.errorPrompt, data.Result.Message);
                                            flag = true;
                                        } else {
                                            _.view.tips.right(_.conf.errorPrompt);
                                        }
                                    }
                                } else {
                                    _.view.tips.after(_.conf.errorPrompt, data.Message);
                                    flag = true;
                                }
                            }, false);
                        }
                    } else if (txtUserName.length != 11) {
                        //调用接口验证会员卡是否存在
                        customer.checkAccount(txtUserName, function (data) {
                            if (data.Success) {
                                if (data.Result.IsSuccess) {
                                    _.view.tips.after(_.conf.errorPrompt, '会员卡号不存在！');
                                    flag = true;
                                } else {
                                    if (data.Result.Code == 404 || data.Result.Code == '404') {
                                        _.view.tips.after(_.conf.errorPrompt, data.Result.Message);
                                        flag = true;
                                    } else {
                                        _.view.tips.right(_.conf.errorPrompt);
                                    }
                                }
                            } else {
                                _.view.tips.after(_.conf.errorPrompt, data.Message);
                                flag = true;
                            }
                        }, false);
                    } else {
                        //调用接口验证用户名是否存在
                        customer.checkAccount(txtUserName, function (data) {
                            if (data.Success) {
                                if (data.Result.IsSuccess) {
                                    _.view.tips.after(_.conf.errorPrompt, '用户名不存在！');
                                    flag = true;
                                } else {
                                    if (data.Result.Code == 404 || data.Result.Code == '404') {
                                        _.view.tips.after(_.conf.errorPrompt, data.Result.Message);
                                        flag = true;
                                    } else {
                                        _.view.tips.right(_.conf.errorPrompt);
                                    }
                                }
                            } else {
                                _.view.tips.after(_.conf.errorPrompt, data.Message);
                                flag = true;
                            }
                        }, false);
                    }
                } else {
                    if (!smart.validate.isEmail(txtUserName)) {
                        //调用接口验证用户名是否存在
                        customer.checkAccount(txtUserName, function (data) {
                            if (data.Success) {
                                if (data.Result.IsSuccess) {
                                    _.view.tips.after(_.conf.errorPrompt, '请输入正确的邮箱！');
                                    flag = true;
                                } else {
                                    if (data.Result.Code == 404 || data.Result.Code == '404') {
                                        _.view.tips.after(_.conf.errorPrompt, data.Result.Message);
                                        flag = true;
                                    } else {
                                        _.view.tips.right(_.conf.errorPrompt);
                                    }
                                }
                            } else {
                                _.view.tips.after(_.conf.errorPrompt, data.Message);
                                flag = true;
                            }
                        }, false);
                    } else {
                        //调用接口验证邮箱地址是否存在
                        customer.checkAccount(txtUserName, function (data) {
                            if (data.Success) {
                                if (data.Result.IsSuccess) {
                                    _.view.tips.after(_.conf.errorPrompt, '邮箱不存在！');
                                    flag = true;
                                } else {
                                    if (data.Result.Code == 404 || data.Result.Code == '404') {
                                        _.view.tips.after(_.conf.errorPrompt, data.Result.Message);
                                        flag = true;
                                    } else {
                                        _.view.tips.right(_.conf.errorPrompt);
                                    }
                                }
                            } else {
                                _.view.tips.after(_.conf.errorPrompt, data.Message);
                                flag = true;
                            }
                        }, false);
                    }
                }
                if (flag)
                    return;
                if (smart.validate.isNullOrEmpty(txtPassword)) {
                    _.view.tips.after(_.conf.errorPrompt, '密码不能为空！');
                    return;
                } else if (!smart.validate.isPassword(txtPassword)) {
                    _.view.tips.after(_.conf.errorPrompt, '密码由6-20位数字、英文或符号密码，区分大小写！');
                    return;
                } else {
                    _.view.tips.right(_.conf.errorPrompt);
                }

                var formData = { txtUserName: txtUserName, txtPassword: txtPassword };

                if (callback && typeof callback == 'function')
                    callback(formData);
                else
                    _.view.tips.after(_.conf.errorPrompt, '系统异常,请稍后重试！');
            }
        },
        //页面处理
        view: {
            InitView: function () {
                var scroll = mui('.mui-scroll-wrapper').scroll();
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
                $('#muipages').attr('style', 'display:block');
                $(_.conf.errorPrompt).css('display', 'none');
                $(_.conf.txtUserName).val('');
                $(_.conf.txtPassword).val('');
            }
        },
        //功能处理
        funcs: {
            //登录
            Login: function () {
                _.validate.formValidate(function (formData) {
                    var gotoUrl = $('#gotoUrl').val();
                    if (smart.validate.isNullOrEmpty(gotoUrl))
                        gotoUrl = _.conf.host;
                    var postData = { appid: _.conf.siteId, sp: _.conf.defaultSP, authmode: 0, timeout: _.conf.timeout, username: formData.txtUserName, password: formData.txtPassword, gotoUrl: gotoUrl };
                    $.richAjaxPost(_.conf.ssoLoginApi, postData,
                        function (r) {
                            if (!r.IsError) {
                                window.location.href = r.Data.Url;
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

            this.conf.ssoLoginApi = this.conf.ssoHost + '/Home/_Login';
            /**
             * appid:站点标识
             * sp:站点定位表示
             * authmode：授权方式0账号登录；1数字签名登录；99第三方登录
             * timeout:超时时间
             * username:用户名
             * password:密码
             * gotoUrl:回跳地址
             */

            //登录页面初始化
            _.view.InitView();

            $(".lg-ipt").blur(function () {
                $(this).siblings('.close').hide();
            });
            $(".lg-ipt").focus(function () {
                $(this).siblings('.close').show();
            });
            mui(".lg-grounp").on('tap', '.close', function () {
                $(this).siblings('.lg-ipt').val('');
            });

            //登录
            _container.on('click', _.conf.btnLogin, function () {
                _.funcs.Login();
            });

            _container.on('click', '#inject', function () {
                var url = $('#gotoUrl').val();
                window.location.href = '/Member/Account/Register?url=' + url;
            });
        }
    };
    return plugin.init();
});