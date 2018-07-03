using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Project.Model.CustomerManager;
using Project.Model.OrderManager;
using Project.Model.SalePromotionManager;

namespace Project.WebSite.Models.OrderProcess
{
    public class ConfirmOutput
    {

        public ConfirmOutput()
        {
            ShopCartEntityList=new List<ShopCartEntity>();
            CustomerAddressEntityList=new List<CustomerAddressEntity>();
            TicketEntityList=new List<TicketEntity>();
        }


        public IList<ShopCartEntity> ShopCartEntityList { get; set; }

        public IList<CustomerAddressEntity> CustomerAddressEntityList { get; set; }


        public IList<TicketEntity> TicketEntityList { get; set; }
    }
}