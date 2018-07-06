smart.viewerEngineer.regedit('deliveraddress', function (model) {
    var viewApi;
    var cityPicker3;
    var plugin = {
        conf: {
            provinces: null,   //省市区列表
            name: '[role=name]',   //收件人
            address: '[role=address]',   //详细地址
            txtContactAddress: '[role=contactAddress]',   //区域
            postcode: '[role=postcode]',   //邮编
            mobile: '[role=mobile]',   //手机号码
            familytelephone: '[role=familytelephone]',   //固定号码
            isdefault: '[role=isdefault]',   //默认
            

            errorPrompt: '[role=errorPrompt]',//提示信息

            addAddress: '[role="addAddress"]',//进入新增地址页面
            editAddress: '[role="editAddress"]',//编辑地址
            deleteAddress: '[role="deleteAddress"]',//删除地址
            defaultAddress: '[role="defaultAddress"]',//设为默认地址
            saveAddress: '[role="saveAddress"]',//保存增加地址
            
        },
        //验证
        validate: {
            formValidate: function (callback) {
                var name = $.trim($(_.conf.name).val());
                var address = $.trim($(_.conf.address).val());
                var postcode = $.trim($(_.conf.postcode).val());
                var mobile = $.trim($(_.conf.mobile).val());
                //var familytelephone = $.trim($(_.conf.familytelephone).val());
                var familytelephone = $("#tel1").val() + ($("#tel1").val() && $("#tel2").val() != '' ? "-" : "") + $("#tel2").val() + ($("#tel3").val() && $("#tel3").val() != '' ? "-" : "") + $("#tel3").val();
                familytelephone = $.trim(familytelephone);
                var isdefault = $(_.conf.isdefault).prop("checked");
                var addressid = $("#addressId").val();//标识编辑时ID
                var contactAddress = $.trim($(_.conf.txtContactAddress).attr("data-id"));
                var province = contactAddress.split(',')[0];
                var city = contactAddress.split(',')[1];
                var country = contactAddress.split(',')[2];
                if (smart.validate.isNullOrEmpty(name)) {
                    _.view.message.alert( '请输入收件人姓名！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(province) || smart.validate.isNullOrEmpty(city) || smart.validate.isNullOrEmpty(country)) {
                    _.view.message.alert('请选择区域！');
                    return;
                }
                if (smart.validate.isNullOrEmpty(address)) {
                    _.view.message.alert( '请输入详细地址！');
                    return;
                }

                if (smart.validate.isNullOrEmpty(postcode)) {
                    _.view.message.alert('请输入邮编！');
                    return;
                }

                if (smart.validate.isNullOrEmpty(mobile)) {
                    _.view.message.alert('请输入手机号码！');
                    return;
                }

                if (!smart.validate.isPostCode(postcode)) {
                    _.view.message.alert('请正确的邮编！');
                    return;
                }
                if (!smart.validate.isMobile(mobile)) {
                    _.view.message.alert('请正确的手机号码！');
                    return;
                }               
                if (!smart.validate.isNullOrEmpty(familytelephone)) {
                    if (!smart.validate.isTelephone(familytelephone)) {
                        _.view.message.alert('请输入正确的固定电话！');
                        return;
                    }
                }
                if (address.lenght > 50) {
                    _.view.message.alert('请输入少于50字的详细地址！');
                    return;
                }
                var formData = { Id: addressid, Name: name, Prov: province, City: city, Country: country, PropertyInfo: "", Address: address, PostCode: postcode, Mobile: mobile, Tel: familytelephone, IsDefault: isdefault };

                if (callback && typeof callback == 'function')
                    callback(formData);
                else {
                    _.view.message.alert('系统异常,请稍后重试！');
                    return;
                }
            }
        },
        //页面处理
        view: {
            InitView: function () {
                mui('.mui-scroll-wrapper').scroll();
                //初始化单页view	
                (function (_mui) {
                    viewApi = _mui('#app').view({
                        defaultPage: '#setting'
                    });
                    var view = viewApi.view;
                    //处理view的后退与webview后退
                    var oldBack = _mui.back;
                    _mui.back = function () {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            viewApi.back();
                        } else { //执行webview后退
                            oldBack();
                        }
                    };
                    _mui(".mui-navbar").on('tap', '.mui-action-back', function () {
                        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
                            viewApi.back();
                        } else { //执行webview后退
                            oldBack();
                        }
                    });
                })(mui);
                $(_.conf.errorPrompt).css('display', 'none');
                //(function ($, doc) {  //用法待讨论 一开始初始化编辑不正确 改为每次初始化
                //    _.view.getProvince();
                //    //_.view.dataTime($);
                //    _.view.address($, doc);
                //})(mui, document);
                _.view.getProvince();//初始化地址数值
                _.view.customerAddress($('#province').val(), $('#city').val(), $('#country').val())
            },
            //获取省市区列表
            getProvince: function () {
                $.richAjax('/Member/Customer/GetProvinceList', {}, function (result) {
                    if (result.success && result.data.length > 0)
                        _.conf.provinces = result.data;
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
                    cityPicker3 = new $.PopPicker({
                        layer: 3
                    });
                    cityPicker3.setData(jsonObj);
                    var showCityPickerButton = doc.getElementById('showCityPicker3');
                    var cityResult3 = doc.getElementById('cityResult3');
                    //cityPicker3.pickers[0].setSelectedIndex(9);
                    //cityPicker3.pickers[1].setSelectedIndex(1);
                    //cityPicker3.pickers[2].setSelectedIndex(3);
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
            //地区赋值
            customerAddress: function(sheng, shi, qu) {
                if (smart.validate.isNullOrEmpty(sheng) || smart.validate.isNullOrEmpty(shi) || smart.validate.isNullOrEmpty(qu)) {//新增初始化地址
                    $('#cityResult3').val(""); //新增还原初始化
                    $('#cityResult3').attr('data-id', "");
                    (function($, doc) {
                        var str = JSON.stringify(_.conf.provinces);
                        var str1 = str.replace(/CountryName/g, 'text');
                        var str2 = str1.replace(/CityName/g, 'text');
                        var str3 = str2.replace(/Name/g, 'text');
                        var str4 = str3.replace(/CityList/g, 'children');
                        var str5 = str4.replace(/CountryList/g, 'children');
                        var jsonObj = JSON.parse(str5);
                        $.init();
                        $.ready(function() {
                            cityPicker3 = new $.PopPicker({
                                layer: 3
                            });
                            cityPicker3.setData(jsonObj);
                            var showCityPickerButton = doc.getElementById('showCityPicker3');
                            var cityResult3 = doc.getElementById('cityResult3');

                            cityPicker3.pickers[0].setSelectedIndex(0);
                            cityPicker3.pickers[1].setSelectedIndex(0);
                            cityPicker3.pickers[2].setSelectedIndex(0);

                            showCityPickerButton.addEventListener('tap', function(event) {
                                cityPicker3.show(function(items) {
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
                } else { //编辑初始化地址
                    var provinces = _.conf.provinces;
                    var value;
                    var text;
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

                    (function($, doc) {
                        var str = JSON.stringify(_.conf.provinces);
                        var str1 = str.replace(/CountryName/g, 'text');
                        var str2 = str1.replace(/CityName/g, 'text');
                        var str3 = str2.replace(/Name/g, 'text');
                        var str4 = str3.replace(/CityList/g, 'children');
                        var str5 = str4.replace(/CountryList/g, 'children');
                        var jsonObj = JSON.parse(str5);
                        $.init();
                        $.ready(function() {
                            cityPicker3 = new $.PopPicker({
                                layer: 3
                            });
                            cityPicker3.setData(jsonObj);
                            var showCityPickerButton = doc.getElementById('showCityPicker3');
                            var cityResult3 = doc.getElementById('cityResult3');
           
                            cityPicker3.pickers[0].setSelectedIndex(one);
                            cityPicker3.pickers[1].setSelectedIndex(two);
                            cityPicker3.pickers[2].setSelectedIndex(thire);

                            showCityPickerButton.addEventListener('tap', function(event) {
                                cityPicker3.show(function(items) {
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
        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;
            //页面初始化
            _.view.InitView();

            //进入添加地址页面
            _container.on('tap', _conf.addAddress, function () {
                if ($(this).attr("count") >=15) {
                    _.view.message.alert('最多添加15个地址！');
                    return;
                }
                $("#addressId").val("");//标识ID为空

                $(_.conf.name).val("");
                $(_.conf.address).val("");
                $(_.conf.postcode).val("");
                $(_.conf.mobile).val("");
                //固定电话赋值
                $("#tel1").val("");
                $("#tel2").val("");
                $("#tel3").val("");
                //$(_.conf.familytelephone).val("");
                //$(_.conf.isdefault).removeAttr('checked');
                $("#cityResult3").val("");
                _.view.customerAddress($(null, null, null));//必须设置默认值 不然单页面有缓存
                viewApi.go("#addAddress");
            });
            //修改地址
            _container.on('click', _conf.editAddress, function () {
                var addressid = $(this).data('id');
                $("#addressId").val(addressid);//标识编辑时ID
                
                $(_.conf.name).val($(this).data('name'));
                $(_.conf.address).val($(this).data('address'));
                $(_.conf.postcode).val($(this).data('postcode'));
                $(_.conf.mobile).val($(this).data('mobile'));
                var familytelephone =  $(this).data('familytelephone');
                familytelephone = $.trim(familytelephone);
                if (familytelephone != "") {
                    var t = familytelephone.split("-");
                    $("#tel1").val(t[0]);
                    $("#tel2").val(t[1]);
                    $("#tel3").val(t[2]);
                }
                else {
                    //固定电话赋值
                    $("#tel1").val("");
                    $("#tel2").val("");
                    $("#tel3").val("");
                }
                var isdefault = $(this).data('isdefault')
                var isDefaultHtml = $("#isDefaultHtml");
                isDefaultHtml.html(""); //强制更新radio按钮内容 （不然下面赋值有问题）
                var html = '<label>设为默认</label><input value="Item" type="radio" role="isdefault">';
                isDefaultHtml.append(html);
                if (isdefault == "是") {
                    $(_.conf.isdefault).attr('checked', true);
                } else {
                    $(_.conf.isdefault).attr('checked', false);
                }
                _.view.customerAddress($(this).data('province'), $(this).data('city'), ($(this).data('country')));
                viewApi.go("#addAddress");
            });
            //删除地址
            _container.on('tap', _conf.deleteAddress, function () {
                var id = $(this).data('id');
                _.view.message.confirm('删除后数据无法恢复，确定删除吗？', function () {
                    //TODO:调用接口删除收货地址               
                customer.delDeliverAddress(id, function (data) {
                    if (data.Success) {
                        if (data.Result.IsSuccess) {                           
                            window.location.reload(true);
                        }
                        else {
                            _.view.message.alert(data.Result.Message);
                            return;
                        }
                    }
                    else {
                        if (data.Message == "授权失败!" && data.Code == "401") {
                            _.view.message.alert('授权失败 登录超时请 重新登录"');
                            return;
                        }
                        else {
                            _.view.message.alert('data.Message"');
                            return;
                        }
                    }
                }, "true", function (error) {
                    _.view.message.alert('服务器连接异常请稍后再试');
                    return;
                });
                });
                });

            //设为默认地址
            _container.on('tap', _conf.defaultAddress, function() {
                if (!$(this).find('#adress').prop("checked"))//
                {
                    var id = $(this).data('id');
                    customer.defaultDeliverAddress(id, function (data) {
                    if (data.Success) {
                        if (data.Result.IsSuccess) {
                            window.location.reload(true);
                        } else {
                            _.view.message.alert(data.Result.Message);
                            return;
                        }
                    } else {
                        if (data.Message == "授权失败!" && data.Code == "401") {
                            _.view.message.alert('授权失败 登录超时请 重新登录"');
                            return;
                        } else {
                            _.view.message.alert('data.Message"');
                            return;
                        }
                    }
                }, "true", function(error) {
                    _.view.message.alert('服务器连接异常请稍后再试');
                    return;
                });
                }
                else {
                    _.view.message.alert('已为默认地址');
                    return;
                }
            });

            //添加地址
            _container.on('tap', _conf.saveAddress, function() {
                _.validate.formValidate(function(formData) {
                    customer.saveDeliverAddress(formData, function (data) {
                        if (data.Success) {
                            if (data.Result.IsSuccess) {
                                //window.location.reload(true);
                                window.location.href = "/Member/Customer/DeliverAddress";
                                //window.location.replace("/Member/Customer/DeliverAddress");
                                return false;
                            } else {
                                _.view.message.alert(data.Result.Message);
                                return;
                            }
                        } else {
                            if (data.Message == "授权失败!" && data.Code == "401") {
                                _.view.message.alert('授权失败 登录超时请 重新登录"');
                                return;
                            } else {
                                _.view.message.alert(data.Message);
                                return;
                            }
                        }
                    }, "true", function(error) {
                        _.view.message.alert('服务器连接异常请稍后再试');
                        return;
                    });
                });
            });
            //添加页面是否设置默认
            _container.on('click', _conf.isdefault, function () {
                if ($(this).attr('checked') == 'checked') {
                    $(this).attr('checked', false);
                    return;
                } else {
                    $(this).attr('checked', true);
                    return;
                }
            });
        }
    };
    return plugin.init();
});