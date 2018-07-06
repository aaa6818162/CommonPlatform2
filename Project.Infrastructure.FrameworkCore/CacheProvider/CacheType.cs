//*********************************************
// 公司名称：              
// 部    门：
// 创 建 者：
// 创建日期：2013/1/22 12:05:28
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
    /// 缓存类型
    /// </summary>
    public enum CacheType
    {
 
        /// <summary>
        /// 无序列化到内存
        /// </summary>
        Memory = 1,

        /// <summary>
        /// redis
        /// </summary>
        Redis=2,

        /// <summary>
        /// 数据有序列缓存到内存
        /// </summary>
        NonSerializedInMemory = 255
    }
}
