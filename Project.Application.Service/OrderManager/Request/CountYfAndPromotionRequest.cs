using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Model.OrderManager;

namespace Project.Application.Service.OrderManager.Request
{
  public  class CountYfAndPromotionRequest
    {

      public int CustomerId { get; set; }
      public string LinkmanAreaId { get; set; }

        public string TicketCodes { get; set; }

        public IList<ShopCartEntity> ShopCartEntityList { get; set; }
    }
}
