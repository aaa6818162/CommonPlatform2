smart.viewerEngineer.regedit('checklogin', function (model) {
    var plugin = {

        conf: {
            search: '[role="search"]',
            txtAddress: "#cityResult3", //地址
            result: '[role="result"]',
            RegisterInit: '[role=registerInit]'
        },

        //验证函数
        validate: {

        },

        //页面加载函数
        view: {
            Init: function () {
                $(_.conf.RegisterInit).attr('href', '/Member/Account/Register?url=' + location.href);
            },
            provinces: null,//省
            citys: null,//市
            countrys: null,//区
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
                                if (showCityPickerButton != null) {
                                    cityResult3.addEventListener('tap', function (event) {
                                        cityPicker3.show(function (items) {
                                            cityResult3.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                                            cityResult3.setAttribute('data-id', items[0].ID + ',' + items[1].ID + ',' + items[2].ID);
                                        });
                                    }, false);
                                }
                            });
                        }
                    }
                });

            },

            checklogin: function () {
                $.top_refresh();

            },
        },

        //按钮事件
        funcs: {
            click: function () {
                $(_.conf.search).on('click', function () {
                    var province = null;
                    var city = null;
                    var country = null;
                    var addressIds = $.trim($(_.conf.txtAddress).attr("data-id"))
                    if (addressIds != null && addressIds != undefined && addressIds != "0") {
                        province = addressIds.split(",")[0];  //省
                        city = addressIds.split(",")[1];  //市
                        country = addressIds.split(",")[2];   //区
                    }

                    if (province == "" || city == "" || country == "") { return; }
                    else {
                        logistics.freeLogistice(province, city, country, function (data) {
                            var $obj,
                             $free = '<img src="/Assets/themes/default/images/help/logisticsService-1.jpg" />';
                            $charge = '<img src="/Assets/themes/default/images/help/logisticsService-2.jpg" />';
                            if (data.Success) {
                                $obj = $free;
                            } else {
                                $obj = $charge;
                            }
                            $(_.conf.result).html($obj);
                        });
                    }
                });
            },
        },

        //总入口
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);
            _ = this;
            _container = this.conf.container;

            _.view.Init();

            _.funcs.click();  //专业物流服务里配送服务查询事件

            _.view.addressShow(mui, document);  //地址加载事件
            _.view.checklogin();    //头部登录相关加载事件
        },
    };
    return plugin.init();
});