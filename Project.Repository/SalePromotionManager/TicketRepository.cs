
/***************************************************************************
*       功能：     SPMTicket持久层
*       作者：     李伟伟
*       日期：     2018/3/26
*       描述：     券
* *************************************************************************/

using System;
using Project.Infrastructure.FrameworkCore.Domain.Repositories;
using Project.Model.SalePromotionManager;

namespace Project.Repository.SalePromotionManager
{
    /// <summary>
    /// 持久层
    /// </summary>
    public class TicketRepository : RepositoryBaseSql<TicketEntity, int>
    {


        /// <summary>
        /// 初始化商品信息
        /// </summary>
        /// <returns></returns>
        public void InitTicketStatus()
        {
            string sql = " update SPM_Ticket set Status='过期' where AvaildateEnd<='" + DateTime.Now.ToString("yyyy-MM-dd") + "' and Status = '激活'  ";

            var result1 = this.ExecuteNoQuery(sql);
        }

    }
}







