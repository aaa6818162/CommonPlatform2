using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using Project.Application.OpenApiService.AccountManager.Request;
using Project.OpenApi.App_Start;
using Project.OpenApi.Models;

namespace Project.OpenApi.Controllers
{
    /// <summary>
    /// 授权登录控制器
    /// </summary>
    public class AuthorController : ApiController
    {
 
        private readonly AccountServiceImpl _accountServiceImpl;

        /// <summary>
        /// 
        /// </summary>
        public AuthorController()
        {
            _accountServiceImpl=new AccountServiceImpl();
        }


        [HttpPost]
        public JsonResult<WebAPIResponse<LoginResponse>> Login(LoginRequest request)
        {

            var result = _accountServiceImpl.Login(request);

            //  HttpContext.Current.Response.Cookies.Add(new HttpCookie("my_token", result.Token));

            return Json(new WebAPIResponse<LoginResponse>()
            {
                Success = result.IsLoginSuccess,
                Result = result,
                Error = new ErrorInfo() { Message = result.Message }
            });
        }

        /// <summary>
        /// 登录后返回token
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        //[HttpPost]
        //public JsonResult<WebAPIResponse<LoginResponse>> Login(LoginRequest request)
        //{

        //    var result= _accountServiceImpl.Login(request);

        //  //  HttpContext.Current.Response.Cookies.Add(new HttpCookie("my_token", result.Token));

        //    return Json(new WebAPIResponse<LoginResponse>()
        //        {
        //            Success = result.IsLoginSuccess,
        //            Result = result,
        //            Error = new ErrorInfo() { Message = result.Message}
        //        });
        //}




        //public JsonResult<WebAPIResponse<LoginResponse>> Login(LoginRequest request)
        //{

        //}



    }
}
