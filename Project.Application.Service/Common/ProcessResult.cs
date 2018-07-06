using System;
using System.Runtime.Serialization;

namespace Project.Application.Service.Common
{
    /// <summary>
    /// 基础服务输出标准结果
    /// </summary>
    [Serializable]
    [DataContract]
    public class ProcessResult : MarshalByRefObject
    {
        private bool issuccess = true;
        /// <summary>
        /// 是否成功
        /// </summary>
        [DataMember]
        public bool IsSuccess
        {
            get { return issuccess; }
            set { issuccess = value; }
        }

        /// <summary>
        /// 结果代码
        /// </summary>
        [DataMember]
        public int Code { get; set; }

        /// <summary>
        /// 错误信息，或者成功信息
        /// </summary>
        [DataMember]
        public string Message { get; set; }

        /// <summary>
        /// 成功可能时返回的数据
        /// </summary>
        [DataMember]
        public dynamic Result { get; set; }

        public ProcessResult()
        {
            this.Code = 0;
        }
       

        #region Error

        /// <summary>
        /// 输错错误信息
        /// </summary>
        /// <returns></returns>
        public static ProcessResult Error()
        {
            return new ProcessResult()
            {
                issuccess = false
            };
        }
        /// <summary>
        /// 输错错误信息
        /// </summary>
        /// <param name="message">附属消息</param>
        /// <returns></returns>
        public static ProcessResult Error(string message, int code = 500)
        {
            return new ProcessResult()
            {
                issuccess = false,
                Message = message,
                Code = code
            };
        }

        #endregion

        #region Success
        /// <summary>
        /// 输出成功信息
        /// </summary>
        /// <returns></returns>
        public static ProcessResult Success()
        {
            return new ProcessResult()
            {
                issuccess = true
            };
        }
        /// <summary>
        /// 输出成功信息
        /// </summary>
        /// <param name="message">附属消息</param>
        /// <returns></returns>
        public static ProcessResult Success(string message)
        {
            return new ProcessResult()
            {
                issuccess = true,
                Message = message
            };
        }
        /// <summary>
        /// 输出成功信息
        /// </summary>
        /// <param name="data">附属数据</param>
        /// <returns></returns>
        public static ProcessResult Success(dynamic data)
        {
            return new ProcessResult()
            {
                issuccess = true,
                Code = 200,
                Result = data
            };
        }
        /// <summary>
        /// 输出成功信息
        /// </summary>
        /// <param name="data">附属数据</param>
        /// <param name="message">附属消息</param>
        /// <returns></returns>
        public static ProcessResult Success(dynamic data, string message)
        {
            return new ProcessResult()
            {
                issuccess = true,
                Result = data,
                Code = 200,
                Message = message
            };
        }

        #endregion
    }
}
