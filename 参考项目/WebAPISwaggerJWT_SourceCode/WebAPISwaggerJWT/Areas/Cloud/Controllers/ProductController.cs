using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebAPISwaggerJWT.Areas.Cloud.Controllers
{
    /// <summary>
    /// 产品控制器
    /// </summary> 
    public class ProductController : AuthRequireController
    {
        /// <summary>
        /// 获取名字
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetName(string id)
        {
            return $"id={id}";
        }
    }
}