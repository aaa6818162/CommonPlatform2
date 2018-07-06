/// <reference path="../jquery/jquery-2.2.3.min.js" />
/// <reference path="baiduTemplate.js" />

/**************************************************************
名   称：模版解析插件
描   述：模版解析插件，顶部引用的JS文件代码切勿删除
作   者：赵勋涛
时   间：2016-05-06
声   明：
规则说明：
广告代码块规则：<!--{"type":"adv","data":{"code":"new"}}-->
文章代码块规则：<!--{"type":"article","data":{"code":1}}-->
商品代码块规则：<!--{"type":"products","data":{"template":1,"products":[{"prosku":"7590015","count":1}]}}-->
数据源代码块规则：<!--{"type":"datasources","data":{"template":1,"datasources":[{"dasname":"pro.category.austin","count":1}]}}-->
使用说明：$('.div').analysis();
修改人员：                                                    
修改说明：                                                    
修改时间：                                                    
**************************************************************/

; (function ($) {
    $.fn.analysis = function (options) {
        /*默认参数
        url：代码块解析ajax请求地址
        istpl：是否进行HTML模版解析，默认false
        turl：html模版解析ajax数据请求地址，默认空
        options：html模版解析ajax数据请求使用的参数，json格式，默认空
        */
        var defaults = {
            url: '/template/',
            istpl: false,
            data: null,
            turl: '',
            options: {}
        };

        var opts = $.extend(defaults, options);

        //方法
        var methods = {
            baiduTemplate: baidu.template,
            //需要解析的代码块数组集合
            codeList: new Array(),
            /*
            名称：代码块解析
            描述：dom，需要解析的dom对象
            返回：
            */
            codeAnalysis: function (dom) {
                methods.codeList = methods.match(dom.html());

                var count = methods.arrayLength(methods.codeList);

                if (count > 0) {
                    for (var i = 0; i < count; i++) {
                        var json = methods.codeList[i];
                        var _options = { type: json.type, data: JSON.stringify(json.data) };
                        methods.ajax(dom, opts.url, _options, methods.codeRequestHandler);
                    }
                }
            },
            /*
            名称：html模版解析
            描述：dom，需要解析的dom对象
            返回：
            */
            htmlAnalysis: function (dom) {
                methods.ajax(dom, opts.turl, opts.options, methods.htmlRequestHandler);
            },
            /*
            名称：代码块解析ajax请求输出处理
            描述：
            返回：
            */
            codeRequestHandler: function (dom, result) {
                var json = methods.searchArray(result.Type);

                if (json != null) {
                    var content;

                    if (result.IsReplace)
                        content = methods.replaceHtmlTemplate(result.Content, result);
                    else
                        content = result.Content;

                    methods.replaceHtml(dom, "<!--" + JSON.stringify(json) + "-->", content);
                }
            },
            /*
            名称：html模版解析ajax请求输出处理
            描述：
            返回：
            */
            htmlRequestHandler: function (dom, result) {
                if (result != undefined && result != null) {
                    var html = methods.replaceHtmlTemplate(dom.html(), result);

                    //渲染html
                    dom.html(html);
                }
            },
            /*
            名称：ajax请求
            描述：
                dom:解析的dom对象
                url:请求地址
                options：参数，json格式
                callBack：回调函数
            返回：
            */
            ajax: function (dom, url, options, callBack) {
                $.ajax({
                    url: url,
                    data: options,
                    type: "post",
                    cache: false,
                    dataType: "json",
                    success: function (result) {
                        if (result.Success) {
                            if (callBack)
                                callBack(dom, result);
                        }
                    },
                    error: function () { }
                });
            },
            /*
            名称：正则匹配代码块
            描述：htmls，进行匹配查找的html
            返回：返回数组形式，[json,json,json]     
            */
            match: function (htmls) {
                var list = new Array();

                var codes = htmls.match(/<!--(\\*.*?\\*)-->/g);

                var count = (codes != undefined && codes != null) ? codes.length : 0;

                if (count > 0) {
                    for (var i = 0; i < codes.length; i++) {
                        list.push(eval('(' + codes[i].match(/<!--(\\*.*?\\*)-->/)[1] + ')'));
                    }
                }

                return list;
            },
            /*
            名称：替换代码块内容
            描述：htmls，进行匹配查找的html
            返回：返回数组形式，[json,json,json]     
            */
            replaceHtml: function (dom, codes, content) {
                codes = methods.encodeReg(codes);

                dom.html(dom.html().replace(new RegExp(codes, "gi"), content));

                var list = methods.match(dom.html());

                if (methods.arrayLength(list) > 0)
                    $(dom).analysis();
            },
            /*
            名称：使用百度模板引擎进行html模板替换
            描述：
                tpl:模板代码（String类型）
                data:替换模板标签的数据，json格式
            返回：解析替换后的html代码
            */
            replaceHtmlTemplate: function (tpl, data) {
                //可以设置分隔符
                methods.baiduTemplate.LEFT_DELIMITER = "<%";
                methods.baiduTemplate.RIGHT_DELIMITER = "%>";

                tpl = tpl.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

                //进行模板解析替换
                return methods.baiduTemplate(tpl, data);
            },
            /*
            名称：根据代码块类型查询集合
            描述：type，代码块类型
            返回：json对象
            */
            searchArray: function (type) {
                var count = methods.arrayLength(methods.codeList);

                if (count > 0) {
                    for (var i = 0; i < count ; i++) {
                        if (methods.codeList[i].type == type) {
                            return methods.codeList[i];
                        }
                    }
                }
            },
            /*
            名称：转义对正则有影响的字符
            描述：str需要转义的字符串
            返回：转义后的字符串
            */
            encodeReg: function (str) {
                return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
            },
            /*
            名称：获取字符串长度
            描述：obj，字符串对象
            返回：字符串长度
            */
            arrayLength: function (array) {
                return (array != undefined && array != null) ? array.length : 0;
            },
            /*
            名称：判断字符串对象是否为空
            描述：obj，字符串对象
            返回：true：空；false：非空 
            */
            isNullOrEmpty: function (obj) {
                if (obj == undefined || obj == "undefined" || obj == null || obj == '')
                    return false;

                return true;
            },
            /*debugging*/
            debugging: function () {
                if (window.console && window.console.log)
                    window.console.log(log);
            }
        };

        return this.each(function () {
            var dom = $(this);

            if (opts.istpl) {
                if (opts.data != undefined && opts.data != null)
                    methods.htmlRequestHandler(dom, opts.data);
                else
                    methods.htmlAnalysis(dom);
            } else
                methods.codeAnalysis(dom);
        });
    };
})(jQuery);