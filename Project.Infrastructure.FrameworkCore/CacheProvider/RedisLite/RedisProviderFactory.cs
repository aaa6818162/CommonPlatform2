using System;

namespace Project.Infrastructure.FrameworkCore.CacheProvider.RedisLite
{
    /// <summary>
    /// Redis访问工厂
    /// </summary>
    public class RedisProviderFactory : IDisposable
    {
        private RedisContextAdapter _context = null;
        private RedisConfig _config = null;

        /// <summary>
        /// 构造Redis访问
        /// </summary>
        /// <param name="config"></param>
        public RedisProviderFactory(RedisConfig config)
        {
            this._config = config;
            _context = new RedisContextAdapter(_config);
        }

        /// <summary>
        /// 构造Redis访问
        /// </summary>
        /// <param name="host"></param>
        /// <param name="port"></param>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <param name="prefix"></param>
        public RedisProviderFactory(string host, int port, string userName = "", string password = "", string prefix = "", int dbNum = -1)
        {
            this._config = new RedisConfig
            {
                Host = host,
                Port = port,
                UserName = userName,
                Password = password,
                Prefix = prefix,
                DbNum = dbNum
            };

            _context = new RedisContextAdapter(_config);
        }

        /// <summary>
        /// 获取Redis操作上下文
        /// </summary>
        public RedisContextAdapter Context
        {
            get
            {
                return _context;
            }
        }

        public void Dispose()
        {
            this._context = null;
            this._config = null;
            GC.SuppressFinalize(true);
        }
    }
}
