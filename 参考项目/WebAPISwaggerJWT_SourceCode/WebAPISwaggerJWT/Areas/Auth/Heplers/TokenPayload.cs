using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPISwaggerJWT.Areas.Auth.Helpers
{
    /// <summary>
    /// 票据负载
    /// </summary>
    public class TokenPayload
    {
        /// <summary>
        /// Account
        /// </summary>
        //[JsonProperty("acc")]
        public string Account { get; set; }

        /// <summary>
        /// 到期时间(秒)
        /// </summary>        
        //[JsonProperty("exp")]
        public double Expired { get; set; }

        /// <summary>
        /// 加密算法(默认HS256)
        /// </summary>
        //[JsonProperty("alg")]
        public string Algorithm { get; set; } = "HS256";

        /// <summary>
        /// 票据类型(默认JWT)
        /// </summary>
        //[JsonProperty("typ")]
        public string Type { get; set; } = "JWT";

        /// <summary>
        /// 角色类型
        /// </summary>
        //[JsonProperty("rol")]
        public int Role { get; set; }
    }
}