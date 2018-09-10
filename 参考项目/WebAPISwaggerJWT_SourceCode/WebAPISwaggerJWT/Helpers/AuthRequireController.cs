using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebAPISwaggerJWT
{
    /// <summary>
    /// 授权请求控制器
    /// </summary>
    [AuthRequire]
    public class AuthRequireController : ApiController
    {

    }
}