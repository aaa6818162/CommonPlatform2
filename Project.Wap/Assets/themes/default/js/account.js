(function () {
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
    //keypadHide();
})();

//function keypadHide() {
//    //判断是否为苹果
//    var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE') != -1;
//    // 元素失去焦点隐藏iphone的软键盘
//    function objBlur(id, time) {
//        if (typeof id != 'string') throw new Error('objBlur()参数错误');
//        var obj = document.getElementsByClassName('xz-ipt'),
//			time = time || 300,
//			docTouchend = function (event) {
//			    if (event.target != obj) {
//			        setTimeout(function () {
//			            $(".xz-ipt").blur();
//			            document.removeEventListener('touchend', docTouchend, false);
//			        }, time);
//			    }
//			};
//        if (obj) {
//            for (var i = 0; i < obj.length; i++) {
//                obj[i].addEventListener('focus', function () {
//                    document.addEventListener('touchend', docTouchend, false);
//                }, false);
//            }
//        } else {
//            throw new Error('objBlur()没有找到元素');
//        }
//    }
//    if (isIPHONE) {
//        var input = new objBlur('input');
//        input = null;
//    }
//};