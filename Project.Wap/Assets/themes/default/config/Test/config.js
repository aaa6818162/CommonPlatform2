﻿/*
* JS配置
*/
var _conf = {
    defaultSP: '1.0.0.0',
    isLogin: false,
    siteId: 'inkivywap',
    host: 'http://192.168.85.138:18822/',
    ssoHost: 'http://192.168.85.138:19001', //网关地址
    ssoGateway: '/Home/_Login', //登录网关
    ssoApi: 'http://192.168.85.138:19001/home/SSOApi', //网关登录状态验证地址
    ssoLocalExpires: 30,
    tag: 'inkivywap',
    container: $(document)
};

$(function () {
    $sync.init({
        host: 'http://192.168.85.138:19002'
    });
});