using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Project.Model.CustomerManager;
using Project.Model.SalePromotionManager;
using Project.Model.SystemSetManager;
using Project.WebSite.Models.Component;

namespace Project.WebSite.Models.UserCenter
{
    public class CollectionListView : SearchBaseVm
    {
        public List<CustomerCollectionEntity> CustomerCollectionList { get; set; }
    }
}