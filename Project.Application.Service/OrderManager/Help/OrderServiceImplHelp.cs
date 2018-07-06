using System;
using System.Collections.Generic;
using System.Linq;
using Project.Config;
using Project.Model.OrderManager;
using Project.Model.SalePromotionManager;
using Project.Repository.CustomerManager;
using Project.Repository.OrderManager;
using Project.Repository.ProductManager;

namespace Project.Application.Service.OrderManager.Help
{
    public class OrderServiceImplHelp
    {

        private readonly OrderMainRepository _orderMainRepository;
        private readonly OrderMainDetailRepository _orderMainDetailRepository;
        private readonly OrderInvoiceRepository _orderInvoiceRepository;
        private readonly ShopCartRepository _shopCartRepository;
        private readonly GoodsRepository _goodsRepository;
        private readonly ProductRepository _productRepository;
        private readonly CustomerRepository _customerRepository;

        public OrderServiceImplHelp()
        {
            this._orderMainRepository = new OrderMainRepository();
            _orderMainDetailRepository = new OrderMainDetailRepository();
            _orderInvoiceRepository = new OrderInvoiceRepository();
            _shopCartRepository = new ShopCartRepository();
            _goodsRepository = new GoodsRepository();
            _productRepository = new ProductRepository();
            _customerRepository = new CustomerRepository();
        }

        public ShopCartEntity CreateShopCartEntity(string goodsCode, int num, int customerId)
        {
            var goodsInfo = _goodsRepository.Query().FirstOrDefault(p => p.GoodsCode == goodsCode);
            if (goodsInfo != null)
            {
                return CreateShopCartEntity(goodsInfo.PkId, num, customerId);
            }
            return null;
        }


        public ShopCartEntity CreateShopCartEntity(int goodsId, int num, int customerId)
        {
            var customerInfo = _customerRepository.GetById(customerId);
            var goodsInfo = _goodsRepository.GetById(goodsId);
            var productInfo = _productRepository.GetById(goodsInfo.ProductId);

            if (goodsInfo==null|| productInfo==null)
            {
                return null;
            }

            var shopCartInfo = new ShopCartEntity();
            shopCartInfo.CustomerId = customerId;
            shopCartInfo.GoodsId = goodsId;
            shopCartInfo.GoodsCode = goodsInfo.GoodsCode;
            shopCartInfo.Num = num;
            shopCartInfo.SpecDetail = goodsInfo.SpecDetail;
            shopCartInfo.ProductId = productInfo.PkId;
            shopCartInfo.ProductName = productInfo.ProductName;
            shopCartInfo.ProductCode = productInfo.ProductCode;
            shopCartInfo.ImageUrl = productInfo.ImageUrl;
            shopCartInfo.IsCheck = 1;
            shopCartInfo.ProductWeight = productInfo.Weight;

            //价格计算
            shopCartInfo.Price = goodsInfo.GoodsPrice;
            shopCartInfo.PromotionPrice = goodsInfo.RuleId > 0 ? goodsInfo.PromotionPrice:0;
            shopCartInfo.RuleId = goodsInfo.RuleId;

            if (goodsInfo.GoodsCode==SiteConfig.GetConfig().Prd_Discount|| goodsInfo.GoodsCode == SiteConfig.GetConfig().Prd_Ticket|| goodsInfo.GoodsCode == SiteConfig.GetConfig().Prd_Yf)
            {
                shopCartInfo.DiscountMember = 0;
                shopCartInfo.DiscountPromotion =0;
                shopCartInfo.DiscountAll =0;
            }
            else
            {
                shopCartInfo.DiscountMember = goodsInfo.RuleId > 0 ? shopCartInfo.PromotionPrice * (100 - customerInfo.Discount) / 100 : shopCartInfo.Price * (100 - customerInfo.Discount) / 100;
                shopCartInfo.DiscountPromotion = goodsInfo.RuleId > 0 ? goodsInfo.GoodsPrice - goodsInfo.PromotionPrice : 0;
                shopCartInfo.DiscountAll = shopCartInfo.DiscountMember + shopCartInfo.DiscountPromotion;
            }
           

            shopCartInfo.LastPrice = shopCartInfo.Price - shopCartInfo.DiscountAll;
            shopCartInfo.TotalAmount = shopCartInfo.LastPrice * shopCartInfo.Num;

            return shopCartInfo;
        }


     

    }
}
