var Message = {
    "alert": function (msg, callback) {
        var alertModal = '<div class="modal fade">';
        if (msg.length < 40) { alertModal += '<div class="modal-dialog modal-sm">' } else { alertModal += '<div class="modal-dialog">' }
        alertModal = alertModal + '<div class="modal-content">'
            + '<div class="modal-body"><div class="panel-body">'+msg+'</div></div>'
            + '<div class="modal-footer">'
            + '<button type="button" id="ok" class="btn btn-primary" data-dismiss="modal">确定</button>'
            + '</div></div></div></div>';
        var obj = $(alertModal);
        obj.on('click','#ok', function () {
            if (callback) callback();
            obj.modal("hide");
        }).modal();
    },
    "confirm": function (msg, okCallback, cancelCallback) {
        var alertModal = '<div class="modal fade">';
        if (msg.length < 40) { alertModal += '<div class="modal-dialog modal-sm">' } else { alertModal += '<div class="modal-dialog">' }
        alertModal = alertModal + '<div class="modal-content">'
            + '<div class="modal-body"><div class="panel-body">' + msg + '</div></div>'
            + '<div class="modal-footer">'
            + '<button type="button" id="ok" class="btn btn-primary">确定</button>'
            + '<button type="button" id="cancel" class="btn btn-default">关闭</button>'
            + '</div></div></div></div>';
        var obj = $(alertModal);
        obj.on('click','#ok', function () {
            if (okCallback) {
                okCallback();
            }
            obj.modal("hide");
        }).on('click', '#cancel', function () {
            if (cancelCallback) {
                cancelCallback();
            }
            obj.modal("hide");
        }).modal();
    }
}