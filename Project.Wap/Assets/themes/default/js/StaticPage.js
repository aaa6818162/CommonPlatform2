

var StaticPage = {
    fileType: '',   //请求的类型，2为重传shml,0为上传文件资源包,
    fileUrl: '',    //文件地址

    init: function () {
        var setting = {
            callback: {
                onClick: onClick,
            }
        };

        //获取静态页面树相关内容
        var zNodes = [];
        $.ajax({
            async: false,
            cache: false,
            type: 'POST',
            dataType: "json",
            url: "/StaticPage/GetTree",//请求的action路径
            error: function () {//请求失败处理函数
                alert('请求失败');
                zNodes = null;
            },
            success: function (data) { //请求成功后处理函数。
                zNodes = data.data;   //把后台封装好的简单Json格式赋给zNodes
            }
        });


        if (StaticPage.fileType != null && StaticPage.fileType == 2) {
            StaticPage.chongchuan(StaticPage.fileUrl, StaticPage.fileType);//重传
        }

        $('#shtmlPath').click(function () {
            if (StaticPage.fileType == null || StaticPage.fileType != 2) {
                $("#time").html("");
                $("#url").html("");
                $("#type").html("");
                var type = 0;
                var url = $("#shtmlPath").val();
                StaticPage.ajaxData(url, type);//ajax请求，获取文件或者文件夹的相关信息，并显示到页面上
            }
        });

        //树的单机事件
        function onClick(e, treeId, treeNode) {
            if (StaticPage.fileType == null || StaticPage.fileType != 2) {
                $("#time").html("");
                $("#url").html("");
                $("#type").html("");
                var zTree = $.fn.zTree.getZTreeObj("tree");
                var nodes = zTree.getSelectedNodes();//获取树当前选择的子节点以及子集合
                var url = null;
                var type = null;
                if (nodes != null) {
                    url = nodes[0].id;
                    type = 1;
                }
                StaticPage.ajaxData(url, type);//ajax请求，获取文件或者文件夹的相关信息，并显示到页面上
            }
        }
        // 初始化 ztree 树插件
        $(document).ready(function () {
            $.fn.zTree.init($("#tree"), setting, zNodes);
        });

    },

    //ajax请求，获取文件或者文件夹的相关信息，并显示到页面上
    ajaxData: function (url, types) {
        var time;//上次更改此文件的时间
        $.ajax({
            async: false,
            cache: false,
            type: 'POST',
            data: { url: url },
            dataType: "json",
            url: "/StaticPage/GetFileDetail",//请求的action路径
            error: function (e) {//请求失败处理函数
                alert('请求失败');
                $("#time").html('');
                $("#url").html('');
                $('#type').val('');
            },
            success: function (data) { //请求成功后处理函数。
                if (data.success) {
                    time = data.data;   //返回上次更改此文件的时间
                    $("span[name='time']").html("您当前选择的文件夹/页面上次修改时间:")
                    $("span[name='url']").html("您当前选择的文件夹/页面的路径:")
                    $("#time").html(time);
                    $("#url").html(url);
                    $('#type').val(types);

                    //初始化上传插件
                    StaticPage.upload();
                }
                else {
                    alert(data.message);
                    $("#time").html('');
                }
            }
        });
    },

    //上传插件
    upload: function () {
        $.Plupload.create({
            browse_button: "files",
            url: "/StaticPage/ZipUploadFile",
            multi_selection: false,
            max_file_size: '500MB',
            filters: {
                mime_types: [{ title: "Files", extensions: "jpg,jpeg,gif,png,bmp,zip,shtml,rar" }],
                prevent_duplicates: false //不允许选取重复文件
            },
            multipart_params: { uploadFile: $("#url").html(), fileType: $('#type').val() }//type
        }, function (result) {
            if (result.success) {
                $('#result').html('上传成功')
                $('#uploadFiles').val(result.data);
                $('#uploadFilesUrl').html(result.data);
                //刷新树
                //var zTree = $.fn.zTree.getZTreeObj("tree");
                //zTree.reAsyncChildNodes(null, "refresh");
                //$("#tree").reAsyncChildNodes(null, "refresh");//刷新树
            } else {
                $('#result').html('上传失败')
                $('#uploadFiles').val();
                $('#uploadFilesUrl').html();
            }
        });
    },

    chongchuan: function (url, type) {
        //锁定tree树，不让点击

        StaticPage.ajaxData(url, type);//ajax请求，获取文件或者文件夹的相关信息，并显示到页面上
    },
}









