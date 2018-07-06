(function($){
	$.fn.extend({
		commonSelector:function(options){
			//设置默认配置
				var defaults = {  
				title:"请选择",
				//表格名称
                modelId:"defaultModel",
                //表格样式
                tableClass: "table table-striped b-t text-small",
                //表格头部字段描述
                tableTh:[],
                //表格数据区域对应字段,如果需要格式化以 {fieldName:字段名,render:function(val){ 格式化方法}} 形式书写
                tableTd:[],
                //是否显示选择框
                isShowCheckbox:true,
                //是否开启搜索
                isOpenSearch:false,
                //数据请求地址
                dataUrl:"",
                //提交参数
                formData:{},
                //确定按钮执行事件
                okCallback:null,
                //取消按钮回调事件
                cancleCallback:null,
                //true为多选,false 为单选
                multiSelect:true
            }  
            //扩展用户配置参数
            var options =  $.extend(defaults, options);  
           
			return this.each(function(){
				var o=options;
				var obj = $(this);
			    //返回的数据集合
				var returnDatas = [];
				//清空历史数据
				obj.html("");

				//加入bootstrap 模态窗口
				var modelTem='';
				modelTem+='<div id="'+o.modelId+'" class="modal fade" role="dialog" aria-labelledby="modalLabel">';
                modelTem+='<div class="modal-dialog">';
                modelTem+='<div class="modal-content">';
            	modelTem+='<div class="modal-header">';
            	modelTem+=    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
           		modelTem+=     '<h4 class="modal-title" id="myModalLabel">'+o.title+'</h4>';
            	modelTem+='</div>';
            	modelTem+='<div class="modal-body" id="div_'+o.modelId+'"> ' ;
            	modelTem+='<div class="row">';
            	modelTem+='<div class="col-md-12">';
            	modelTem+='<section class="panel">';

            	if(o.isOpenSearch)
            	{
            		/*搜索区域 start*/
	            	modelTem+='<div class="col-md-4">';
	            	modelTem+='<div class="input-group" style="margin-bottom:10px;">';
	                modelTem+='<input type="text" name="kw_'+o.modelId+'" class="form-control" placeholder="请输入搜索关键词" />';
	                modelTem+='<span class="input-group-btn">';
	                modelTem+=' <button name="search_'+o.modelId+'" class="btn btn-default" type="button">Go!</button>';
	                modelTem+='</span>';
	                modelTem+='</div>';
	                modelTem+='</div>';
	                /*搜索区域 end*/
            	}
               
				/*表格数据区域 start*/
                modelTem+='<div class="pull-out" name="table_section">';
                modelTem+='</div>';
                /*表格数据区域 end*/
     			modelTem+='</section>';
                modelTem+='</div>';
                modelTem+='</div>';
             
            	modelTem+='</div>';
            	modelTem+='<div class="modal-footer">';
              	modelTem+=  '<button type="button"  id="btnCancel" class="btn btn-default" data-dismiss="modal">关闭</button>';
               	modelTem+= '<button type="button" id="btnOK" class="btn btn-primary">选好了</button>';
            	modelTem+='</div>';
        		modelTem+='</div>';
    			modelTem+='</div>';
				modelTem+='</div>';

				var tempObj=$(modelTem);
				if(o.isOpenSearch)
				{
					//绑定搜索事件
					tempObj.find("button[name=search_"+o.modelId+"]").on('click',function(){
						search();
					});
					//绑定回车事件查询
					tempObj.find("input[name=kw_"+o.modelId+"]").on('keyup',function(e) {
						if(e.keyCode===13)
						{
							search();
						}
					});
					
				}

				//查询方法
				function search()
				{
						//获取关键词
						var kw=tempObj.find("input[name=kw_"+o.modelId+"]").val();
						var trs=tempObj.find('div[name=table_section] table tbody tr');
						//清空原始选择
						var cks=tempObj.find('input[type=checkbox]:checked');
						cks.attr("checked",false);
						//初始化显示所有数据
						trs.show();

						if(kw!='')
						{
							if(trs&&trs.length>0)
							{
								trs.each(function(index, el) {
									var trText=$(el).text();
									if(trText.indexOf(kw)==-1)
									{
										$(el).hide();
									}
								});
							}

						}
				}
				
					//绑定"确定"按钮事件
				tempObj.find("#btnOK").on('click',function(){

					if(typeof o.okCallback==="function")
					{
                        //返回的数据对象
					    var datas = [];
					    var ckIds = '';
					    var ckArray = [];
						//拼接选中项
						var cks =null;
						if(o.multiSelect)
						{
						 cks=tempObj.find('input[type=checkbox]:checked');
						}
						else
						{
							cks=tempObj.find('input[type=radio]:checked');
						}

						if(cks)
						{
							cks.each(function(index,ck){
								if(ckIds!=='')
								{
									ckIds+=',';
								}
								ckIds += $(ck).val();
								ckArray.push($(ck).val());
							});
						}

						var returnResult = { Ids: ckIds };
					
						for (var i = 0; i < returnDatas.length; i++)
						{
						    for (var j = 0; j < ckArray.length; j++)
						    {
						        if (returnDatas[i]['ID'] == ckArray[j])
						        {
						            datas.push(returnDatas[i]);
						        }
						    }

						}
						//隐藏当前模态窗口
						tempObj.hide();
						//返回选中的ids
						o.okCallback(returnResult,datas);
					}

				});

				//绑定"取消"按钮事件
				tempObj.find("#btnCancle").on('click',function(){
					if(typeof o.cancleCallback==="function")
					{
						o.cancleCallback();
					}
				});
			

				//渲染数据部分
	            var cols=Math.min.apply(null,[o.tableTh.length,o.tableTd.length]);
	            	
				if(o.tableTh.length&&o.tableTh.length==0)
	            {
	            	cols=0;
	            }
	            
	            var tableData=$('<table  class="'+o.tableClass+'"></table>');
	             if(cols&&cols==0)
	             {  
			             var trNoData=$('<tr><td>未获取到数据</td></tr>');
			             tableData.append(trNoData);
	        	}
	        	else
	        	{
	        		/*生成表格头部 strat*/
	        		var thead=$("<thead></thead>");
	        		var th_tr=$("<tr></tr>");
	        	
	        		for(var i=0;i<cols;i++)
	        		{
	        			if(o.isShowCheckbox&&i==0)
	        			{
	        				var th_td1=$("<th></th>");
	        				th_tr.append(th_td1);
	        			}
	        			
	        			var th_td=$('<th>'+o.tableTh[i]+'</th>');
	        			th_tr.append(th_td);
	        			
	        		}
	        		thead.append(th_tr);
	        		tableData.append(thead);
	        		/*生成表格头部 end*/

	        		/*生成表格体(数据渲染部分) strat*/
	        		if(o.dataUrl&&o.dataUrl!='')
	        		{

	        			$.post(o.dataUrl,o.formData,function(data){
	        				if(data&&!data.IsError)
	        				{
	        					var item_data=data.Data;
	        					
	        					//渲染数据
	        					var tbody=$("<tbody></tbody>");
	        					if(item_data.length>0)
	        					{
	        					   
	        					for(var k=0;k<item_data.length;k++)
	        					{
	        					    var curData = {};
	        						var tr=$("<tr></tr>");
	        					
		        					for(var j=0;j<cols;j++)
					        		{
					        			if(o.isShowCheckbox&&j==0)
					        			{
					        				var tbody_select=null;
					        				if(o.multiSelect)
					        				{
					        				 	tbody_select=$("<td><input type='checkbox' name='id' value='"+item_data[k].ID+"'/></td>");
					        				}
					        				else
					        				{
					        					tbody_select=$("<td><input type='radio' name='id' value='"+item_data[k].ID+"'/></td>");
					        				}
					        				tr.append(tbody_select);
					        			}

					        			var filedName='';
					        			var filedValue='';
					        			
					        			if(typeof o.tableTd[j]==="string")
					        			{
					        				filedName=o.tableTd[j];
					        				filedValue = item_data[k][filedName] === null ? '' : item_data[k][filedName];
					        			}
					        			else if(typeof o.tableTd[j]==="object"&&o.tableTd[j]['fieldName']&&o.tableTd[j]['render']&&typeof o.tableTd[j]['render']==="function")
					        			{
					        				filedName=o.tableTd[j]['fieldName'];
					        				filedValue=o.tableTd[j]['render'](item_data[k][filedName]);
					        			}
					        			
					        			curData[filedName] = filedValue;

					        			var td=$('<td>'+filedValue+'</td>'); 
					        			tr.append(td);
					        		}
		        					tbody.append(tr);

		        					curData['ID'] = item_data[k].ID;
		        					returnDatas.push(curData);
	        					}
	        					
					        }else
					        {
					        	var colspan=cols;
					        	if(o.isShowCheckbox)
					        	{
					        		colspan+=1;
					        	}
					        	var noData=$('<tr><td colspan="'+colspan+'" class="text-center">没有可添加的数据了</td></tr>');
			             		tbody.append(noData);
					        }


					        	
					        	tableData.append(tbody);
	        				}
	        				else
	        				{
	        					alert("数据请求失败");
	        				}
	        			});
	        		}

	        		tempObj.find(".modal-body").find("div[name=table_section]").append(tableData);
	        		
	        		obj.append(tempObj);

	        		tableData.css('margin-bottom',0);
	        		if(o.isOpenSearch===false)
	        		{
	        			tableData.removeClass('b-t');
	        		}
	        		else
	        		{
	        			tableData.parent().css("margin-top","10px");
	        		}

	        		/*生成表格体(数据渲染部分) end*/
	        	}


			});
		}
	});
})(jQuery);