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

       #endregion
    }
}
