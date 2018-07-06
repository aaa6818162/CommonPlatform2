jQuery.cookie = function (name, value, options) {
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

jQuery.utility = {
    ajax: function (url, options, callBack, error) {
        $.ajax({
            url: url,
            data: options,
            type: 'post',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                if (callBack && typeof callBack == 'function')
                    callBack(result);
            },
            crossDomain: true,
            error: function (e) {
                if (error && typeof callBack == 'function')
                    error(e);
            }
        });
    },
    ajaxp: function (url, options, callBack, error) {
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
                if (error && typeof callBack == 'function')
                    error(e);
            }
        });
    },
    //正则匹配
    regexStr: function (reg, str) {
        if (this.validate.isNullOrEmpty(str))
            return false;

        return reg.test(str);
    },
    isNullOrEmpty: function (str) {
        if (str == undefined || str == 'undefined' || str == null || str == '')
            return true;

        return false;
    },
    //URL参数
    querystring: function (key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },
    //瀑布流
    waterfallFolw: {
        getScrollTop: function () {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        },
        getClientHeight: function () {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
            } else {
                clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            }
            return clientHeight;
        },
        getScrollHeight: function () {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        },
        init: function (callback) {
            $(document).scroll(function () {
                var scrollTop = $.utility.waterfallFolw.getScrollTop();
                var clientHeight = $.utility.waterfallFolw.getClientHeight();
                var scrollHeight = $.utility.waterfallFolw.getScrollHeight();

                if (scrollTop + clientHeight == scrollHeight) {
                    if (typeof callback == 'function')
                        callback();
                }
            });
        }
    },
    //验证字符存在汉字时字节不能超过16
    checkLength: function (v) {
        var t = v.replace(/[\u4e00-\u9fa5]/g, '');
        return (v.length - t.length) * 2 + t.length <= 16;
    },
    //短信验证码、邮箱验证码相关
    verifys: {
        //tpye(register,findpwd,bindingmobile,bindingemail,changeemail,changemobile)
        //发送短信验证码
        sendMobileCode: function (mobile, type, callback) {
            //调用接口发送短信验证码
            interact.sendVerifyCode({ Authtype: type, Sendtype: 'mobile', Sendvalue: mobile }, function (result) {
                if (result.Success) {
                    if (result.Result.IsSuccess)
                        callback({ success: true, msg: '发送成功' });
                    else {
                        callback({ success: false, msg: result.Result.Message });
                    }
                } else
                    callback({ success: false, msg: '发送失败' });
            });
        },
        //验证短信验证码
        verifyMobileCode: function (mobile, type, code, callback) {
            //调用接口验证短信验证码
            interact.checkVerifyCode({ Authtype: type, Sendtype: 'mobile', Sendvalue: mobile, Authcode: code }, function (result) {
                if (result.Success) {
                    if (result.Result.IsSuccess)
                        callback({ success: true, msg: '短信验证码正确' });
                    else {
                        callback({ success: false, msg: '短信验证码错误' });
                    }
                } else
                    callback({ success: false, msg: '短信验证码错误' });
            });
        },
        //发送邮箱验证码
        sendEmailCode: function (email, type, callback) {
            //调用接口发送邮箱验证码
            interact.sendVerifyCode({ Authtype: type, Sendtype: 'email', Sendvalue: email }, function (result) {
                if (result.Success) {
                    if (result.Result.IsSuccess)
                        callback({ success: true, msg: '发送成功' });
                    else {
                        callback({ success: false, msg: result.Result.Message });
                    }
                } else
                    callback({ success: false, msg: '发送失败' });
            });
        },
        //验证邮箱验证码
        verifyEmailCode: function (email, type, code, callback) {
            //调用接口验证邮箱验证码
            interact.checkVerifyCode({ Authtype: type, Sendtype: 'email', Sendvalue: email, Authcode: code }, function (result) {
                if (result.Success) {
                    if (result.Result.IsSuccess)
                        callback({ success: true, msg: '邮箱验证码正确' });
                    else {
                        callback({ success: false, msg: '邮箱验证码错误' });
                    }
                } else
                    callback({ success: false, msg: '短信验证码错误' });
            });
        }
    },
    validate: {
        //是否为空
        isNullOrEmpty: function (str) {
            if (str == undefined || str == 'undefined' || str == null || str == '')
                return true;

            return false;
        },
        //是否包含特殊字符
        isHasSpecStr: function (str) {
            return !$.utility.regexStr(/^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?]{0,19}$/, str);
        },
        //是否为手机号码
        isMobile: function (str) {
            return $.utility.regexStr(/^(13([0-9])|15([0-9])|18([0-9])|14([0-9])|17([0-9]))\d{8}$/, str);
        },
        //是否为固定电话
        isTelephone: function (str) {
            return $.utility.regexStr(/^((\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/, str);
        },
        //判断输入的EMAIL格式是否正确
        isEmail: function (str) {
            return $.utility.regexStr(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, str);
        },
        //判断输入的字符是否为整数   
        isInteger: function (str) {
            return $.utility.regexStr(/^[-+]?\d*$/, str);
        },
        //判断输入的字符是否为双精度
        isDouble: function (str) {
            return $.utility.regexStr(/^[-\+]?\d+(\.\d+)?$/, str);
        },
        //判断输入的字符是否为无符号双精度且小数不超过2位
        isDouble2: function (str) {
            return $.utility.regexStr(/^[1-9]{1}(\d+)?(\.\d{1,2})?$/, str);
        },
        //判断输入的字符是否为:a-z,A-Z,0-9
        isString: function (str) {
            return $.utility.regexStr(/^[a-zA-Z0-9_]+$/, str);
        },
        //判断输入的字符是否为中文
        isChinese: function (str) {
            return $.utility.regexStr(/^[\u0391-\uFFE5]+$/, str);
        },
        //判断输入的邮编(只能为六位)是否正确
        isPostCode: function (str) {
            return $.utility.regexStr(/^[1-9]\d{5}(?!\d)$/, str);
        },
        //判断输入的密码为6-20且包含至少一个字母
        isPasswordCode: function (str) {
            //if (this.isHasSpecStr(str))
            //    return false;

            if (str.length < 6 || str.length > 20)
                return false;

            return true;
        },
        //判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型   
        isDateTime: function (str) {
            return $.utility.regexStr(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, str);
        },
        //判断日期类型是否为YYYY-MM-DD格式的类型 
        isDate: function (str) {
            return $.utility.regexStr(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, str);
        },
        //判断日期类型是否为hh:mm:ss格式的类型  
        isTime: function (str) {
            return $.utility.regexStr(/^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, str);
        },
        //判断输入的字符是否为英文字母 
        isLetter: function (str) {
            return $.utility.regexStr(/^[a-zA-Z]+$/, str);
        },
        //是否为Url
        isUrl: function (str) {
            return $.utility.regexStr(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, str);
        },
        //是否为IP地址
        isIp: function (str) {
            return $.utility.regexStr(/^[0-9.]{1,20}$/, str);
        },
        //密码等级
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
        }
    },
    //发送短信倒计时
    verifysRuntime: {
        config: {
            timer: null,
            time: 60,
            obj: null, //点击发送的按钮对象
            msg: 'S再次发送',
            func: null
        },
        init: function (options) {
            this.config = $.extend({}, this.config, options);

            this.config.timer = setInterval(this.runtime, 1000);
            this.runtime();

            $(this.config.obj).unbind('click');
        },
        runtime: function () {
            if ($.utility.verifysRuntime.config.timer == null || $.utility.verifysRuntime.config.obj == null)
                return false;

            if ($.utility.verifysRuntime.config.time == 0) {
                clearInterval($.utility.verifysRuntime.config.timer);
                $($.utility.verifysRuntime.config.obj).html("发送验证码");

                if (typeof $.utility.verifysRuntime.config.func == 'function')
                    $($.utility.verifysRuntime.config.obj).bind('click', $.utility.verifysRuntime.config.func);

                return true;
            }

            $($.utility.verifysRuntime.config.obj).html($.utility.verifysRuntime.config.time + $.utility.verifysRuntime.config.msg);

            $.utility.verifysRuntime.config.time--;

            return false;;
        }
    },
    //绑定回车事件
    onEnterEvents: function (obj, callback) {
        $(obj).keydown(function (e) {
            if (e.keyCode == 13)
                callback();
        });
    },
    //商品相关
    products: {
        //搜索
        search: function () {
            var keyword = $.trim($('#txtProductSearch').val());;

            if (keyword != "" && keyword != null && keyword != 'Search...') {
                if (keyword.length > 100) {
                    keyword = keyword.substring(0, 100);
                }
                location.href = '/product-search/' + Base64.encode(keyword).replace('/', '%2f');
            }
        },
        addCart: function (sku, num) {
            cart.add(sku, num, '01', function (_) {
                if (_.Success == true) {
                    if (_.Result.IsSuccess) {
                        topNavs.top_refresh();
                        smart.utility.tips.alert("加入购物车成功");
                    } else {
                        smart.utility.tips.alert(_.Result.Message);
                    }

                }
            }, function (err) {
                smart.utility.tips.alert("加入购物车失败");
            });
        }
    },
    tips: {
        alert: function (message, img) {
            if (!img || img == '') {
                img = '/Assets/themes/default/image/icon/ewm.png';
            }

            var ele = $('.z-weixin-saomiao1');
            if (ele.length > 0) {
                ele.show();
            } else {
                var html = [];
                html.push('<div class="z-weixin-saomiao1">');
                html.push('  <div class="z-weixin-saomiaobox">');
                html.push('     <img class="z-weixin-saomiaodele z-dele" src="/Assets/themes/default/image/icon/dele.png" />');
                html.push('     <img class="z-weixin-ewm" src="' + img + '" />');
                html.push('     <p class="z-weixin-saomiaohd">' + message + '</p>');
                html.push('  </div>');
                html.push('</div>');
                $('body').append(html.join());
                ele = $('.z-weixin-saomiao1');
                ele.on('click', '.z-weixin-saomiaodele', function () {
                    $(this).parents(".z-weixin-saomiao1").hide();
                });
                ele.show();
            }
        }
    }
};

