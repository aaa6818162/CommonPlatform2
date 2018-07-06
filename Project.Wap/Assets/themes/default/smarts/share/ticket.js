smart.viewerEngineer.regedit('ticket', function (model) {
    var _;
    var _container;
    var plugin = {
        conf: {
            btnSubmit: '#btnSubmit'
        },
        //验证
        validate: {

        },
        //页面处理
        view: {
            InitView: function () {
                $('#getrule').attr('style', 'visibility:hidden');
                $('#success').attr('style', 'visibility:hidden');
                $('#failure').attr('style', 'visibility:hidden');
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

            
            mui('#ticket').on('tap', '[role=couponActivity]', function () {
                var $this = $(this);
                $.isLocalLogin(function () {
                    var ruleId = $this.data('ruleid');
                    var activityId = $this.data('activityid');
                    var data = { ActivityId: activityId, RuleId: ruleId };
                    if (!smart.validate.isNullOrEmpty(ruleId) && !smart.validate.isNullOrEmpty(activityId)) {
                        //调用接口获取活动规则详情
                        tickets.getRuleInfo(data, function (r) {
                            if (r.Success) {
                                if (!smart.validate.isNullOrEmpty(r.Message)) {
                                    $('#getrule').attr('style', 'visibility:visible');
                                    var json = jQuery.parseJSON(r.Message);
                                    $('#affirMoney').text(json.Ra_Everysubtractmoney);
                                    $('#activityid').val(activityId);
                                    $('#ruleid').val(ruleId);
                                    $('#needmoney').val(json.Needmoney);
                                }
                                else {
                                    $('#getrule').attr('style', 'visibility:hidden');
                                    $('#failure').attr('style', 'visibility:visible');
                                    $('#failureMsg').text('活动已关闭');
                                }
                            } else {
                                $('#getrule').attr('style', 'visibility:hidden');
                                $('#failure').attr('style', 'visibility:visible');
                                $('#failureMsg').text('系统异常，请联系客服');
                            }
                        });
                    }
                }, function () {
                    window.location.href = '/Member/Account/Login?url=' + window.location.href;
                });
            });


            mui('#getrule').on('tap', _.conf.btnSubmit, function() {
                var activityId = $('#activityid').val();
                var ruleId = $('#ruleid').val();
                var data = { ActivityId: activityId, RuleId: ruleId };
                if (!smart.validate.isNullOrEmpty(activityId) && !smart.validate.isNullOrEmpty(ruleId)) {
                    //调用接口判断会员是否领取优惠券
                    tickets.isObtainTicket(data, function (r) {
                        if (r.Success && r.Result) {
                            //调用接口领取优惠券
                            tickets.obtainTicket(data, function (t) {
                                if (t.Success && !smart.validate.isNullOrEmpty(t.Result)) {
                                    $('#success').attr('style', 'visibility:visible');
                                    var json = jQuery.parseJSON(t.Result);
                                    $('#remissionMoney').text(json.Ticketvalue + '元');
                                    $('#amount').text($('#needmoney').val());
                                    $('#datetime').text(json.Availdatestart.substring(0, 10) + '至' + json.Availdateend.substring(0, 10));
                                } else {
                                    $('#failure').attr('style', 'visibility:visible');
                                    $('#failureMsg').text(t.Message);
                                }
                            });
                        } else {
                            $('#getrule').attr('style', 'visibility:hidden');
                            $('#failure').attr('style', 'visibility:visible');
                            $('#failureMsg').text(r.Message);
                        }
                    });
                } else {
                    $('#getrule').attr('style', 'visibility:hidden');
                    $('#failure').attr('style', 'visibility:visible');
                    $('#failureMsg').text('该券不存在或已过期');
                }
            });
        }
    };
    return plugin.init();
});