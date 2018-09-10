using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using Newtonsoft.Json;


namespace WebAPISwaggerJWT.Helpers
{
    /// <summary>
    /// 输入状态
    /// </summary>
    [Serializable]
    [DataContract]
    public class ServiceStatus
    {
        #region 属性
        /// <summary>
        /// 状态码
        /// </summary>
        [DataMember]
        public int Status { get; set; }

        /// <summary>
        ///状态信息
        /// </summary>
        [DataMember]
        public string Message { get; set; }

        /// <summary>
        /// 原因
        /// </summary>
        [DataMember]
        public string ReasonPhrase { get; set; }

        #endregion
    }
}