using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPISwaggerJWT.Areas.Auth.Helpers
{
    /// <summary>
    /// 解析票据的结果
    /// </summary>
    public class DecodeTokenResult : TokenPayload
    {
        /// <summary>
        /// 是否OK
        /// </summary>
        public bool OK { get; set; }

        /// <summary>
        /// 信息
        /// </summary>
        public string Message { get; set; }
    }
}