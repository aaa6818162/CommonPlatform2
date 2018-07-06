(function($){
//扩展方法到jQuery
	$.fn.extend({
		//插件名字
		regionSelection:function (options) {
			//设置默认配置
			var defaults={
				//省份下拉框id
				el_prov_id:"sl_prov",
				//城市下拉框选择器
				el_city_id:"sl_city",
				//区域下拉框选择器
				el_county_id:"sl_county",
				//下拉框样式类名
				class_name:"",
				//数据请求链接
				data_request_url:"",
				//选中的省份
				prov_code:'',
				//选中的城市
				city_code:'',
				//选中的地区
				county_code:''
			}

			//合并用户配置
			var options=$.extend(defaults,options);

			return this.each(function(){
				var o=options;
				var obj=$(this);
				//初始化选择器
				init(o.prov_code,o.city_code,o.county_code);
				
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
						$.post(o.data_request_url,{parent_id:parent_code},function(data){
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
									if(selected_code==item.AreaCode)
									{
										opt=$("<option  value='"+item.AreaCode+"' selected='selected'>"+item.AreaName+"</option>");
									}
									else
									{
									 opt=$("<option  value='"+item.AreaCode+"'>"+item.AreaName+"</option>");
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
								
									if(el_id==o.el_prov_id)
									{
										//移除城市选择下拉列表
										$('#'+o.el_city_id).remove();
										$('#'+o.el_county_id).remove();
										if(parent_code!='')
										{
											load_select(o.el_city_id,parent_code,'选择城市',true,'');
										}
								
									}
									else if(el_id==o.el_city_id)
									{
										$('#'+o.el_county_id).remove();
										if(parent_code!='')
										{
											load_select(o.el_county_id,parent_code,'选择区域',false,'');
										}
									}
							});

						}
						obj.append(sl_item);
				}

				/**
				 * [init description] 编辑页数据初始化
				 * @param  {[type]} prov_code   [省份编号]
				 * @param  {[type]} city_code   [城市编号]
				 * @param  {[type]} county_code [区域编号]
				 * @return {[type]}             [description]
				 */
				function init(prov_code,city_code,county_code){
					//初始化加载省份下拉框
						if(o.data_request_url!=''&&o.data_request_url!=null)
						{
							//清空历史数据
							obj.find("select").remove();
							//加载已选中的省,市,县
							if(prov_code!=''&&city_code!=''&&county_code!='')
							{
								load_select(o.el_prov_id,'','选择省份',true,prov_code);
								load_select(o.el_city_id,prov_code,'选择城市',true,city_code);
								load_select(o.el_county_id,city_code,'选择地区',false,county_code);
							}
							else if(prov_code!=''&&city_code!='')
							{
								load_select(o.el_prov_id,'','选择省份',true,prov_code);
								load_select(o.el_city_id,prov_code,'选择城市',true,city_code);
								load_select(o.el_county_id,city_code,'选择地区',false,'');
							}
							else if(prov_code!='')
							{
								load_select(o.el_prov_id,'','选择省份',true,prov_code);
								load_select(o.el_city_id,prov_code,'选择城市',true,'');
								
							}
							else
							{
									load_select(o.el_prov_id,'','选择省份',true,'');		
							}
						}
				}
			});	
		}
	});
})(jQuery);