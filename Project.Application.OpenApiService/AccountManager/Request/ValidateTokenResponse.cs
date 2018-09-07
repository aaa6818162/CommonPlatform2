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
    public class ValidateTokenResponse
    {
        /// <summary>
        /// 
        /// </summary>
        public bool IsPassValidate { get; set; }

        public string Message { get; set; }
    }
}
