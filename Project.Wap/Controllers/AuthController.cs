using System;
using System.Configuration;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Senparc.Weixin;
using Senparc.Weixin.MP.AdvancedAPIs;

namespace Project.Wap.Controllers
{
    /// <summary>
    /// 授权登录控制器
    /// </summary>
    public class AuthController : BaseController
    {
     


        /// <summary>
        /// 发起授权请求
        /// </summary>
        /// <param name="code">发起授权请求</param>
        /// <returns></returns>
        public ActionResult BeginAuth(string url)
        {
            return Redirect("/Member/Account/Login?url=" + HttpUtility.UrlEncode(url));
        }

        /// <summary>
        /// 接收登录授权
        /// </summary>
        /// <returns></returns>
        public ActionResult AcceptAuth(string userid, string token, string url)
        {
           // SiteAuthorization.Instance.CheckLogin(userid, token);
            return Redirect(url);
        }

        #region Wechat

        /// <summary>
        /// 微信公众号关注用户授权自动登录，完成登录后自动跳转到指定url
        /// </summary>
        /// <param name="code"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        public ActionResult WechatLogin(string code, string url, string state)
        {
            if (string.IsNullOrEmpty(code))
            {
                return ShowMessagePage("您拒绝了授权！");
            }

            if (string.IsNullOrEmpty(WechatAppID))
            {
                return ShowMessagePage("无效的AppID", string.Empty, 3);
            }

            if (string.IsNullOrEmpty(url))
            {
                return ShowMessagePage("缺少有效的返回地址", string.Empty, 3);
            }

            try
            {
                //Core.DLogger.Current.Info(string.Format("Code:{0};Url:{1};State:{2}", code, url, state));

                //用code换取access_token
                var result = OAuthApi.GetAccessToken(WechatAppID, WechatAppSecret, code);
                if (result.errcode != ReturnCode.请求成功)
                {
                    return ShowMessagePage(result.errmsg, "微信接口错误");
                }

                if (string.IsNullOrEmpty(result.openid))
                {
                    return ShowMessagePage("错误：无效的openid！", "微信接口错误");
                }

                //Core.DLogger.Current.Info(string.Format("GetAccessToken Result:{0}", JsonConvert.SerializeObject(result)));
                FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(result.openid, false, 120);
                string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
                HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                System.Web.HttpContext.Current.Response.Cookies.Add(authCookie);

                return Redirect(url);
            }
            catch (Exception ex)
            {
                return ShowMessagePage(ex.Message, "微信接口错误");
            }
        }

        /// <summary>
        /// 微信开放平台授权中转
        /// </summary>
        /// <returns></returns>
        public ActionResult NoneAuth(string backUrl, string state)
        {
            if (string.IsNullOrEmpty(backUrl))
            {
                return ShowMessagePage("缺少有效的返回地址", string.Empty, 3);
            }

            if (string.IsNullOrEmpty(WechatAppID))
            {
                return ShowMessagePage("无效的AppID", string.Empty, 3);
            }

            //未登录状况下访问需要微信Open授权的页面时跳转至此action，
            //组装回调URl并中转至微信开放平台
            string host = ConfigurationManager.AppSettings["host"];

            var fullBackUrl = host + "/Auth/WechatLogin?appid=" + WechatAppID + "&url=" + HttpUtility.UrlEncode(backUrl);
            string openUrl = OAuthApi.GetAuthorizeUrl(WechatAppID, fullBackUrl, state, Senparc.Weixin.MP.OAuthScope.snsapi_base);

            return Redirect(openUrl);
        }

        /// <summary>
        /// 微信
        /// </summary>
        /// <returns></returns>
        public ActionResult WechatOnly()
        {
            return ShowMessagePage("请在微信内打开！", "", 4, Url.Action("index", "home"), "返回首页");
        }

        /// <summary>
        /// 是否已授权登录
        /// </summary>
        /// <returns></returns>
        public ActionResult CheckAuth()
        {
            return Json(new { IsAuth = base.IsWechatAuthorized });
        }

        #endregion
    }
}