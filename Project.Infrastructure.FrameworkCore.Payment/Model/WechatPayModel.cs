using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Infrastructure.FrameworkCore.Payment.Model
{
    /// <summary>
    /// 微信支付实体
    /// </summary>
    internal class WechatPayModel
    {
        /// <summary>
        /// AppID
        /// </summary>
        public string AppID { get; set; }
        /// <summary>
        /// AppSecret
        /// </summary>
        public string AppSecret { get; set; }
        /// <summary>
        /// 商户号
        /// </summary>
        public string MCHID { get; set; }
        /// <summary>
        /// 交易安全检验码
        /// </summary>
        public string Key { get; set; }
        /// <summary>
        /// 服务器异步通知页面路径
        /// </summary>
        public string NotifyUrl { get; set; }
        /// <summary>
        /// IP
        /// </summary>
        public string IP { get; set; }
        /// <summary>
        /// 日志等级
        /// </summary>
        public string LogLevel { get; set; }
        /// <summary>
        /// 支付备注
        /// </summary>
        public string Remark { get; set; }
    }
}
