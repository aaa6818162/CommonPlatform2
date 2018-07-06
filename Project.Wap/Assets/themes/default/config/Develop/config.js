/*
* JS配置
*/
var _conf = {
    defaultSP: '1.0.0.0',
    isLogin: false,
    siteId: 'inkivywap',
    host: 'http://localhost:64991',
    ssoHost: 'http://127.0.0.1:9002', //网关地址
    ssoGateway: '/Home/_Login', //登录网关
    ssoApi: 'http://127.0.0.1:9002/home/SSOApi', //网关登录状态验证地址
    ssoLocalExpires: 30,
    tag: 'inkivywap',
    container: $(document)
};

$(function () {
    $sync.init({
        host: 'http://127.0.0.1:9001'
    });
});