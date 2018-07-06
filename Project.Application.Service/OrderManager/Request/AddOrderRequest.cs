using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Application.Service.Common;
using Project.Model.OrderManager;

namespace Project.Application.Service.OrderManager.Request
{
   public class AddOrderRequest:RequestBase
    {
        /// <summary>
        /// 券号
        /// </summary>

        public virtual string TicketCodes { get; set; }

        /// <summary>
        /// 送货地址
        /// </summary>
        public virtual  int CustomerAddressId { get; set; }


        public virtual string InvoiceTitle { get; set; }

        public virtual string LinkmanRemark { get; set; }

        /// <summary>
        /// 直接购买时需要的相关信息
        /// </summary>
        public virtual string GoodsCode { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual int GoodsId { get; set; }

        /// <summary>
        /// 直接购买时需要的相关信息
        /// </summary>
        public virtual int Num { get; set; }


        /// <summary>
        /// 订单行项目信息
        /// </summary>
        public virtual IList<ShopCartEntity> ShopCartEntityList { get; set; }

        /// <summary>
        /// 发票信息
        /// </summary>
        //public virtual OrderInvoiceEntity OrderInvoiceEntity { get; set; }

    }
}
