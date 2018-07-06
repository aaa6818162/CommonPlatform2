using System;
using System.Collections.Generic;

namespace Project.Infrastructure.FrameworkCore.CacheProvider.RedisLite
{
    /// <summary>
    /// Redis配置类
    /// </summary>
    [Serializable]
    public class RedisConfig
    {
        private string _connectionString = string.Empty;
        /// <summary>
        /// 链接字符串
        /// </summary>
        public string ConnectionString
        {
            get
            {
                if (string.IsNullOrEmpty(_connectionString))
                {
                    List<string> conns = new List<string>();
                    conns.Add(this.Host + ":" + this.Port);
                    if (!string.IsNullOrEmpty(this.Password))
                    {
                        conns.Add("password=" + this.Password);
                    }
                    conns.Add("ssl=" + this.SSL.ToString().ToLowerInvariant());
                    conns.Add("abortconnect=" + this.AbortConnect.ToString().ToLowerInvariant());
                    _connectionString = string.Join(",", conns.ToArray());
                }
                return _connectionString;
            }
            set
            {
                _connectionString = value;
            }
        }

        /// <summary>
        /// IP地址
        /// </summary>
        public string Host { get; set; }

        /// <summary>
        /// 端口
        /// </summary>
        public int Port { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// 自定义前缀
        /// </summary>
        public string Prefix { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int DbNum { get; set; }

        /// <summary>
        /// 中断链接
        /// </summary>
        public bool AbortConnect { get; set; }

        public bool SSL { get; set; }
    }
}
