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

        public string Message { get; set; }

        public bool IsLoginSuccess { get; set; }


        /// <summary>
        /// 昵称
        /// </summary>
        public string NickName { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        public string MobilePhone { get; set; }

        /// <summary>
        /// 授权之后产生的token
        /// </summary>
        public string Token { get; set; }
    }
}
