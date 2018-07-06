smart.viewerEngineer.regedit('safety', function (model) {
    var plugin = {
        conf: {
            url: '',    //验证密码后跳转的URL
            txtPwdValidate: '[role=pwdValidate]',   //密码验证提示框
            btnCancel: '[role=btnCancel]',   //取消身份验证
            btnConfirm: '[role=btnConfirm]',   //验证身份
            txtPassword: '[role=password]',   //密码
            btnBindingMobile: '[role=bindingMobile]',   //绑定手机按钮
            btnBindingEmail: '[role=bindingEmail]'   //绑定邮箱按钮
        },
        //验证
        validate: {
        },
        //页面处理
        view: {
            InitView: function () {
                smart.viewerEngineer.viewHandover('#setting');
                _.view.pwdValidateInit();
                $(_.conf.txtPwdValidate).css('visibility', 'hidden');
                $(_.conf.txtPassword).val('');
                _.conf.url = '';
            },
            pwdValidateInit: function () {
                var html = '<div class="Popup_err pos-a" role="pwdValidate">';
                html += '<div class="err_box">';
                html += '<div class="err_title">验证身份</div>';
                html += '<div class="err_text"><span id="reminder"></span><input class="mt20" role="password" type="password" vlaue="" /></div>';
                html += '<div class="Popup_err2 ">';
                html += '<div class="err_btn dis-ib err_btn2" role="btnCancel">取消</div><div class="err_btn dis-ib" role="btnConfirm">确定</div>';
                html += '</div></div></div>';
                $(html).insertBefore('#app');
            }
        },
        //功能处理
        funcs: {
            //密码校验
            pwdValidate: function () {
                var password = $.trim($(_.conf.txtPassword).val());
                if (smart.validate.isNullOrEmpty(password)) {
                    _.view.message.alert('密码不能为空！');
                    return;
                } else {
                    //调用接口检验密码是否正确
                    customer.checkPassword(password, function (data) {
                        if (data.Success) {
                            if (data.Result.IsSuccess) {
                                $(_.conf.txtPwdValidate).css('visibility', 'hidden');
                                window.location.href = _.conf.url;
                            } else {
                                $(_.conf.txtPwdValidate).css('visibility', 'hidden');
                                _.view.message.alert('密码错误，请重新输入！');
                            }
                        } else {
                            $(_.conf.txtPwdValidate).css('visibility', 'hidden');
                            _.view.message.alert('系统异常,请稍后重试！');
                        }
                    });
                }
            }
        },
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            //页面初始化
            _.view.InitView();

            //取消验证身份
            mui('.Popup_err2').on('tap', _.conf.btnCancel, function () {
                $(_.conf.txtPwdValidate).css('visibility', 'hidden');
            });

            //验证密码
            mui('.Popup_err2').on('tap', _.conf.btnConfirm, function () {
                _.funcs.pwdValidate();
            });

            //绑定手机按钮
            mui('#setting').on('tap', _.conf.btnBindingMobile, function () {
                $('#reminder').text('为保障您的数据安全，绑定手机前请填写登录密码');
                $(_.conf.txtPwdValidate).css('visibility', 'visible');
                _.conf.url = '/Member/Mobile/ChangeMobile';
            });

            //绑定邮箱按钮
            mui('#setting').on('tap', _.conf.btnBindingEmail, function () {
                $('#reminder').text('为保障您的数据安全，绑定邮箱前请填写登录密码');
                $(_.conf.txtPwdValidate).css('visibility', 'visible');
                if ($('#emailUrl').text() == '未绑定') {
                    _.conf.url = '/Member/Email/Binding';
                } else {
                    _.conf.url = '/Member/Email/ChangeBinding';
                }
                
            });

            //回调到密码校验
            _container.on('click', '#reminder', function () {
                $(_.conf.txtPwdValidate).css('visibility', 'visible');
            });

            $(_.conf.txtPassword).focus(function () {
                var huawei = navigator.userAgent.indexOf("HUAWEI");
                if (huawei > -1) {
                    $(".err_box").css("top", "-60%");
                }
            });
        }
    };
    return plugin.init();
});