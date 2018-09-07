

 /***************************************************************************
 *       功能：     PMUserSession实体类
 *       作者：     李伟伟
 *       日期：     2018/9/7
 *       描述：     
 * *************************************************************************/
using System;
using Project.Infrastructure.FrameworkCore.Domain.Entities;
using Project.Infrastructure.FrameworkCore.Domain.Entities.Component;

namespace Project.Model.PermissionManager
{
    public class UserSessionEntity: Entity
    { 
        #region 属性
        /// <summary>
        /// 
        /// </summary>
        public virtual System.Int32 UserId{get; set;}
        /// <summary>
        /// 
        /// </summary>
        public virtual System.String Token{get; set;}
        /// <summary>
        /// 
        /// </summary>
        public virtual System.DateTime? CreateTime{get; set;}
		#endregion
        

        #region 新增属性
        
        #endregion
    }
}

    
 

