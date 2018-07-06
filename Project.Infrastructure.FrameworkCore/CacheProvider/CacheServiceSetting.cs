using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Project.Infrastructure.FrameworkCore.CacheProvider
{
    /// <summary>
    /// 缓存服务设置
    /// </summary>
    public class CacheServiceSetting
    {
        /// <summary>
        /// 缓存服务标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 缓存区域名称
        /// </summary>
        public string CacheDomainName { get; set; }

        /// <summary>
        /// 缓存服务中设置的每项缓存数据的版本号
        /// </summary>
        public long CacheKeyVersion { get; set; }

        /// <summary>
        /// 是否开启缓存
        /// </summary>
        public bool EnableCache { get; set; }

        /// <summary>
        /// 是否允许清空
        /// </summary>
        public bool AllowReset { get; set; }

        /// <summary>
        /// 获取缓存键
        /// </summary>
        /// <param name="key">设定键</param>
        /// <returns></returns>
        public string GetCacheKey(string key)
        {
            return this.CacheDomainName + key;
        }
    }
}
