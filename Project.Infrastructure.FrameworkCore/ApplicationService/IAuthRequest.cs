using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Project.Infrastructure.FrameworkCore.ApplicationService
{
    /// <summary>
    /// 需授权判断的请求
    /// </summary>
    public interface IAuthRequest
    {
         string Token { get; set; }
    }


}
