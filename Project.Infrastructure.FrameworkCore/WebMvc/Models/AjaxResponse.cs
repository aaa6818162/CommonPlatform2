using System;

namespace Project.Infrastructure.FrameworkCore.WebMvc.Models
{
    [Serializable]
    public class AjaxResponse<TResult>
    {
        /// <summary>
        /// 
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public TResult Result { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public ErrorInfo Error { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool Unauthorizedrequest { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Targeturl { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="result"></param>
        public AjaxResponse(TResult result)
        {
            this.Result = result;
            Success = true;
        }

        /// <summary>
        /// 
        /// </summary>
        public AjaxResponse()
        {
            Success = true;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="success"></param>
        public AjaxResponse(bool success)
        {
            this.Success = success;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="error"></param>
        /// <param name="unAuthorizedRequest"></param>
        public AjaxResponse(ErrorInfo error, bool unAuthorizedRequest = false)
        {
            this.Error = error;
            Unauthorizedrequest = unAuthorizedRequest;
            Success = false;
        }
    }
}
