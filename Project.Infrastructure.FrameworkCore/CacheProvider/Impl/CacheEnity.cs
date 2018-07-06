using System;

namespace Project.Infrastructure.FrameworkCore.CacheProvider.Impl
{
    /// <summary>
    /// 缓存实体
    /// </summary>
    public class CacheEnity
    {
        /// <summary>
        /// 缓存数据
        /// </summary>
        public object Entity { get; set; }

        /// <summary>
        /// 有效期至
        /// </summary>
        public DateTime? ValidTime { get; set; }
    }
}
