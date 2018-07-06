$.Plupload = $.plupload || {
    fileUpUrl: ""
};

$(function () {
    $.Plupload.defaultOptions = {
        bobrowse_button: "browse",
        filters: {
            mime_types: [{ title: "Image files", extensions: "jpg,jpeg,gif,png,bmp" }],
            prevent_duplicates: false //不允许选取重复文件
        },
        unique_names: true,
        runtimes: "html5,flash,silverlight,html4",
        //swf文件，当需要使用swf方式进行上传时需要配置该参数
        flash_swf_url: "Moxie.swf",
        //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数r
        silverlight_xap_url: "Moxie.xap"
    };

    $.Plupload.create = function (options, callback, initfn) {
        options = options || {};

        var _options = $.extend({}, $.Plupload.defaultOptions, options);

        var uploader = new plupload.Uploader(_options);

        //在实例对象上调用init()方法进行初始化
        uploader.init();

        //绑定文件添加进队列事件
        uploader.bind('FileUploaded', function (uploader, files, result) {
            if (typeof callback == 'function')
                callback(JSON.parse(result.response));
        });

        //绑定文件上传进度事件
        uploader.bind('FilesAdded', function (uploader, file) {
            if (typeof initfn == 'function') {
                initfn(uploader, file);
                $('#file-' + file.id + ' .progress').css('width', file.percent + '%');//控制进度条  
            } else {
                uploader.start();
                $('#file-' + file.id + ' .progress').css('width', file.percent + '%');//控制进度条  
            }
        });

        uploader.bind("Error", function (uploader, err) {
            if (err.code == "-601") {
                //err.message:"File extension error."
                var ext = _options.multipart_params.allowFileSuffixs || "jpg,jpeg,gif,png,bmp";
                var msg = "请上传" + ext + "格式的图片！";
                if (smart) 
                    smart.massger.Alert(msg);
                 else 
                    alert(msg);
            }
            else if (err.code == "-600") {
                //err.message:"File size error."
                var msg = "请上传大小不超过" + _options.max_file_size + "的图片！";
                if (smart)
                    smart.massger.Alert(msg);
                else
                    alert(msg);
            }
            else {
                if (smart)
                    smart.massger.Alert(err.message);
                else
                    alert(err.message);
            }
        });
    }
});