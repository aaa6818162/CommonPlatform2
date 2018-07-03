using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Project.Model.SalePromotionManager;
using Project.Model.SystemSetManager;
using Project.WebSite.Models.Component;

namespace Project.WebSite.Models.UserCenter
{
    public class MessageListView : SearchBaseVm
    {
        public List<NoticeInfoEntity> NoticeInfoList { get; set; }
    }
}