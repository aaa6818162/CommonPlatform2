using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using Project.Application.OpenApiService.AccountManager.Request;
using Project.OpenApi.App_Start;

namespace Project.OpenApi.Controllers
{
    /// <summary>
    /// 授权登录控制器
    /// </summary>
    public class AuthorController : ApiController
    {

       /// <summary>
       /// 登录后返回token
       /// </summary>
       /// <param name="request"></param>
       /// <returns></returns>
        public JsonResult<LoginResponse> Login(LoginRequest request)
        {
            return Json(new LoginResponse() { });
        }





    }
}
