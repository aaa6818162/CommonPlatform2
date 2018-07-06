/*
*sync.web.kits #双易站点辅助js
*designer 赵勋涛
*createtime 2016-7-14
*last updatetime 
*version 0.0.1
* view 视图驱动
*/

; var smart = null;
(function (factory) {
    'use strict';
    var config = {
        imageVersion: '1.0.0.0',
        scriptCache: true,
        layout: '/Assets/themes/default/smarts/' //视图引擎所在目录
    }
    smart = factory(config);
    window.smart = smart;
    //解决IE9下跨域请求的问题
    jQuery.support.cors = true;
}(function (config) {
    var index = 1;
    var _ = {
        _scriptsArray: [],
        _simulators: [
            {
                name: 'daul',
                type: 'func',
                target: function () {
                    index++;
                    return index;
                }
            }
        ],
        viewerEngineer: {
            _viewers: [],
            regedit: function (name, viewer) {
                this._viewers.push({ name: name, viewer: viewer });
            },
            findOne: function (name) {
                for (var i in this._viewers) {
                    if (this._viewers[i].name == name) {
                        return this._viewers[i].viewer;
                    }
                }
                return null;
            },
            viewHandover: function (obj) {
                (function ($) {
                    var viewApi = mui('#app').view({
                        defaultPage: obj
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
            }
        },
        assign: function (model, render, jsfile, callback) {
            if (jsfile && jsfile != '') {
                if (jsfile.indexOf('/') == -1 && jsfile.indexOf('\\') == -1) {
                    jsfile = 'share/' + jsfile;
                }
                _.getScript(config.layout + jsfile + '.js?t=2', function () {
                    fn(model, render);

                    if (callback && typeof callback == "function")
                        callback();
                });
            } else {
                fn(model, render);
            }
            function fn(model, render) {
                if (model && render) {
                    if (typeof model == 'function') { //如果是方法
                        renderCall(render, model());

                    } else if (typeof model == 'String') { //如果是字符串
                        if ($$) {
                            renderCall(render, $$(model));
                        } else {
                            renderCall(render, model);
                        }
                    } else { //如果是对象
                        renderCall(render, model);
                    }
                }
            }
            function renderCall(render, model) {
                if (typeof render == 'function') {
                    render(model);
                } else {
                    var v = _.viewerEngineer.findOne(render);
                    if (v && typeof v == 'function') v(model);
                }
            }
            return _;
        },
        packages: function (jsfile, success) {
            if (jsfile && jsfile != '') {
                if (jsfile.indexOf('/') == -1 && jsfile.indexOf('\\') == -1) {
                    jsfile = 'packages/' + jsfile;
                }
                _.getScript(config.layout + jsfile + '.js', success);
            }
        },
        getScript: function (curl, success) {
            var flag = false;
            for (var s in this.scriptsArray) {
                var url = this._scriptsArray[s];
                if (url && url == curl) {
                    flag = true;
                    break;
                }
            }
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = curl;
            script.onload = script.onreadystatechange = function () {
                if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                    if (success && typeof success === "function") {
                        success();
                    }
                    script.onload = script.onreadystatechange = null;
                }
            };
            document.getElementsByTagName('head')[0].appendChild(script);

            //if (!flag) {
            //    this._scriptsArray.push(curl);
            //    $.ajax({
            //        url: curl,
            //        type: 'GET',
            //        dataType: "script",
            //        cache: config.scriptCache,
            //        success: success
            //    });
            //} else {
            //    success();
            //}
        },
        tempo: null,
        display: function (callback) {
            this.tempo = Tempo;
            //初始化模板
            _.getScript(config.layout + '_layout.js', function () {
                $("[role]").ajaxStart(function () {
                    _layout.view.loading();
                });

                $("[role]").ajaxSuccess(function () {
                    _layout.view.unload();
                });

                $("[role]").ajaxError(function () {
                    _layout.view.unload();
                });

                //回调自定义页面处理
                if (callback && typeof callback == 'function') { //如果是方法
                    callback();
                }
            });
        },
        command: function (name, target, callback, map) {
            var _ = this._simulators;
            if (!target || target == null) {
                var sor = get(name);
                if (sor) {
                    var args = [];
                    if (arguments.length > 4) {
                        for (var i = 4; i < arguments.length; i++) {
                            args.push(arguments[i]);
                        }
                    }
                    if (sor.type == 'func') {
                        sor.target(args);
                    } else {
                        if (map == null) {
                            sor.target().trigger('click', args);
                        } else {
                            sor.target().each(function () {
                                var ele = $(this);
                                if (map(ele, args)) {
                                    ele.trigger('tap', args);
                                }
                            });
                        }
                    }
                    if (callback) callback();
                }
            } else {
                set(name, target);
            }
            function get(name) {
                for (var i in _) {
                    var sor = _[i];
                    if (sor && sor.name == name) {
                        return sor;
                    }
                }
                return null;
            }
            function set(name, target) {
                var targetObj;
                var type = 'func';
                if (typeof target == 'function') {
                    targetObj = target;
                } else {
                    targetObj = function () { return $('[role=' + target + ']'); };
                    type = 'ele';
                }
                for (var i in _) {
                    var sor = _[i];
                    if (sor && sor.name == name) {
                        sor.target = targetObj;
                        return sor;
                    }
                }
                _.push({ name: name, type: type, target: targetObj });
            }
        },
        view: {
            wefdata: function (url, data, method, target) {
                //采用form提交数据
                if (!method) method = "GET";
                if (!target) target = "_self";
                var _form = $('<form style="display:none" id="' + _.utility.uuid() + '" method="' + method + '"  target="' + target + '" action="' + url + '" ></form>');
                for (var key in data) {
                    _form.append('<input type=“hidden" name="' + key + '" value="' + data[key] + '" />');
                }
                _form.submit();
            }
        },
        utility: {
            //正则匹配
            regexStr: function (reg, str) {
                if (_.validate.isNullOrEmpty(str))
                    return false;

                return reg.test(str);
            },
            //URL参数
            querystring: function (key) {
                var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            },
            uuid: function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },
            //绑定回车事件
            onEnterEvents: function (obj, callback) {
                $(obj).keydown(function (e) {
                    if (e.keyCode == 13)
                        callback();
                });
            },
            //生成商品图片地址
            generateImgUrl: function (url, width, height) {
                if (!smart.validate.isNullOrEmpty(url)) {
                    width = width && width > 0 ? width : 300;
                    height = height && height > 0 ? height : 300;

                    var array = url.split("/");
                    var file = array[array.length - 1];
                    array.length = array.length - 1;
                    array.push(width + '_' + height);
                    array.push(file);
                    return array.join("/") + "?v=" + config.imageVersion;
                }

                return '/Assets/themes/default/images/default/' + width + '_' + height + '.jpg';
            },
            //生成商品默认图片
            generateDefaultImgUrl: function (width, height) {
                return '/Assets/themes/default/images/default/' + width + '_' + height + '.jpg';
            },
            stringformat: function (_t) {
                var args = Array.prototype.slice.call(arguments, 1);
                return _t.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] != 'undefined'
                        ? args[number]
                        : match
                    ;
                });
            },
            anchors: function () {
                var url = location.href; //获取url中"?"符后的字串
                var anchors = [];
                if (url.indexOf("#") != -1) {
                    var str = url.substr(1);
                    var strs = str.split("#");
                    for (var i = 1; i < strs.length; i++) {
                        anchors.push(strs[i]);
                    }
                }
                return anchors;
            },
            spliceUrl: function (paras) {
                var strparas = "";
                var i = 0;
                $(paras).each(function (j, n) {
                    if (n.value != "") {
                        i += 1;
                        if (i == 1) strparas += "?";
                        else strparas += "&";
                        strparas += n.name + "=" + n.value;
                    }
                });
                return strparas;
            }
        },
        validate: {
            //是否为空
            isNullOrEmpty: function (str) {
                if (str == undefined || str == 'undefined' || str == null || str == '' || $.trim(str) == '' || str == 'null')
                    return true;

                return false;
            },
            //是否包含特殊字符
            isHasSpecStr: function (str) {
                return !_.utility.regexStr(/^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?]{0,19}$/, str);
            },
            //是否为手机号码
            isMobile: function (str) {
                return _.utility.regexStr(/^(13([0-9])|15([0-9])|18([0-9])|14([0-9])|17([0-9]))\d{8}$/, str);
            },
            //是否为固定电话
            isTelephone: function (str) {
                return _.utility.regexStr(/^((\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/, str);
            },
            //判断输入的EMAIL格式是否正确
            isEmail: function (str) {
                return _.utility.regexStr(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, str);
            },
            //判断输入的字符是否为整数   
            isInteger: function (str) {
                return _.utility.regexStr(/^[-+]?\d*$/, str);
            },
            //判断输入的字符是否为双精度
            isDouble: function (str) {
                return _.utility.regexStr(/^[1-9]{1}(\d+)?(\.\d{1,2})?$/, str);
            },
            //判断输入的字符是否为:a-z,A-Z,0-9
            isString: function (str) {
                return _.utility.regexStr(/^[a-zA-Z0-9_]+$/, str);
            },

            //isTwoString: function (str) {
            //    return _.utility.regexStr(/[\u4e00-\u9fa5_a-zA-Z0_]{2}/, str);
            //},

            //判断输入的字符最少有两位字母，并且长度不超过11位
            isTwoString: function (str) {
                var t = str.replace(/[\u4e00-\u9fa5]/g, '');
                return (str.length - t.length) * 2 + t.length <= 11 && (str.length - t.length) * 2 + t.length >= 2 && !/^\d+$/.test(str);
            },

            //判断输入的字符是否为中文
            isChinese: function (str) {
                return _.utility.regexStr(/^[\u0391-\uFFE5]+$/, str);
            },
            //判断输入的邮编(只能为六位)是否正确
            isPostCode: function (str) {
                return _.utility.regexStr(/^[1-9]\d{5}(?!\d)$/, str);
            },
            //判断输入的字符只能为六位数字
            isSextet: function (str) {
                return _.utility.regexStr(/^\d{6}$/, str);
            },
            //判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型   
            isDateTime: function (str) {
                return _.utility.regexStr(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, str);
            },
            //判断日期类型是否为YYYY-MM-DD格式的类型 
            isDate: function (str) {
                return _.utility.regexStr(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, str);
            },
            //判断日期类型是否为hh:mm:ss格式的类型  
            isTime: function (str) {
                return _.utility.regexStr(/^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, str);
            },
            //判断输入的字符是否为英文字母 
            isLetter: function (str) {
                return _.utility.regexStr(/^[a-zA-Z]+$/, str);
            },
            //判断输入的字符是否为6-20位的字符
            isPassword: function (str) {
                return _.utility.regexStr(/^.{6,20}$/, str);
            },
            //是否为Url
            isUrl: function (str) {
                return _.utility.regexStr(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, str);
            },
            //是否为IP地址
            isIp: function (str) {
                return _.utility.regexStr(/^[0-9.]{1,20}$/, str);
            },
            //只能输出数字
            onlyNumber: function () {
                $(this).on('keyup afterpaste change', function () {
                    this.value = this.value.replace(/\D/g, '');
                });
            }
        },
        //对话框提示
        massger: {
            confirm: function (content, config) {
                this.defaults = {
                    close: 'Close',
                    x: 'x',
                    text: '',
                    sureButton: '确认', // 确认按钮文字
                    cancelButton: '取消',// 取消按钮文字
                    cls: 'box-confirm', // 自定义样式名
                    position: 'center', // 位置 center: 相对屏幕居中;绝对位置 {'top':num,'left':num}
                    onopen: null,   // 打开确认框回调
                    onsure: null,   // 确认回调
                    oncancel: null, // 取消回调
                    onclose: null,   // 关闭确认框回调
                    type: 'confirm',  // confirm or alert
                    modal: false,
                    showCancel: true//是否显示取消按钮
                };

                var settings = $.extend({}, this.defaults, config);

                var that = this,
                    close = settings.close,
                    x = settings.x,
                    text = settings.text,
                    sureButton = settings.sureButton,
                    cancelButton = settings.cancelButton,
                    cls = settings.cls || 'box-confirm',
                    position = settings.position,
                    onopen = settings.onopen,
                    onsure = settings.onsure,
                    oncancel = settings.oncancel,
                    onclose = settings.onclose,
                    modal = settings.modal,
                    type = settings.type,
                    showCancel = settings.showCancel;

                if ($('.' + cls).length !== 0) {
                    $('.' + cls).remove();
                } else {
                    var btns = '';
                    var guanbi = '';
                    var txt = '';
                    var img = '';
                    if (type === 'alert') {
                        guanbi = '<a href="javascript:;" class="onClose">' + close + '      ' + '<i>' + x + '</i></a>';
                    } else if (type === 'prompt') {
                        txt = text;
                        guanbi = '<a href="javascript:;" class="onClose">' + close + '      ' + '<i>' + x + '</i></a>';
                    } else if (type === 'warning') {
                        img = '<img src="/Assets/themes/default/img/notice.png" style="vertical-align: bottom;margin-right: 10px;">';
                        txt = text;
                        guanbi = '<a href="javascript:;" class="onClose">' + close + '      ' + '<i>' + x + '</i></a>';
                    }
                    else {
                        btns = '<button class="btn s2 onsure">' + sureButton + '</button>';

                        if (showCancel)
                            btns += '<button class="btn oncancel">' + cancelButton + '</button>';
                    }

                    var html = ['<div class="' + cls + '">',
                        img,
                        '<span >' + txt + '</span>',
                        '<div class="content">' + content + '</div>',
                        '<div class="opts">' + btns + '</div>',
                        '<div class="wrapclose">' + guanbi + '</div>',
                    '</div>'].join('');

                    if (modal) {
                        html += '<div class="mask"></div>';
                    }
                    var $confirm = $(html);
                    $confirm.appendTo('body');
                    this.setPosition($('.' + cls), position);
                    $confirm.fadeIn(function () {
                        if (typeof (onopen) === 'function') {
                            onopen();
                        }
                    });
                }

                $('.onsure').on('click', function () {
                    if ($(this).closest('.' + cls).length > 0) {
                        if (typeof (onsure) === 'function') {
                            onsure();
                            that.closeConfirm($('.' + cls));
                        } else {
                            that.closeConfirm($('.' + cls));
                        }
                    }
                });

                $('.oncancel').on('click', function () {
                    if ($(this).closest('.' + cls).length > 0) {
                        if (typeof (oncancel) === 'function') {
                            oncancel();
                            that.closeConfirm($(this).parents('.' + cls), onclose);
                        } else {
                            that.closeConfirm($(this).parents('.' + cls), onclose);
                        }
                    }
                });
                $('.wrapclose').on('click', function () {
                    if ($(this).closest('.' + cls).length > 0) {
                        if (typeof (oncancel) === 'function') {
                            oncancel();
                        } else {
                            that.closeConfirm($(this).parents('.' + cls), onclose);
                        }
                    }
                });

            },
            setPosition: function (obj, position) {
                if (position === 'center') {
                    var _winHeight = $(window).height(),
                        _objHeight = obj.outerHeight(),
                        _objWidth = obj.outerWidth()
                    _winScrolltop = $(window).scrollTop();

                    obj.css({ 'top': (_winHeight - _objHeight) / 2 + _winScrolltop, 'left': '50%', 'margin-left': -_objWidth / 2 });
                } else {
                    var top = position.top,
                        left = position.left,
                        _objWidth = obj.outerWidth();
                    obj.css({ 'top': top, 'left': left, 'margin-left': -_objWidth / 2 });
                }
            },
            closeConfirm: function (obj, onclose) {
                var onclose = onclose;
                obj.fadeOut(function () {
                    if (typeof (onclose) === 'function') {
                        onclose();
                    }
                    obj.remove();
                });
                $('.mask').fadeOut(function () { $(this).remove() });
            },
            Alert: function (msg, onclose) {
                this.confirm(msg, {
                    type: 'alert',
                    text: '提示',
                    cls: 'box-alert',
                    modal: true,
                    onclose: onclose
                });
            },
            Prompt: function (msg, text, onclose) {
                this.confirm(msg, {
                    text: text,
                    type: 'prompt',
                    cls: 'box-alert',
                    modal: true,
                    onclose: onclose
                });
            },
            Warning: function (msg, text) {
                this.confirm(msg, {
                    text: text,
                    type: 'warning',
                    cls: 'box-alert',
                    modal: true
                });
            }
        }
    };

    return _;
}));


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