//验证；用法$('#text').onlyNumber()
/*二〇一六年七月二十六日 10:02:32：后期不在使用，请尽量使用:$.utility.validate*/
$.fn.extend({
    //只能输出数字
    onlyNumber: function () {
        $(this).on('keyup afterpaste change', function () {
            this.value = this.value.replace(/\D/g, '');
        });
    },
    //是否为空
    isNullOrEmpty: function (isStr) {
        var str = isStr ? this.selector : $(this).val();

        if (str == undefined || str == 'undefined' || str == null || str == '' || str.trim() == '')
            return true;

        return false;
    },
    //是否为手机号码
    isMobile: function (isStr) {
        return $.utility.regexStr(/^(13([0-9])|15([0-9])|18([0-9])|14([0-9])|17([0-9]))\d{8}$/, isStr ? this.selector : $(this).val());
    },
    //判断输入的EMAIL格式是否正确
    isEmail: function (isStr) {
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if (isStr)
            return reg.test(this.selector);
        else
            return reg.test($(this).val());
    },
    //判断输入的字符是否为整数   
    isInteger: function (isStr) {
        return $.utility.regexStr(/^[-+]?\d*$/, isStr ? this.selector : $(this).val());
    },
    //判断输入的字符是否为双精度
    isDouble: function (isStr) {
        return $.utility.regexStr(/^[-\+]?\d+(\.\d+)?$/, isStr ? this.selector : $(this).val());
    },
    //判断输入的字符是否为:a-z,A-Z,0-9
    isString: function (isStr) {
        return $.utility.regexStr(/^[a-zA-Z0-9_]+$/, isStr ? this.selector : $(this).val());
    },
    //判断输入的字符是否为中文
    isChinese: function (isStr) {
        return $.utility.regexStr(/^[\u0391-\uFFE5]+$/, isStr ? this.selector : $(this).val());
    },
    //判断输入的邮编(只能为六位)是否正确
    isPostCode: function (isStr) {
        return $.utility.regexStr(/^[1-9]\d{5}(?!\d)$/, isStr ? this.selector : $(this).val());
    },
    //判断输入的密码为6-20且包含至少一个字母
    isPasswordCode: function (isStr) {
        return $.utility.regexStr(/^(?=.{6,20}$)([^a-z\r\n]*[a-z][^a-z\r\n]*){1,}/i, isStr ? this.selector : $(this).val());
    },
    //判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型   
    isDateTime: function (isStr) {
        return $.utility.regexStr(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, isStr ? this.selector : $(this).val());
    },
    //判断日期类型是否为YYYY-MM-DD格式的类型 
    isDate: function (isStr) {
        return $.utility.regexStr(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, isStr ? this.selector : $(this).val());
    },
    //判断日期类型是否为hh:mm:ss格式的类型  
    isTime: function (isStr) {
        return $.utility.regexStr(/^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, isStr ? this.selector : $(this).val());
    },
    //判断输入的字符是否为英文字母 
    isLetter: function (isStr) {
        return $.utility.regexStr(/^[a-zA-Z]+$/, isStr ? this.selector : $(this).val());
    },
    //是否为Url
    isUrl: function (isStr) {
        return $.utility.regexStr(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, isStr ? this.selector : $(this).val());
    },
    //是否为IP地址
    isIp: function (isStr) {
        return $.utility.regexStr(/^[0-9.]{1,20}$/, isStr ? this.selector : $(this).val());
    }
});

