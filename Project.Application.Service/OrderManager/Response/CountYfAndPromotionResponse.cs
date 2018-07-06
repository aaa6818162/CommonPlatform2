using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Application.Service.OrderManager.Response
{
    public class CountYfAndPromotionResponse
    {
        /// <summary>
        /// 订单合计金额
        /// </summary>
        public decimal TotalMoney { get; set; }


        /// <summary>
        /// 运费
        /// </summary>
        public decimal Yf { get; set; }


        /// <summary>
        /// 折扣金额
        /// </summary>
        public decimal DiscountMoney { get; set; }

        /// <summary>
        /// 送券张数
        /// </summary>
        public int TicketNum { get; set; }

        /// <summary>
        /// 送券金额
        /// </summary>
        public decimal TicketValue { get; set; }

    }
}
