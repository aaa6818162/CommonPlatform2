using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project.WebSite.Models.ShopCart
{
    public class ShopCartOutPut
    {
        /// <summary>
        /// 选中数量
        /// </summary>
        public int CheckNum { get; set; }

        /// <summary>
        /// 合计金额
        /// </summary>
        public string TotalAmount { get; set; }


    }
}