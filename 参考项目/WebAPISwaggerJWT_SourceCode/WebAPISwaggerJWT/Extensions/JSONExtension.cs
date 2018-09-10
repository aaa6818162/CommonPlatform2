using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace System
{
    /// <summary>
    /// JSON扩展
    /// </summary>
    public static class JSONExtension
    {
        #region ToJson
        /// <summary>
        /// 转换为JSON
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string ToJson(this object obj)
        {
            if (obj == null)
            {
                return "";
            }

            return JsonConvert.SerializeObject(obj);
        }
        #endregion

        #region ToObj
        /// <summary>
        /// 转换成对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="json"></param>
        /// <returns></returns>
        public static T ToObj<T>(this string json)
        {
            if (string.IsNullOrEmpty(json))
            {
                return default(T);
            }

            var obj = JsonConvert.DeserializeObject<T>(json);
            return obj;
        }
        #endregion
    }
}