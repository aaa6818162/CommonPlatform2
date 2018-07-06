(function($) {
	var viewApi = mui('#app').view({
		defaultPage: '#setting'
	});
	var view = viewApi.view;
	//处理view的后退与webview后退
	var oldBack = $.back;
	$.back = function() {
		if(viewApi.canBack()) { //如果view可以后退，则执行view的后退
			viewApi.back();
		} else { //执行webview后退
			oldBack();
		}
	};
})(mui);
(function() {
	var scroll = mui('.mui-scroll-wrapper').scroll();
	 document.addEventListener('touchmove', function (e){
   		e.preventDefault();
	}, false);
	mui('.mui-collapse-content').on('tap','.mui-table-view-cell',function(){
		var url=$(this).attr('data-url');
		document.location.href=url;
	});

})();
