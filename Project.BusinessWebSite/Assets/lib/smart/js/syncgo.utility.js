var pageConfig = {
    submitEnable: true, //当前页面是否允许提交

};
//全选反选器
var selector = function (itemEles) {
    var _ = {
        eventWith: function (selEle) {
            selEle.click(function () {
                if (this.checked) {
                    itemEles.prop("checked", true);
                } else {
                    itemEles.prop("checked", false);
                }
            });
        },
        GetValue: function (s) {
            var v = [];
            itemEles.each(function (i, ele) {
                if ($(ele).is(':checked')) {
                    v.push($(ele).val());
                }
            });
            if (!s) s = ',';
            return v.join(s);
        }
    };
    return _;
};

//表单提交器
var formSubmitor = function (formEle, url, btnLock, btnLoading, pageLock) {
    if (!url) url = formEle.attr('action');
    var _ = {
        FormElement: formEle,
        Action: url,
        Do: function (btnEle, callback) {
            if (!pageConfig.submitEnable && pageLock) {
                alert('当前页面有操作没完成，请等待');
            }
            pageConfig.submitEnable = false;
            if (btnLock) AppButton.lock(btnEle);
            if (btnLoading) AppButton.loading(btnEle);
            $.ajax({
                type: "POST",
                url: url,
                data: this.FormElement.serialize(),// 要提交的表单
                success: function (r) {
                    pageConfig.submitEnable = true;
                    if (btnLock) AppButton.unlock(btnEle);
                    if (btnLoading) AppButton.unload(btnEle);
                    if (r.IsError) {
                        iDialog.alert({ message: r.Message });
                    } else {
                        if (callback && typeof callback == 'function') {
                            callback(r);
                        } else {
                            window.location.href = callback;
                        }
                    }
                },
                error: function (e) {
                    pageConfig.submitEnable = true;
                    if (btnLock) AppButton.unlock(btnEle);
                    if (btnLoading) AppButton.unload(btnEle);
                    iDialog.alert({ message: '操作失败:' + e.ReponseText });
                }
            });
        }
    };
    return _;
};
//ajax提交
var richAjax = function (data, url, btnLock, btnLoading, pageLock) {
    if (!url) url = formEle.data('action');
    var _ = {
        Data: data,
        Action: url,
        Do: function (btnEle, callback) {
            if (!pageConfig.submitEnable && pageLock) {
                alert('当前页面有操作没完成，请等待');
            }
            pageConfig.submitEnable = false;
            if (btnLock) AppButton.lock(btnEle);
            if (btnLoading) AppButton.loading(btnEle);
            $.ajax({
                type: "POST",
                url: url,
                data: data,// 要提交的表单
                success: function (r) {
                    pageConfig.submitEnable = true;
                    if (btnLock) AppButton.unlock(btnEle);
                    if (btnLoading) AppButton.unload(btnEle);
                    if (r.IsError) {
                        iDialog.alert({ message: r.Message });
                    } else {
                        if (callback && typeof callback == 'function') {
                            callback(r);
                        } else {
                            window.location.href = callback;
                        }
                    }
                },
                error: function () {
                    pageConfig.submitEnable = true;
                    if (btnLock) AppButton.unlock(btnEle);
                    if (btnLoading) AppButton.unload(btnEle);
                }
            });
        }
    };
    return _;
};
//按钮控制类
var AppButton = {
    _text: '',
    loading: function (ele) {
        var iele = ele.find('i');
        if (iele.length > 0) {
            if (iele.hasClass('fa')) {
                iele.addClass('fa-spinner fa-spin');
            } else {
                iele.addClass('fa fa-spinner fa-spin');
            }
        } else {
            iele = $('<i class="fa fa-refresh fa-spinner fa-spin"></i>');
            ele.append(iele);
        }
    },
    unload: function (ele) {
        var iele = ele.find('i');
        if (iele.length > 0) {
            iele.removeClass('fa-spinner fa-spin');
        }
    },
    lock: function (ele, msg) {
        AppButton._text = ele.text();
        if (!AppButton._text) AppButton._text = "提交";
        if (!msg) msg = "正在提交信息，请稍等...";
        ele.text(msg);
        ele.attr("disabled", true);
    },
    unlock: function (ele, msg) {
        if (!msg) msg = AppButton._text;
        ele.text(msg);
        ele.attr("disabled", false);
    }
};
//idialog弹出提示
var iDialog = function () {
    var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
          '<div class="modal-dialog modal-sm">' +
           '<div class="modal-content">' +
            '<div class="modal-header">' +
             '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
             '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>[Message]</p>' +
            '</div>' +
            '<div class="modal-footer">' +
    '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
    '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
   '</div>' +
           '</div>' +
          '</div>' +
         '</div>';


    var dialogdHtml = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
          '<div class="modal-dialog">' +
           '<div class="modal-content">' +
            '<div class="modal-header">' +
             '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
             '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '</div>' +
           '</div>' +
          '</div>' +
         '</div>';
    var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
    var generateId = function () {
        var date = new Date();
        return 'mdl' + date.valueOf();
    }
    var init = function (options) {
        options = $.extend({}, {
            title: "操作提示",
            message: "提示内容",
            btnok: "确定",
            btncl: "取消",
            width: 200,
            auto: false
        }, options || {});
        var modalId = generateId();
        var content = html.replace(reg, function (node, key) {
            return {
                Id: modalId,
                Title: options.title,
                Message: options.message,
                BtnOk: options.btnok,
                BtnCancel: options.btncl
            }[key];
        });
        $('body').append(content);
        $('#' + modalId).modal({
            width: options.width,
            backdrop: 'static'
        });
        $('#' + modalId).on('hide.bs.modal', function (e) {
            $('body').find('#' + modalId).remove();
        });
        return modalId;
    }

    return {
        alert: function (options) {
            if (typeof options == 'string') {
                options = {
                    message: options
                };
            }
            var id = init(options);
            var modal = $('#' + id);
            modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
            modal.find('.cancel').hide();

            return {
                id: id,
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.find('.ok').click(function () { callback(true); });
                    }
                },
                hide: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.on('hide.bs.modal', function (e) {
                            callback(e);
                        });
                    }
                }
            };

            $('#dialog_alert').dialog('open');

            return {
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.find('.ok').click(function () { callback(true); });
                    }
                },
                hide: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.on('hide.bs.modal', function (e) {
                            callback(e);
                        });
                    }
                }
            };
        },
        confirm: function (options) {
            var id = init(options);
            var modal = $('#' + id);
            modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
            modal.find('.cancel').show();
            return {
                id: id,
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.find('.ok').click(function () { callback(true); });
                        modal.find('.cancel').click(function () { callback(false); });
                    }
                },
                hide: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.on('hide.bs.modal', function (e) {
                            callback(e);
                        });
                    }
                }
            };
        },
        dialog: function (options) {
            options = $.extend({}, {
                title: 'title',
                url: '',
                width: 800,
                height: 550,
                onReady: function () { },
                onShown: function (e) { }
            }, options || {});
            var modalId = generateId();

            var content = dialogdHtml.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Title: options.title
                }[key];
            });
            $('body').append(content);
            var target = $('#' + modalId);
            target.find('.modal-body').load(options.url);
            if (options.onReady())
                options.onReady.call(target);
            target.modal();
            target.on('shown.bs.modal', function (e) {
                if (options.onReady(e))
                    options.onReady.call(target, e);
            });
            target.on('hide.bs.modal', function (e) {
                $('body').find(target).remove();
            });
        }
    }
}();


$(function () {
    //bootstrap tab控制
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        $.cookie('tab_selected', $(e.target).attr('href'));
    })
    var tabed = $.cookie('tab_selected');
    if (tabed && $('a[href=' + tabed + ']').length > 0) {
        $('a[href=' + tabed + ']').tab('show');
    }
});

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    }
};

if (!Date.prototype.format) {
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
    Date.prototype.format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
};