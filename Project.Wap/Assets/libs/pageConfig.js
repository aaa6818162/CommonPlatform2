/**
 * @file    js 配置文件
 * @authors Kevin Chen (chj@8cuo.net)
 * @date    2015-07-08 13:22:37
 */

var _feDev = false; //是否为前端开发模式

function debug(v){
	if(window.console && _feDev){
//		console.log(v);
	}
};
// 测试数据地址
var _pathData;
_feDev ? _pathData = 'http://192.168.15.147:4000'
	   : _pathData = '';

//Ajax 搜索路径
var _pathSearch,  // 搜索页路径
	_pathSugKeys, // 建议搜索关键字ajax地址
	_pathCartInfo, // 顶部购物车信息
	_pathCartList, // 购物车列表信息
	_pathCartGifts, //赠品选择信息
	_pathRemoveCart, //删除购物车商品
	_pathChangeQuantity, //修改购物车商品数量
	_pathShippingAddress, //收获地址
	_pathSetDefaultAddress, //设置默认地址
	_pathGetAddressById,  //修改收获地址
	_pathSaveAddress,
	_pathProvince,		//地区联动
	_pathCity,
	_pathCountry,
	_pathLogout,  // 退出登录
	_pathIndex,   // 首页
	_pathCollect, // 收藏
	_pathTmpl;  // 静态模板路径

_feDev ? _pathTmpl = '/static/tmpl/'
	   : _pathTmpl = '/static/tmpl/';

_feDev ? _pathSearch = 'search.html?'
	   : _pathSearch = '/product-search/';

_feDev ? _pathSugKeys = '/data/searchSug.json'
	   : _pathSugKeys = '/product-search/';

_feDev ? _pathCartInfo = '/data/CartInfo.json'
	   : _pathCartInfo = '/Shopping/GetCartInfo';

_feDev ? _pathLogout = '/data/status.json'
	   : _pathLogout = '/Account/Logout';

_feDev ? _pathIndex = '/'
	   : _pathIndex = '/home/index';

_feDev ? _pathCollect = '/data/state.json'
	   : _pathCollect = '/CustomerCollect/CollectProductForProductDetail';

_feDev ? _pathCartList = '/data/GetCartList.json'
	   : _pathCartList = '/Shopping/GetCart';

_feDev ? _pathRemoveCart = '/data/status.json'
	   : _pathRemoveCart = '/Shopping/RemoveCart';

_feDev ? _pathChangeQuantity = '/data/status.json'
	   : _pathChangeQuantity = '/Shopping/ChangeQuantity';

_feDev ? _pathCartGifts = '/data/getGifts.json'
	   : _pathCartGifts = '/data/getGifts.json'; 

_feDev ? _pathShippingAddress = '/data/GetAddressList.json'
	   : _pathShippingAddress = '/Customer/GetAddressList';

// _feDev ? _pathProvince = '/data/GetProvince.json'
// 	   : _pathProvince = '/Customer/GetProvince'; 
 _pathProvince = _pathData+'/Customer/GetProvince'; 
// _feDev ? _pathCity = '/data/GetCity.json'
// 	   : _pathCity = '/Customer/GetCity'; 
_pathCity = _pathData+'/Customer/GetCity'; 
// _feDev ? _pathCountry = '/data/GetCountry.json'
// 	   : _pathCountry = '/Customer/GetCountry'; 
_pathCountry = _pathData+'/Customer/GetCountry'; 


_feDev ? _pathSetDefaultAddress = _pathData+'/Customer/SetDefaultAddress'
	   : _pathSetDefaultAddress = '/Customer/SetDefaultAddress';

_feDev ? _pathGetAddressById = _pathData+'/Customer/GetAddressById'
	   : _pathGetAddressById = '/Customer/GetAddressById'; 


_feDev ? _pathSaveAddress = _pathData+'/Customer/SaveAddress'
	   : _pathSaveAddress = '/Customer/SaveAddress';
