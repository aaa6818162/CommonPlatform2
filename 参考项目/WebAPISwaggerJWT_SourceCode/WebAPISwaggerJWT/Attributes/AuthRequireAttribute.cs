using JWT;
using JWT.Serializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using WebAPISwaggerJWT.Areas.Auth.Helpers;
using WebAPISwaggerJWT.Exceptions;

namespace WebAPISwaggerJWT
{
    /// <summary>
    /// 授权请求过滤器
    /// </summary>
    public class AuthRequireAttribute : ActionFilterAttribute
    {
        internal const string Token = nameof(Token);

        /// <summary>
        /// 执行用户行为
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            bool isOkAuth = false;
            var message = "";
            if (filterContext.Request.Headers.Contains(Token))
            {
                var tokenValue = filterContext.Request.Headers.GetValues(Token).First();
                var result = AuthHelper.DecodeToken(tokenValue);
                isOkAuth = result.OK;
                message = result.Message;
            }
            else
            {
                isOkAuth = false;
                message = "Unauthorized";

            }
            if (!isOkAuth)
            {
                throw new UnauthorizedException((int)HttpStatusCode.Unauthorized, message);
                //filterContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                //filterContext.Response.ReasonPhrase = message;
            }
            base.OnActionExecuting(filterContext);
        }
    }
}