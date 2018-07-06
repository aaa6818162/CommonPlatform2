smart.viewerEngineer.regedit('memberCard', function (model) {
    var plugin = {
        conf: {
            cardNo: '',   //会员卡号
            txtMemberCard: '[role=memberCard]',   //门店会员卡
            btnValidate: '[role=btnValidate]',   //验证
            txtMobile: '[role=mobile]',   //手机号
            txtCardName: '[role=cardName]',   //会员卡姓名
            btnBinding: '[role=btnBinding]'   //绑定
        },
        //验证
        validate: {
            formValidate: function (callback) {
                var memberCard = $.trim($(_.conf.txtMemberCard).val());
                var mobile = $.trim($('#mobile').val());
                var flag = true;
                if (smart.validate.isNullOrEmpty(memberCard)) {
                    _.view.message.alert('请输入门店会员卡！');
                    return;
                } else {
                    //调用接口验证门店会员卡是否有效
                    customer.checkCard(memberCard, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.message.alert('会员卡不存在');
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
                var formData = { memberCard: memberCard, mobile: mobile };
                if (callback && typeof callback == 'function')
                    callback(formData);
                else {
                    _.view.message.alert('系统异常,请稍后重试！');
                    return;
                }
            },
            formBinding: function (callback) {
                var mobile = $.trim($(_.conf.txtMobile).val());
                var cardName = $.trim($(_.conf.txtCardName).val());
                var cardNo = _.conf.cardNo;
                if (smart.validate.isNullOrEmpty(cardNo)) {
                    window.location.href = '/Member/Account/Login';
                }
                if (smart.validate.isNullOrEmpty(mobile)) {
                    _.view.message.alert('请输入手机号码！');
                    return;
                } else if (!smart.validate.isMobile(mobile)) {
                    _.view.message.alert('手机号码格式不正确！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(cardName)) {
                    _.view.message.alert('请输入持有人姓名！');
                    return;
                }
                var formData = { cardName: cardName, mobile: mobile, cardNo: cardNo };
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
                $(_.conf.txtMemberCard).val('');
                $(_.conf.txtMobile).val('');
                $(_.conf.txtCardName).val('');
            }
        },
        //功能处理
        funcs: {
            cardValidate: function () {
                _.validate.formValidate(function (formData) {
                    //调用接口验证当前手机号与绑定手机是否一致，如果一致，直接绑定
                    customer.bindCardByMobile(formData.memberCard, formData.mobile, function (t) {
                        if (t.Success) {
                            if (t.Result.IsSuccess) {
                                _.view.message.alert('绑定成功，请重新登录',
                                    function () {
                                        location.href = "/Member/Account/Login?url=/Member/MemberCard/Success";
                                    });
                            } else {
                                _.conf.cardNo = formData.memberCard;
                                viewApi.go('#bd-card');
                            }
                        }
                        else {
                            _.view.message.alert('系统异常，请稍后重试！');
                        }
                    });
                });
            },
            cardBinding: function () {
                _.validate.formBinding(function (formData) {
                    //调用接口绑定门店会员卡
                    customer.bindCard(formData.cardNo, formData.mobile, formData.cardName, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess)
                                _.view.message.alert(data.Result.Message);
                            else {
                                _.view.message.alert('绑定成功，请重新登录',
                                    function () {
                                        location.href = "/Member/Account/Login?url=/Member/MemberCard/Success";
                                    });
                            }
                        }
                        else
                            _.view.message.alert('会员卡绑定失败');
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

            //验证
            mui('#setting').on('tap', _.conf.btnValidate, function () {
                _.funcs.cardValidate();
            });

            //绑定
            mui('#bd-card').on('tap', _.conf.btnBinding, function () {
                _.funcs.cardBinding();
            });
        }
    };
    return plugin.init();
});