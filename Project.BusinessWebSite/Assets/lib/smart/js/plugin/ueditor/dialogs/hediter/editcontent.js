(function () {
    window.onload = function () {
        initContent();
    };

    function initContent() {
        var content = getQueryString('content');

        if (content != undefined && content !== '')
            document.getElementById("txt_editcontent").value = decodeURI(content);

        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    }
})();