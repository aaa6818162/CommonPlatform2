
 /***************************************************************************
 *       功能：     PMUserSession映射类
 *       作者：     李伟伟
 *       日期：     2018/9/7
 *       描述：     
 * *************************************************************************/

using Project.Infrastructure.FrameworkCore.DataNhibernate.EntityMappings;
using Project.Model.PermissionManager;

namespace  Project.Map.PermissionManager
{
    public class UserSessionMap : BaseMap<UserSessionEntity,int>
    {
        public UserSessionMap():base("PM_UserSession")
        {
            this.MapPkidDefault<UserSessionEntity,int>();
 
            Map(p => p.UserId);    
            Map(p => p.Token);    
            Map(p => p.CreateTime);    
        }
    }
}

    
 

