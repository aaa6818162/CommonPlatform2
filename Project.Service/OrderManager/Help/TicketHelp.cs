using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Config;
using Project.Model.OrderManager;
using Project.Model.SalePromotionManager;
using Project.Repository.ProductManager;
using Project.Repository.SalePromotionManager;

namespace Project.Service.OrderManager.Help
{
   public class TicketHelp
    {
        public TicketRepository _ticketRepository;
        private readonly ProductRepository _productRepository;
        private readonly GoodsRepository _goodsRepository;

        public TicketHelp()
        {
            _ticketRepository = new TicketRepository();
            _productRepository = new ProductRepository();
            _goodsRepository = new GoodsRepository();
        }


        public bool TicketValidate(string ticketCodes, int customerId)
        {
            if (string.IsNullOrWhiteSpace(ticketCodes))
            {
                return true;
            }

            var tickets = ticketCodes.Split(',').Where(p=>!string.IsNullOrWhiteSpace(p));
            var validateResult = true;
            var ticketList = new List<TicketEntity>();
            foreach (var ticket in tickets)
            {
                if (!_ticketRepository.Query().Any(p => p.TicketCode == ticket && p.CustomerId == customerId&&p.Status=="激活"&&p.IsUse=="否"))
                {
                    validateResult = false;
                }
            }

            return validateResult;
        }


        /// <summary>
        /// 创建券商品行项目
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="ticketList"></param>
        /// <returns></returns>

        public OrderMainDetailEntity CountTicketDetailEntity(OrderMainEntity entity, IList<TicketEntity> ticketList)
        {
            #region 验证判断
            var ticketGoodsInfo = _goodsRepository.Query().FirstOrDefault(p => p.GoodsCode == SiteConfig.GetConfig().Prd_Ticket);
            if (ticketGoodsInfo == null)
            {
                return null;
            }

            var ticketProductInfo = _productRepository.GetById(ticketGoodsInfo.ProductId);
            if (ticketProductInfo == null)
            {
                return null;
            }
            #endregion

            #region

            var money = ticketList.Sum(p => p.TicketValue);


            return new OrderMainDetailEntity()
            {
                OrderNo = entity.OrderNo,
                ProductCategoryId = ticketProductInfo.ProductCategoryId,
                ProductName = ticketProductInfo.ProductName,
                ProductId = ticketProductInfo.PkId,
                ProductCode = ticketProductInfo.ProductCode,
                GoodsCode = ticketGoodsInfo.GoodsCode,
                GoodsId = ticketGoodsInfo.PkId,
                ImageUrl = ticketProductInfo.ImageUrl,
                Price = ticketGoodsInfo.GoodsPrice,
                DiscountMember = 0,
                DiscountPromotion = 0,
                DiscountPoint = 0,
                DiscountAll = 0,
                PromotionPrice = 0,
                LastPrice = -money,
                TotalAmount = -money,
                ProductWeight = 0,
                SpecDetail = ticketGoodsInfo.SpecDetail,
                Num = 1,
            };

            #endregion


        }



    }
}
