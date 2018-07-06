/*
*sync.web.kits #双易站点辅助js
*designer 赵勋涛
*createtime 2016-7-14
*last updatetime 
*version 0.0.1
* view 视图驱动
*/
$.ajaxSetup({
    error: function (err) {
        if (smart.validate.isNullOrEmpty(err.getAllResponseHeaders())) {
            _layout.view.tips.after(_.conf.errorPrompt, "网络连接超时，请重试！");
        }
    }
});
var _layout = function () {
    var plugin = {
        view: {
            loading: function (timer) {
                var w = $(window).width(),
                h = $(window).height();
                var $html = '<div class="pLoading"><div class="load_img"></div></div>';
                $('body').append($html);
                var l = (w - $('.loading_img').width()) / 2,
                    t = (h - $('.loading_img').height() - 100) / 2;
                $('.pLoading').css({ width: w, height: h });
                $('.load_img').css({ top: t, left: l });
                if (!isNaN(timer)) {
                    setTimeout('pLoadingClose()', timer * 1000);
                }
            },
            unload: function () {
                $('body').find('.pLoading').remove();
            },
            isAuthorized: function (result) { },
            unAuthorized: function (error) { },
            //SSO授权
            ssounAuthorized: function (url) {
                window.location.href = _conf.host + '/member/account/login' + (smart.validate.isNullOrEmpty(url) ? '' : '?url=' + escape(url));
            },
            //页面提示
            tips: {
                after: function (obj, message, controlObj, isShow) {
                    $(obj).text(message);
                    $(obj).css('display', 'block');
                    if (!isShow)
                        this.errAnimation(controlObj);
                },
                right: function (obj, controlObj) {
                    $(obj).text('');
                    $(obj).css('display', 'none');
                    //this.errAnimation(controlObj);
                },
                errAnimation: function (controlObj) {
                    var i = 0;
                    var timer = self.setInterval(function () {
                        if (i < 6) {
                            if (i % 2 == 0) {
                                $(controlObj).parents('li').addClass('err-ipt');
                            } else {
                                $(controlObj).parents('li').removeClass('err-ipt');
                            };
                        } else {
                            clearInterval(timer);
                        };
                        i++;
                    }, 500);
                },
                error: function (boxPrompt, errorPrompt, message) {
                    $(errorPrompt).text(message);
                    $(boxPrompt).css('display', 'block');
                },
                success: function (boxPrompt) {
                    $(boxPrompt).css('display', 'none');
                }
            },
            //消息提示
            message: {
                alert: function (message, callback, title) {
                    var options = {
                        type: 'alert',
                        title: title,
                        message: message,
                        buttons: {
                            ok: { val: '确定', c: 'err_btn' }
                        },
                        callback: {
                            ok: callback
                        }
                    };
                    _layout.view.message.popup(options);
                },
                confirm: function (message, okCallBack, cancelCallback) {
                    var options = {
                        type: 'confirm',
                        message: message,
                        callback: {
                            ok: okCallBack,
                            cancel: cancelCallback
                        }
                    };
                    _layout.view.message.popup(options);
                },
                popup: function (opts) {
                    var options = $.extend({
                        type: 'confirm',
                        title: '',
                        message: '',
                        className: '',
                        buttons: {
                            ok: { val: '确定', c: 'err_btn dis-ib' },
                            cancel: { val: '取消', c: 'err_btn dis-ib err_btn2' }
                        },
                        callback: {
                            ok: null,
                            cancel: null
                        }
                    }, opts || {});

                    var id = 'popup_' + options.type;
                    var ele = $('#' + id);

                    if (ele.length > 0) {
                        ele.removeClass().addClass('Popup_err pos-a ' + options.className);

                        if (options.title)
                            ele.find(".err_title").html(options.title).show();
                        else
                            ele.find(".err_title").html('').hide();
                        ele.find(".err_text").html(options.message);

                        if (options.buttons.cancel)
                            ele.find(".popup_confirm_cancel").attr("class", options.buttons.cancel.c + " popup_confirm_cancel").text(options.buttons.cancel.val);
                        if (options.buttons.ok)
                            ele.find(".popup_confirm_ok").attr("class", options.buttons.ok.c + " popup_confirm_ok").text(options.buttons.ok.val);
                    } else {
                        var html = [];
                        html.push('<div id="' + id + '" class="Popup_err pos-a ' + options.className + '">');
                        html.push('  <div class="err_box">');
                        html.push('     <div class="err_title"' + (options.title ? '' : ' style="display:none;"') + '>' + options.title + '</div>');
                        html.push('     <div class="err_text">' + options.message + '</div>');
                        html.push('     <div class="' + (options.type == 'alert' ? '' : 'Popup_err2') + '">');
                        if (options.type == 'alert') {
                            html.push('         <div class="' + options.buttons.ok.c + ' popup_confirm_ok">' + options.buttons.ok.val + '</div>');
                        } else {
                            html.push('         <div class="' + options.buttons.cancel.c + ' popup_confirm_cancel">' + options.buttons.cancel.val + '</div><div class="' + options.buttons.ok.c + ' popup_confirm_ok">' + options.buttons.ok.val + '</div>');
                        }
                        html.push('     </div>');
                        html.push('  </div>');
                        html.push('</div>');
                        $('body').append(html.join(''));
                        ele = $('#' + id);
                    }

                    ele.off('click', '.popup_confirm_ok');
                    ele.on('click', '.popup_confirm_ok', function () {
                        $(this).parents("#" + id).css("visibility", "hidden");

                        if (options.callback.ok && typeof options.callback.ok == "function") {
                            options.callback.ok();
                        }
                    });

                    ele.off('click', '.popup_confirm_cancel');
                    ele.on('click', '.popup_confirm_cancel', function () {
                        $(this).parents("#" + id).css("visibility", "hidden");

                        if (options.callback.cancel && typeof options.callback.cancel == "function") {
                            options.callback.cancel();
                        }
                    });

                    ele.css("visibility", "visible");
                },
                prompt: function (message, title, ok, cancel) {

                }
            },
            //搜索
            search: function (keyword) {
                keyword = $.trim(keyword);

                if (keyword)
                    location.href = '/product-search/' + Base64.encode(keyword).replace('/', '%2f');
            },
            //密码等级.1低；2中；3高
            passwordLevel: function (psw) {
                var level = 0;
                var isNum = new RegExp(/\d/).test(psw);
                var isEn = new RegExp(/[A-Za-z]/).test(psw);
                var isIllegalChar = new RegExp("[\\s`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！￥……&*（）——|{}【】‘；：”“'。，、？+\\-_]").test(psw);

                if (isNum)
                    level++;
                if (isEn)
                    level++;
                if (isIllegalChar)
                    level++;

                return level;
            },
            //瀑布流
            waterfallFolw: {
                flag: true,//瀑布流加个加载完成的标识，避免重复加载问题
                getScrollTop: function () {
                    var scrollTop = 0;
                    if (document.documentElement && document.documentElement.scrollTop) {
                        scrollTop = document.documentElement.scrollTop;
                    }
                    else if (document.body) {
                        scrollTop = document.body.scrollTop;
                    }
                    return scrollTop;
                },
                getClientHeight: function () {
                    var clientHeight = 0;
                    if (document.body.clientHeight && document.documentElement.clientHeight) {
                        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
                    }
                    else {
                        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
                    }
                    return clientHeight;
                },
                getScrollHeight: function () {
                    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                },
                init: function (callback, offset) {
                    var _this = this;
                    //初始化时设为true
                    _this.flag = true;
                    $(document).scroll(function () {
                        var scrollTop = _layout.view.waterfallFolw.getScrollTop();
                        var clientHeight = _layout.view.waterfallFolw.getClientHeight();
                        var scrollHeight = _layout.view.waterfallFolw.getScrollHeight();
                        if (offset == undefined || offset == null)
                            offset = 0;
                        if (scrollTop + clientHeight >= scrollHeight - offset) {
                            //增加flag判断，是否可以进行callback调用
                            if (callback && typeof callback == 'function' && _this.flag)
                                callback();
                        }
                    });
                }
            },
            //验证图片验证码
            imgGetVerify: function (verifyCode, callback, sync) {
                if (!smart.validate.isNullOrEmpty(verifyCode)) {
                    $.ajax({
                        url: "/VerifyCode/Verify",
                        data: { verifyCode: verifyCode },
                        type: 'Post',
                        async: sync,
                        dataType: 'json',
                        success: function (r) {
                            if (typeof callback == 'function') {
                                callback(r);
                            }
                        }
                    });
                } else { callback({ success: false, msg: '参数异常' }); }
            },
            //发送短信倒计时
            verifysRuntime: {
                config: {
                    timer: null,
                    time: 60,
                    obj: null,  //点击发送的按钮对象
                    title: '发送验证码',
                    msg: 'S再次发送',
                    func: null
                },
                init: function (options) {
                    this.config = $.extend({}, this.config, options);
                    this.config.timer = setInterval(this.runtime, 1000);
                    this.runtime();

                    _container.off('click', this.config.obj);
                    //$(this.config.obj).attr('class', 'btn s4 JS-getVerifyCode pwd-mobile disabled');
                },
                runtime: function () {
                    if (plugin.view.verifysRuntime.config.timer == null || plugin.view.verifysRuntime.config.obj == null)
                        return false;

                    if (plugin.view.verifysRuntime.config.time == 0) {
                        clearInterval(plugin.view.verifysRuntime.config.timer);
                        $(plugin.view.verifysRuntime.config.obj).html(plugin.view.verifysRuntime.config.title);

                        if (plugin.view.verifysRuntime.config.func && typeof plugin.view.verifysRuntime.config.func == 'function') {
                            _container.on('click', plugin.view.verifysRuntime.config.obj, plugin.view.verifysRuntime.config.func);
                            //$(plugin.view.verifysRuntime.config.obj).attr('class', 'btn s4 JS-getVerifyCode pwd-mobile');
                        }
                        return true;
                    }

                    $(plugin.view.verifysRuntime.config.obj).html(plugin.view.verifysRuntime.config.time + plugin.view.verifysRuntime.config.msg);

                    plugin.view.verifysRuntime.config.time--;

                    return false;;
                },
                clear: function () {
                    plugin.view.verifysRuntime.config.time = 0;
                }
            },
            //短信验证码、邮箱验证码相关
            verifyCode: {
                //tpye(register：注册,findpwd：找回密码,bindingmobile：绑定手机,bindingemail：绑定邮箱,changeemail：修改绑定邮箱,changemobile：修改绑定手机)
                //发送短信验证码
                sendMobileCode: function (mobile, type, callback, isPost) {
                    //调用接口发送短信验证码
                    interact.sendVerifyCode({ Authtype: type, Sendtype: 'mobile', Sendvalue: mobile }, function (result) {
                        if (result.Success) {
                            if (result.Result.IsSuccess)
                                callback({ success: true, msg: '发送成功' });
                            else
                                callback({ success: false, msg: result.Result.Message });
                        }
                        else
                            callback({ success: false, msg: '发送失败' });
                    }, isPost);
                },
                //发送邮箱验证码
                sendEmailCode: function (email, type, callback, isPost) {
                    //调用接口发送邮箱验证码
                    interact.sendVerifyCode({ Authtype: type, Sendtype: 'email', Sendvalue: email }, function (result) {
                        if (result.Success) {
                            if (result.Result.IsSuccess)
                                callback({ success: true, msg: '发送成功' });
                            else
                                callback({ success: false, msg: result.Result.Message });
                        }
                        else
                            callback({ success: false, msg: '发送失败' });
                    }, isPost);
                },
                //验证短信验证码
                verifyMobileCode: function (mobile, type, code, callback, isPost) {
                    //调用接口验证短信验证码
                    interact.checkVerifyCode({ Authtype: type, Sendtype: 'mobile', Sendvalue: mobile, Authcode: code }, function (result) {
                        if (result.Success) {
                            if (result.Result.IsSuccess)
                                callback({ success: true, msg: '短信验证码正确' });
                            else
                                callback({ success: false, msg: '短信验证码错误' });
                        }
                        else
                            callback({ success: false, msg: '短信验证码错误' });
                    }, isPost);
                },
                //验证邮箱验证码
                verifyEmailCode: function (email, type, code, callback, isPost) {
                    //调用接口验证邮箱验证码
                    interact.checkVerifyCode({ Authtype: type, Sendtype: 'email', Sendvalue: email, Authcode: code }, function (result) {
                        if (result.Success) {
                            if (result.Result.IsSuccess)
                                callback({ success: true, msg: '邮箱验证码正确' });
                            else
                                callback({ success: false, msg: '邮箱验证码错误' });
                        }
                        else
                            callback({ success: false, msg: '邮箱验证码错误' });
                    }, isPost);
                }
            }
        },
        //基础数据验证
        validate: {
            checkNumber: function (obj) {
                if (isNaN(obj)) {
                    return false;
                }
                try {
                    var number = parseInt(obj);
                    if (number > 0 && number == obj) {
                        return true;
                    }
                } catch (e) { }
                return false;
            }
        }
    }

    return plugin;
}();

