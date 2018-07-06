/*
* JS配置
*/
var _conf = {
    defaultSP: '1.0.0.0',
    isLogin: false,
    siteId: 'inkivywap',
    host: 'http://m.inkivy.com',
    ssoHost: 'http://passport.inkivy.com', //网关地址
    ssoGateway: '/Home/_Login', //登录网关
    ssoApi: 'http://passport.inkivy.com/home/SSOApi', //网关登录状态验证地址
    ssoLocalExpires: 30,
    tag: 'inkivywap',
    container: $(document)
};

$(function () {
    $sync.init({
        host: 'http://api.inkivy.com'
    });
});