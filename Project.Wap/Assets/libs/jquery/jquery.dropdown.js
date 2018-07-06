
/**
 * @file:   jQuery Dropdown 插件
 * @authors Kevin Chen (chj@8cuo.net)
 * @date    2015-07-13 13:22:37
 * @param   {string} trigger [hover,toggle]
 *			dropdown的触发事件，
 *			hover: 鼠标移入移出时触发
 *			toggle: 点击是触发
 *
 *			{string} dropDom 下来显示的Dom，class:".class" or id: "#id"
 *
 *			{number} delay: 延迟事件 单位 ms (毫秒)
 *
 *			{string} actClass: 激活样式名
 *
 *			{string} animate:  显示方式，[fade,normal]
 *
 *			{function} callback:  回调函数
 *
 * @demo    <div data-widget="dropdown" data-config='{"dropDom":".dropBox"}'>
 *				<div class="dropBox"></div>
 *			</div>
 */
;(function ( $, window, document, undefined ) {
	'use strict';
	var pluginName = 'dropdown',
		defaults = {
			trigger: 'hover', 
			dropDom:'',
			actClass:'active',
			delay:100,
			animate:'fade',
			callback:null
	};

	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {
			var  trigger = this.settings.trigger,
				actClass = this.settings.actClass,
				   delay = this.settings.delay,
				    that = this,
				    $dropDom,onTimer,offTime;
			this.settings.dropDom ? 
				$dropDom = $(this.element).find(this.settings.dropDom) :
				$dropDom = $(this.element).find('[data-role="dropBox"]');

			if(!$dropDom)
				return false;

			if(trigger==='toggle'){
				$(this.element).on('click',function(event){
					event.preventDefault();
					if($dropDom.is(':hidden')){
						$(this).addClass(actClass);
						that.showDrop($dropDom);
					}else{
						$(this).addClass(actClass);
						that.hideDrop($dropDom);
					};
				});
			}else{
				$(this.element).on('mouseover mouseout',function(event){
					if(event.type === 'mouseover'){
						clearTimeout(offTime);
						var overEvent = function(){
							$(this).addClass(actClass);
							that.showDrop($dropDom)
						}
						
						onTimer = setTimeout(overEvent,delay);
					}else{
						var act = document.activeElement.id;
						if(act == "tRow" ){
						$("#tRow").focusout(function(){
							clearTimeout(onTimer);
							var outEvent = function(){
							$(this).addClass(actClass);
							that.hideDrop($dropDom);
						}
						offTime = setTimeout(outEvent,delay)
							});
					}else{
							clearTimeout(onTimer);
							var outEvent = function(){
							$(this).addClass(actClass);
							that.hideDrop($dropDom);
						}
						offTime = setTimeout(outEvent,delay)
						}				
					}
				});
			};
		},
		showDrop: function(element){
			var callback;
			if(typeof(this.settings.callback)==='function'){
				callback = this.settings.callback
			}else if(typeof(this.settings.callback)==='string'){
				callback = function(){};
			}else{
				callback = eval(this.settings.callback);
			}

			if(this.settings.animate==='fade'){
				element.stop(true).fadeIn(callback);
			}else{
				element.stop(true).show(callback);
			}
			
		},
		hideDrop: function(element){
			if(this.settings.animate==='fade'){
				element.stop(true).fadeOut();
			}else{
				element.stop(true).hide();
			}
		}
	});

	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, 'plugin_' + pluginName ) ) {
					$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
			}
		});
	};

	$(function(){
		$('[data-widget="'+pluginName+'"]').each(function(){
			var config = $(this).data("config");
			$(this).dropdown(config);
		});
	});

})( jQuery, window, document );