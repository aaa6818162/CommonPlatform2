using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebAPISwaggerJWT.Areas.Auth.Helpers;

namespace WebAPISwaggerJWT.Areas.Auth.Controllers
{
    /// <summary>
    /// 票据
    /// </summary>
    public class TokenController : ApiController
    {
        /// <summary>
        /// 申请票据
        /// </summary>
        /// <param name="account"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpGet]
        public string Apply(string account, string password)
        {
            //依实据需求，可以从数据库中去校验account和password
            var token = AuthHelper.EncodeToken(account, password, 0);
            return token;
        }
    }
}