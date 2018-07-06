var tiptype7 = function (msg, o, cssctl)
{
    if (!o.obj.is("form"))
    {
        var objtip = o.obj.parent("td").next().find(".Validform_checktip");
        cssctl(objtip, o.type);
        objtip.text(msg);

        var infoObj = o.obj.parent("td").next().find(".info");
        if (o.type == 2)
            infoObj.fadeOut(200);
        else
        {
            if (infoObj.is(":visible"))
                return;
            var left = o.obj.offset().left;
            var top = o.obj.offset().top;

            infoObj.css(
                            {
                                left: left,
                                top: top - 45
                            }).show().animate(
                            {
                                top: top - 35
                            }, 200);
        }
    }
};


var tiptype8 = function (e, t, n, dialog) {
    if (!t.obj.is("form")) {
        var r = t.obj.closest("td,div").find(".Validform_checktip"), i = t.obj.parent("td,div").find(".info");
        n(r, t.type), r.text(e);
        if (t.type == 2) i.fadeOut(200); else {
            if (i.is(":visible")) return;
            i.css({
                left: 10,
                top: - 45
            }).show().animate({
                top: - 38
            }, 200);
        }
    }
};