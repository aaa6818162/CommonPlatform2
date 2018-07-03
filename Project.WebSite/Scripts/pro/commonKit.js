var pro = pro || {};
(function () {
    pro.commonKit = pro.commonKit || {};
    pro.commonKit = {
        getUrlParam: function (paramName) {
            var paramValue = "";
            var isFound = false;
            if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
                var arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&");
                var i = 0;
                while (i < arrSource.length && !isFound) {
                    if (arrSource[i].indexOf("=") > 0) {
                        if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                            paramValue = arrSource[i].split("=")[1];
                            isFound = true;
                        }
                    }
                    i++;
                }
            }
            return paramValue;
        },
        parseParam: function (param, key) {
            var paramStr = "";
            if (param instanceof String || param instanceof Number || param instanceof Boolean) {
                paramStr += "&" + key + "=" + encodeURIComponent(param);
            } else {
                $.each(param, function (i) {
                    var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                    paramStr += '&' + pro.commonKit.parseParam(this, k);
                });
            }
            return paramStr.substr(1);
        },
        errorPlacementHd: function (error, element) {
            if (element.get(0).type.indexOf("select") == -1) {
                element.attr('title', error.html());
                element.poshytip({
                    className: 'tip-yellowsimple',
                    showOn: 'focus',
                    alignTo: 'target',
                    alignX: 'inner-left',
                    offsetX: 0,
                    offsetY: 5,
                    showTimeout: 100
                });
            }
        },
        noLogHd: function (data) {
            if (data.error.message == "没有权限") {
            var index=    layer.open({
                    type: 1,
                    title: ['密码登录', 'font-size:16px;color: #3c3c3c;font-weight: 700;'],
                    area: ['350px', '400px'],
                    content: ' <div id="login-box">\n' +
                    '        <form>\n' +
                    '            <div class="item item-fore1">\n' +
                    '                <span class="iconfont icon-yonghuming icon fl"></span>\n' +
                    '                <input  type="text" class="itxt fl"  placeholder="已验证手机" id="AccountName"/>\n' +
                    '            </div>\n' +
                    '            <div class="item item-fore2">\n' +
                    '                <span class="iconfont icon-mima icon fl"></span>\n' +
                    '                <input type="password"  class="itxt fl" placeholder="密码" id="Password"/>\n' +
                    '            </div>\n' +
                    '            <div class="forget-pw fr">\n' +
                    '                <a href="/Account/ForgetPassword1">忘记密码</a>\n' +
                    '            </div>\n' +
                    '            <div class="login-btn">\n' +
                    '                <button class="btn-entry"  id="btn_Login"  type="button">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>\n' +
                    '            </div>\n' +
                    '            <div class="warn" id="LoginErrorPlace" style="display:none">\n' +
                    '                <span class="iconfont icon-jinzhi fl"></span>\n' +
                    '                <span class="warn-info">提示：用户名或密码错误！</span>\n' +
                    '            </div>\n' +
                    '            <div class="regist-link fr clearfix ">\n' +
                    '                    <a href="/Account/Register">立即注册</a>\n' +
                    '                    <span class="iconfont icon-jiantouarrow594"></span>\n' +
                    '\n' +
                    '                </div>\n' +
                    '        </form>\n' +
                    '    </div>'
                });


                $("#btn_Login").click(
               function () {
                   var postData = { AccountName: $("#AccountName").val(), Password: $("#Password").val() };

                   $.ajax({
                       dataType: 'json',
                       type: 'POST',
                       contentType: 'application/json',
                       url: "/Account/Login",
                       data: JSON.stringify(postData),
                       cache: false,
                       async: false,
                       success: function (data) {
                           //alert(JSON.stringify(data));
                           if (data.success) {
                               layer.close(index);

                               $.ajax({
                                   dataType: 'html',
                                   type: 'Get',
                                   url: "/Part/TopHead",
                                   cache: false,
                                   async: true,
                                   success: function(data) {
                                       $("#div_tophead").html(data);
                                   }
                               });


                           } else {
                               $("#LoginErrorPlace").css("display", "");
                           }

                       }
                   });

                   return;
               }
           );


            }
        },
        returnFloat: function (value) {
            var value = Math.round(parseFloat(value) * 100) / 100;
            var xsd = value.toString().split(".");
            if (xsd.length == 1) {
                value = value.toString() + ".00";
                return value;
            }
            if (xsd.length > 1) {
                if (xsd[1].length < 2) {
                    value = value.toString() + "0";
                }
                return value;
            }
        }
    };
})();