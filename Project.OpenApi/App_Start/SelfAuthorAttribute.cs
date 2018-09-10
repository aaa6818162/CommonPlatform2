using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using Newtonsoft.Json;
using Project.Application.OpenApiService.AccountManager.Request;
using Project.Infrastructure.FrameworkCore.ApplicationService;
using Project.Infrastructure.FrameworkCore.ToolKit.JsonHandler;
using Project.OpenApi.Controllers;
using Project.OpenApi.Models;

namespace Project.OpenApi.App_Start
{
    /// <summary>
    /// 登录授权
    /// </summary>
    public class SelfAuthorAttribute : AuthorizeAttribute
    {

        /// <summary>
        /// 自定义token认证
        /// </summary>
        /// <param name="actionContext"></param> 
        public override void OnAuthorization(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            var token = string.Empty;
            // var request= actionContext.Request.Content.ReadAsAsync<AuthRequest>(); 这种方式会导致后续action请求不到相关数据
            var request = new AuthRequest();
            try
            {
                request = JsonConvert.DeserializeObject<AuthRequest>(actionContext.Request.Content.ReadAsStringAsync().Result);
            }
            catch
            {
                request = null;
            }


            if (request != null && !string.IsNullOrEmpty(request.Token))
            {
                token = request.Token;
            }
            else
            {
               
                var content = actionContext.Request.Properties["MS_HttpContext"] as HttpContextBase;
                if (content != null)
                {
                    token = content.Request.Headers["Token"];
                }


                //var cookie = actionContext.Request.Headers.GetCookies();
                //if (cookie!=null)
                //{
                //    foreach (var perCookie in cookie[0].Cookies)
                //    {
                //        if (perCookie.Name == "")
                //        {

                //        }
                //    }
                //}
                
            }
            if (!string.IsNullOrEmpty(token))
            {
                //解密用户ticket,并校验用户名密码是否匹配  
                if (ValidateTicket(token))
                {
                    return;
                }
            }


            var result = new WebAPIResponse<string>("");
            result.Success = false;
            result.Error = new ErrorInfo()
            {
                Code = 401,
                Message = "Token未通过验证"
            };

            var resultJson = JsonHelper.JsonSerializer(result);

            actionContext.Response = new HttpResponseMessage
            {
                Content = new StringContent(resultJson, System.Text.Encoding.UTF8, "application/json")
            };

        }

        /// <summary>
        /// 校验票据（数据库数据匹配）  
        /// </summary>
        /// <param name="encryptToken"></param>
        /// <returns></returns>
        private bool ValidateTicket(string encryptToken)
        {
            return new AccountServiceImpl().ValidateToken(new ValidateTokenRequest() { Token = encryptToken }).IsPassValidate;
        }
    }
}
