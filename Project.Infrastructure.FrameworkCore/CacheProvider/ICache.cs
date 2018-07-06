//*********************************************
// 公司名称：              
// 部    门：
// 创 建 者：
// 创建日期：2013/1/22 12:03:39
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
    /// 缓存器接口
    /// </summary>
    public interface ICache
    {

        /// <summary>
        /// 根据KEY清除缓存
        /// </summary>
        /// <param name="key">键值</param>
        void Remove(string key);

        /// <summary>
        /// 清除所有缓存
        /// </summary>
        void RemoveAll();

    }
}
