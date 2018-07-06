

 /***************************************************************************
 *       功能：     SMNoticeInfo实体类
 *       作者：     李伟伟
 *       日期：     2018/4/12
 *       描述：     消息通知
 * *************************************************************************/
using System;
using Project.Infrastructure.FrameworkCore.Domain.Entities;
using Project.Infrastructure.FrameworkCore.Domain.Entities.Component;

namespace Project.Model.SystemSetManager
{
    public class NoticeInfoEntity: Entity
    { 
        #region 属性
        /// <summary>
        /// 
        /// </summary>
        public virtual System.Int32 ToCustomerId{get; set;}
        /// <summary>
        /// 
        /// </summary>
        public virtual System.String Title{get; set;}
        /// <summary>
        /// 
        /// </summary>
        public virtual System.Int32 IsRead{get; set;}
        /// <summary>
        /// 创建日期
        /// </summary>
        public virtual System.DateTime? CreateDate{get; set;}
		#endregion
        

        #region 新增属性
        
        #endregion
    }
}

    
 

