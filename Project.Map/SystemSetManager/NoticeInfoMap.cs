
 /***************************************************************************
 *       功能：     SMNoticeInfo映射类
 *       作者：     李伟伟
 *       日期：     2018/4/12
 *       描述：     消息通知
 * *************************************************************************/

using Project.Infrastructure.FrameworkCore.DataNhibernate.EntityMappings;
using Project.Model.SystemSetManager;

namespace  Project.Map.SystemSetManager
{
    public class NoticeInfoMap : BaseMap<NoticeInfoEntity,int>
    {
        public NoticeInfoMap():base("SM_NoticeInfo")
        {
            this.MapPkidDefault<NoticeInfoEntity,int>();
 
            Map(p => p.ToCustomerId);    
            Map(p => p.Title);    
            Map(p => p.IsRead);    
            Map(p => p.CreateDate);    
        }
    }
}

    
 

