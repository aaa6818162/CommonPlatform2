using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Http.Tracing;
using WebAPISwaggerJWT.Helpers;

namespace WebAPISwaggerJWT.Filters
{
    /// <summary>
    /// 过滤日志
    /// </summary>
    public class LoggingFilterAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// 执行方法时触发
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            GlobalConfiguration.Configuration.Services.Replace(typeof(ITraceWriter), new NLogger());
            var trace = GlobalConfiguration.Configuration.Services.GetTraceWriter();
            trace.Info(filterContext.Request,
                        "Controller : " +
                        filterContext.ControllerContext.ControllerDescriptor.ControllerType.FullName +
                        Environment.NewLine + "Action : " + filterContext.ActionDescriptor.ActionName, "JSON",
                        filterContext.ActionArguments);
        }
    }
}