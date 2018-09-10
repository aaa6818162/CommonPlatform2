using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPISwaggerJWT
{
    /// <summary>
    /// 基础响应包
    /// </summary>
    /// <typeparam name="T">数据类型</typeparam>
    public class BaseResponsePackage<T>
    {
        /// <summary>
        /// 0正常.
        /// </summary>
        public int StatusCode { get; set; }

        /// <summary>
        /// 信息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 数据
        /// </summary>
        public T Data { get; set; }

        /// <summary>
        /// 是否OK
        /// </summary>
        /// <returns></returns>
        public bool IsOK()
        {
            return StatusCode == 0;
        }
    }
}