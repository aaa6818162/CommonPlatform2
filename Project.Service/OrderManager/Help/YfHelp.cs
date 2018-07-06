using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Config;
using Project.Model.OrderManager;
using Project.Repository.ProductManager;
using Project.Repository.SystemSetManager;

namespace Project.Service.OrderManager.Help
{
    public class YfHelp
    {
        private readonly ProductRepository _productRepository;
        private readonly GoodsRepository _goodsRepository;
        private readonly AreaRepository _areaRepository;

        public YfHelp()
        {
            _productRepository = new ProductRepository();
            _goodsRepository = new GoodsRepository();
            _areaRepository = new AreaRepository();
        }

        /// <summary>
        /// 运费计算
        /// </summary>
        /// <param name="entity"></param>
        public OrderMainDetailEntity GetYf(OrderMainEntity entity)
        {
            #region 验证判断
            var areaInfo = _areaRepository.Query().FirstOrDefault(p => p.AreaId == entity.LinkmanAreaId);
            if (areaInfo == null)
            {
                return null;
            }

            var yfGoodsInfo = _goodsRepository.Query().FirstOrDefault(p => p.GoodsCode == SiteConfig.GetConfig().Prd_Yf);
            if (yfGoodsInfo == null)
            {
                return null;
            }

            var yfProductInfo = _productRepository.GetById(yfGoodsInfo.ProductId);
            if (yfProductInfo == null)
            {
                return null;
            }
            #endregion


            var yfTotal = 0m;
            var weightTotal = entity.OrderMainDetailEntityList.Sum(p => p.ProductWeight);
            if (weightTotal==0)
            {
                return null;
            }


            if (weightTotal <= 0)
            {
                yfTotal = areaInfo.FirstWeightPrice;
            }
            else
            {
                yfTotal = areaInfo.FirstWeightPrice + (weightTotal - 1) * areaInfo.SecondWeightPrice;
            }


            if (yfTotal > 0)
            {
                return new OrderMainDetailEntity()
                {
                    OrderNo = entity.OrderNo,
                    ProductCategoryId = yfProductInfo.ProductCategoryId,
                    ProductName = yfProductInfo.ProductName,
                    ProductId = yfProductInfo.PkId,
                    ProductCode = yfProductInfo.ProductCode,
                    GoodsCode = yfGoodsInfo.GoodsCode,
                    GoodsId = yfGoodsInfo.PkId,
                    ImageUrl = yfProductInfo.ImageUrl,
                    Price = yfGoodsInfo.GoodsPrice,
                    DiscountMember = 0,
                    DiscountPromotion = 0,
                    DiscountPoint = 0,
                    DiscountAll = 0,
                    PromotionPrice = 0,
                    LastPrice = yfTotal,
                    TotalAmount = yfTotal,
                    ProductWeight = 0,
                    SpecDetail = yfGoodsInfo.SpecDetail,
                    Num = 1,
                };
            }

            return null;

        }


    }
}
