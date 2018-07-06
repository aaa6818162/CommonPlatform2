smart.viewerEngineer.regedit('information', function (model) {
    var plugin = {
        conf: {
            provinces: null,   //省市区列表
            txtNickName: '[role=nickName]',   //昵称
            txtBirthday: '[role=birthday]',   //出生日期
            txtContactAddress: '[role=contactAddress]',   //联系地址
            btnSubmit: '[role=btnSubmit]',   //修改信息
            btnChangeMobile: '[role=changeMobile]',   //修改手机

            txtPwdValidate: '[role=pwdValidate]',   //密码验证提示框
            btnCancel: '[role=btnCancel]',   //取消身份验证
            btnConfirm: '[role=btnConfirm]',   //验证身份
            txtPassword: '[role=password]',   //密码

            errorPrompt: '[role=errorPrompt]'   //提示信息
        },
        //验证
        validate: {
            formValidate: function (callback) {
                var nickName = $.trim($(_.conf.txtNickName).val());
                var birthday = $.trim($(_.conf.txtBirthday).val());
                var contactAddress = $.trim($(_.conf.txtContactAddress).attr('data-id'));
                var province = contactAddress.split(',')[0];
                var city = contactAddress.split(',')[1];
                var country = contactAddress.split(',')[2];
                var flag = true;
                if (!smart.validate.isNullOrEmpty(nickName)) {
                    if (nickName.length < 2) {
                        _.view.tips.after(_.conf.errorPrompt, '请输入2-20位字符！', _.conf.txtNickName);
                        return;
                    } else {
                        //TODO:调用接口检查昵称是否存在
                        customer.checkNickName(nickName, function (data) {
                            if (data.Success) {
                                if (!data.Result.IsSuccess) {
                                    _.view.tips.after(_.conf.errorPrompt, '该昵称已存在！', _.conf.txtNickName);
                                    flag = false;
                                } else {
                                    _.view.tips.right(_.conf.errorPrompt, _.conf.txtNickName);
                                }
                            } else {
                                _.view.tips.after('系统异常，请稍后重试！', _.conf.txtNickName);
                            }
                        }, false);
                    }
                }
                if (!flag)
                    return;
                if (smart.validate.isNullOrEmpty(birthday)) {
                    _.view.tips.after(_.conf.errorPrompt, '请输入出生日期！', _.conf.txtBirthday);
                    return;
                } else {
                    _.view.tips.right(_.conf.errorPrompt, _.conf.txtBirthday);
                }
                if (smart.validate.isNullOrEmpty(province) || smart.validate.isNullOrEmpty(city) || smart.validate.isNullOrEmpty(country)) {
                    _.view.tips.after(_.conf.errorPrompt, '请输入联系地址！', _.conf.txtContactAddress);
                    return;
                } else {
                    _.view.tips.right(_.conf.errorPrompt, _.conf.txtContactAddress);
                }

                var formData = { nickName: nickName, birthday: birthday, province: province, city: city, country: country };

                if (callback && typeof callback == 'function')
                    callback(formData);
                else {
                    _.view.tips.after(_.conf.errorPrompt, '系统异常,请稍后重试！');
                    return;
                }
            }
        },
        //页面处理
        view: {
            InitView: function () {
                smart.viewerEngineer.viewHandover('#setting');
                var scroll = mui('.mui-scroll-wrapper').scroll();
                $(_.conf.txtPwdValidate).css('visibility', 'hidden');
                $(_.conf.txtPassword).val('');
                //$(_.conf.errorPrompt).css('visibility', 'hidden');
                (function ($, doc) {
                    _.view.getProvince();
                    _.view.dataTime($);
                    //_.view.address($, doc);
                })(mui, document);
                _.view.customerAddress($('#province').val(), $('#city').val(), $('#country').val());
            },
            //获取省市区列表
            getProvince: function () {
                $.richAjax('/Member/Customer/GetProvinceList', {}, function (result) {
                    if (result.success && result.data.length > 0)
                        _.conf.provinces = result.data;
                });
            },
            //日期初始化
            dataTime: function ($) {
                var result = $('#result')[0];
                var btns = $('.btn');
                var d = new Date();
                var y = d.getFullYear();
                var m = d.getMonth();
                var t = d.getDate();
                btns.each(function (i, btn) {
                    btn.addEventListener('tap', function () {
                        var optionsJson = this.getAttribute('data-options') || '{}';
                        var options = { "type": "date", "beginDate": new Date(1930, 00, 01), "endDate": new Date(y, m, t) };
                        var id = this.getAttribute('id');
                        var picker = new $.DtPicker(options);
                        picker.show(function (rs) {
                            result.value = rs.text;
                            picker.dispose();
                        });
                    }, false);
                });
            },
            //地区初始化
            address: function ($, doc) {
                var str = JSON.stringify(_.conf.provinces);
                var str1 = str.replace(/CountryName/g, 'text');
                var str2 = str1.replace(/CityName/g, 'text');
                var str3 = str2.replace(/Name/g, 'text');
                var str4 = str3.replace(/CityList/g, 'children');
                var str5 = str4.replace(/CountryList/g, 'children');
                var jsonObj = JSON.parse(str5);
                $.init();
                $.ready(function () {
                    var cityPicker3 = new $.PopPicker({
                        layer: 3
                    });
                    cityPicker3.setData(jsonObj);
                    var showCityPickerButton = doc.getElementById('showCityPicker3');
                    var cityResult3 = doc.getElementById('cityResult3');
                    showCityPickerButton.addEventListener('tap', function (event) {
                        cityPicker3.show(function (items) {
                            //var item = items;
                            cityResult3.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                            cityResult3.setAttribute('data-id', items[0].ID + ',' + items[1].ID + ',' + items[2].ID);
                            //返回 false 可以阻止选择框的关闭
                            //return false;
                        });
                    }, false);
                });
            },
            remainTime: function () {

            },
            //地区赋值
            customerAddress: function (sheng, shi, qu) {
                if (smart.validate.isNullOrEmpty(sheng) || smart.validate.isNullOrEmpty(shi) || smart.validate.isNullOrEmpty(qu)) {
                    $('#cityResult3').val(""); //新增还原初始化
                    $('#cityResult3').attr('data-id', "");
                    (function ($, doc) {
                        var str = JSON.stringify(_.conf.provinces);
                        var str1 = str.replace(/CountryName/g, 'text');
                        var str2 = str1.replace(/CityName/g, 'text');
                        var str3 = str2.replace(/Name/g, 'text');
                        var str4 = str3.replace(/CityList/g, 'children');
                        var str5 = str4.replace(/CountryList/g, 'children');
                        var jsonObj = JSON.parse(str5);
                        $.init();
                        $.ready(function () {
                            cityPicker3 = new $.PopPicker({
                                layer: 3
                            });
                            cityPicker3.setData(jsonObj);
                            var showCityPickerButton = doc.getElementById('showCityPicker3');
                            var cityResult3 = doc.getElementById('cityResult3');

                            cityPicker3.pickers[0].setSelectedIndex(0);
                            cityPicker3.pickers[1].setSelectedIndex(0);
                            cityPicker3.pickers[2].setSelectedIndex(0);

                            showCityPickerButton.addEventListener('tap', function (event) {
                                cityPicker3.show(function (items) {
                                    //var item = items;
                                    cityResult3.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                                    cityResult3.setAttribute('data-id', items[0].ID + ',' + items[1].ID + ',' + items[2].ID);
                                    //返回 false 可以阻止选择框的关闭
                                    //return false;
                                    event.preventDefault();
                                });
                            }, true);
                        });
                    })(mui, document);
                    return;
                } else {
                    var provinces = _.conf.provinces;
                    var value; var text;
                    var one, two, thire;
                    for (var i = 0; i < provinces.length; i++) {
                        if (sheng == provinces[i].ID) {
                            one = i;
                            value = provinces[i].ID + ',';
                            text = provinces[i].Name + ' ';
                            for (var j = 0; j < provinces[i].CityList.length; j++) {
                                if (shi == provinces[i].CityList[j].ID) {
                                    two = j;
                                    value += provinces[i].CityList[j].ID + ',';
                                    text += provinces[i].CityList[j].CityName + ' ';
                                    for (var y = 0; y < provinces[i].CityList[j].CountryList.length; y++) {
                                        if (qu == provinces[i].CityList[j].CountryList[y].ID) {
                                            thire = y;
                                            value += provinces[i].CityList[j].CountryList[y].ID;
                                            text += provinces[i].CityList[j].CountryList[y].CountryName;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $('#cityResult3').val(text);
                    $('#cityResult3').attr('data-id', value);

                    (function ($, doc) {
                        var str = JSON.stringify(_.conf.provinces);
                        var str1 = str.replace(/CountryName/g, 'text');
                        var str2 = str1.replace(/CityName/g, 'text');
                        var str3 = str2.replace(/Name/g, 'text');
                        var str4 = str3.replace(/CityList/g, 'children');
                        var str5 = str4.replace(/CountryList/g, 'children');
                        var jsonObj = JSON.parse(str5);
                        $.init();
                        $.ready(function () {
                            cityPicker3 = new $.PopPicker({
                                layer: 3
                            });
                            cityPicker3.setData(jsonObj);
                            var showCityPickerButton = doc.getElementById('showCityPicker3');
                            var cityResult3 = doc.getElementById('cityResult3');

                            cityPicker3.pickers[0].setSelectedIndex(one);
                            cityPicker3.pickers[1].setSelectedIndex(two);
                            cityPicker3.pickers[2].setSelectedIndex(thire);

                            showCityPickerButton.addEventListener('tap', function (event) {
                                cityPicker3.show(function (items) {
                                    //var item = items;
                                    cityResult3.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                                    cityResult3.setAttribute('data-id', items[0].ID + ',' + items[1].ID + ',' + items[2].ID);
                                    //返回 false 可以阻止选择框的关闭
                                    //return false;
                                    event.preventDefault();
                                });
                            }, true);
                        });
                    })(mui, document);
                }
            }
        },
        //功能处理
        funcs: {
            submitInformation: function () {
                _.validate.formValidate(function (formData) {
                    //TODO:调用接口更新用户信息
                    customer.update({
                        Nickname: formData.nickName,
                        Birthday: formData.birthday,
                        Province: formData.province,
                        City: formData.city,
                        Country: formData.country
                    }, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess) {
                                _.view.tips.after(_.conf.errorPrompt, data.Result.Message);
                            }
                            else {
                                _.view.tips.right(_.conf.errorPrompt);
                                mui.toast('<img src="/Assets/themes/default/images/account/wishlist-hookpng.png" alt=""><div>保存成功</div>', {
                                    duration: 'long(1000ms)',
                                    type: 'div'
                                });
                                setTimeout(function () {
                                    window.location.href = '/Member/Customer/Index';
                                    //window.location.reload(true);
                                }, 1000);
                            }
                        } else {
                            _.view.tips.after(_.conf.errorPrompt, '系统异常,请稍后重试！');
                        }
                    });
                });
            },
            //密码校验
            pwdValidate: function () {
                var password = $.trim($(_.conf.txtPassword).val());
                if (smart.validate.isNullOrEmpty(password)) {
                    $(_.conf.txtPwdValidate).css('visibility', 'hidden');
                    _.view.message.alert('密码不能为空！');
                    return;
                } else {
                    //调用接口检验密码是否正确
                    customer.checkPassword(password, function (data) {
                        if (data.Success) {
                            if (data.Result.IsSuccess) {
                                $(_.conf.txtPwdValidate).css('visibility', 'hidden');
                                window.location.href = '/Member/Mobile/ChangeMobile';
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

            //修改信息
            mui('#setting').on('tap', _.conf.btnSubmit, function () {
                _.funcs.submitInformation();
            });

            //修改手机
            mui('#setting').on('tap', _.conf.btnChangeMobile, function () {
                $(_.conf.txtPwdValidate).css('visibility', 'visible');
            });

            //取消验证身份
            _container.on('click', _.conf.btnCancel, function () {
                $(_.conf.txtPwdValidate).css('visibility', 'hidden');
            });

            //验证密码
            _container.on('click', _.conf.btnConfirm, function () {
                _.funcs.pwdValidate();
            });

            $(".err_text input").focus(function () {
                var huawei = navigator.userAgent.indexOf("HUAWEI")
                if (huawei > -1) {
                    $(".err_box").css("top", "-60%");
                }
            });
        }
    };
    return plugin.init();
});