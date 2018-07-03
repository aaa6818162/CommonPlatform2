
var pro = pro || {};
(function () {
    pro.AreaControl = pro.AreaControl || {};
    pro.AreaControl = {
        init: function () {

           
        },
        //获取省份数据
        getProvinceData: function ( value1, value2, value3) {
            $.ajax({
                type: "post",
                contentType: "html",
                url: "/SystemSet/GetProvinceList",
                success: function (data) {
                    $("#ProvinceId").html(data);
                    if (value1) {
                        $("#ProvinceId").val(value1);
                    }
                    pro.AreaControl.onProvinceChange(value1, value2, value3);
                }
            });
        },
        onProvinceChange: function ( value1, value2, value3) {
            var provinceId = $("#ProvinceId").val();
            $.ajax({
                type: "post",
                contentType: "html",
                url: "/SystemSet/GetListCityList?ProvinceId=" + provinceId,
                success: function (data) {
                    $("#CityId").html(data);
                    if (value2) {
                        $("#CityId").val(value2);
                    }
                    pro.AreaControl.onCityChange( value1, value2, value3);
              
                }
            });
        },
        onCityChange: function (value1, value2, value3) {
            var cityId = $("#CityId").val();
            $.ajax({
                type: "post",
                contentType: "html",
                url: "/SystemSet/GetAreaList?CityId=" + cityId,
                success: function (data) {
                    $("#AreaId").html(data);
                    if (value3) {
                        $("#AreaId").val(value3);
                    }
                }
            });
        }

    }
}
)();





