(function($){
//扩展方法到jQuery
	$.fn.extend({
		//插件名字
	    catalogSelection: function (options) {
			//设置默认配置
			var defaults={
				//省份下拉框id
			    cs_first_id: "cs_first",
				//城市下拉框选择器
			    cs_second_id: "cs_second",
				//区域下拉框选择器
			    cs_third_id: "cs_third",
				//下拉框样式类名
				class_name:"",
				//数据请求链接
				data_request_url:"",
				//选中的省份
				first_code:'',
				//选中的城市
				second_code:'',
				//选中的地区
				third_code:''
			}

			//合并用户配置
			var options=$.extend(defaults,options);

			return this.each(function(){
				var o=options;
				var obj=$(this);
				//初始化选择器
				init(o.first_code, o.second_code, o.third_code);
				
				/**
				 * [load_select 选项变更加载下级选项] 
				 * @param  {[type]}  el_id          [当前下来列表的 id]
				 * @param  {[type]}  parent_code    [父节点编号]
				 * @param  {[type]}  option_name    [第一项名称]
				 * @param  {Boolean} is_bind_change [是否绑定变更事件]
				 * param  {Boolean} selected_code [选中项]
				 * @return {[type]}                 [description]
				 */

				function load_select(el_id,parent_code,option_name,is_bind_change,selected_code){
					//默认参数设置
				    is_bind_change = is_bind_change || true;

					var sl_item=$("<select id='"+el_id+"' name='"+el_id+"' class='"+o.class_name+"'></select>");
						var op1=$("<option  value=''>"+option_name+"</option>");
						sl_item.append(op1);
						//请求数据
						$.post(o.data_request_url, { pid: parent_code }, function (data) {
						if(data&&!data.IsError)
						{
							var datas=data.Data;

							if(datas.length>0)
							{
								//循环添加城市数据
								for(var i=0;i<datas.length;i++)
								{
									var item=datas[i];
									var opt='';
									if (selected_code == item.ID)
									{
									    opt = $("<option  value='" + item.ID + "' selected='selected'>" + item.Cat_Name + "</option>");
									}
									else
									{
									    opt = $("<option  value='" + item.ID + "'>" + item.Cat_Name + "</option>");
									}
									sl_item.append(opt);
								 	
								}
							
							}
						}
					});

						//绑定选择项变更事件
						if(is_bind_change===true)
						{
							sl_item.on('change',function(){
								var parent_code=$(this).val();
								
									if(el_id==o.cs_first_id)
									{
										//移除城市选择下拉列表
										$('#'+o.cs_second_id).remove();
										$('#'+o.cs_third_id).remove();
										if(parent_code!='')
										{
											load_select(o.cs_second_id,parent_code,'选择小类',true,'');
										}
								
									}
									else if(el_id==o.cs_second_id)
									{
										$('#'+o.cs_third_id).remove();
										if(parent_code!='')
										{
											load_select(o.cs_third_id,parent_code,'选择子类',false,'');
										}
									}
							});

						}
						obj.append(sl_item);
				}

				/**
				 * [init description] 编辑页数据初始化
				 * @param  {[type]} first_code   [省份编号]
				 * @param  {[type]} second_code   [城市编号]
				 * @param  {[type]} third_code [区域编号]
				 * @return {[type]}             [description]
				 */
				function init(first_code,second_code,third_code){
					//初始化加载分类下拉框
						if(o.data_request_url!=''&&o.data_request_url!=null)
						{
							//清空历史数据
							obj.find("select").remove();
						    //加载已选中的大类,子类,小类
							if(first_code!=''&&second_code!=''&&third_code!='')
							{
								load_select(o.cs_first_id,'','选择大类',true,first_code);
								load_select(o.cs_second_id, first_code, '选择小类', true, second_code);
								load_select(o.cs_third_id,second_code,'选择子类',false,third_code);
							}
							else if(first_code!=''&&second_code!='')
							{
							    load_select(o.cs_first_id, '', '选择大类', true, first_code);
							    load_select(o.cs_second_id, first_code, '选择小类', true, second_code);
							    load_select(o.cs_third_id, second_code, '选择子类', false, '');
							}
							else if(first_code!='')
							{
							    load_select(o.cs_first_id, '', '选择大类', true, first_code);
							    load_select(o.cs_second_id, first_code, '选择小类', true, '');
								
							}
							else
							{
							    load_select(o.cs_first_id, '', '选择大类', true, '');
							}
						}
				}
			});	
		}
	});
})(jQuery);