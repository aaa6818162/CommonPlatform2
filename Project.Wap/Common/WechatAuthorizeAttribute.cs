using System;
using System.Web;
using System.Web.Mvc;

namespace Project.Wap.Common
{
    public class WechatAuthorizeAttribute : AuthorizeAttribute
    {
        public string BackUrl = string.Empty;
        public string State = string.Empty;

        private bool _mustAuth = false;

        /// <summary>
        /// 微信用户授权登录
        /// </summary>
        /// <param name="mustAuth">是否必须要微信授权，默认为无须，如果为true，当未授权时会自动跳入授权页面或非微信客户端浏览时，提示在微信内打开</param>
        public WechatAuthorizeAttribute(bool mustAuth = false)
        {
            this._mustAuth = mustAuth;
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException("httpContext is null");
            }
            return httpContext.User.Identity.IsAuthenticated;
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);

            string userAgent = filterContext.HttpContext.Request.UserAgent;

            if (this._mustAuth)
            {
                if (!(userAgent ?? string.Empty).ToLower().Contains("micromessenger"))
                {
                    filterContext.Result = new RedirectResult("/Auth/WechatOnly");
                }

                if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
                {
                    if (string.IsNullOrEmpty(BackUrl))
                    {
                        HttpRequestBase bases = filterContext.HttpContext.Request;
                        BackUrl = HttpUtility.UrlEncode(bases.RawUrl);
                    }

                    filterContext.Result = new RedirectResult(string.Format("/Auth/NoneAuth?BackUrl={0}&State={1}", BackUrl, State));
                }
            }
        }
    }
}