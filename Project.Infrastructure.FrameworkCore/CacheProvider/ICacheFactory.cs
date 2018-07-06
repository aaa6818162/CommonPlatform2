//*********************************************
// 公司名称：              
// 部    门：
// 创 建 者：
// 创建日期：2013/1/22 12:04:47
// 修 改 人：
// 修改日期：
// 修改说明：
// 文件说明：
//**********************************************

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Project.Infrastructure.FrameworkCore.CacheProvider
{
    /// <summary>
    /// 缓存器的工厂
    /// </summary>
    public interface ICacheFactory
    {
        /// <summary>
        /// 创建缓存器
        /// </summary>
        /// <returns>创建成功的缓存器</returns>
        ICache Create();

        /// <summary>
        /// 根据名称创建缓存器
        /// </summary>
        /// <param name="name">缓存器名称</param>
        /// <returns>创建成功的缓存器</returns>
        ICache Create(string name);
    }
}
