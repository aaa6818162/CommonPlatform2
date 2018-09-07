using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Application.OpenApiService.AccountManager.Request
{
    /// <summary>
    /// 
    /// </summary>
    public class LoginResponse
    {
        /// <summary>
        /// 登录名
        /// </summary>
        public string LoginName { get; set; }

        /// <summary>
        /// 授权之后产生的token
        /// </summary>
        public string Token { get; set; }
    }
}
