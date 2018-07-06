using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Project.Infrastructure.FrameworkCore.CacheProvider
{
    /// <summary>
    /// 缓存服务接口
    /// </summary>
    public interface ICacheService
    {
        /// <summary>
        /// 缓存服务标识信息
        /// </summary>
        string ID { get; }

        /// <summary>
        /// 缓存服务配置
        /// </summary>
        CacheServiceSetting Setting { get; }

        /// <summary>
        /// 缓存方式
        /// </summary>
        CacheType CacheType { get; }

        /// <summary>
        /// 重置缓存信息
        /// </summary>
        void Reset();

        /// <summary>
        /// 接收工厂创建缓存器
        /// </summary>
        /// <param name="cache"></param>
        void SetCache(ICache cache);
        
       
    }

}
