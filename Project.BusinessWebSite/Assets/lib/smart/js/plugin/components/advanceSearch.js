(function($){
//扩展方法到jQuery
	$.fn.extend({
		//插件名字
	    advanceSearch: function (options) {
			//设置默认配置
			var defaults={
				//省份下拉框id
			    form_selector: "#frmSearch",
			    modal_selector: '#advanceSearchModal',
			    btnDo_selector: '[func=btnDo]',
                items:[]
			}
			_ = this;
			//合并用户配置
			var options=$.extend(defaults,options);

			return this.each(function(){
				var o=options;
				var obj=$(this);
				//初始化选择器
				load_form($(o.form_selector), $(o.modal_selector), _, o.items, o.btnDo_selector);
				
				/**
				 * [load_select 选项变更加载下级选项] 
				 * @param  {[type]}  el_id          [当前下来列表的 id]
				 * @param  {[type]}  parent_code    [父节点编号]
				 * @param  {[type]}  option_name    [第一项名称]
				 * @param  {Boolean} is_bind_change [是否绑定变更事件]
				 * param  {Boolean} selected_code [选中项]
				 * @return {[type]}                 [description]
				 */

				function load_form(searchform, itemsModal, pillBox, items, btnDo_selector) {
				    var btnDo = $(btnDo_selector, itemsModal);
				    if (!pillBox.hasClass('pillbox')) pillBox.addClass('pillbox');
				    if (pillBox.find('ul').length == 0) pillBox.append('ul');
				    var html = [];
				    for(var i in items)
				    {
				        var item = items[i];
				        if (!item) continue;
				        html.push('<li func="as_item" class="label ' + item.className + '" data-key="' + item.key + '" data-value="' + item.value + '">' + item.text + '</li>');
				        //自动赋值
				        var key = item.key;
				        var value = item.value;
				        var formField = itemsModal.find("[name='" + key + "']");
				        if ($.type(formField[0]) != "undefined") {
				            var fieldTagName = formField[0].tagName.toLowerCase();
				            if (fieldTagName == "input") {
				                if (formField.attr("type") == "radio") {
				                    $("input:radio[name='" + key + "'][value='" + value + "']").attr("checked", "checked");
				                } else {
				                    formField.val(value);
				                }
				            } else if (fieldTagName == "select") { 
				                formField.val(value);
				            } else if (fieldTagName == "textarea") {
				                formField.val(value);
				            } else {
				                formField.val(value);
				            }
				        }
				    }
				    pillBox.find('ul').prepend(html.join(''));

				    pillBox.on('click', '[func=as_item]', function () {
				        $(this).remove();
				        pillBox.find('ul>li').each(function () {
				            var key = $(this).data('key');
				            var value = $(this).data('value');
				            var input = $('input[name=' + key + ']', searchform);
				            if (input.length == 0) {
				                searchform.append('<input type="hidden" name="' + key + '" value="' + value + '" />');
				            } else {
				                input.val(value);
				            }
				        });
				        searchform.trigger('submit');
				    });

				    $('input', pillBox).click(function () {

				        itemsModal.modal('show').css({
				            width: 'auto',
				            'margin-left': function () {
				                return -(($(document).width() - 600) / 2);
				            }
				        });
				        itemsModal.find(".datepicker").change();
				    });
				    btnDo.click(function () {
				        var array = $('.modal-body', itemsModal).serializeArray();
				        if (array && array.length > 0)
				        {
				            for(var i in array)
				            {
				                if (!array[i]) continue;
				                var key = array[i].name;
				                var value = array[i].value;
				                var input = $('input[name=' + key + ']', searchform);
				                if (input.length == 0) {
				                    searchform.append('<input type="hidden" name="' + key + '" value="' + value + '" />');
				                } else {
				                    input.val(value);
				                }
				            }
				        }
		 
				        searchform.trigger('submit');
				    });

				}


			});	
		}
	});
})(jQuery);