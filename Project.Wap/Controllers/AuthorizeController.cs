using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;
using Project.Application.Service.OrderManager;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Service.CustomerManager.Dto;

namespace Project.Wap.Controllers
{
    /// <summary>
    /// 已登录页
    /// </summary>
    public class AuthorizeController : BaseController
    {



        /// <summary>
        /// 在调用操作方法前调用。
        /// </summary>
        /// <param name="filterContext">有关当前请求和操作的信息。</param>
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext == null)
            {
                throw new ArgumentNullException("filterContext");
            }

            base.OnActionExecuting(filterContext);



            var returnUrl = string.Empty;
            var referrerUrl = filterContext.HttpContext.Request.Url;
            if (referrerUrl != null)
            {
                returnUrl = HttpUtility.UrlEncode(referrerUrl.PathAndQuery);
            }


            var loginUrl = "/Account/Login?ReturnUrl=" + returnUrl;

            //if (filterContext.HttpContext.Request.IsAuthenticated)
            //{
            try
            {
                var userData = ((FormsIdentity)User.Identity).Ticket.UserData;
                if (userData != "")
                {
                    CustomerDto = JsonConvert.DeserializeObject<CustomerDto>(userData);
                    ViewBag.Nickname = CustomerDto.Mobilephone;
                    ViewBag.CartNum = new OrderServiceImpl().GetShopCartList(CustomerDto.CustomerId).Count;
                }
                else
                {
                    FormsAuthentication.SignOut();
                    //CookieHelper.Del("SSS");

                    if (filterContext.HttpContext.Request.IsAjaxRequest())
                    {
                        filterContext.Result = new MvcJsonResult(new AjaxResponse<object>()
                        {
                            Success = false,
                            Result = loginUrl,
                            Error = new ErrorInfo("没有权限")
                        });
                    }
                    else
                    {
                        filterContext.Result = Redirect(loginUrl);
                    }

                }
            }
            catch (Exception ex)
            {
                FormsAuthentication.SignOut();
                //CookieHelper.Del("SSS");
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.Result = new MvcJsonResult(new AjaxResponse<object>()
                    {
                        Success = false,
                        Result = loginUrl,
                        Error = new ErrorInfo("没有权限")
                    });
                }
                else
                {
                    filterContext.Result = Redirect(loginUrl);
                }
            }
            //}
        }


        ///// <summary>
        ///// 在进行授权时调用。
        ///// </summary>
        ///// <param name="filterContext">有关当前请求和操作的信息。</param>
        //protected override void OnAuthentication(AuthenticationContext filterContext)
        //{
        //    if (!HttpContext.User.Identity.IsAuthenticated)
        //    {
        //        filterContext.Result = new ContentResult { Content = @"<script>window.top.location='/Login/Index3'</script>" };
        //        base.OnAuthentication(filterContext);
        //        return;
        //    }

        //    //身份验证
        //    ViewBag.ShowInfo += "OnAuthentication<br/>";
        //    base.OnAuthentication(filterContext);
        //}


    }
}