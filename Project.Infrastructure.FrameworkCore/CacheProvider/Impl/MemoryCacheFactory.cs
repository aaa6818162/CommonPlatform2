 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Infrastructure.FrameworkCore.CacheProvider.Impl
{
    /// <summary>
    /// 非序列化内存缓存
    /// </summary>
    public class MemoryCacheFactory : ICacheFactory
    {
        public ICache Create()
        {
            return new MemoryCache();
        }

        public ICache Create(string name)
        {
            return new MemoryCache(name);
        }
    }
}
