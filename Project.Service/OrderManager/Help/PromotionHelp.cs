using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NHibernate.Util;
using Project.Config;
using Project.Model.OrderManager;
using Project.Model.SalePromotionManager;
using Project.Repository.ProductManager;
using Project.Repository.SalePromotionManager;

namespace Project.Service.OrderManager.Help
{
    public class PromotionHelp
    {
        private readonly ProductRepository _productRepository;
        private readonly GoodsRepository _goodsRepository;
        private readonly TicketRepository _ticketRepository;

        public PromotionHelp()
        {
            _productRepository = new ProductRepository();
            _goodsRepository = new GoodsRepository();
            _ticketRepository = new TicketRepository();

        }


        /// <summary>
        /// 满减
        /// </summary>
        /// <param name="activityList"></param>
        /// <param name="entity"></param>
        public OrderMainDetailEntity GetDiscountMoney(IList<ActivityEntity> activityList, OrderMainEntity entity)
        {
            #region 验证判断
            if (!activityList.Any())
            {
                return null;
            }

            var discountGoodsInfo = _goodsRepository.Query().FirstOrDefault(p => p.GoodsCode == SiteConfig.GetConfig().Prd_Discount);
            if (discountGoodsInfo == null)
            {
                return null;
            }

            var discountProductInfo = _productRepository.GetById(discountGoodsInfo.ProductId);
            if (discountProductInfo == null)
            {
                return null;
            }
            #endregion

            #region
            entity.Totalamount = entity.OrderMainDetailEntityList.Sum(p => p.TotalAmount);

            var rcList = new List<RuleEntity>();
            activityList.ForEach(p =>
            {
                rcList.AddRange(p.RuleEntityList.Where(X => X.RuleType == "Rc"));
            });


            var fitRuleList = rcList.Where(p =>
                      p.RuleDiscountMoneyEntity.StartMoney <= entity.Totalamount &&
                      p.RuleDiscountMoneyEntity.EndMoney > entity.Totalamount);

            if (!fitRuleList.Any())
            {
                return null;
            }


            return new OrderMainDetailEntity()
            {
                OrderNo = entity.OrderNo,
                ProductCategoryId = discountProductInfo.ProductCategoryId,
                ProductName = discountProductInfo.ProductName,
                ProductId = discountProductInfo.PkId,
                ProductCode = discountProductInfo.ProductCode,
                GoodsCode = discountGoodsInfo.GoodsCode,
                GoodsId = discountGoodsInfo.PkId,
                ImageUrl = discountProductInfo.ImageUrl,
                Price = discountGoodsInfo.GoodsPrice,
                DiscountMember = 0,
                DiscountPromotion = 0,
                DiscountPoint = 0,
                DiscountAll = 0,
                PromotionPrice = 0,
                LastPrice = -fitRuleList.FirstOrDefault().RuleDiscountMoneyEntity.DiscountMoney,
                TotalAmount = -fitRuleList.FirstOrDefault().RuleDiscountMoneyEntity.DiscountMoney,
                ProductWeight = 0,
                SpecDetail = discountGoodsInfo.SpecDetail,
                Num = 1,
            };

            #endregion


        }


        /// <summary>
        /// 送券
        /// </summary>
        /// <param name="activityList"></param>
        /// <param name="entity"></param>
        public IList<TicketEntity> GetSendTicketList(IList<ActivityEntity> activityList, OrderMainEntity entity)
        {
            #region 验证判断
            if (!activityList.Any())
            {
                return null;
            }
            #endregion

            #region
            entity.Totalamount = entity.OrderMainDetailEntityList.Sum(p => p.TotalAmount);

            var rbList = new List<RuleEntity>();
            activityList.ForEach(p =>
            {
                rbList.AddRange(p.RuleEntityList.Where(X => X.RuleType == "Rb"));
            });


            var fitRuleList = rbList.Where(p =>
                      p.RuleSendTicketEntity.StartMoney <= entity.Totalamount &&
                      p.RuleSendTicketEntity.EndMoney > entity.Totalamount);

            if (!fitRuleList.Any())
            {
                return null;
            }

            var fitRule = fitRuleList.FirstOrDefault().RuleSendTicketEntity;

            var list = new List<TicketEntity>();
            for (int i = 0; i < fitRule.TicketNum; i++)
            {

                var ticketInfo = new TicketEntity()
                {
                    TicketCode = DateTime.Now.ToString("yyyyMMddHHmmss"),
                    TickettypeId = "",
                    Status = "激活",
                    AvaildateStart = fitRule.TicketAvaildateStart,
                    AvaildateEnd = fitRule.TicketAvaildateEnd,
                    CustomerId = entity.CustomerId,
                    CustomerName = entity.CustomerName,
                    RuleId = fitRule.RuleId,
                    ActivityId = fitRule.ActivityId,
                    FromOrderNo = entity.OrderNo,
                    CreateDate = DateTime.Now,
                    TicketValue = fitRule.TicketValue,
                    UseFor =  fitRule.UseFor,
                    IsUse = "否",
                };

                list.Add(ticketInfo);
            }

            return list;

            #endregion
        }

    }
}
