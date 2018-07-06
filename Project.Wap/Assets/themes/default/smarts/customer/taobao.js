smart.viewerEngineer.regedit('taobao', function (model) {
    var plugin = {
        conf: {
            taobaoName: '',   //淘宝昵称
            mobile: '',   //手机号
            txtTaoBaoName: '[role=taobaoName]',   //淘宝昵称
            btnValidate: '[role=btnValidate]',   //验证
            txtTaoBaoIndent: '[role=taobaoIndent]',   //订单号
            btnBinding: '[role=btnBinding]'   //绑定
        },
        //验证
        validate: {
            formValidate: function (callback) {
                var taobaoName = $.trim($(_.conf.txtTaoBaoName).val());
                var mobile = $.trim($('#mobile').val());
                var flag = true;
                if (smart.validate.isNullOrEmpty(taobaoName)) {
                    _.view.message.alert('请输入淘宝昵称！');
                    return;
                } else {
                    //调用接口验证淘宝昵称是否有效
                    customer.checkTBAccount(taobaoName, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.message.alert(data.Result.Message);
                                flag = false;
                            }
                        } else {
                            _.view.message.alert('系统异常，请稍后重试');
                            flag = false;
                        }
                    }, false);
                }
                if (!flag)
                    return;
                if (smart.validate.isNullOrEmpty(mobile)) {
                    window.location.href = '/Member/Account/Login';
                }
                var formData = { taobaoName: taobaoName, mobile: mobile };
                if (callback && typeof callback == 'function')
                    callback(formData);
                else {
                    _.view.message.alert('系统异常,请稍后重试！');
                    return;
                }
            },
            formBinding: function (callback) {
                var taobaoIndent = $.trim($(_.conf.txtTaoBaoIndent).val());
                var taobaoName = _.conf.taobaoName;
                var mobile = _.conf.mobile;
                var flag = true;
                if (smart.validate.isNullOrEmpty(taobaoName) || smart.validate.isNullOrEmpty(mobile)) {
                    window.location.href = '/Member/Account/Login';
                }
                if (smart.validate.isNullOrEmpty(taobaoIndent)) {
                    _.view.message.alert('请输入淘宝订单号！');
                    return;
                } else {
                    //TODO:调用接口验证淘宝订单号
                    customer.checkTBTradeNo(taobaoName, taobaoIndent, mobile, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.message.alert(data.Result.Message);
                                flag = false;
                            }
                        } else {
                            _.view.message.alert('系统异常，请稍后重试');
                            flag = false;
                        }
                    }, false);
                }
                if (!flag)
                    return;

                var formData = { taobaoIndent: taobaoIndent, mobile: mobile, taobaoName: taobaoName };
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
                $(_.conf.txtTaoBaoName).val('');
                $(_.conf.txtTaoBaoIndent).val('');
            }
        },
        funcs: {
            taobaoValidate: function () {
                _.validate.formValidate(function (formData) {
                    //调用接口验证当前手机号与绑定手机是否一致，如果一致，直接绑定
                    customer.bindTBAccountByMobile(formData.taobaoName, formData.mobile, function (t) {
                        if (t.Success) {
                            if (t.Result.IsSuccess) {
                                _.view.message.alert('绑定成功，请重新登录',
                                    function () {
                                        location.href = "/Member/Account/Login?url=/Member/TaoBao/Success";
                                    });
                            } else {
                                _.conf.taobaoName = formData.taobaoName;
                                _.conf.mobile = formData.mobile;
                                viewApi.go('#bd-card');
                            }
                        }
                        else {
                            _.view.message.alert('系统异常，请稍后重试');
                        }
                    });
                });
            },
            taobaoBinding: function () {
                _.validate.formBinding(function (formData) {
                    //调用接口绑定淘宝订单号
                    customer.bindTBAccount(formData.taobaoName, formData.taobaoIndent, formData.mobile, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess)
                                _.view.message.alert(data.Result.Message);
                            else {
                                _.view.message.alert('绑定成功，请重新登录',
                                    function () {
                                        location.href = "/Member/Account/Login?url=/Member/TaoBao/Success";
                                    });
                            }
                        }
                        else
                            _.view.message.alert('系统异常，请稍后重试');
                    });
                });
            }
        },
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            //初始化页面
            _.view.InitView();

            //验证
            mui('#setting').on('tap', _.conf.btnValidate, function () {
                _.funcs.taobaoValidate();
            });

            //绑定
            mui('#bd-card').on('tap', _.conf.btnBinding, function () {
                _.funcs.taobaoBinding();
            });
        }
    };
    return plugin.init();
});