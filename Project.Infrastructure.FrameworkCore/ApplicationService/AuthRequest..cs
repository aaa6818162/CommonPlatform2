using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Infrastructure.FrameworkCore.ApplicationService
{
   public class AuthRequest: IAuthRequest
    {
       #region Implementation of IAuthRequest

       public string Token { get; set; }


        /// <summary>
        /// 签名时间戳
        /// </summary>
       public int SignTimespan {
           get { return DateTime.Now.Millisecond; }
       }




       #endregion
    }
}
