using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Infrastructure.FrameworkCore.CacheProvider.RedisLite;

namespace Project.Infrastructure.FrameworkCore.CacheProvider.Impl
{
    public class RedisCache : ICache
    {
        private RedisContextAdapter _context = null;
        private RedisConfig _config = null;
        private string _name = "";
 
        public RedisCache(RedisConfig config)
        {
            _name = Guid.NewGuid().ToString("N");
            this._config = config;
            this._context = new RedisContextAdapter(_config);
        }
        public RedisCache(RedisConfig config,string name)
        {
            this._config = config;
            this._name = name;
            this._context = new RedisContextAdapter(_config);
        }
        public RedisContextAdapter Context
        {
            get
            {
                return _context;
            }
        }

        public RedisConfig Config
        {
            get
            {
                return _config;
            }
            
        }

        public void Remove(string key)
        {
            _context.KeyDelete(key);
        }

        public void RemoveAll()
        {
             
        }
    }
}
