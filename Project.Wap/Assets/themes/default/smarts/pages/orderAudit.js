smart.viewerEngineer.regedit('orderAudit', function (model) {
    var many;
    var jinsate = 0;
    var plugin = {
        conf: {
            btnCloseImg: '[role=closeImg]',   //删除图片
            btnApplication: '[role=btnApplication]'   //提交退货申请
        },
        //页面处理
        view: {
            //上传
            upload: function (clickId, uiobj, liobj, type) {
                document.querySelector(clickId).addEventListener('change', function () {
                    var that = this;
                    lrz(that.files[0])
                        .then(function (rst) {
                            // 处理成功会执行
                            var img = new Image();
                            img.onload = function () {
                                //$(".fail-img").attr("src", img.src);
                            };
                            img.src = rst.base64;
                            $.richAjax('/Upload/UploadWap', { base64: rst.base64, uploadFile: "/UploadFile/" + $('#area').val() + "/" + type, allowFileSuffixs: "jpg|gif|png|jpeg|bmp" }, function (result) {
                                if (result.success) {
                                    $('<li class="pos-r"><div class="img-mask pos-a"></div><img class="list-uploadImg pos-a" src="' + result.data.Path + '" /><div class="del-img txta-c pos-a" role="closeImg">-</div><input class="file pos-a" class="file" type="file" disabled="disabled" /></li>').insertBefore(liobj);
                                    var imagesCount = $('.list-uploadImg').length;
                                    if (imagesCount >= 5) {
                                        $(liobj).hide();
                                    }
                                } else {
                                    _.view.message.alert(result.Message);
                                }
                            });
                        })
                        .catch(function (err) {
                            // 处理失败会执行
                        })
                        .always(function () {
                            // 不管是成功失败，都会执行
                        });
                });
            },
            InitView: function () {
                var scroll = mui('.mui-scroll-wrapper').scroll();
                var orderNo = $('#hidOrderNo').val();
                (function ($) {
                    viewApi = mui('#app').view({
                        defaultPage: '#setting'
                    });
                    var view = viewApi.view;
                    //处理view的后退与webview后退
                    var oldBack = $.back;
                    $.back = function () {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            window.location.href = '/Trading/Order/OrderDetail?orderno=' + orderNo;
                        } else { //执行webview后退
                            window.location.href = '/Trading/Order/OrderDetail?orderno=' + orderNo;
                        }
                    };
                })(mui);
            },
            //获取退货退款显示数据
            returnGoods: {
                getting: function () {
                    var auditId = $('#hidauditId').val();
                    var orderNo = $('#hidOrderNo').val();
                    var orderId = $('#hidOrderChildDetailId').val();
                    var reason = $('#selectReason').val();
                    var quantity = $('#selectQuantity').val();
                    var explan = $('#txtLogisticsExplanation').val();
                    var pictures = _.view.returnGoods.GetImages();
                    return {
                        auditId: auditId,
                        orderNo: orderNo,
                        orderId: orderId,
                        reason: reason,
                        quantity: quantity,
                        explan: explan,
                        pictures: pictures
                    };
                },
                setting: function (auditId, orderNo, orderId) {
                    //获取显示信息
                    order.getOrderAuditView(auditId, orderNo, orderId, function (result) {
                        if (result.Success) {
                            if (result.Result != null && result.Result != undefined) {
                                var data = eval('(' + result.Result + ')');
                                if (!smart.validate.isNullOrEmpty(data.Reason)) {
                                    $("#selectReason").val(data.Reason);
                                    //$("#Reason .cs-selected").html(data.Reason);
                                }
                                $("#selectQuantity").val(data.Quantity);
                                //$("#Quantity .cs-selected").html(data.Quantity);

                                $('#hidPrice').val(data.Money);
                                var hidTotal = Number($('#hidTotal').val());
                                if (hidTotal == data.Quantity && data.Freight > 0) {
                                    $('#spanMoney').html(data.Money + '(含运费' + data.Freight + '元)');
                                } else {
                                    $('#spanMoney').html(data.Money);
                                }
                                $('#hidFreightSum').val(data.Freight);

                                if (!smart.validate.isNullOrEmpty(data.Explanation)) {
                                    $('#txtLogisticsExplanation').val(data.Explanation);
                                }
                                many = $('#spanMoney').text();
                                if (!smart.validate.isNullOrEmpty(data.Pictures)) {
                                    var count = 0;
                                    $.each(data.Pictures.split(','), function (i, item) {
                                        var html = '<li class="pos-r"><div class="img-mask pos-a"></div><img class="list-uploadImg pos-a" src="' + item + '" onerror="javascript:this.src=\'' + smart.utility.generateDefaultImgUrl(180, 180) + '\'" /><div class="del-img txta-c pos-a" role="closeImg">-</div>';
                                        html += '<input class="file pos-a" class="file" type="file" disabled="disabled" /></li>';
                                        $(html).insertBefore('#uploadlist');
                                        count++;
                                    });
                                    if (count >= 5) {
                                        $('#uploadlist').hide();
                                    }
                                }
                            }
                            else
                                _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                        }
                        else
                            _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                    });
                },
                closeImg: function (obj) {
                    var path = obj.parent().find('img').attr('src');
                    if (!$.utility.isNullOrEmpty(path)) {
                        $('img[src="' + path + '"]').parent().remove();
                        var imagesCount = $('.list-uploadImg').length;
                        if (imagesCount < 5) {
                            $('.addimg').parent('li').show();
                        }
                    }
                },
                GetImages: function () {
                    var imgs = "";
                    $('.list-uploadImg').each(function () {
                        imgs += $(this).attr('src') + ',';
                    });
                    imgs = !$.utility.isNullOrEmpty(imgs) ? imgs.substr(0, imgs.length - 1) : '';
                    return imgs;
                },
                submit: function () {
                    var data = _.view.returnGoods.getting();
                    if (smart.validate.isNullOrEmpty(data.reason)) {
                        _.view.message.alert('请选择退货原因！');
                        return;
                    }

                    if (!smart.validate.isNullOrEmpty(data.auditId) && data.auditId > 0) {
                        //修改退货申请
                        order.changeReturnGood(data.orderNo, data.auditId, data.reason, data.quantity, data.explan, data.pictures, function (d) {
                            if (d.Success) {
                                var auditid = d.Message;
                                window.location.href = '/Trading/OrderAudit/ReturnGoodsPending?id=' + auditid + '&orderId=' + data.orderId + '&orderNo=' + data.orderNo;
                            }
                            else {
                                _.view.message.alert(d.Message);
                            }
                        });
                    } else {
                        //退货申请
                        order.applyReturnGood(data.orderNo, data.orderId, data.reason, data.quantity, data.explan, data.pictures, function (d) {
                            if (d.Success) {
                                auditid = d.Message;
                                window.location.href = '/Trading/OrderAudit/ReturnGoodsPending?id=' + auditid + '&orderId=' + data.orderId + '&orderNo=' + data.orderNo;
                            }
                            else {
                                _.view.message.alert(d.Message);
                            }
                        });
                    }
                },
                init: function () {
                    var data = _.view.returnGoods.getting();

                    _.view.returnGoods.setting(smart.validate.isNullOrEmpty(data.auditId) ? 0 : data.auditId, data.orderNo, data.orderId);

                    _.view.upload('#fileField', '#imagelist', '#uploadlist', 'ReturnGoods');

                    mui.init({ gestureConfig: { longtap: true } });

                    mui("#imagelist").on('longtap', '.img-mask', function () {
                        $(this).siblings('.del-img').show();
                    });

                    mui("#imagelist").on('tap', _.conf.btnCloseImg, function () {
                        _.view.returnGoods.closeImg($(this));
                    });

                    mui('#setting').on('tap', _.conf.btnApplication, function () {
                        if (jinsate == 0) {
                            jinsate = 1;
                            _.view.returnGoods.submit();
                        }
                        jinsate = 0;
                    });

                    _container.on('change', '#selectQuantity', function () {
                        var quantity = $('#selectQuantity').val();
                        $('#spanMoney').text(quantity * many);
                    });
                }
            },
            //退货申请等待处理
            returnGoodsPending: {
                setting: function (auditId) {
                    //获取显示信息
                    order.getOrderAuditView(auditId, '', '', function (result) {
                        if (result.Success) {
                            var data = eval('(' + result.Result + ')');
                            $('#pReason').html('退货原因：' + data.Reason);
                            $('#pQuantity').html('退货数量：' + data.Quantity + '件');
                            $('#pMoney').html('退款金额：' + data.Money + '元');
                        }
                        else
                            _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                    });
                },
                canenl: function (auditId, orderId, orderNo) {
                    //取消订单
                    order.cancelReturnGood(auditId, function (result) {
                        if (result.Success) {
                            window.location.href = '/Trading/OrderAudit/ReturnsFinish?id=' + auditId + '&orderId=' + orderId + '&orderNo=' + orderNo;
                        }
                        else
                            _.view.message.alert(result.Message);
                    });
                },
                init: function () {
                    var auditId = $('#hidauditId').val();
                    var orderId = $('#hidOrderChildDetailId').val();
                    var orderNo = $('#hidOrderNo').val();

                    _.view.returnGoodsPending.setting(auditId);

                    _container.on('click', '#canenlOrder', function () {
                        _.view.message.confirm("是否确认取消退货申请?", function () {
                            _.view.returnGoodsPending.canenl(auditId, orderId, orderNo);
                        });
                    });

                    _container.on('click', '#changeApplication', function () {
                        window.location.href = '/Trading/OrderAudit/ReturnGoods?id=' + auditId + '&orderId=' + orderId + '&orderNo=' + orderNo;
                    });
                }
            },
            //填写发货信息
            returnGoodsSend: {
                setting: function (auditId, orderNo, orderId) {
                    //获取显示信息
                    order.getOrderAuditView(auditId, orderNo, orderId, function (result) {
                        if (result.Success) {
                            if (result.Result != null && result.Result != undefined) {
                                var data = eval('(' + result.Result + ')');
                                var hidTotal = Number($('#hidTotal').val());
                                if (hidTotal == data.Quantity && data.Freight > 0) {
                                    $('#spanMoney2').html(data.Money + '(含运费' + data.Freight + '元)');
                                } else {
                                    $('#spanMoney2').html(data.Money);
                                }
                            }
                            else
                                _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                        }
                        else
                            _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                    });
                },
                verify: function (auditId, callback) {
                    var logisticsNames = $.trim($('#selectLogisticsNames').val());
                    var logisticsNumber = $.trim($('#txtLogisticsNumber').val());
                    var logisticsExplanation = $.trim($('#txtSLogisticsExplanation').val());
                    var pictures = _.view.returnGoods.GetImages();
                    if (smart.validate.isNullOrEmpty(auditId)) {
                        _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。')
                        return;
                    }
                    if (smart.validate.isNullOrEmpty(logisticsNames)) {
                        _.view.message.alert('请选择物流名称！');
                        return;
                    }
                    if (smart.validate.isNullOrEmpty(logisticsNumber)) {
                        _.view.message.alert('请输入物流单号！');
                        return;
                    }

                    var formData = { logisticsNames: logisticsNames, logisticsNumber: logisticsNumber, logisticsExplanation: logisticsExplanation, pictures: pictures };
                    if (callback && typeof callback == 'function')
                        callback(formData);
                    else {
                        _.view.message.alert('系统异常,请稍后重试！');
                        return;
                    }
                },
                submit: function (auditId, orderNo, orderId) {
                    _.view.returnGoodsSend.verify(auditId, function (formData) {
                        //填写物流信息
                        order.waitCustomerReturnGood(auditId, formData.logisticsNames, formData.logisticsNumber, formData.logisticsExplanation, formData.pictures, function (result) {
                            if (result.Success) {
                                window.location.href = '/Trading/OrderAudit/ReturnGoodsSendInfo?id=' + auditId + '&orderId=' + orderId + '&orderNo=' + orderNo;
                            }
                            else {
                                _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                            }
                        });
                    });
                },
                init: function () {
                    var auditId = $('#hidauditId').val();
                    var orderId = $('#hidOrderChildDetailId').val();
                    var orderNo = $('#hidOrderNo').val();

                    _.view.returnGoodsSend.setting(auditId, orderNo, orderId);

                    _.view.upload('#file', '#imglist', '#posrlist', 'ReturnGoodsSend');

                    mui.init({ gestureConfig: { longtap: true } });

                    mui("#imglist").on('longtap', '.img-mask', function () {
                        $(this).siblings('.del-img').show();
                    });

                    mui("#imglist").on('tap', _.conf.btnCloseImg, function () {
                        _.view.returnGoods.closeImg($(this));
                    });

                    mui('#setting').on('tap', '#btnApplication', function () {
                        _.view.returnGoodsSend.submit(auditId, orderNo, orderId);
                    });
                }
            },
            //等待验货
            returnGoodsSendInfo: {
                setting: function (auditId) {
                    //获取显示信息
                    order.getOrderAuditView(auditId, '', '', function (result) {
                        if (result.Success) {
                            var data = eval('(' + result.Result + ')');
                            $('#returnifm2').append('<div class="ifm-text">退货原因：' + data.Reason + '</div>');
                            $('#returnifm2').append('<div class="ifm-text">退货数量：' + data.Quantity + '件</div>');
                            $('#returnifm2').append('<div class="ifm-text">退款金额：' + data.Money + '元</div>');
                            $('#returnifm2').append('<div class="ifm-text">物流名称：' + data.LogisticsNames + '</div>');
                            $('#returnifm2').append('<div class="ifm-text">物流单号：' + data.LogisticsNumber + '</div>');
                        }
                        else
                            _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                    });
                },
                init: function () {
                    var auditId = $('#hidauditId').val();
                    _.view.returnGoodsSendInfo.setting(auditId);

                }
            },
            //退货结果页
            returnGoodsRefusal: {
                setting: function (auditId) {
                    //获取显示信息
                    order.getOrderAuditView(auditId, '', '', function (result) {
                        if (result.Success) {
                            var data = eval('(' + result.Result + ')');
                            if (data.AuditStatus == '退货申请已撤销') {
                                $('.return-no').attr('src', '/Assets/themes/default/images/order/return-yes.png');
                                $('#returnGoodsTitle').text('您已取消退货申请');
                                $('#returnGoodsMessage').text('取消时间：' + data.CancelTime + '');

                            } else if (data.AuditStatus == '退货申请被拒绝') {
                                $('.return-no').attr('src', '/Assets/themes/default/images/order/return-no.png');
                                $('#returnGoodsTitle').text('退货申请被拒绝');
                                $('#returnGoodsMessage').text('您填写的退款金额有误，我们将电话联系您，需要您重新填写退货申请！');
                                $('#process').append('<div class="process-2"><a href="javascript:;"><button type="button" id="canenlOrder2" class="btn btn-1 mui-btn mui-btn-outlined">取消申请</button></a><button type="button" id="changeApplication2" class="btn btn-2 mui-btn mui-btn-outlined">修改申请</button></div>');

                            } else if (data.AuditStatus == '退货成功') {
                                $('.return-no').attr('src', '/Assets/themes/default/images/order/return-yes.png');
                                $('#returnGoodsTitle').text('退货成功！');
                                $('#returnGoodsMessage').text('我们将在7个工作日内直接退款到您的付款账户，请注意查收。');
                                if (!smart.validate.isNullOrEmpty(data.ActualAmount)) {
                                    $('#returnGoodsMany').text('退款金额: ￥' + data.ActualAmount + '');
                                } else {
                                    $('#returnGoodsMany').text('退款金额: ￥' + data.Money + '');
                                }

                            } else if (data.AuditStatus == '退货失败') {
                                $('.return-no').attr('src', '/Assets/themes/default/images/order/return-no.png');
                                $('#returnGoodsTitle').text('退货失败！');
                                $('#returnGoodsMessage').text('您的退货由于' + data.Reason + '原因审核未通过，退货失败！如有疑问，请联系客服或拨打 400-888-1916。');

                            }
                            $('#returnifm').append('<div class="ifm-text">退货原因：' + data.Reason + '</div>');
                            $('#returnifm').append('<div class="ifm-text">退货数量：' + data.Quantity + '件</div>');
                            if (!smart.validate.isNullOrEmpty(data.ActualAmount)) {
                                $('#returnifm').append('<div class="ifm-text">退款金额：' + data.ActualAmount + '元</div>');
                            } else {
                                $('#returnifm').append('<div class="ifm-text">退款金额：' + data.Money + '元</div>');
                            }
                            if (!smart.validate.isNullOrEmpty(data.LogisticsNames))
                                $('#returnifm').append('<div class="ifm-text">物流名称：' + data.LogisticsNames + '</div>');
                            if (!smart.validate.isNullOrEmpty(data.LogisticsNumber))
                                $('#returnifm').append('<div class="ifm-text">物流单号：' + data.LogisticsNumber + '</div>');
                        }
                        else
                            _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                    });
                },
                canenl: function (auditId, orderId, orderNo) {
                    //取消订单
                    order.cancelReturnGood(auditId, function (result) {
                        if (result.Success) {
                            window.location.href = '/Trading/OrderAudit/ReturnsFinish?id=' + auditId + '&orderId=' + orderId + '&orderNo=' + orderNo;
                        }
                        else
                            _.view.message.alert(result.Message);
                    });
                },
                init: function () {
                    var auditId = $('#hidauditId').val();
                    var orderId = $('#hidOrderChildDetailId').val();
                    var orderNo = $('#hidOrderNo').val();
                    _.view.returnGoodsRefusal.setting(auditId);

                    _container.on('click', '#canenlOrder2', function () {
                        _.view.message.confirm("是否确认取消退货申请?", function () {
                            _.view.returnGoodsRefusal.canenl(auditId, orderId, orderNo);
                        });
                    });

                    _container.on('click', '#changeApplication2', function () {
                        window.location.href = '/Trading/OrderAudit/ReturnGoods?id=' + auditId + '&orderId=' + orderId + '&orderNo=' + orderNo;
                    });
                }
            },
            //退款
            refundment: {
                getting: function () {
                    var auditId = $('#hidauditId').val();
                    var orderNo = $('#hidOrderNo').val();
                    var orderId = $('#hidOrderChildDetailId').val();
                    var reason = $('#selectReason').val();
                    var quantity = $('#selectQuantity').val();
                    var explan = $('#txtLogisticsExplanation').val();
                    var pictures = _.view.returnGoods.GetImages();
                    return {
                        auditId: auditId,
                        orderNo: orderNo,
                        orderId: orderId,
                        reason: reason,
                        quantity: quantity,
                        explan: explan,
                        pictures: pictures
                    };
                },
                setting: function (auditId, orderNo, orderId) {
                    //获取显示信息
                    order.getOrderAuditView(auditId, orderNo, orderId, function (result) {
                        if (result.Success) {
                            if (result.Result != null && result.Result != undefined) {
                                var data = eval('(' + result.Result + ')');
                                if (!smart.validate.isNullOrEmpty(data.Reason)) {
                                    $("#selectReason").val(data.Reason);
                                    //$("#Reason .cs-selected").html(data.Reason);
                                }
                                $("#selectQuantity").val(data.Quantity);
                                //$("#Quantity .cs-selected").html(data.Quantity);

                                $('#hidPrice').val(data.Money);
                                var hidTotal = Number($('#hidTotal').val());
                                if (hidTotal == data.Quantity && data.Freight > 0) {
                                    $('#spanMoney').html(data.Money + '(含运费' + data.Freight + '元)');
                                } else {
                                    $('#spanMoney').html(data.Money);
                                }
                                $('#hidFreightSum').val(data.Freight);

                                if (!smart.validate.isNullOrEmpty(data.Explanation)) {
                                    $('#txtLogisticsExplanation').val(data.Explanation);
                                }
                                many = $('#spanMoney').text();
                                if (!smart.validate.isNullOrEmpty(data.Pictures)) {
                                    var count = 0;
                                    $.each(data.Pictures.split(','), function (i, item) {
                                        var html = '<li class="pos-r"><div class="img-mask pos-a"></div><img class="list-uploadImg pos-a" src="' + item + '" onerror="javascript:this.src=\'' + smart.utility.generateDefaultImgUrl(180, 180) + '\'" /><div class="del-img txta-c pos-a" role="closeImg">-</div>';
                                        html += '<input class="file pos-a" class="file" type="file" disabled="disabled" /></li>';
                                        $(html).insertBefore('#uploadmlist');
                                        count++;
                                    });
                                    if (count >= 5) {
                                        $('#uploadmlist').hide();
                                    }
                                }
                            }
                            else
                                _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                        }
                        else
                            _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                    });
                },
                submit: function () {
                    var data = _.view.refundment.getting();
                    if (smart.validate.isNullOrEmpty(data.reason)) {
                        _.view.message.alert('请选择退货原因！');
                        return;
                    }

                    if (!$(data.auditId).isNullOrEmpty(true) && data.auditId > 0)
                        //修改退款申请
                        order.changeReturnMoney(data.orderNo, data.auditId, data.reason, data.quantity, data.explan, data.pictures, function (d) {
                            if (d.Success) {
                                var auditId = d.Message;

                                window.location.href = '/Trading/OrderAudit/RefundPending?id=' + auditId + '&orderId=' + data.orderId + '&orderNo=' + data.orderNo;
                            }
                            else {
                                _.view.message.alert(d.Message);
                            }
                        });
                    else
                        //退款申请
                        order.applyReturnMoney(data.orderNo, data.orderId, data.reason, data.quantity, data.explan, data.pictures, function (d) {
                            if (d.Success) {
                                var auditId = d.Result;

                                window.location.href = '/Trading/OrderAudit/RefundPending?id=' + auditId + '&orderId=' + data.orderId + '&orderNo=' + data.orderNo;
                            }
                            else {
                                _.view.message.alert(d.Message);
                            }
                        });
                },
                init: function () {
                    var data = _.view.refundment.getting();

                    _.view.refundment.setting(smart.validate.isNullOrEmpty(data.auditId) ? 0 : data.auditId, data.orderNo, data.orderId);

                    _.view.upload('#filemField', '#imgmlist', '#uploadmlist', 'Refundment');

                    mui.init({
                        gestureConfig: { longtap: true }
                    });

                    mui("#imgmlist").on('longtap', '.img-mask', function () {
                        $(this).siblings('.del-img').show();
                    });

                    mui("#imgmlist").on('tap', _.conf.btnCloseImg, function () {
                        _.view.returnGoods.closeImg($(this));
                    });

                    mui('#setting').on('tap', '#btnmApplication', function () {
                        if (jinsate == 0) {
                            jinsate = 1;
                            _.view.refundment.submit();
                        }
                        jinsate = 0;
                    });

                    _container.on('change', '#selectQuantity', function () {
                        var quantity = $('#selectQuantity').val();
                        $('#spanMoney').text(quantity * many);
                    });
                }
            },
            //退款申请等待处理
            refundPending: {
                setting: function (auditId) {
                    //获取显示信息
                    order.getOrderAuditView(auditId, '', '', function (result) {
                        if (result.Success) {
                            var data = eval('(' + result.Result + ')');
                            $('#pReason').html('退款原因：' + data.Reason);
                            $('#pQuantity').html('退款数量：' + data.Quantity + '件');
                            $('#pMoney').html('退款金额：' + data.Money + '元');
                        }
                        else
                            _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                    });
                },
                canenl: function (auditId, orderId, orderNo) {
                    //取消订单
                    order.cancelReturnMoney(auditId, function (result) {
                        if (result.Success) {
                            window.location.href = '/Trading/OrderAudit/RefundFinish?id=' + auditId + '&orderId=' + orderId + '&orderNo=' + orderNo;
                        }
                        else
                            _.view.message.alert(result.Message);
                    });
                },
                init: function () {
                    var auditId = $('#hidauditId').val();
                    var orderId = $('#hidOrderChildDetailId').val();
                    var orderNo = $('#hidOrderNo').val();

                    _.view.refundPending.setting(auditId);

                    mui('#setting').on('tap', '#canenlOrder', function () {
                        _.view.message.confirm("是否确认取消退货申请?", function () {
                            _.view.refundPending.canenl(auditId, orderId, orderNo);
                        });
                    });

                    mui('#setting').on('tap', '#changeApplication', function () {
                        window.location.href = '/Trading/OrderAudit/Refundment?id=' + auditId + '&orderId=' + orderId + '&orderNo=' + orderNo;
                    });
                }
            },
            //退款结果页
            RefundFinish: {
                setting: function (auditId) {
                    //获取显示信息
                    order.getOrderAuditView(auditId, '', '', function (result) {
                        if (result.Success) {
                            var data = eval('(' + result.Result + ')');
                            if (data.AuditStatus == '退款成功') {
                                $('.return-no').attr('src', '/Assets/themes/default/images/order/return-yes.png');
                                $('#returnGoodsTitle').text('退款成功！');
                                $('#returnGoodsMessage').text('我们将在7个工作日内直接退款到您的付款账户，请注意查收。');
                                if (!smart.validate.isNullOrEmpty(data.ActualAmount)) {
                                    $('#returnGoodsMany').text('退款金额: ￥' + data.data.ActualAmount + '');
                                } else {
                                    $('#returnGoodsMany').text('退款金额: ￥' + data.Money + '');
                                }
                            } else if (data.AuditStatus == '退款申请被拒绝') {
                                $('.return-no').attr('src', '/Assets/themes/default/images/order/return-no.png');
                                $('#returnGoodsTitle').text('退款申请被拒绝');
                                $('#returnGoodsMessage').text('您填写的退款金额有误，我们将电话联系您，需要您重新填写退款申请！');
                                $('#process').append('<div class="process-2"><a href="javascript:;"><button type="button" id="canenlOrder2" class="btn btn-1 mui-btn mui-btn-outlined">取消申请</button></a><button type="button" id="changeApplication2" class="btn btn-2 mui-btn mui-btn-outlined">修改申请</button></div>');

                            } else {
                                var datetime = data.CancelTime.replace(/T/g, ' ');
                                datetime = datetime.substr(0, datetime.length - 3);
                                $('.return-no').attr('src', '/Assets/themes/default/images/order/return-yes.png');
                                $('#returnGoodsTitle').text('您已取消退款申请');
                                $('#returnGoodsMessage').text('取消时间：' + datetime + '');
                            }
                            $('#returnifm').append('<div class="ifm-text">退款原因：' + data.Reason + '</div>');
                            $('#returnifm').append('<div class="ifm-text">退款数量：' + data.Quantity + '件</div>');
                            if (!smart.validate.isNullOrEmpty(data.ActualAmount)) {
                                $('#returnifm').append('<div class="ifm-text">退款金额：' + data.ActualAmount + '元</div>');
                            } else {
                                $('#returnifm').append('<div class="ifm-text">退款金额：' + data.Money + '元</div>');
                            }
                        }
                        else
                            _.view.message.alert('很抱歉，您的订单当前无法进行此项操作。如有任何需要，请您联系在线客服或致电400-888-1916。');
                    });
                },
                canenl: function (auditId, orderId, orderNo) {
                    //取消订单
                    order.cancelReturnGood(auditId, function (result) {
                        if (result.Success) {
                            window.location.href = '/Trading/OrderAudit/ReturnsFinish?id=' + auditId + '&orderId=' + orderId + '&orderNo=' + orderNo;
                        }
                        else
                            _.view.message.alert(result.Message);
                    });
                },
                init: function () {
                    var auditId = $('#hidauditId').val();
                    var orderId = $('#hidOrderChildDetailId').val();
                    var orderNo = $('#hidOrderNo').val();
                    _.view.RefundFinish.setting(auditId);

                    mui('#setting').on('tap', '#canenlOrder2', function () {
                        _.view.message.confirm("是否确认取消退货申请?", function () {
                            _.view.RefundFinish.canenl(auditId, orderId, orderNo);
                        });
                    });

                    mui('#setting').on('tap', '#changeApplication2', function () {
                        window.location.href = '/Trading/OrderAudit/Refundment?id=' + auditId + '&orderId=' + orderId + '&orderNo=' + orderNo;
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

            //初始化
            _.view.InitView();

            //退货
            smart.command('returnGoods', function () {
                _.view.returnGoods.init();
            });

            //退款申请等待处理
            smart.command('returnGoodsPending', function () {
                _.view.returnGoodsPending.init();
            });

            //填写发货信息
            smart.command('returnGoodsSend', function () {
                _.view.returnGoodsSend.init();
            });

            //等待验货
            smart.command('returnGoodsSendInfo', function () {
                _.view.returnGoodsSendInfo.init();
            });

            //退货结果页
            smart.command('returnsFinish', function () {
                _.view.returnGoodsRefusal.init();
            });

            //退款
            smart.command('refundment', function () {
                _.view.refundment.init();
            });

            //退款申请等待处理
            smart.command('RefundPending', function () {
                _.view.refundPending.init();
            });

            //退款结果页
            smart.command('RefundFinish', function () {
                _.view.RefundFinish.init();
            });

            $("#txtLogisticsExplanation").focus(function () {
                var huawei = navigator.userAgent.indexOf("HUAWEI")
                if (huawei > -1) {
                    $("html").height($(window).height());
                }
            });
        }
    };
    return plugin.init();
});