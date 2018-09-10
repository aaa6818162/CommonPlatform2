using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebAPISwaggerJWT.Filters;

namespace WebAPISwaggerJWT
{
    /// <summary>
    /// WebApi配置
    /// </summary>
    public static class WebApiConfig
    {
        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="config"></param>
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{area}/{controller}/{action}/{id}",//action表示按方法路由
            defaults: new { id = RouteParameter.Optional });

            //GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);
            config.Filters.Add(new LoggingFilterAttribute());
            config.Filters.Add(new GlobalExceptionAttribute());
        }
    }
}