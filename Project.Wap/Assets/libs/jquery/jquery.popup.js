/**
 * @file    jquery 弹出框 插件
 * @authors Kevin Chen (chj@8cuo.net)
 * @date    2015-07-30 15:00:12
 * @version 
 */


jQuery.popup = {
    init: function (content, config) {
        this.defaults = {
            id: 'popupWin',
            btns: [{ 'cls': 'btn s2 onSure', 't': '确定', 'link': 'javascript:;' },
					{ 'cls': 'btn onCancel', 't': '取消', 'link': 'javascript:;' }
            ], // 按钮
            cls: 'box-popup', // 自定义样式名
            position: 'center', // 位置 center: 相对屏幕居中;绝对位置 {'top':num,'left':num}
            showClose: true, //是否显示关闭按钮
            onopen: null,   // 打开回调
            onsure: null,   // 确认回调
            oncancel: null, // 取消回调
            onclose: null,   // 关闭确回调
            modal: true    //是否遮罩
        };

        var settings = $.extend({}, this.defaults, config);

        var that = this,
			id = settings.id || 'popupWin',
			btns = settings.btns,
			cls = settings.cls || 'box-popup',
			position = settings.position,
			showClose = settings.showClose,
			onopen = settings.onopen,
			onsure = settings.onsure,
			oncancel = settings.oncancel,
			onclose = settings.onclose,
			modal = settings.modal;


        if ($('#' + id).length !== 0) {
            $('#' + id).remove();
            $('.mask').remove();
        } else {
            var btnsHtml = '',
				closeHtml = '';
            for (var i = 0; i < btns.length; i++) {
                var link = btns[i].link || 'javascript:;';
                btnsHtml += '<a href="' + link + '" class="' + btns[i].cls + '">' + btns[i].t + '</a>'
            }

            if (showClose) {
                closeHtml = '<div class="wrapclose"><a href="javascript:;" class="onClose">Close <i>&times;</i></a></div>';
            }
            var html = ['<div class="' + cls + '" id="' + id + '">',
					closeHtml,
					'<div class="content">' + content + '</div>',
					'<div class="opts">' + btnsHtml + '</div>',
				'</div>'].join('');
            if (modal) {
                html += '<div class="mask"></div>';
            }
            var $popup = $(html);
            $popup.appendTo('body');
            this.setPosition($('#' + id), position);

            if (typeof (onopen) === 'function') {
                $popup.fadeIn(onopen());
            } else {
                $popup.fadeIn();
            }

        }

        $('.onSure').on('click', function () {
            if ($(this).parents('#' + id).length > 0) {
                if (typeof (onsure) === 'function') {
                    onsure();
                    //that.closePopup($('#'+id),onclose);
                } else {
                    that.closePopup($('#' + id), onclose);
                }
            }
        });

        $('.onCancel').on('click', function () {
            if ($(this).parents('#' + id).length > 0) {
                if (typeof (oncancel) === 'function') {
                    oncancel();
                } else {
                    that.closePopup($(this).parents('#' + id), onclose);
                }
            }
        });

        $('.onClose').on('click', function () {
            if ($(this).parents('#' + id).length > 0) {
                that.closePopup($(this).parents('#' + id), onclose);
            }
        });

    },

    setPosition: function (obj, position) {
        if (position === 'center') {
            var _winHeight = $(window).height(),
				_objHeight = obj.outerHeight(),
				_objWidth = obj.outerWidth(),
				_winScrolltop = $(window).scrollTop();

            obj.css({ 'top': (_winHeight - _objHeight) / 2 + _winScrolltop, 'left': '50%', 'margin-left': -_objWidth / 2 });
        } else {
            var top = position.top,
				left = position.left,
				_objWidth = obj.outerWidth();
            obj.css({ 'top': top, 'left': left, 'margin-left': -_objWidth / 2 });
        }
    },

    closePopup: function (obj, onclose) {
        obj.fadeOut(function () {
            if (typeof (onclose) === 'function') {
                onclose();
            }
            obj.remove();
        });
        $('.mask').fadeOut(function () { $(this).remove() });

    }

};
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    "use strict";
    var heights = [],
		names = [],
		elements = [],
		index = 0,
		currentHash = window.location.hash,
		hasLocation = false,
		timeoutId,
		timeoutId2,
		top = $(window).scrollTop(),
		scrollable = false,
		settings = {
		    //section should be an identifier that is the same for each section
		    section: "section",
		    sectionName: "section-name",
		    easing: "easeOutExpo",
		    scrollSpeed: 1100,
		    offset: 0,
		    scrollbars: true,
		    axis: "y",
		    target: "html,body",
		    //touchExceptions:"a",
		    before: function () { },
		    after: function () { }
		};
    $.scrollify = function (options) {
        function animateScroll(index) {
            if (names[index]) {
                settings.before(index, elements);
                if (settings.sectionName) {
                    window.location.hash = names[index];
                }
                $(settings.target).stop().animate({
                    scrollTop: heights[index]
                }, settings.scrollSpeed, settings.easing);
                $(settings.target).promise().done(function () { settings.after(index, elements); });
            }
        }
        var manualScroll = {
            handleMousedown: function () {
                scrollable = false;
            },
            handleMouseup: function () {
                scrollable = true;
            },
            handleScroll: function () {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(function () {
                    top = $(window).scrollTop();
                    if (scrollable === false) {
                        return false;
                    }
                    scrollable = false;
                    var i = 1,
                        max = heights.length,
                        closest = 0,
                        prev = Math.abs(heights[0] - top),
                        diff;
                    for (var i = 0; i < max; i++) {
                        diff = Math.abs(heights[i] - top);

                        if (diff < prev) {
                            prev = diff;
                            closest = i;
                        }
                    }
                    index = closest;
                    animateScroll(closest);
                }, 200);
            },
            wheelHandler: function (e, delta) {
                e.preventDefault();
                //					alert(1);
                delta = delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120;

                clearTimeout(timeoutId);

                timeoutId = setTimeout(function () {
                    //if(!(index==heights.length-1 && ((index-delta) % (heights.length)==0))) {
                    //index = (index-delta) % (heights.length);
                    //}						
                    if (delta < 0) {
                        if (index < heights.length - 1) {
                            index++;
                        }
                    } else if (delta > 0) {
                        if (index > 0) {
                            index--;
                        }
                    }
                    if (index >= 0) {
                        animateScroll(index);
                    } else {
                        index = 0;
                    }

                }, 50);
            },
            keyHandler: function (e) {
                e.preventDefault();
                if (e.keyCode == 38) {
                    if (index > 0) {
                        index--;
                    }
                    animateScroll(index);
                } else if (e.keyCode == 40) {
                    if (index < heights.length - 1) {
                        index++;
                    }
                    animateScroll(index);
                }
            },
            init: function () {
                if (settings.scrollbars) {
                    $(window).bind('mousedown', manualScroll.handleMousedown);
                    $(window).bind('mouseup', manualScroll.handleMouseup);
                    $(window).bind('scroll', manualScroll.handleScroll);
                } else {
                    $("body").css({ "overflow": "hidden" });
                }
                $(document).bind('DOMMouseScroll mousewheel', manualScroll.wheelHandler);
                $(document).bind('keyup', manualScroll.keyHandler);
            }
        };

        var swipeScroll = {
            touches: {
                "touchstart": { "y": -1 },
                "touchmove": { "y": -1 },
                "touchend": false,
                "direction": "undetermined"
            },
            options: {
                "distance": 30,
                "timeGap": 800,
                "timeStamp": new Date().getTime()
            },
            touchHandler: function (event) {
                var touch;
                if (typeof event !== 'undefined') {
                    //if($(event.target).parents(settings.touchExceptions).length<1 && $(event.target).is(settings.touchExceptions)===false) {
                    //event.preventDefault();
                    //}
                    if (typeof event.touches !== 'undefined') {
                        touch = event.touches[0];
                        switch (event.type) {
                            case 'touchstart':
                                swipeScroll.touches.touchstart.y = touch.pageY;
                                swipeScroll.touches.touchmove.y = -1;

                                swipeScroll.options.timeStamp = new Date().getTime();
                                swipeScroll.touches.touchend = false;
                            case 'touchmove':
                                swipeScroll.touches.touchmove.y = touch.pageY;
                                if (swipeScroll.touches.touchstart.y !== swipeScroll.touches.touchmove.y) {
                                    event.preventDefault();
                                    if ((swipeScroll.options.timeStamp + swipeScroll.options.timeGap) < (new Date().getTime()) && swipeScroll.touches.touchend == false) {

                                        swipeScroll.touches.touchend = true;
                                        if (swipeScroll.touches.touchstart.y > -1) {

                                            if (Math.abs(swipeScroll.touches.touchmove.y - swipeScroll.touches.touchstart.y) > swipeScroll.options.distance) {
                                                if (swipeScroll.touches.touchstart.y < swipeScroll.touches.touchmove.y) {
                                                    if (index > 0) {
                                                        index--;
                                                    }
                                                    animateScroll(index);
                                                } else {
                                                    if (index < heights.length - 1) {
                                                        index++;
                                                    }
                                                    animateScroll(index);
                                                }
                                            }
                                        }
                                    }
                                }
                                break;
                            case 'touchend':
                                if (swipeScroll.touches[event.type] === false) {
                                    swipeScroll.touches[event.type] = true;
                                    if (swipeScroll.touches.touchstart.y > -1 && swipeScroll.touches.touchmove.y > -1) {

                                        if (Math.abs(swipeScroll.touches.touchmove.y - swipeScroll.touches.touchstart.y) > swipeScroll.options.distance) {
                                            if (swipeScroll.touches.touchstart.y < swipeScroll.touches.touchmove.y) {
                                                if (index > 0) {
                                                    index--;
                                                }
                                                animateScroll(index);
                                            } else {
                                                if (index < heights.length - 1) {
                                                    index++;
                                                }
                                                animateScroll(index);
                                            }
                                        }
                                        swipeScroll.touches.touchstart.y = -1;
                                    }
                                }
                            default:
                                break;
                        }
                    }
                }
            },
            init: function () {
                if (document.addEventListener) {
                    document.addEventListener('touchstart', swipeScroll.touchHandler, false);
                    document.addEventListener('touchmove', swipeScroll.touchHandler, false);
                    document.addEventListener('touchend', swipeScroll.touchHandler, false);
                }
            }
        };
        if (typeof options === 'string') {
            var z = names.length;
            for (; z >= 0; z--) {
                if (typeof arguments[1] === 'string') {
                    if (names[z] == arguments[1]) {
                        index = z;
                        animateScroll(z);
                    }
                } else {
                    if (z === arguments[1]) {
                        index = z;
                        animateScroll(z);
                    }
                }


            }
        } else {
            settings = $.extend(settings, options);

            calculatePositions(false);


            if (hasLocation === false && settings.sectionName) {
                window.location.hash = names[0];
            } else {
                animateScroll(index);
            }

            manualScroll.init();
            swipeScroll.init();
        }

        $(window).resize(function () {
            clearTimeout(timeoutId2);
            timeoutId2 = setTimeout(function () {
                calculatePositions(true);
            }, 50);
        });

        function calculatePositions(resize) {
            $(settings.section).each(function (i) {
                if (i > 0) {
                    heights[i] = $(this).offset().top + settings.offset;
                } else {
                    heights[i] = $(this).offset().top;
                }
                if (settings.sectionName && $(this).data(settings.sectionName)) {
                    names[i] = "#" + $(this).data(settings.sectionName).replace(/ /g, "-");
                } else {
                    names[i] = "#" + (i + 1);
                }


                elements[i] = $(this);

                if (window.location.hash === names[i]) {
                    index = i;
                    hasLocation = true;

                }
            });

            if (true === resize) {
                animateScroll(index);
            }


        }
    };

}));
; (function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else if (typeof exports === 'object') {
        module.exports = factory(require("jquery"));
    }
    else {
        factory(jQuery);
    }
}
(function ($) {
    "use strict";

    var pluginName = "tinyscrollbar"
    , defaults = {
        axis: 'y'
        , wheel: true
        , wheelSpeed: 40
        , wheelLock: true
        , touchLock: true
        , trackSize: false
        , thumbSize: false
        , thumbSizeMin: 20
    }
    ;

    function Plugin($container, options) {
        /**
         * The options of the carousel extend with the defaults.
         *
         * @property options
         * @type Object
         */
        this.options = $.extend({}, defaults, options);

        /**
         * @property _defaults
         * @type Object
         * @private
         * @default defaults
         */
        this._defaults = defaults;

        /**
         * @property _name
         * @type String
         * @private
         * @final
         * @default 'tinyscrollbar'
         */
        this._name = pluginName;

        var self = this
        , $viewport = $container.find(".viewport")
        , $overview = $container.find(".overview")
        , $scrollbar = $container.find(".scrollbar")
        , $track = $scrollbar.find(".track")
        , $thumb = $scrollbar.find(".thumb")

        , hasTouchEvents = ("ontouchstart" in document.documentElement)
        , wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
                         document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                         "DOMMouseScroll" // let's assume that remaining browsers are older Firefox
        , isHorizontal = this.options.axis === 'x'
        , sizeLabel = isHorizontal ? "width" : "height"
        , posiLabel = isHorizontal ? "left" : "top"

        , mousePosition = 0
        ;

        /**
         * The position of the content relative to the viewport.
         *
         * @property contentPosition
         * @type Number
         */
        this.contentPosition = 0;

        /**
         * The height or width of the viewport.
         *
         * @property viewportSize
         * @type Number
         */
        this.viewportSize = 0;

        /**
         * The height or width of the content.
         *
         * @property contentSize
         * @type Number
         */
        this.contentSize = 0;

        /**
         * The ratio of the content size relative to the viewport size.
         *
         * @property contentRatio
         * @type Number
         */
        this.contentRatio = 0;

        /**
         * The height or width of the content.
         *
         * @property trackSize
         * @type Number
         */
        this.trackSize = 0;

        /**
         * The size of the track relative to the size of the content.
         *
         * @property trackRatio
         * @type Number
         */
        this.trackRatio = 0;

        /**
         * The height or width of the thumb.
         *
         * @property thumbSize
         * @type Number
         */
        this.thumbSize = 0;

        /**
         * The position of the thumb relative to the track.
         *
         * @property thumbPosition
         * @type Number
         */
        this.thumbPosition = 0;

        /**
         * Will be true if there is content to scroll.
         *
         * @property hasContentToSroll
         * @type Boolean
         */
        this.hasContentToSroll = false;

        /**
         * @method _initialize
         * @private
         */
        function _initialize() {
            self.update();
            _setEvents();
            return self;
        }
        window.onload = function () {
            self.update();
        }
        /**
         * You can use the update method to adjust the scrollbar to new content or to move the scrollbar to a certain point.
         *
         * @method update
         * @chainable
         * @param {Number|String} [scrollTo] Number in pixels or the values "relative" or "bottom". If you dont specify a parameter it will default to top
         */
        this.update = function (scrollTo) {
            var sizeLabelCap = sizeLabel.charAt(0).toUpperCase() + sizeLabel.slice(1).toLowerCase();
            this.viewportSize = $viewport[0]['offset' + sizeLabelCap];
            this.contentSize = $overview[0]['scroll' + sizeLabelCap];
            this.contentRatio = this.viewportSize / this.contentSize;
            this.trackSize = this.options.trackSize || this.viewportSize;
            this.thumbSize = Math.min(this.trackSize, Math.max(this.options.thumbSizeMin, (this.options.thumbSize || (this.trackSize * this.contentRatio))));
            this.trackRatio = (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize);
            this.hasContentToSroll = this.contentRatio < 1;

            $scrollbar.toggleClass("disable", !this.hasContentToSroll);

            switch (scrollTo) {
                case "bottom":
                    this.contentPosition = Math.max(this.contentSize - this.viewportSize, 0);
                    break;

                case "relative":
                    this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
                    break;

                default:
                    this.contentPosition = parseInt(scrollTo, 10) || 0;
            }

            this.thumbPosition = this.contentPosition / this.trackRatio;

            _setCss();

            return self;
        };
        /**
         * @method _setCss
         * @private
         */
        function _setCss() {
            $thumb.css(posiLabel, self.thumbPosition);
            $overview.css(posiLabel, -self.contentPosition);
            $scrollbar.css(sizeLabel, self.trackSize);
            $track.css(sizeLabel, self.trackSize);
            $thumb.css(sizeLabel, self.thumbSize);
        }

        /**
         * @method _setEvents
         * @private
         */
        function _setEvents() {
            if (hasTouchEvents) {
                $viewport[0].ontouchstart = function (event) {
                    if (1 === event.touches.length) {
                        event.stopPropagation();

                        _start(event.touches[0]);
                    }
                };
            }
            else {
                $thumb.bind("mousedown", function (event) {
                    event.stopPropagation();
                    _start(event);
                });
                $track.bind("mousedown", function (event) {
                    _start(event, true);
                });
            }

            $(window).resize(function () {
                self.update("relative");
                console.log(self);
            });

            if (self.options.wheel && window.addEventListener) {
                $container[0].addEventListener(wheelEvent, _wheel, false);
            }
            else if (self.options.wheel) {
                $container[0].onmousewheel = _wheel;
            }
        }

        /**
         * @method _isAtBegin
         * @private
         */
        function _isAtBegin() {
            return self.contentPosition > 0;
        }

        /**
         * @method _isAtEnd
         * @private
         */
        function _isAtEnd() {
            return self.contentPosition <= (self.contentSize - self.viewportSize) - 5;
        }

        /**
         * @method _start
         * @private
         */
        function _start(event, gotoMouse) {
            if (self.hasContentToSroll) {
                $("body").addClass("noSelect");

                mousePosition = gotoMouse ? $thumb.offset()[posiLabel] : (isHorizontal ? event.pageX : event.pageY);

                if (hasTouchEvents) {
                    document.ontouchmove = function (event) {
                        if (self.options.touchLock || _isAtBegin() && _isAtEnd()) {
                            event.preventDefault();
                        }
                        _drag(event.touches[0]);
                    };
                    document.ontouchend = _end;
                }
                else {
                    $(document).bind("mousemove", _drag);
                    $(document).bind("mouseup", _end);
                    $thumb.bind("mouseup", _end);
                    $track.bind("mouseup", _end);
                }

                _drag(event);
            }
        }

        /**
         * @method _wheel
         * @private
         */
        function _wheel(event) {
            if (self.hasContentToSroll) {
                // Trying to make sense of all the different wheel event implementations..
                //
                var evntObj = event || window.event
                , wheelDelta = -(evntObj.deltaY || evntObj.detail || (-1 / 3 * evntObj.wheelDelta)) / 40
                , multiply = (evntObj.deltaMode === 1) ? self.options.wheelSpeed : 1
                ;

                self.contentPosition -= wheelDelta * multiply * self.options.wheelSpeed;
                self.contentPosition = Math.min((self.contentSize - self.viewportSize), Math.max(0, self.contentPosition));
                self.thumbPosition = self.contentPosition / self.trackRatio;

                /**
                 * The move event will trigger when the carousel slides to a new slide.
                 *
                 * @event move
                 */
                $container.trigger("move");

                $thumb.css(posiLabel, self.thumbPosition);
                $overview.css(posiLabel, -self.contentPosition);

                if (self.options.wheelLock || _isAtBegin() && _isAtEnd()) {
                    evntObj = $.event.fix(evntObj);
                    evntObj.preventDefault();
                }
            }
        }

        /**
         * @method _drag
         * @private
         */
        function _drag(event) {
            if (self.hasContentToSroll) {
                var mousePositionNew = isHorizontal ? event.pageX : event.pageY
                , thumbPositionDelta = hasTouchEvents ? (mousePosition - mousePositionNew) : (mousePositionNew - mousePosition)
                , thumbPositionNew = Math.min((self.trackSize - self.thumbSize), Math.max(0, self.thumbPosition + thumbPositionDelta))
                ;

                self.contentPosition = thumbPositionNew * self.trackRatio;

                $container.trigger("move");

                $thumb.css(posiLabel, thumbPositionNew);
                $overview.css(posiLabel, -self.contentPosition);
            }
        }

        /**
         * @method _end
         * @private
         */
        function _end() {
            self.thumbPosition = parseInt($thumb.css(posiLabel), 10) || 0;

            $("body").removeClass("noSelect");
            $(document).unbind("mousemove", _drag);
            $(document).unbind("mouseup", _end);
            $thumb.unbind("mouseup", _end);
            $track.unbind("mouseup", _end);
            document.ontouchmove = document.ontouchend = null;
        }

        return _initialize();
    }

    /**
    * @class tinyscrollbar
    * @constructor
    * @param {Object} options
        @param {String} [options.axis='y'] Vertical or horizontal scroller? ( x || y ).
        @param {Boolean} [options.wheel=true] Enable or disable the mousewheel.
        @param {Boolean} [options.wheelSpeed=40] How many pixels must the mouswheel scroll at a time.
        @param {Boolean} [options.wheelLock=true] Lock default window wheel scrolling when there is no more content to scroll.
        @param {Number} [options.touchLock=true] Lock default window touch scrolling when there is no more content to scroll.
        @param {Boolean|Number} [options.trackSize=false] Set the size of the scrollbar to auto(false) or a fixed number.
        @param {Boolean|Number} [options.thumbSize=false] Set the size of the thumb to auto(false) or a fixed number
        @param {Boolean} [options.thumbSizeMin=20] Minimum thumb size.
    */
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin($(this), options));
            }
        });
    };

    $(function () {
        $('[data-widget="' + pluginName + '"]').each(function () {
            var config = $(this).data("config");
            $(this)
                .wrapInner('<div class="overview" />')
                .wrapInner('<div class="viewport" />')
                .prepend('<div class="scrollbar"><div class="track"><div class="thumb"></div></div></div>')
                .tinyscrollbar(config);
        });
    });
}));