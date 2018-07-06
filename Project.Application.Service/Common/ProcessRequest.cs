using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Application.Service.Common
{
    /// <summary>
    /// /基础服务请求信息
    /// </summary>
    public class ProcessRequest
    {
        /// <summary>
        /// 服务名
        /// </summary>
        public string Service { get; set; }

        /// <summary>
        /// 调用的服务方法
        /// </summary>
        public string Method { get; set; }

        /// <summary>
        /// 传输参数
        /// </summary>
        public string Paramter1 { get; set; }

        public string Paramter2 { get; set; }
        public string Paramter3 { get; set; }
        public string Paramter4 { get; set; }
        public string Paramter5 { get; set; }

    }
}