(function ($) {
    Date.prototype.format = function (format) {
        ///<summary>格式化日期</summary>
        var o = {
            "M+": this.getMonth() + 1, //month 
            "d+": this.getDate(),    //day 
            "h+": this.getHours(),   //hour 
            "m+": this.getMinutes(), //minute 
            "s+": this.getSeconds(), //second 
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter 
            "S": this.getMilliseconds() //millisecond 
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1,
                (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };
    $.extend({
        lock: function (ele, msg, callback) {
            if (!msg) msg = "正在提交数据，请稍等...";
            ele.text(msg);
            ele.attr("disabled", true);
            if (callback && typeof callback == 'function') {
                return callback();
            }

            return undefined;
        },
        unlock: function (ele, msg, callback) {
            if (!msg) msg = "保存";
            ele.text(msg);
            ele.attr("disabled", false);
            if (callback && typeof callback == 'function') {
                return callback();
            }

            return undefined;
        },
        //AJAX
        richAjax: function (url, options, callBack, error, authOpt, async) {
            if (!async) async = false;
            if (authOpt) {

            }
            $.ajax({
                url: url,
                data: options,
                type: 'post',
                dataType: 'json',
                async: async,
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function () {

                },
                success: function (result) {
                    if (callBack && typeof callBack == 'function')
                        callBack(result);
                },
                crossDomain: true,
                error: function (e) {
                    if (smart.validate.isNullOrEmpty(e.getAllResponseHeaders())) {
                        _layout.view.tips.after(_.conf.errorPrompt, "网络连接超时，请重试！");
                    }
                    if (error && typeof callBack == 'function')
                        error(e);
                }
            });
        },
        //JSONP
        richAjaxp: function (url, options, callBack, error, authOpt) {
            $.ajax({
                type: "get",
                url: url,
                data: options,
                dataType: "jsonp",
                cache: !1,
                success: function (result) {
                    if (callBack && typeof callBack == 'function')
                        callBack(result);
                },
                error: function (e) {
                    if (smart.validate.isNullOrEmpty(e.getAllResponseHeaders())) {
                        _layout.view.tips.after(_.conf.errorPrompt, "网络连接超时，请重试！");
                    }
                    if (error && typeof callBack == 'function')
                        error(e);
                }
            });
        },
        //JSONP
        richAjaxPost: function (url, options, callBack, error, authOpt) {
            $.ajax({
                type: "Post",
                url: url,
                data: options,
                dataType: "jsonp",
                success: function (result) {
                    if (callBack && typeof callBack == 'function')
                        callBack(result);
                },
                error: function (e) {
                    if (smart.validate.isNullOrEmpty(e.getAllResponseHeaders())) {
                        _layout.view.tips.after(_.conf.errorPrompt, "网络连接超时，请重试！");
                    }
                    if (error && typeof callBack == 'function')
                        error(e);
                }
            });
        },
        //通过网关判断是否已登录
        isSyncLogin: function (anonymous, before, loginCallback, unloginCallback, always) {
            window.sync.auth.check(anonymous, before, loginCallback, unloginCallback, always);
        },
        //通过本地网站判断是否已登录
        isLocalLogin: function (loginCallback, unloginCallback) {
            $.ajax({
                url: '/Member/Account/IsLogin',
                data: {},
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        if (loginCallback && typeof loginCallback == 'function')
                            loginCallback();
                    } else
                        if (unloginCallback && typeof unloginCallback == 'function')
                            unloginCallback();
                },
                error: function (e) {
                    if (unloginCallback && typeof unloginCallback == 'function')
                        unloginCallback(e);
                }
            });
        },
        top_refresh: function () {
            $.ajax({
                url: '/home/topnav',
                data: {},
                async: false,
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        //商品详情页和组合套餐 一个页面有2个cartcount 修改后同时赋值
                        $("[id=cartcount]").each(function () {
                            $(this).text(result.data.cartCount > 99 ? '99+' : result.data.cartCount);
                        });
                        //$('#pcount').text(result.data.cartCount);
                        //$('#ptotal').text("￥" + result.data.total);
                    }
                }
            });
        }
    });

    if (!$.cookie) {
        $.cookie = function (name, value, options) {
            if (typeof value != 'undefined') { // name and value given, set cookie
                options = options || {};
                if (value === null) {
                    value = '';
                    options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
                    options.expires = -1;
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                }
                // NOTE Needed to parenthesize options.path and options.domain
                // in the following expressions, otherwise they evaluate to undefined
                // in the packed version for some reason...
                var path = options.path ? '; path=' + (options.path) : '';
                var domain = options.domain ? '; domain=' + (options.domain) : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            } else { // only name given, get cookie
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
        };
    }
})(jQuery);