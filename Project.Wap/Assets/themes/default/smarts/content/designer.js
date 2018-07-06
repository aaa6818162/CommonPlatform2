smart.viewerEngineer.regedit('designer', function (model) {
    var viewApi;
    var plugin = {
        conf: {
            btnCancel: '#btnCancel',  //取消按钮
            btnOk: "#btnOk",  //提交按钮
            picture: '[role="picture"]',
            txtName: "#name",   //姓名
            txtAddress1: "#address",    //地址
            txtPhoneNum: "#phoneNum",   //手机号码
            txtAddress: "#cityResult3", //地区
            txtHousingArea: '#housingArea', //住房面积
            txtUrgency: 'input[role="urgency"]:checked ',   //设计需求紧迫性
            txtCreatedate: '#result',   //要求完成日期
            txtUploadImg: "#uploadImg",   //上传您的户型图
            txtRequirements: '#requirements',   //其他要求及说明
            txtDeliveryType: 'input[role="deliveryType"]:checked ',  //房屋交付类型
            txtDeliveryTime: "#deliveryTime",   //房屋交付时间
            txtProperty: "#property",    //住房楼盘
            txtApartmentStructure: "#apartmentStructure",   //户型结构
            txtBudget: "#budget",//您为软装配置准备的预算费用是
            txtPlanCheck: "#planCheck",//计划入住时间
            btnRemoveImg: ".del-img",
            txtPFSArea: "#PFSArea", //PFS域
            ulUpload: '[role=ulUpload]',//显示图片的 ul

            errorPrompt: '[role=errorPrompt]'   //提示信息
            //uploadImgLi:'[role="uploadImgLi"]'  //上传图片成功过后显示的li
        },

        //验证函数
        validate: {

            //提交验证
            validateData: function (callback) {
                var name = $.trim($(_.conf.txtName).val());    //姓名
                var phoneNum = $.trim($(_.conf.txtPhoneNum).val());    //手机号码
                var address = $.trim($(_.conf.txtAddress1).val());
                var addressIds = $.trim($(_.conf.txtAddress).attr("data-id"))
                if (addressIds != null && addressIds != undefined && addressIds != "0") {
                    var province = addressIds.split(",")[0];  //省
                    var city = addressIds.split(",")[1];  //市
                    var country = addressIds.split(",")[2];   //区
                }
                var housingArea = $.trim($(_.conf.txtHousingArea).val());  //住房面积
                var urgency = $.trim($(_.conf.txtUrgency).val());   //设计需求紧迫性
                var createdate = $.trim($(_.conf.txtCreatedate).val());   //要求完成日期
                var uploadImg = $.trim($(_.conf.txtUploadImg).val());    //上传您的户型图
                var requirements = $.trim($(_.conf.txtRequirements).val());    //其他要求及说明

                var deliveryType = $.trim($(_.conf.txtDeliveryType).val());//房屋交付类型
                var deliveryTime = $.trim($(_.conf.txtDeliveryTime).val());//房屋交付时间
                var property = $.trim($(_.conf.txtProperty).val()); //住房楼盘
                var apartmentStructure = $.trim($(_.conf.txtApartmentStructure).val());//户型结构
                var budget = $.trim($(_.conf.txtBudget).val());//预算费用
                var planCheck = $.trim($(_.conf.txtPlanCheck).val());//计划入住时间

                var result = false;

                if (!smart.validate.isNullOrEmpty(name)) {//姓名验证
                    if (name.length > 20 || name.length < 2) {
                        _.view.tips.after(_.conf.errorPrompt, '请填写正确的姓名！', _.conf.txtName);
                        return;
                    } else {
                        _.view.tips.right(_.conf.errorPrompt, _.conf.txtName);
                    }
                } else {
                    _.view.tips.after(_.conf.errorPrompt, '姓名必填！', _.conf.txtName);
                    return;
                }

                if (!smart.validate.isNullOrEmpty(phoneNum)) {//手机号码验证
                    if (!smart.validate.isMobile(phoneNum)) {
                        _.view.tips.after(_.conf.errorPrompt, '手机号码不正确！', _.conf.txtPhoneNum);
                        return;
                    } else {
                        _.view.tips.right(_.conf.errorPrompt, _.conf.txtPhoneNum);
                    }
                } else {
                    _.view.tips.after(_.conf.errorPrompt, '手机号码不能为空！', _.conf.txtPhoneNum);
                    return;
                }

                if (smart.validate.isNullOrEmpty(addressIds) || addressIds == "0") { //省/直辖市验证
                    _.view.tips.after(_.conf.errorPrompt, '地区不能为空！', _.conf.txtAddress);
                    return;
                } else {
                    _.view.tips.right(_.conf.errorPrompt, _.conf.txtAddress);
                }

                if ($.utility.validate.isNullOrEmpty(address)) {//地址验证
                    _.view.tips.after(_.conf.errorPrompt, '地址不能为空！', _.conf.txtAddress1);
                    return;
                } else {
                    if (address.length > 200) {
                        _.view.tips.after(_.conf.errorPrompt, '您输入的地址过长！', _.conf.txtAddress1);
                        return;
                    } else {
                        _.view.tips.right(_.conf.errorPrompt, _.conf.txtAddress1);
                    }
                }

                if (!smart.validate.isNullOrEmpty(housingArea)) {//住房面积验证
                    if (!smart.validate.isDouble(housingArea)) {
                        _.view.tips.after(_.conf.errorPrompt, '住房面积必须是数字，且小数点不超过两位，不能为负数！', _.conf.txtHousingArea);
                        return;
                    } else if (housingArea < 10 || housingArea > 10000) {
                        _.view.tips.after(_.conf.errorPrompt, '请填写正确的住房面积！', _.conf.txtHousingArea);
                        return;
                    } else {
                        _.view.tips.right(_.conf.errorPrompt, _.conf.txtHousingArea);
                    }
                } else {
                    _.view.tips.after(_.conf.errorPrompt, '住房面积不能为空！', _.conf.txtHousingArea);
                    return;
                }

                if (smart.validate.isNullOrEmpty(urgency)) {
                    _.view.tips.after(_.conf.errorPrompt, '请选择设计需求紧迫性！', "input[name=radio1]");
                    return;
                } else {
                    _.view.tips.right(_.conf.errorPrompt, "input[name=radio1]");
                }

                if (!smart.validate.isNullOrEmpty(createdate)) {//要求完成日期验证
                    _.view.tips.right(_.conf.errorPrompt, _.conf.txtCreatedate);
                }
                else {
                    _.view.tips.after(_.conf.errorPrompt, '要求完成日期不能为空！', _.conf.txtCreatedate);
                    return;
                }

                if (smart.validate.isNullOrEmpty(uploadImg)) {//上传您的户型图验证
                    _.view.tips.after(_.conf.errorPrompt, '您的户型图不能为空！', '', true);
                    return;
                }


                if (!smart.validate.isNullOrEmpty(requirements)) {//其他要求及说明验证
                    if (requirements.length > 800) {
                        _.view.tips.after(_.conf.errorPrompt, '您输入的要求和说明过长！', '', true);
                        return;
                    }
                }

                if (!smart.validate.isNullOrEmpty(property)) {//住房楼盘验证
                    if (property.length > 800) {
                        //_.view.message.alert('您输入的住房楼盘过长');
                        //$(_.conf.txtProperty).parent().parent('.mui-table-view-cell').attr("class", "mui-table-view-cell err-ipt");
                        _.view.tips.after(_.conf.errorPrompt, '您输入的住房楼盘过长！', '', true);
                        return;
                    }
                }

                if (!smart.validate.isNullOrEmpty(apartmentStructure)) {//户型结构验证
                    if (apartmentStructure.length > 50) {
                        //_.view.message.alert('您输入的户型结构过长');
                        //$(_.conf.txtApartmentStructure).parent().parent('.mui-table-view-cell').attr("class", "mui-table-view-cell err-ipt");
                        _.view.tips.after(_.conf.errorPrompt, '您输入的户型结构过长！', '', true);
                        return;
                    }
                }

                if (!smart.validate.isNullOrEmpty(budget)) {//预算费用验证
                    if (!smart.validate.isDouble(budget)) {
                        //_.view.message.alert('预算费用必须是数字，且小数点不超过两位');
                        //$(_.conf.txtBudget).parent().parent('.mui-table-view-cell').attr("class", "mui-table-view-cell err-ipt");
                        _.view.tips.after(_.conf.errorPrompt, '预算费用必须是数字，且小数点不超过两位！', '', true);
                        return;
                    }
                    else if (budget < 10 || budget > 99900000000) {
                        //_.view.message.alert('预算费用超出界限');
                        //$(_.conf.txtBudget).parent().parent('.mui-table-view-cell').attr("class", "mui-table-view-cell err-ipt");
                        _.view.tips.after(_.conf.errorPrompt, '预算费用超出界限！', '', true);
                        return;
                    }
                }

                var Datas = { Name: name, Mobilenumber: phoneNum, Province: province, City: city, Country: country, Address: address, Housingarea: housingArea, Urgency: urgency, Completiontime: createdate, Certificate: uploadImg, Requirements: requirements, Deliverytype: deliveryType, Deliverytime: deliveryTime, Property: property, Apartmentstructure: apartmentStructure, Budget: budget, Plancheck: planCheck };


                if (callback && typeof callback == 'function')
                    callback(Datas);
                else
                    _.view.message.alert('系统异常,请稍后重试');
            },
        },

        //页面加载函数
        view: {

            InitView: function () {
                (function ($) {
                    viewApi = mui('#app').view({
                        defaultPage: "#setting"
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
                _.funcs.btnCancel();
            },

            //地址加载事件
            addressShow: function ($, doc) {
                $.ajax({
                    type: "POST",
                    url: "/Member/Customer/GetProvinceList",
                    data: "",
                    cache: false,
                    async: false,
                    success: function (json) {
                        if (json.success && json.data.length > 0) {
                            var str = JSON.stringify(json.data);
                            var str1 = str.replace(/CountryName/g, 'text');
                            var str2 = str1.replace(/CityName/g, 'text');
                            var str3 = str2.replace(/Name/g, 'text');
                            var str4 = str3.replace(/CityList/g, 'children');
                            var str5 = str4.replace(/CountryList/g, 'children');
                            var jsonObj = JSON.parse(str5);
                            $.ready(function () {
                                var cityPicker3 = new $.PopPicker({
                                    layer: 3
                                });
                                cityPicker3.setData(jsonObj);
                                var showCityPickerButton = doc.getElementById('showCityPicker3');
                                var cityResult3 = doc.getElementById('cityResult3');
                                showCityPickerButton.addEventListener('tap', function (event) {
                                    cityPicker3.show(function (items) {
                                        cityResult3.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                                        cityResult3.setAttribute('data-id', items[0].ID + ',' + items[1].ID + ',' + items[2].ID);
                                    });
                                }, false);
                            });
                        }
                    }
                });
            },

            //日期加载事件
            dateShow: function ($) {
                var btns = $('.dtpicker');
                btns.each(function (i, btn) {
                    btn.addEventListener('tap', function () {
                        var optionsJson = this.getAttribute('data-options') || '{}';
                        var options = { "type": "date", "beginDate": new Date(1950, 00, 01), "endDate": new Date(2027, 11, 31) };
                        var id = this.getAttribute('id');
                        var picker = new $.DtPicker(options);
                        picker.show(function (rs) {
                            btn.nextSibling.nextSibling.value = rs.text;
                            picker.dispose();
                        });
                    }, false);
                });
            },

            //上传户型图
            initUplader: function () {
                //var uploader = WebUploader.create({
                //    auto: true,
                //    swf: '/Assets/libs/webuploader-0.1.5/Uploader.swf',
                //    server: '/upload/UploadDesign',
                //    pick: '#picker',
                //    accept: {
                //        title: '图片上传',
                //        extensions: 'jpg,gif,png,jpeg,bmp',
                //        mimeTypes: 'image/*'
                //    }
                //});

                //uploader.on('uploadBeforeSend', function (object, data, header) {
                //    data = $.extend(data, {
                //        uploadFile: "/UploadFile/" + $(_.conf.txtPFSArea).val() + "/Designer",
                //        allowFileSuffixs: "jpg|gif|png|jpeg|bmp"
                //    });
                //});

                //uploader.on('uploadSuccess', function (file, response) {
                //    if (response.data.IsSucceed) {
                //        if ($('[role="uploadImg"]').length >= 5) {

                //            _.view.message.alert('您上传的户型图已有五张，请删除已上传的户型图后再重新上传');
                //        }
                //        else {
                //            var path = response.data.Path;
                //            $(_.conf.ulUpload).prepend('<li class="pos-r fl" role="uploadImg"><img class="list-uploadImg pos-a" src="' + response.data.Path + '"><div class="del-img txta-c pos-a">-</div><input class="file pos-a"type="file" disabled="disabled" ></li>');                     
                //            if ($('[role="uploadImg"]').length >= 5) {
                //                $(_.conf.ulUpload).children().last().hide();
                //            }
                //        }
                //        _.funcs.getUploadImg();
                //        //删除户型图按钮点击事件
                //        $(_.conf.btnRemoveImg).click(function () {
                //            _.funcs.pictureRemove(this);
                //        });
                //    }
                //    else {
                //        _.view.message.alert(result.msg);
                //    }
                //});

                document.querySelector('#picture').addEventListener('change', function () {
                    var that = this;
                    lrz(that.files[0])
                        .then(function (rst) {
                            // 处理成功会执行

                            var img = new Image();
                            img.onload = function () {
                                //$(".fail-img").attr("src", img.src);
                            };
                            img.src = rst.base64;
                            $.richAjax('/Upload/UploadWap', { base64: rst.base64, uploadFile: "/UploadFile/" + $(_.conf.txtPFSArea).val() + "/Designer", allowFileSuffixs: "jpg|gif|png|jpeg|bmp" }, function (result) {
                                if (result.success) {
                                    if ($('[role="uploadImg"]').length >= 5) {

                                        _.view.message.alert('您上传的户型图已有五张，请删除已上传的户型图后再重新上传');
                                    }
                                    else {
                                        var path = result.data.Path;
                                        $(_.conf.ulUpload).prepend('<li class="pos-r fl" role="uploadImg"><div class="img-mask pos-a"></div><img class="list-uploadImg pos-a" src="' + result.data.Path + '"><div class="del-img txta-c pos-a">-</div><input class="file pos-a"type="file" disabled="disabled" ></li>');
                                        if ($('[role="uploadImg"]').length >= 5) {
                                            $(_.conf.ulUpload).children().last().hide();
                                        }
                                    }
                                    _.funcs.getUploadImg();
                                    //删除户型图按钮点击事件
                                    $(_.conf.btnRemoveImg).click(function () {
                                        _.funcs.pictureRemove(this);
                                    });
                                } else {
                                    _.view.message.alert(result.Message);
                                }
                            });


                            //if (response.data.IsSucceed) {
                            //    if ($('[role="uploadImg"]').length >= 5) {

                            //        _.view.message.alert('您上传的户型图已有五张，请删除已上传的户型图后再重新上传');
                            //    }
                            //    else {
                            //        var path = response.data.Path;
                            //        $(_.conf.ulUpload).prepend('<li class="pos-r fl" role="uploadImg"><img class="list-uploadImg pos-a" src="' + response.data.Path + '"><div class="del-img txta-c pos-a">-</div><input class="file pos-a"type="file" disabled="disabled" ></li>');
                            //        if ($('[role="uploadImg"]').length >= 5) {
                            //            $(_.conf.ulUpload).children().last().hide();
                            //        }
                            //    }
                            //    _.funcs.getUploadImg();
                            //    //删除户型图按钮点击事件
                            //    $(_.conf.btnRemoveImg).click(function () {
                            //        _.funcs.pictureRemove(this);
                            //    });
                            //}
                            //else {
                            //    _.view.message.alert(result.msg);
                            //}
                        })
                        .catch(function (err) {
                            // 处理失败会执行
                        })
                        .always(function () {
                            // 不管是成功失败，都会执行
                        });
                });

            },
        },
        //按钮事件
        funcs: {
            ////获取上传图片集合
            getUploadImg: function () {
                var imgList = [];
                $('[role="uploadImg"]').each(function () {
                    var image = $(this).children("img").attr("src");
                    imgList.push(image);
                });
                $(_.conf.txtUploadImg).val(imgList);
            },


            //删除户型图
            pictureRemove: function (obj) {
                $(obj).parent().remove()
                if ($('[role="uploadImg"]').length < 5) {
                    $(_.conf.ulUpload).children().last().show();
                }
                _.funcs.getUploadImg();
            },

            //确认添加软装设计
            btnOk: function () {
                _.validate.validateData(function (Datas) {
                    customer.addSaDesiner(Datas, function (data) {
                        if (data.Success) {
                            if (!data.Result.IsSuccess)
                                _.view.message.alert(data.Result.Message);
                            else {
                                $(_.conf.btnCancel).click();
                                viewApi.go('#design-1');
                                //window.location.href = "/Designer-Success";
                            }
                        } else {
                            _.view.message.alert("软装设计申请失败");
                        }
                    });
                });
            },

            //取消
            btnCancel: function () {
                $(_.conf.txtName).val('');    //姓名
                $(_.conf.txtPhoneNum).val('');    //手机号码



                $(_.conf.txtAddress).val('');  //地区
                $(_.conf.txtAddress1).val('');  //地址
                $(_.conf.txtHousingArea).val('');  //住房面积
                $(_.conf.txtUrgencyOf).click();//设计需求紧迫性
                $(_.conf.txtCreatedate).val('');   //要求完成日期
                $(_.conf.txtUploadImg).val('');    //上传您的户型图
                $(_.conf.txtRequirements).val('');    //其他要求及说明

                $(_.conf.txtDeliveryType).click();//房屋交付类型
                $(_.conf.txtDeliveryTime).val('');//房屋交付时间
                $(_.conf.txtProperty).val(''); //住房楼盘
                $(_.conf.txtApartmentStructure).val('');//户型结构
                $(_.conf.txtBudget).val('');//预算费用
                $(_.conf.txtPlanCheck).val('');//计划入住时间
                $(_.conf.errorMsg).html('');//房屋交付类型
            },
        },

        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;

            _.view.InitView();
            _.view.addressShow(mui, document);//地址加载事件
            _.view.dateShow(mui);//日期加载事件
            _.view.initUplader();//上传户型图



            //添加按钮点击事件
            mui('.design-btn').on('tap', _.conf.btnOk, function () {
                _.funcs.btnOk();
            });

            //取消按钮点击事件
            mui('.design-btn').on('tap', _.conf.btnCancel, function () {
                _.funcs.btnCancel();
            });
        }
    };
    return plugin.init();
});