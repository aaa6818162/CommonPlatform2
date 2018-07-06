using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Infrastructure.FrameworkCore.CacheProvider.RedisLite;

namespace Project.Infrastructure.FrameworkCore.CacheProvider.Impl
{
    public class RedisCacheFactory : ICacheFactory
    {
        private RedisConfig _redis = null;
        /// <summary>
        /// Redis配置
        /// </summary>
        public  RedisConfig Config
        {
            get
            {
                if (this._redis == null)
                {
                    this._redis = new RedisConfig();

                    this._redis.Host = ConfigurationManager.AppSettings["redis:host"];
                    this._redis.Password = ConfigurationManager.AppSettings["redis:pwd"];
                    this._redis.Prefix = ConfigurationManager.AppSettings["redis:prefix"];
                    int port = 6379;
                    int.TryParse(ConfigurationManager.AppSettings["redis:port"], out port);
                    this._redis.Port = port;

                    int dbNum = 0;
                    int.TryParse(ConfigurationManager.AppSettings["redis:dbnum"], out dbNum);
                    this._redis.DbNum = dbNum;
                }
                return this._redis;
            }
        }
        public ICache Create()
        {
            return new RedisCache(this.Config);
        }

        public ICache Create(string name)
        {
            return new RedisCache(this.Config,name);
        }
    }
}
