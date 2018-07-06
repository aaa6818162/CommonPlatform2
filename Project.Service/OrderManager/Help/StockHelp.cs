using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
using Project.Model.OrderManager;
using Project.Repository.ProductManager;

namespace Project.Service.OrderManager.Help
{
    public class StockHelp
    {
        private readonly GoodsRepository _goodsRepository;
        public StockHelp()
        {
            _goodsRepository = new GoodsRepository();

        }

        /// <summary>
        /// 库存检查
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool CheckStock(OrderMainEntity entity)
        {
            var result = true;
            entity.OrderMainDetailEntityList.ForEach(p =>
            {
                var goodsInfo = _goodsRepository.GetById(p.GoodsId);
                if (goodsInfo != null)
                {
                    if (p.Num > goodsInfo.GoodsStock)
                    {
                        result = false;
                    }
                }
            });
            return result;
        }


    }
}
