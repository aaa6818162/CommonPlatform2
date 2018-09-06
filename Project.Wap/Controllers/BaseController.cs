using System;
using System.Text;
using System.Web.Configuration;
using System.Web.Mvc;
using Project.Infrastructure.FrameworkCore.Logging;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Service.CustomerManager.Dto;
using Project.Wap.Models;

namespace Project.Wap.Controllers
{
    public class BaseController : Controller
    {

        #region Wechat

        protected string WechatAppID = WebConfigurationManager.AppSettings["WechatAppID"];
        protected string WechatAppSecret = WebConfigurationManager.AppSettings["WechatAppSecret"];
        protected string WechatMCHID = WebConfigurationManager.AppSettings["WechatMCHID"];
        protected string WechatKey = WebConfigurationManager.AppSettings["WechatKey"];

        /// <summary>
        /// 微信OpenID
        /// </summary>
        protected string WechatOpenId
        {
            get
            {
                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    return HttpContext.User.Identity.Name;
                }
                return string.Empty;
            }
        }

        /// <summary>
        /// 是否已经微信授权
        /// </summary>
        protected bool IsWechatAuthorized
        {
            get
            {
                return HttpContext.User.Identity.IsAuthenticated;
            }
        }

        #endregion



        public BaseController()
        {
            //CustomerDto = new CustomerDto()
            //{
            //    CustomerId = 4,
            //    CustomerName = "Test",
            //    Mobilephone = "电话"
            //};

        }

        /// <summary>
        /// 用户信息
        /// </summary>
        public CustomerDto CustomerDto { get; set; }


        protected override void OnException(ExceptionContext filterContext)
        {
            if (filterContext.ExceptionHandled)
            {
                return;
            }
            var exception = filterContext.Exception ?? new Exception("不存在进一步错误信息");

            LoggerHelper.Error(LogType.ErrorLogger, exception.Message);

            if (Request.IsAjaxRequest())
            {
                filterContext.Result = new MvcJsonResult
                {
                    Data = new AjaxResponse<object>() { Success = false, Error = new ErrorInfo(exception.ToString()) }
                };
            }
            else
            {
                var controllerName = (string)filterContext.RouteData.Values["controller"];
                var actionName = (string)filterContext.RouteData.Values["action"];
                var model = new HandleErrorInfo(exception, controllerName, actionName);
                filterContext.Result = new ViewResult
                {
                    ViewName = "~/Views/Shared/InternalServer.cshtml",
                    ViewData = new ViewDataDictionary<HandleErrorInfo>(model),
                };
            }

            filterContext.ExceptionHandled = true;

        }


        #region 工具
        #region 标准化输出JSON
        /// <summary>
        /// 统一JSON输出口
        /// </summary>
        /// <param name="state">请求状态：true成功fasle失败</param>
        /// <param name="msg">返回消息内容</param>
        /// <param name="data">返回数据信息</param>
        /// <param name="behavior"></param>
        /// <returns></returns>
        protected JsonResult JsonMessage(bool state, string msg, object data = null, JsonRequestBehavior behavior = JsonRequestBehavior.AllowGet)
        {
            var json = new
            {
                success = state,
                message = msg,
                data = data
            };

            return Json(json, behavior);
        }

        /// <summary>
        /// Json the specified data, contentType, contentEncoding and behavior.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <param name="contentType">Content type.</param>
        /// <param name="contentEncoding">Content encoding.</param>
        /// <param name="behavior">Behavior.</param>
        //protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
        //{
        //    return new SyncJsonResult
        //    {
        //        Data = data,
        //        ContentType = contentType,
        //        ContentEncoding = contentEncoding,
        //        JsonRequestBehavior = behavior
        //    };
        //}
        #endregion

        #region 提示页面

        /// <summary>
        /// 显示信息页面
        /// </summary>
        /// <param name="message">显示的错误消息</param>
        /// <param name="title">显示的标题</param>
        /// <param name="level">错误类型，区分页面上显示的图标，1：成功，2：提示，3：普通警告，4：强烈警告，5：等待</param>
        /// <param name="nextUrl">下一步跳转的URL</param>
        /// <returns></returns>
        protected ActionResult ShowMessagePage(string message, string title = "", int level = 4, string nextUrl = "", string button = "")
        {
            ErrorModel errorModel = new ErrorModel
            {
                Title = string.IsNullOrEmpty(title) ? "出错了" : title,
                Message = string.IsNullOrEmpty(message) ? "很抱歉，系统出现了错误" : message,
                Level = level,
                NextUrl = nextUrl,
                ButtonValue = string.IsNullOrEmpty(button) ? "确定" : button
            };
            return View("Error", errorModel);
        }

        #endregion

        #region 检查客户端请求签名
        /// <summary>
        /// 检查客户端请求签名
        /// </summary>
        /// <returns></returns>
        public bool CheckSignature()
        {
            //var token = RequestHelper.GetString("token");
            //var key = RequestHelper.GetString("key");
            //var signature = RequestHelper.GetString("signature");
            //var timestamp = RequestHelper.GetString("timestamp");

            //#region 请求签名验证

            //if (string.IsNullOrEmpty(token) || this.Token != token)
            //    return false;
            //if (string.IsNullOrEmpty(key) || this.AppKey != key)
            //    return false;
            //if (string.IsNullOrEmpty(signature))
            //    return false;
            //if (string.IsNullOrEmpty(timestamp))
            //    return false;
            //var md5 = (this.Token + this.AppKey + timestamp).ToMD5();
            //if (signature != md5)
            //    return false;
            //#endregion

            return true;
        }
        #endregion
        #endregion

    }
}