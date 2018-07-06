//	兼容IOS10禁止缩放
window.onload = function () {
    if ($("body").find('.catalogDetail').length == 0) {
        iosScale();
    }
};

function iosScale() {
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    })
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false)
};
//移动端适配
! function (e, t) {
    var a, r = e.document,
		n = r.documentElement,
		o = r.querySelector('meta[name="viewport"]'),
		l = r.querySelector('meta[name="flexible"]'),
		m = 0,
		s = 0,
		d = t.flexible || (t.flexible = {});

    function i() {
        var t = n.getBoundingClientRect().width;
        t / m > 540 && (t = 540 * m);
        var i = t / 10;
        n.style.fontSize = i + "px", d.rem = e.rem = i
    }

    if (o) {
        console.warn("将根据已有的meta标签来设置缩放比例");
        var p = o.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        p && (s = parseFloat(p[1]), m = parseInt(1 / s))
    } else if (l) {
        var c = l.getAttribute("content");
        if (c) {
            var u = c.match(/initial\-dpr=([\d\.]+)/),
				f = c.match(/maximum\-dpr=([\d\.]+)/);
            u && (m = parseFloat(u[1]), s = parseFloat((1 / m).toFixed(2))), f && (m = parseFloat(f[1]), s = parseFloat((1 / m).toFixed(2)))
        }
    }
    if (!m && !s) {
        var v = (e.navigator.appVersion.match(/android/gi), e.navigator.appVersion.match(/iphone/gi)),
			h = v && e.navigator.appVersion.match(/OS 9_3/),
			x = e.devicePixelRatio;
        m = v && !h ? x >= 3 && (!m || m >= 3) ? 3 : x >= 2 && (!m || m >= 2) ? 2 : 1 : 1, s = 1 / m
    }
    if (n.setAttribute("data-dpr", m), !o)
        if (o = r.createElement("meta"), o.setAttribute("name", "viewport"), o.setAttribute("content", "initial-scale=" + s + ", maximum-scale=" + s + ", minimum-scale=" + s + ", user-scalable=no"), n.firstElementChild) n.firstElementChild.appendChild(o);
        else {
            var b = r.createElement("div");
            b.appendChild(o), r.write(b.innerHTML)
        }
    e.addEventListener("resize", function () {
        clearTimeout(a), a = setTimeout(i, 300)
    }, !1), e.addEventListener("pageshow", function (e) {
        e.persisted && (clearTimeout(a), a = setTimeout(i, 300))
    }, !1), "complete" === r.readyState ? r.body.style.fontSize = 12 * m + "px" : r.addEventListener("DOMContentLoaded", function (e) {
        r.body.style.fontSize = 12 * m + "px";
    }, !1), i(), d.dpr = e.dpr = m, d.refreshRem = i, d.rem2px = function (e) {
        var t = parseFloat(e) * this.rem;
        return "string" == typeof e && e.match(/rem$/) && (t += "px"), t
    }, d.px2rem = function (e) {
        var t = parseFloat(e) / this.rem;
        return "string" == typeof e && e.match(/px$/) && (t += "rem"), t
    }
}(window, window.lib || (window.lib = {}));

function keypadHide() {
    //判断是否为苹果
    var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE') != -1;
    // 元素失去焦点隐藏iphone的软键盘
    function objBlur(id, time) {
        if (typeof id != 'string') throw new Error('objBlur()参数错误');
        var obj = $("input"),
			time = 0,
			docTouchend = function (event) {
			    var a = $(event.target).hasClass('xz-ipt') || $(event.target).hasClass('input-required');
			    if (a == false) {
			        setTimeout(function () {
			            $("input").blur();
			            document.removeEventListener('touchend', docTouchend, false);
			        }, time);
			    }
			};
        if (obj) {
            for (var i = 0; i < obj.length; i++) {
                obj[i].addEventListener('focus', function () {
                    document.addEventListener('touchend', docTouchend, false);
                }, false);
            }
        } else {
            throw new Error('objBlur()没有找到元素');
        }
    }
    if (isIPHONE) {
        var input = new objBlur('input');
        input = null;
    }
};

;
(function () {
    //	var myScroll = new iScroll('wrapper');  	
    //	var myScroll1 = new iScroll('sidenav');
    var scrollHd = mui('.mui-scroll-wrapper-hd').scroll();
    mui(".header").on('tap', '#menu', function () {
        $(".sidenav").show();
    });
    mui(".sidenav").on('tap', '.sidenav-right', function () {
        $(".sidenav").hide();
    });
    mui(".fr").on('tap', '#search', function () {
        $(this).hide();
        $(".search_box,.search-container").show();
    });
    mui(".search_box").on('tap', '.close', function () {
        $(".search_box,.search-container").hide();
        $("#search").show();
    });
    mui(".nav-list-1").on('tap', '.li-selected-1', function () {
        $(this).siblings('.nav-list-2').toggle();
        $(this).parent().siblings().find('.nav-list-2').hide();
        $(this).addClass('nav-active').parent().siblings().find('.li-selected-1').removeClass('nav-active');
        //myScroll1.refresh();
    });
    mui(".nav-list-1").on('tap', '.li-selected-2', function () {
        $(this).siblings('.nav-list-3').toggle();
        $(this).parent().siblings().find('.nav-list-3').hide();
        $(this).toggleClass('bold');
        $(this).parent().siblings().find('.li-selected-2').removeClass('bold');
        //myScroll1.refresh();
    });

    //	监听a标签链接跳转
    mui('body').on('tap', 'a', function () {
        document.location.href = this.href;
    });
    mui('.mui-scroll').on('tap', '.yellow-btn,.mui-btn-block,.ggsk-btn,.mui-table-view a', function () {
        var isMI = navigator.userAgent.toUpperCase().indexOf('MI') != -1;
        if (isMI) {
            $("input").blur();
            document.removeEventListener('touchend', docTouchend, false);
        };
    });
    mui('.err_title').on('tap', '.close_box', function () {
        $(this).parents('.Popup_err').css('visibility', 'hidden');
    });
    keypadHide();
})();