//Base64 Start
(function (global) {
    'use strict';
    // existing version for noConflict()
    var _Base64 = global.Base64;
    var version = "2.1.5";
    // if node.js, we use Buffer
    var buffer;
    if (typeof module !== 'undefined' && module.exports) {
        buffer = require('buffer').Buffer;
    }
    // constants
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function (bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function (c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                                + fromCharCode(0x80 | (cc & 0x3f)))
                : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                   + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                   + fromCharCode(0x80 | (cc & 0x3f)));
        } else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                    + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                    + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                    + fromCharCode(0x80 | (cc & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function (u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function (ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
        ord = ccc.charCodeAt(0) << 16
            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
        chars = [
            b64chars.charAt(ord >>> 18),
            b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
        ];
        return chars.join('');
    };
    var btoa = global.btoa ? function (b) {
        return global.btoa(b);
    } : function (b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    var _encode = buffer
        ? function (u) { return (new buffer(u)).toString('base64') }
    : function (u) { return btoa(utob(u)) }
    ;
    var encode = function (u, urisafe) {
        return !urisafe
            ? _encode(u)
            : _encode(u).replace(/[+\/]/g, function (m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function (u) { return encode(u, true) };
    // decoder stuff
    var re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');
    var cb_btou = function (cccc) {
        switch (cccc.length) {
            case 4:
                var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                    | ((0x3f & cccc.charCodeAt(1)) << 12)
                    | ((0x3f & cccc.charCodeAt(2)) << 6)
                    | (0x3f & cccc.charCodeAt(3)),
                offset = cp - 0x10000;
                return (fromCharCode((offset >>> 10) + 0xD800)
                        + fromCharCode((offset & 0x3FF) + 0xDC00));
            case 3:
                return fromCharCode(
                    ((0x0f & cccc.charCodeAt(0)) << 12)
                        | ((0x3f & cccc.charCodeAt(1)) << 6)
                        | (0x3f & cccc.charCodeAt(2))
                );
            default:
                return fromCharCode(
                    ((0x1f & cccc.charCodeAt(0)) << 6)
                        | (0x3f & cccc.charCodeAt(1))
                );
        }
    };
    var btou = function (b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function (cccc) {
        var len = cccc.length,
        padlen = len % 4,
        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
            | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0)
            | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
        chars = [
            fromCharCode(n >>> 16),
            fromCharCode((n >>> 8) & 0xff),
            fromCharCode(n & 0xff)
        ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var atob = global.atob ? function (a) {
        return global.atob(a);
    } : function (a) {
        return a.replace(/[\s\S]{1,4}/g, cb_decode);
    };
    var _decode = buffer
        ? function (a) { return (new buffer(a, 'base64')).toString() }
    : function (a) { return btou(atob(a)) };
    var decode = function (a) {
        return _decode(
            a.replace(/[-_]/g, function (m0) { return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, '')
        );
    };
    var noConflict = function () {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64;
    };
    // export Base64
    global.Base64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict
    };
    // if ES5 is available, make Base64.extendString() available
    if (typeof Object.defineProperty === 'function') {
        var noEnum = function (v) {
            return { value: v, enumerable: false, writable: true, configurable: true };
        };
        global.Base64.extendString = function () {
            Object.defineProperty(
                String.prototype, 'fromBase64', noEnum(function () {
                    return decode(this)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64', noEnum(function (urisafe) {
                    return encode(this, urisafe)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64URI', noEnum(function () {
                    return encode(this, true)
                }));
        };
    }
    // that's it!
})(this);
if (this['Meteor']) {
    Base64 = global.Base64; // for normal export in Meteor.js
}
//Base64 End