using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPISwaggerJWT.Exceptions
{
    /// <summary>
    /// 未授权异常
    /// </summary>
    public class UnauthorizedException : Exception
    {
        public int StatusCode { get; set; }

        public UnauthorizedException(int statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }
    }
}