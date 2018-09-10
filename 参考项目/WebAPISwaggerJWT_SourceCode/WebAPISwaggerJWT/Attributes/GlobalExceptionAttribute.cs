using System;
using System.Web.Http.Filters;
using System.Web.Http;
using System.Web.Http.Tracing;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using System.Net;
using WebAPISwaggerJWT.Helpers;
using WebAPISwaggerJWT.Exceptions;

namespace WebAPISwaggerJWT
{
    /// <summary>
    /// 全局异常
    /// </summary>
    public class GlobalExceptionAttribute : ExceptionFilterAttribute
    {
        /// <summary>
        /// 异常时触发
        /// </summary>
        /// <param name="context"></param>
        public override void OnException(HttpActionExecutedContext context)
        {
            GlobalConfiguration.Configuration.Services.Replace(typeof(ITraceWriter), new NLogger());
            var trace = GlobalConfiguration.Configuration.Services.GetTraceWriter();
            trace.Error(context.Request, "Controller : " +
            context.ActionContext.ControllerContext.ControllerDescriptor.ControllerType.FullName +
            Environment.NewLine + "Action : " + context.ActionContext.ActionDescriptor.ActionName,
            context.Exception);
            var exceptionType = context.Exception.GetType();
            var formatter = new System.Net.Http.Formatting.JsonMediaTypeFormatter();
            if (exceptionType == typeof(ValidationException))
            {
                throw new HttpResponseException(context.Request.CreateResponse(HttpStatusCode.BadRequest, new ServiceStatus()
                {
                    Status = (int)HttpStatusCode.BadRequest,
                    Message = context.Exception.Message,
                    ReasonPhrase = "ValidationException"
                }));
            }
            else if (exceptionType == typeof(UnauthorizedAccessException) || exceptionType == typeof(UnauthorizedException))
            {
                throw new
                HttpResponseException(context.Request.CreateResponse(HttpStatusCode.Unauthorized, new ServiceStatus()
                {
                    Status = (int)HttpStatusCode.Unauthorized,
                    Message = "UnAuthorized",
                    ReasonPhrase = exceptionType.Name + " " + context.Exception.Message
                }));
            }
            else
            {
                throw new HttpResponseException(context.Request.CreateResponse(HttpStatusCode.InternalServerError, new ServiceStatus()
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = context.Exception.Message,
                    ReasonPhrase = "InternalServerError"
                }));
            }

        }
    }
}