/*!
 * Tempo Template Engine 2.0
 *
 * http://tempojs.com/
 */
function TempoEvent(type, item, element) {
    'use strict';
    this.type = type;
    this.item = item;
    this.element = element;

    return this;
}

TempoEvent.Types = {
    RENDER_STARTING: 'render_starting',
    ITEM_RENDER_STARTING: 'item_render_starting',
    ITEM_RENDER_COMPLETE: 'item_render_complete',
    RENDER_COMPLETE: 'render_complete',
    BEFORE_CLEAR: 'before_clear',
    AFTER_CLEAR: 'after_clear'
};

var Tempo = (function (tempo) {
    'use strict';

    /*!
     * Constants
     */
    var NUMBER_FORMAT_REGEX = /(\d+)(\d{3})/;


    var _window;


    /*!
     * Helpers
     */
    var utils = {
        memberRegex: function (obj) {
            var member_regex = '(';
            for (var member in obj) {
                if (obj.hasOwnProperty(member)) {
                    if (member_regex.length > 1) {
                        member_regex += '|';
                    }
                    member_regex += member;
                }
            }
            return member_regex + ')[\\.]?' + '(?!\\w)';
        },

        pad: function (val, pad, size) {
            while (val.length < size) {
                val = pad + val;
            }
            return val;
        },

        trim: function (str) {
            return str.replace(/^\s*([\S\s]*?)\s*$/, '$1');
        },

        startsWith: function (str, prefix) {
            return (str.indexOf(prefix) === 0);
        },

        clearContainer: function (el) {
            if (el !== null && el !== undefined && el.childNodes !== undefined) {
                for (var i = el.childNodes.length - 1; i >= 0; i--) {
                    if (el.childNodes[i] !== undefined && el.childNodes[i].getAttribute !== undefined && (el.childNodes[i].getAttribute('data-template') !== null || el.childNodes[i].getAttribute('data-template-for') !== null)) {
                        el.childNodes[i].parentNode.removeChild(el.childNodes[i]);
                    }
                }
            }
        },

        isNested: function (el) {
            var p = el.parentNode;
            while (p) {
                if (this.hasAttr(p, 'data-template') || this.hasAttr(p, 'data-template-for')) {
                    return true;
                }
                p = p.parentNode;
            }
            return false;
        },

        equalsIgnoreCase: function (str1, str2) {
            return str1.toLowerCase() === str2.toLowerCase();
        },

        getElement: function (template, html) {
            if (navigator.appVersion.indexOf("MSIE") > -1 && utils.equalsIgnoreCase(template.tagName, 'tr')) {
                // Wrapping to get around read-only innerHTML
                var el = _window.document.createElement('div');
                el.innerHTML = '<table><tbody>' + html + '</tbody></table>';
                var depth = 3;
                while (depth--) {
                    el = el.lastChild;
                }
                el.setAttribute('data-template', '');
                return el;
            } else {
                // No need to wrap
                template.innerHTML = html;
                return template;
            }
        },

        typeOf: function (obj) {
            if (typeof (obj) === "object") {
                if (obj === null) {
                    return "null";
                }
                if (obj.constructor === ([]).constructor) {
                    return "array";
                }
                if (obj.constructor === (new Date()).constructor) {
                    return "date";
                }
                if (obj.constructor === (new RegExp()).constructor) {
                    return "regex";
                }
                if (typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj.nodeType === 1 && typeof obj.nodeName === "string") {
                    return 'element';
                }
                if (typeof jQuery !== 'undefined' && obj instanceof jQuery) {
                    return 'jquery';
                }
                return "object";
            }
            return typeof (obj);
        },

        hasAttr: function (el, name) {
            if (el !== undefined) {
                if (el.hasAttribute !== undefined) {
                    return el.hasAttribute(name);
                } else if (el.getAttribute !== undefined) {
                    return el.getAttribute(name) !== null;
                }
            }

            return false;
        },

        removeAttr: function (el, name) {
            if (el !== undefined) {
                el.setAttribute(name, '');
                if (el.removeAttribute) {
                    el.removeAttribute(name);
                }
            }
        },

        merge: function (obj1, obj2) {
            var obj3 = {};

            for (var attr1 in obj1) {
                if (obj1.hasOwnProperty(attr1)) {
                    obj3[attr1] = obj1[attr1];
                }
            }

            for (var attr2 in obj2) {
                if (obj2.hasOwnProperty(attr2)) {
                    obj3[attr2] = obj2[attr2];
                }
            }
            return obj3;
        },
        notify: function (listener, event) {
            if (listener !== undefined && listener.length > 0) {
                for (var i = 0; i < listener.length; i++) {
                    if (event.type === listener[i].type) {
                        listener[i].listener(event);
                    }
                }
            }
        },
        container: function (container) {
            if (utils.typeOf(container) === 'string') {
                if (container === '*') {
                    container = _window.document.getElementsByTagName('html')[0];
                } else {
                    container = _window.document.getElementById(container);
                }
            } else if (utils.typeOf(container) === 'jquery' && container.length > 0) {
                container = container[0];
            }

            return container;
        },
        arrayContains: function (array, obj) {
            if (!Array.prototype.indexOf) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === obj) {
                        return true;
                    }
                }
                return false;
            } else {
                return array.indexOf(obj) > -1;
            }
        }
    };

    function Templates(params, nestedItem) {
        this.params = params;
        this.defaultTemplate = null;
        this.namedTemplates = {};
        this.container = null;

        this.nestedItem = nestedItem !== undefined ? nestedItem : null;

        this.escape = true;
        this.var_brace_left = '\\{\\{';
        this.var_brace_right = '\\}\\}';
        this.tag_brace_left = '\\{%';
        this.tag_brace_right = '%\\}';

        this.dataIsMap = false;

        this.attributes = {};

        if (typeof params !== 'undefined') {
            for (var prop in params) {
                if (prop === 'var_braces') {
                    this.var_brace_left = params[prop].substring(0, params[prop].length / 2);
                    this.var_brace_right = params[prop].substring(params[prop].length / 2);
                } else if (prop === 'tag_braces') {
                    this.tag_brace_left = params[prop].substring(0, params[prop].length / 2);
                    this.tag_brace_right = params[prop].substring(params[prop].length / 2);
                } else if (typeof this[prop] !== 'undefined') {
                    this[prop] = params[prop];
                }
            }
        }

        return this;
    }

    Templates.prototype = {
        load: function (file, callback) {
            function contents(iframe) {
                return iframe.contentWindow ? iframe.contentWindow.document.documentElement.innerHTML : iframe.contentDocument ? iframe.contentDocument.body.innerHTML : iframe.document.body.innerHTML;
            }

            if (_window.document.getElementById(file) !== null) {
                callback(contents(_window.document.getElementById(file)));
            } else {
                var el = _window.document.createElement('iframe');
                el.id = file;
                el.name = file;
                el.style.height = 0;
                el.style.width = 0;
                el.src = file;

                if (el.attachEvent) {
                    el.attachEvent('onload', function () {
                        callback(contents(el));
                    });
                } else {
                    el.onload = function () {
                        callback(contents(el));
                    };
                }

                _window.document.body.appendChild(el);
            }
        },
        _insertTemplate: function (child, templates, container, callback) {
            return function (el) {
                utils.removeAttr(child, 'data-template-file');
                child.innerHTML = el;
                templates.parse(container, callback);
            };
        },

        parse: function (container, callback) {
            this.container = container;
            var children = container.getElementsByTagName('*');

            var ready = true;

            // Preprocessing for referenced templates
            for (var i = 0; i < children.length; i++) {
                if (ready === true && callback !== undefined && utils.hasAttr(children[i], 'data-template-file')) {
                    var child = children[i];
                    if (child.getAttribute('data-template-file').length > 0) {
                        var templates = this;
                        ready = false;

                        this.load(child.getAttribute('data-template-file'), this._insertTemplate(child, templates, container, callback));
                    }
                } else if (utils.hasAttr(children[i], 'data-template-fallback')) {
                    // Hiding the fallback template
                    children[i].style.display = 'none';
                }
            }

            // Parsing
            if (ready) {
                var foundTemplates = {};
                for (var s = 0; s < children.length; s++) {
                    if (children[s].getAttribute !== undefined) {
                        if (utils.hasAttr(children[s], 'data-template-for') && children[s].getAttribute('data-template-for').length > 0 && this.nestedItem === children[s].getAttribute('data-template-for') && !foundTemplates[this.nestedItem]) {
                            // Nested template
                            this.createTemplate(children[s]);
                            // Guards against recursion when child template has same name!
                            foundTemplates[this.nestedItem] = true;
                        } else if (utils.hasAttr(children[s], 'data-template') && !utils.isNested(children[s])) {
                            // Normal template
                            this.createTemplate(children[s]);
                        }
                    }
                }

                // If there is no default template (data-template) then create one from container
                if (this.defaultTemplate === null) {
                    this.createTemplate(container);
                }

                utils.clearContainer(this.container);
                if (callback !== undefined) {
                    callback(this);
                }
            }
        },

        createTemplate: function (node) {
            var element = node.cloneNode(true);

            // Clear display: none;
            if (element.style.removeAttribute) {
                element.style.removeAttribute('display');
            } else if (element.style.removeProperty) {
                element.style.removeProperty('display');
            } else {
                element.style.display = 'block';
            }

            // Remapping container element in case template
            // is deep in container
            this.container = node.parentNode;

            // Element is a template
            var nonDefault = false;
            for (var a = 0; a < element.attributes.length; a++) {
                var attr = element.attributes[a];
                // If attribute
                if (utils.startsWith(attr.name, 'data-if-')) {
                    var val;
                    if (attr.value === '') {
                        val = true;
                    } else {
                        val = '\'' + attr.value + '\'';
                    }
                    this.namedTemplates[attr.name.substring(8, attr.name.length) + '==' + val] = element;
                    utils.removeAttr(element, attr.name);
                    nonDefault = true;
                } else if (attr.name === 'data-has') {
                    this.namedTemplates[attr.value + '!==undefined'] = element;
                    utils.removeAttr(element, attr.name);
                    nonDefault = true;
                } else if (attr.name === 'data-from-map') {
                    this.dataIsMap = true;
                } else if (!utils.startsWith(attr.name, 'data-template') && utils.startsWith(attr.name, 'data-')) {
                    // Treat as an attribute for template
                    this.attributes[attr.name.substring(5, attr.name.length)] = attr.value;
                }
            }
            // Setting as default template, last one wins
            if (!nonDefault) {
                this.defaultTemplate = element;
            }
        },

        templateFor: function (i) {
            for (var templateName in this.namedTemplates) {
                if (eval('i.' + templateName)) {
                    return this.namedTemplates[templateName].cloneNode(true);
                }
            }
            if (this.defaultTemplate) {
                return this.defaultTemplate.cloneNode(true);
            }
        }
    };


    /*!
     * Renderer for populating containers with data using templates.
     */
    function Renderer(templates) {
        this.templates = templates;
        this.listener = [];
        this.started = false;
        this.varRegex = new RegExp(this.templates.var_brace_left + '[ ]?([A-Za-z0-9$\\._\\[\\]]*?)([ ]?\\|[ ]?.*?)?[ ]?' + this.templates.var_brace_right, 'g');
        this.tagRegex = new RegExp(this.templates.tag_brace_left + '[ ]?([\\s\\S]*?)( [\\s\\S]*?)?[ ]?' + this.templates.tag_brace_right + '(([\\s\\S]*?)(?=' + this.templates.tag_brace_left + '[ ]?end\\1[ ]?' + this.templates.tag_brace_right + '))?', 'g');
        this.filterSplitter = new RegExp('\\|[ ]?(?=' + utils.memberRegex(this.filters) + ')', 'g');
        this.errorHandler = null;
        return this;
    }

    Renderer.prototype = {
        when: function (type, listener) {
            this.listener.push({ 'type': type, 'listener': listener });

            return this;
        },

        _getValue: function (renderer, variable, i, t) {
            var val = null;
            // Handling tempo_info variable
            if (utils.startsWith(variable, '_tempo.')) {
                return eval('t.' + variable.substring(7, variable.length));
            }

            if (variable === '.') {
                val = eval('i');
            } else if (variable === 'this' || variable.match(/this[\\[\\.]/) !== null) {
                val = eval('i' + variable.substring(4, variable.length));
            } else if (utils.typeOf(i) === 'array') {
                val = eval('i' + variable);
            } else {
                val = eval('i.' + variable);
            }

            return val;
        },

        _replaceVariables: function (renderer, _tempo, i, str) {
            var self = this;
            return str.replace(this.varRegex, function (match, variable, args) {

                try {
                    var val = renderer._getValue(renderer, variable, i, _tempo);
                    // Handle filters
                    if (args !== undefined && args !== '') {
                        var filters = utils.trim(utils.trim(args).substring(1)).split(self.filterSplitter);
                        for (var p = 0; p < filters.length; p++) {
                            var filter = utils.trim(filters[p]);
                            var filter_args = [];
                            // If there is a space, there must be arguments
                            if (filter.indexOf(' ') > -1) {
                                var f = filter.substring(filter.indexOf(' ')).replace(/^[ ']*|[ ']*$/g, '');
                                filter_args = f.split(/(?:[\'"])[ ]?,[ ]?(?:[\'"])/);
                                filter = filter.substring(0, filter.indexOf(' '));
                            }
                            val = renderer.filters[filter](val, filter_args);
                        }
                    }

                    if (val !== undefined) {
                        if (self.templates.escape) {
                            val = self.filters.escape(val, {});
                        }
                        return val;
                    }
                } catch (err) {
                    self._onError.call(self, err);
                }

                return '';
            });
        },

        _replaceObjects: function (renderer, _tempo, i, str, regex) {
            return str.replace(regex, function (match, variable, args) {
                try {
                    var val = renderer._getValue(renderer, variable, i, _tempo);

                    if (val !== undefined) {
                        if (utils.typeOf(val) === 'string') {
                            return '\'' + val + '\'';
                        } else {
                            return val;
                        }
                    }
                } catch (err) {
                    self._onError.call(self, err);
                }

                return undefined;
            });
        },

        _applyAttributeSetters: function (renderer, item, str) {
            // Adding a space in front of first part to make sure I don't get partial matches
            return str.replace(/(\b[A-z0-9]+?)(?:="[^"']*?"[^>]*?)data-\1="(.*?)"/g, function (match, attr, data_value) {
                if (data_value !== '') {
                    return attr + '="' + data_value + '"';
                }
                return match;
            });
        },

        _applyTags: function (renderer, item, str) {
            return str.replace(this.tagRegex, function (match, tag, args, body) {
                if (renderer.tags.hasOwnProperty(tag)) {
                    args = args.substring(args.indexOf(' ')).replace(/^[ ]*|[ ]*$/g, '');
                    var filter_args = args.split(/(?:['"])[ ]?,[ ]?(?:['"])/);
                    return renderer.tags[tag](renderer, item, match, filter_args, body);
                } else {
                    return '';
                }
            });
        },

        starting: function (event) {
            // Use this to manually fire the RENDER_STARTING event e.g. just before you issue an AJAX request
            // Useful if you're not calling prepare immediately before render
            this.started = true;
            if (event === undefined) {
                event = new TempoEvent(TempoEvent.Types.RENDER_STARTING, undefined, undefined);
            }
            utils.notify(this.listener, event);

            return this;
        },

        _renderNestedItem: function (i, nested) {
            var self = this;
            return function (templates) {
                var r = new Renderer(templates);
                var data = null;
                if (i.hasOwnProperty(nested.split('.')[0])) {
                    data = eval('i.' + nested);
                    if (data) {
                        try {
                            if (utils.typeOf(data) === 'array') {
                                for (var s = 0; s < data.length; s++) {
                                    data[s]._parent = function () {
                                        return i;
                                    }()
                                }
                            } else {
                                data._parent = function () {
                                    return i;
                                }();
                            }
                        } catch (err) {
                            self._onError.call(self, err);
                        }
                    }
                }
                r.render(data);
            };
        },

        renderItem: function (renderer, _tempo_info, i, fragment) {
            var memberRegex = new RegExp('(?:__[\\.]?)((_tempo|\\[|' + utils.memberRegex(i) + '|this)([A-Za-z0-9$\\._\\[\\]]+)?)', 'g');
            var template = renderer.templates.templateFor(i);
            var tempo_info = utils.merge(_tempo_info, renderer.templates.attributes);

            // Clear attributes in case of recursive nesting (TODO: Probably need to clear more)
            if (utils.hasAttr(template, 'data-template-for')) {
                utils.removeAttr(template, 'data-template-for');
            }
            if (utils.hasAttr(template, 'data-template-file')) {
                utils.removeAttr(template, 'data-template-file');
            }

            if (template && i) {
                utils.notify(this.listener, new TempoEvent(TempoEvent.Types.ITEM_RENDER_STARTING, i, template));
                var nestedDeclaration = template.innerHTML.match(/data-template-for="([^"]+?)"/g);
                if (nestedDeclaration) {
                    for (var p = 0; p < nestedDeclaration.length; p++) {
                        var nested = nestedDeclaration[p].match(/data-template-for="([^"]+?)"/);
                        if (nested && nested[1]) {
                            var t = new Templates(renderer.templates.params, nested[1]);
                            try {
                                t.parse(template, this._renderNestedItem(i, nested[1]));
                            } catch (err) {
                                this._onError.call(this, err);
                            }
                        }
                    }
                }

                // Processing template element attributes
                for (var a = 0; a < template.attributes.length; a++) {
                    var attr = template.attributes[a];
                    if (attr !== null && attr.specified && attr.value !== null && attr.value.length > 0 && attr.name.match(/style|data-template.*/) === null) {
                        attr.value = this._applyTags(this, i, attr.value);
                        attr.value = this._replaceVariables(this, tempo_info, i, attr.value);
                    }
                }

                // Dealing with HTML as a String from now on (to be reviewed)
                // Attribute values are escaped in FireFox so making sure there are no escaped tags
                var html = template.innerHTML.replace(/%7B%7B/g, '{{').replace(/%7D%7D/g, '}}');

                // Tags
                html = this._applyTags(this, i, html);

                // Content
                html = this._replaceVariables(this, tempo_info, i, html);

                // JavaScript objects
                html = this._replaceObjects(this, tempo_info, i, html, memberRegex);

                html = this._applyAttributeSetters(this, i, html);

                fragment.appendChild(utils.getElement(template, html));

                utils.notify(this.listener, new TempoEvent(TempoEvent.Types.ITEM_RENDER_COMPLETE, i, template));
            }
        },

        _createFragment: function (data) {
            if (data) {
                var tempo_info = {};
                var fragment = _window.document.createDocumentFragment();

                // If object then wrapping in an array
                if (utils.typeOf(data) === 'object') {
                    if (this.templates.dataIsMap) {
                        var mapped = [];
                        for (var member in data) {
                            if (data.hasOwnProperty(member) && member !== '_parent') {
                                var pair = {};
                                pair.key = member;
                                pair.value = data[member];
                                mapped.push(pair);
                            }
                        }
                        data = mapped;
                    } else {
                        data = [data];
                    }
                }

                for (var i = 0; i < data.length; i++) {
                    tempo_info.index = i;
                    this.renderItem(this, tempo_info, data[i], fragment);
                }

                return fragment;
            }

            return null;
        },

        into: function (target) {
            if (target !== undefined) {
                this.templates.container = utils.container(target);
            }

            return this;
        },

        render: function (data) {
            // Check if starting event was manually fired
            if (!this.started) {
                this.starting(new TempoEvent(TempoEvent.Types.RENDER_STARTING, data, this.templates.container));
            }

            this.clear();
            this.append(data);

            return this;
        },

        append: function (data) {
            // Check if starting event was manually fired
            if (!this.started) {
                this.starting(new TempoEvent(TempoEvent.Types.RENDER_STARTING, data, this.templates.container));
            }

            var fragment = this._createFragment(data);
            if (fragment !== null && this.templates.container !== null) {
                if (fragment !== null) {
                    var ref = null;
                    for (var i = this.templates.container.childNodes.length; i >= 0; i--) {

                        if (this.templates.container.childNodes[i] !== undefined && this.templates.container.childNodes[i].getAttribute !== undefined && this.templates.container.childNodes[i].getAttribute('data-after-template') !== null) {
                            ref = this.templates.container.childNodes[i];
                        }
                    }
                    if (ref === null) {
                        ref = this.templates.container.lastChild;
                    }
                    if (ref !== null) {
                        this.templates.container.insertBefore(fragment, ref);
                    } else {
                        this.templates.container.appendChild(fragment);
                    }
                }
            }

            utils.notify(this.listener, new TempoEvent(TempoEvent.Types.RENDER_COMPLETE, data, this.templates.container));

            return this;
        },

        prepend: function (data) {
            // Check if starting event was manually fired
            if (!this.started) {
                this.starting(new TempoEvent(TempoEvent.Types.RENDER_STARTING, data, this.templates.container));
            }

            var fragment = this._createFragment(data);
            if (fragment !== null) {
                var ref = null;
                for (var i = 0; i < this.templates.container.childNodes.length; i++) {
                    if (this.templates.container.childNodes[i] !== undefined && this.templates.container.childNodes[i].getAttribute !== undefined && this.templates.container.childNodes[i].getAttribute('data-before-template') !== null) {
                        ref = this.templates.container.childNodes[i];
                    }
                }
                if (ref === null) {
                    ref = this.templates.container.firstChild;
                }
                if (ref !== null) {
                    if (ref.nextSibling !== null && ref.getAttribute && ref.getAttribute('data-before-template') !== null) {
                        ref = ref.nextSibling;
                    }
                    this.templates.container.insertBefore(fragment, ref);
                } else {
                    this.templates.container.appendChild(fragment);
                }
            }

            utils.notify(this.listener, new TempoEvent(TempoEvent.Types.RENDER_COMPLETE, data, this.templates.container));

            return this;
        },

        errors: function (errorHandler) {
            this.errorHandler = errorHandler;
            return this;
        },

        _onError: function (err) {
            if (this.errorHandler !== null) {
                this.errorHandler.call(this, err);
            }
        },

        clear: function () {
            utils.notify(this.listener, new TempoEvent(TempoEvent.Types.BEFORE_CLEAR, {}, this.templates.container));
            utils.clearContainer(this.templates.container);
            utils.notify(this.listener, new TempoEvent(TempoEvent.Types.AFTER_CLEAR, {}, this.templates.container));
        },

        tags: {
            'if': function (renderer, i, match, args, body) {
                var member_regex = utils.memberRegex(i);

                var expr = args[0].replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<');
                expr = expr.replace(new RegExp(member_regex, 'gi'), function (match) {
                    return 'i.' + match;
                });

                var blockRegex = new RegExp(renderer.templates.tag_brace_left + '[ ]?else[ ]?' + renderer.templates.tag_brace_right, 'g');
                var blocks = body.split(blockRegex);

                if (eval(expr)) {
                    return blocks[0];
                } else if (blocks.length > 1) {
                    return blocks[1];
                }

                return '';
            }
        },

        filters: {
            'escape': function (value, args) {
                return value.toString().replace(/[&<>]/g, function (c) {
                    return {
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;'
                    }[c] || c;
                });
            },
            'encodeURI': function (value, args) {
                return encodeURI(value.toString());
            },
            'decodeURI': function (value, args) {
                return decodeURI(value.toString());
            },
            'truncate': function (value, args) {
                if (value !== undefined) {
                    var len = 0;
                    var rep = '...';
                    if (args.length > 0) {
                        len = parseInt(args[0], 10);
                    }
                    if (args.length > 1) {
                        rep = args[1];
                    }
                    if (value.length > len - 3) {
                        return value.substr(0, len - 3) + rep;
                    }
                    return value;
                }
            },
            'format': function (value, args) {
                if (value !== undefined) {
                    if (args.length === 1) {
                        value = parseFloat(value + '').toFixed(parseInt(args[0], 10));
                    }
                    var x = (value + '').split('.');
                    var x1 = x[0];
                    var x2 = x.length > 1 ? '.' + x[1] : '';

                    while (NUMBER_FORMAT_REGEX.test(x1)) {
                        x1 = x1.replace(NUMBER_FORMAT_REGEX, '$1' + ',' + '$2');
                    }

                    return x1 + x2;
                }
            },
            'upper': function (value, args) {
                return value.toUpperCase();
            },
            'lower': function (value, args) {
                return value.toLowerCase();
            },
            'titlecase': function (value, args) {
                var blacklist = [];
                if (args !== undefined && args.length == 1) {
                    blacklist = args[0].split(' ');
                }
                return value.replace(/\w[a-z]\S*/g, function (m, i) {
                    if (blacklist.length === 0 || !(utils.arrayContains(blacklist, m) && i > 0)) {
                        return m.charAt(0).toUpperCase() + m.substr(1).toLowerCase();
                    }
                    return m;
                });
            },
            'trim': function (value, args) {
                return utils.trim(value);
            },
            'replace': function (value, args) {
                if (value !== undefined && args.length === 2) {
                    return value.replace(new RegExp(args[0], 'g'), args[1]);
                }
                return value;
            },
            'append': function (value, args) {
                if (value !== undefined && args.length === 1) {
                    return value + '' + args[0];
                }
                return value;
            },
            'prepend': function (value, args) {
                if (value !== undefined && args.length === 1) {
                    return args[0] + '' + value;
                }
                return value;
            },
            'join': function (value, args) {
                if (args.length === 1 && value !== undefined && utils.typeOf(value) === 'array') {
                    return value.join(args[0]);
                }
                return value;
            },
            'default': function (value, args) {
                if (value !== undefined && value !== null) {
                    return value;
                }
                if (args.length === 1) {
                    return args[0];
                }
                return value;
            },
            'date': function (value, args) {
                if (value !== undefined && args.length >= 1 && args.length <= 2) {
                    var date = new Date(value);
                    var format = args[0];
                    var isUTC = (args.length === 2 && args[1] === 'UTC');
                    if (format === 'localedate') {
                        return date.toLocaleDateString();
                    } else if (format === 'localetime') {
                        return date.toLocaleTimeString();
                    } else if (format === 'date') {
                        return date.toDateString();
                    } else if (format === 'time') {
                        return date.toTimeString();
                    } else {
                        var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        var DATE_PATTERNS = {
                            'YYYY': function (date) {
                                return (isUTC ? date.getUTCFullYear() : date.getFullYear());
                            },
                            'YY': function (date) {
                                return (isUTC ? date.getUTCFullYear() : date.getFullYear()).toFixed().substring(2);
                            },
                            'MMMM': function (date) {
                                return MONTHS[(isUTC ? date.getUTCMonth() : date.getMonth())];
                            },
                            'MMM': function (date) {
                                return MONTHS[(isUTC ? date.getUTCMonth() : date.getMonth())].substring(0, 3);
                            },
                            'MM': function (date) {
                                return utils.pad(((isUTC ? date.getUTCMonth() : date.getMonth()) + 1).toFixed(), '0', 2);
                            },
                            'M': function (date) {
                                return (isUTC ? date.getUTCMonth() : date.getMonth()) + 1;
                            },
                            'DD': function (date) {
                                return utils.pad((isUTC ? date.getUTCDate() : date.getDate()).toFixed(), '0', 2);
                            },
                            'D': function (date) {
                                return (isUTC ? date.getUTCDate() : date.getDate());
                            },
                            'EEEE': function (date) {
                                return DAYS[(isUTC ? date.getUTCDay() : date.getDay())];
                            },
                            'EEE': function (date) {
                                return DAYS[(isUTC ? date.getUTCDay() : date.getDay())].substring(0, 3);
                            },
                            'E': function (date) {
                                return (isUTC ? date.getUTCDay() : date.getDay());
                            },
                            'HH': function (date) {
                                return utils.pad((isUTC ? date.getUTCHours() : date.getHours()).toFixed(), '0', 2);
                            },
                            'H': function (date) {
                                return (isUTC ? date.getUTCHours() : date.getHours());
                            },
                            'h': function (date) {
                                var hours = (isUTC ? date.getUTCHours() : date.getHours());
                                return hours < 13 ? (hours === 0 ? 12 : hours) : hours - 12;
                            },
                            'mm': function (date) {
                                return utils.pad((isUTC ? date.getUTCMinutes() : date.getMinutes()).toFixed(), '0', 2);
                            },
                            'm': function (date) {
                                return (isUTC ? date.getUTCMinutes() : date.getMinutes());
                            },
                            'ss': function (date) {
                                return utils.pad((isUTC ? date.getUTCSeconds() : date.getSeconds()).toFixed(), '0', 2);
                            },
                            's': function (date) {
                                return (isUTC ? date.getUTCSeconds() : date.getSeconds());
                            },
                            'SSS': function (date) {
                                return utils.pad((isUTC ? date.getUTCMilliseconds() : date.getMilliseconds()).toFixed(), '0', 3);
                            },
                            'S': function (date) {
                                return (isUTC ? date.getUTCMilliseconds() : date.getMilliseconds());
                            },
                            'a': function (date) {
                                return (isUTC ? date.getUTCHours() : date.getHours()) < 12 ? 'AM' : 'PM';
                            }
                        };
                        format = format.replace(/(\\)?(Y{2,4}|M{1,4}|D{1,2}|E{1,4}|H{1,2}|h|m{1,2}|s{1,2}|S{1,3}|a)/g,
                            function (match, escape, pattern) {
                                if (!escape) {
                                    if (DATE_PATTERNS.hasOwnProperty(pattern)) {
                                        return DATE_PATTERNS[pattern](date);
                                    }
                                }
                                return pattern;
                            });

                        return format;
                    }
                }

                return '';
            }
        }
    };

    /*!
     * Initialising Tempo with a Window object in case running inside Node.
     */
    tempo.init = function (window) {
        _window = window;

        return this;
    };

    /*!
     * Prepare a container for rendering, gathering templates and
     * clearing afterwards.
     */
    tempo.prepare = function (container, params, callback) {
        container = utils.container(container);

        var templates = new Templates(params);
        if (callback !== undefined) {
            templates.parse(container, function (templates) {
                callback(new Renderer(templates));
            });
        } else {
            templates.parse(container);
            return new Renderer(templates);
        }
    };

    tempo.exports = {
        'templates': Templates,
        'utils': utils
    };

    tempo.test = {
        'utils': utils,
        'templates': new Templates({}),
        'renderer': new Renderer(new Templates({}))
    };


    // Default initialisation
    try {
        tempo.init(window);
    } catch (e) {
        exports.tempo = tempo;
    }

    return tempo;

})(Tempo || {});

/**
 * @file    整个窗口的Loading
 * @authors Kevin Chen (chj@8cuo.net)
 * @date    2015-08-25 16:13:16
 * @version $Id$
 */

// timer 为自动关闭时间 单位 秒
// 为空 为不自动关闭
function pLoading(timer) {
    var w = $(window).width(),
        h = $(window).height();
    var $html = '<div class="pLoading"><div class="load_img"></div></div>';
    $('body').append($html);
    var l = (w - $('.loading_img').width()) / 2,
        t = (h - $('.loading_img').height() - 100) / 2;
    $('.pLoading').css({ width: w, height: h });
    $('.load_img').css({ top: t, left: l });
    if (!isNaN(timer)) {
        setTimeout('pLoadingClose()', timer * 1000)
    }
}

function pLoadingClose() {
    $('body').find('.pLoading').remove();
}

/**
 * @file    搜索相关JS
 * @authors Kevin Chen (chj@8cuo.net)
 * @date    2015-07-15 14:58:50
 */

var global_keydown = false;

function gotoSearchPage(keyword) {
    if (keyword != '') {
        location.href = '/product-search/' + Base64.encode(keyword).replace('/', '%2f');
    }
}
//模糊查询
function setRelative() {
    if ($("#txtProductSearch").val() == null || $("#txtProductSearch").val() == "") {
        $(".search-container").hide();
        return;
    }
    if ($("#txtProductSearch").val().trim() == "") {//空格情况处理
        $(".search-container").hide();
        return;
    }
    $.ajax({
        type: "POST",
        url: "/Product/ProductSearch/Keyword",
        cache: false,
        async: true,
        data: "keyword=" + $("#txtProductSearch").val(),
        success: function (msg) {
            if (msg.length > 0) {
                $(".search-list").html("");
                for (var i = 0 ; i < msg.length ; i++) {
                    $(".search-list").append("<li><a href='/product-search/" + msg[i].KeyWordBase64 + "'>" + Base64.decode(msg[i].KeyWordBase64) + "</a></li>");
                }
                $(".search-container").show();
            } else {
                $(".search-list").html("");
                $(".search-container").hide();
            }
        }
    });
}

; (function ($, window, document, undefined) {
    "use strict";
    var pluginName = "autoSeachComplete",
			defaults = {
			    source: '', // url
			    tmpl: '', // 输出的模板
			    keys: []
			};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            var that = this,
                $serchText = $(this.element),
                   $sugBox = $serchText.parents('div').find(".sugBox");

            $serchText
                .keypress(that.searchBoxKeyPress)
                .keyup(function () { that.searchMenuFillData($.trim($(this).val())) })
                .keydown(that.searchBoxKeyDown)
                .focus(function () { that.searchMenuFillData($.trim($serchText.val())) })
                .blur(that.searchBoxBlurEvent);

            $sugBox.mouseover(function () {
                $serchText.unbind('blur');
            });

            $sugBox.mouseout(function () {
                $serchText.bind('blur', that.searchBoxBlurEvent);
            });

            $sugBox.find("li").on('mouseover', function () {
                $(this).addClass("active").siblings('li').removeClass('active');
            });
        },
        searchBoxKeyPress: function (e) {
            switch (e.which) {
                case 13:
                    if ($.trim($(this).val()) != "") {
                        gotoSearchPage($.trim($(this).val()));
                    }
                    break;
            }
        },
        // searchBoxKeyupEvent: function(e) {
        // 	var that = this;
        //     that.searchMenuFillData($.trim($(this).val()));
        // },
        searchBoxKeyDown: function (e) {
            var $serchText = $(this),
                   $sugBox = $serchText.parents('div').find(".sugBox");
            switch (e.which) {
                case 38:
                    var liarr = $sugBox.find('li');
                    var i_active = -1;
                    $.each(liarr, function (index, item) {
                        if ($(item).hasClass('active')) {
                            i_active = index;
                        }
                    });
                    if (i_active == 0) {
                        i_active = liarr.length
                    };
                    i_active = i_active - 1;
                    $.each(liarr, function (index, item) {
                        $(item).removeClass('active');
                        if (i_active == index) {
                            $(item).addClass('active');
                            $serchText.val($(item).find('a').get(0).innerHTML.replace("&amp;", "&"));
                        }
                    });
                    global_keydown = true;
                    break;
                case 40:
                    var liarr = $sugBox.find('li');
                    var i_active = -1;
                    $.each(liarr, function (index, item) {
                        if ($(item).hasClass('active')) {
                            i_active = index;
                        }
                    });
                    if (i_active == liarr.length - 1) {
                        i_active = -1
                    };
                    i_active = i_active + 1;
                    $.each(liarr, function (index, item) {
                        $(item).removeClass('active');
                        if (i_active == index) {
                            $(item).addClass('active');
                            $serchText.val($(item).find('a').get(0).innerHTML.replace("&amp;", "&"));
                        }
                    });
                    global_keydown = true;
                    break;
            }
        },
        searchBoxBlurEvent: function () {
            var $serchText = $(this.element),
                   $sugBox = $serchText.parents('div').find(".sugBox");
            $sugBox.addClass("hide");
        },

        searchMenuFillData: function (keyword) {
            var $serchText = $(this.element),
                   $sugBox = $serchText.parents('div').find(".sugBox");
            if ($.trim(keyword) == "") {
                $sugBox.addClass("hide");
            }
            else {
                if (global_keydown == false) {
                    var _tmpl = this.settings.tmpl;
                    var _keys = this.settings.keys;
                    var reg = new RegExp("[\{](\\d+)[\}]", "g");
                    $.get(this.settings.source, { keyword: keyword }, function (data) {
                        var json;
                        typeof (data) === 'string'
                            ? json = $.parseJSON(data)
                            : json = data;
                        if (json.length > 0) {
                            $sugBox.removeClass("hide");
                            var html = [];
                            var _keyVal = [];
                            for (var i = 0; i < json.length; i++) {

                                for (var j = 0; j < _keys.length; j++) {
                                    _keyVal[j] = json[i][_keys[j]];
                                }
                                var test = function ($1) {
                                    return _keyVal[$1.replace(/[^0-9]/ig, "")];
                                }

                                html.push(_tmpl.replace(reg, test))
                                //console.log(newstr);
                                //html += '<li><a href="'+ _pathSearch + json[i].KeyWordBase64 + '">' + json[i].KeyWord + '</a></li>';
                            }
                            $sugBox.html('<ul>' + html.join('') + '</ul>');
                        } else {
                            $sugBox.addClass("hide");
                        }
                    })
                } else {
                    global_keydown = false;
                }
            }
        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
    $(function () {
        $('[data-widget="' + pluginName + '"]').each(function () {
            var config = $(this).data("config") || {};
            $(this).autoSeachComplete(config);
        });
    });
})(jQuery, window, document);

//绑定Dom
$(document).on('click', '#ProductSearch', function (event) {
    event.preventDefault();
    var _w = $(this).siblings('input[class="search_ipt"]').val();
    gotoSearchPage($.trim(_w));
});
//模糊查询
$(function () {
    $('.search_ipt').bind('input propertychange', function () {
        setRelative()
    });
});
$(function () {
    $('input[name="s_keyword"]').each(function () {
        $(this).autoSeachComplete({
            source: "/product-search-Keyword/",
            tmpl: '<li><a href="/product-search/{0}">{1}</a></li>',
            keys: ['KeyWordBase64', 'KeyWord']
        });
    });
    $(".sugBox").addClass('hide');
    $(":input[name='s_keyword']").blur(function () {
        $(".sugBox").addClass("hide");
    });
});

/**
 * @file: 导航相关样式
 * @authors Kevin Chen (chj@8cuo.net)
 * @date    2015-07-10 13:22:37
 */
var outTimer, hoverTimer;
$(document).on('mouseenter mouseleave', '[data-subnav]', function (event) {
    var o = $(this).offset(),
		    $target = $('.J-subnav[data-cate=' + $(this).data("subnav") + ']');
    if (event.type === 'mouseenter') {
        clearTimeout(outTimer);
        function overEvent() {
            //		$target.css('top',o.top + 70).fadeIn(500).siblings('.J-subnav').fadeOut();
            $target.css("visibility", "visible");
            $target.siblings('.cursor').find('.arrow').stop(true, false).show();
            $target.parents().siblings().find('.arrow').hide();
            $target.parents().siblings().find('.J-subnav').hide();
            $target.stop(true, false).fadeIn(function () {
                //				$(this).parents().siblings().find('.J-subnav').stop(true,false).fadeOut();
            });
        }
        hoverTimer = setTimeout(overEvent, 300);
    } else {
        clearTimeout(hoverTimer);
        //$target.delay(500).fadeOut();
        function outEvent() {
            $target.fadeOut();
            $(".g-nav .arrow").fadeOut();
            $(".J-subnav").fadeOut();
        }
        outTimer = setTimeout(outEvent, 300);

    }
});

$(document).on('mouseenter  mouseleave', '.J-subnav', function (event) {
    if (event.type === 'mouseenter') {
        clearTimeout(outTimer);
        $(this).stop(true, false).fadeIn();
        $(this).siblings('a').find('.arrow').stop(true, false).fadeIn();

    } else {
        clearTimeout(hoverTimer);
    }
});

$(function () {
    $(".J-navul").each(function () {
        $(this).find('.default-li-selected').first().find('i').show();
        $(this).find('.default-li-selected:gt(0)').find('i').hide();
        console.log()
        var uls = $(this).find('ul').length,
			maxh = 0, maxw = 0;
        $(this).find('ul').each(function () {
            var height = $(this).height();
            if (height > maxh) {
                maxh = height;
            }
        });
        $(this).find('.default-li-selected').each(function () {
            var width = $(this).width();
            if (width > maxw) {
                maxw = width;
            }
        });
        $(this).height(maxh + 50);
        if (maxw > 78) {
            $(this).width(maxw + 132);
        }
        if ($(this).width() > 163) {
            $(this).find('.children').css('left', 223 + $(this).width() - 163);
        }
    });

    $(".default-li-selected").each(function () {
        var uLength = $(this).find('ul').length;
        var ulW = $(this).parents('ul').width();
        //		$(this).find('i').hide();
        $(this).on('mouseover', function (event) {
            $(this).find('.children').css("visibility", "visible");
            $(this).find('i').show();
            $(this).siblings().find('i').hide();
            $(this).siblings().find('.children').css("visibility", "hidden");
            $(this).parents(".bottomlvl-cat-header-wrapper").width(uLength * 115 + 85 + ulW);
        })
    });

    $(".bottomlvl-cat-header-wrapper").each(function () {
        var uLength = $(this).find('li').eq(0).find('ul').length;
        var ulW2 = $(this).find('.J-navul').width();
        var iL = $(this).find('i').length;
        var ulW = $(this).find('ul').eq(0).width();
        for (var i = 0; i < iL; i++) {
            $(this).find(".selected-arrow").eq(i).css({ "top": 35 + (i + 1) * 30, "left": ulW - 7 });
        };
        $(this).width(uLength * 115 + 61 + ulW2);
    });

});
//设置主导航当前状态
$(function () {
    if ($('#channelorder').val()) {
        var _curNav = $('#channelorder').val();
        $('.g-nav').find('li').eq(_curNav - 1).addClass('active').siblings('li').removeClass('active');
    }
});

//导航栏箭头JS
$(document).ready(function () {
    $(".space .arrow").each(function () {
        var pw = $(this).parents('a.cursor').width();
        $(this).css('left', pw / 2 + 2);
    });

});

/**
 * @file    导航栏设计对话和空间美学图片滚动JS
 * @date    2016-02-22 14:08:47
 * @authors Kevin Chen 
 */
$(document).ready(function () {
    var imgw, dls;
    $(".J-imgbox").each(function () {
        dls = $(this).children('dl').length;
        imgw = $(this).children('dl').width() + 7;
        var boxw = imgw * dls;
        var g = (dls - 6) * (-167);
        $(this).width(boxw);
        if (dls > 6) {
            var left = parseInt($(this).css("left"));
            if (isNaN(left)) {
                left = 0;
            }
            if (left >= 0) {
                $(this).siblings('.prve').css("display", "none");
            }
            $(this).parents().children('.prve').click(function () {
                var left = parseInt($(this).siblings(".J-imgbox").css("left"));
                if (isNaN(left)) {
                    left = 0;
                }
                if (left < 0) {

                    if (!$(".J-imgbox").is(":animated")) {
                        $(this).siblings(".J-imgbox").animate({ left: left + 167 + 'px' }, "slow");
                        if (left > g) {
                            $(this).css("display", "none");
                            $(this).siblings('.next').css("display", "block");
                        }

                    }
                }
                $(this).siblings('.next').css("display", "block");
            });

            $(this).parents().children('.next').click(function () {
                var left = parseInt($(this).siblings(".J-imgbox").css("left"));
                if (isNaN(left)) {
                    left = 0;
                }
                if (left > g) {
                    if (!$(".J-imgbox").is(":animated")) {
                        $(this).siblings(".J-imgbox").animate({ left: left - 167 + 'px' }, "slow");
                        if (left < 0) {
                            $(this).css("display", "none");
                            $(this).siblings('.prve').css("display", "block");
                        }
                    }
                };
                $(this).siblings('.prve').css("display", "block");
            });

        } else {
            $(this).parents().children('.prve').css("display", "none");
            $(this).parents().children('.next').css("display", "none");
        }

    });
});

/**
 * @file    返回顶部
 * @authors Kevin Chen (chj@8cuo.net)
 * @date    2015-09-02 16:08:35
 * @version 
 */

$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('.backtop').css({ 'display': 'block' });
        } else {
            $('.backtop').hide();
        }
    });

    $('.backtop').on('click', function () {
        $('body,html').stop().animate({ scrollTop: 0 }, 1000, function () {
            $('body,html').stop();
        });
        $('.backtop').hide();
    });

    $('.fixbar').find('.contact').dropdown({
        dropDom: '.list',
        animate: 'fade'
    });

    $('#allLogin').on('click', function () {
        window.location.href = '/Member/Customer/Index';
    });
    $('#allIndex').on('click', function () {
        window.location.href = '/Member/Customer/Index';
    });
});
/* 
       * 动态设置百度分享URL的函数,具体参数
       * config为当前设置，返回值为更新后的设置。
       */
function SetShareUrl(cmd, config) {
    config.bdUrl = "http://192.168.85.138:8821/";
    return config;
}

/**
* @file    分享效果
* @date    2015-012-25 09:52:47
*/
window._bd_share_config = {
    "common": {
        //"onBeforeClick": SetShareUrl,
        "bdSnsKey": {},
        "bdText": "",
        "bdMini": "2",
        "bdMiniList": false,
        "bdPic": "",
        "bdStyle": "2",
        "bdSize": "24"
    },
    "share": {
        //"bdCustomStyle": "/Assets/themes/default/css/style.css"
    }
};
with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
