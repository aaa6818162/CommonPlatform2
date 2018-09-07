using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Project.Application.Service.OrderManager.Help;
using Project.Application.Service.OrderManager.Request;
using Project.Application.Service.OrderManager.Response;
using Project.Config.OrderEnum;
using Project.Infrastructure.FrameworkCore.ApplicationService;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
using Project.Model.OrderManager;
using Project.Model.SalePromotionManager;
using Project.Repository.CustomerManager;
using Project.Repository.OrderManager;
using Project.Repository.ProductManager;
using Project.Repository.SalePromotionManager;
using Project.Service.OrderManager;
using Project.Service.OrderManager.Help;

namespace Project.Application.Service.OrderManager
{
    public class OrderServiceImpl : IServiceImpl
    {
        #region
        private readonly OrderMainRepository _orderMainRepository;
        private readonly OrderMainDetailRepository _orderMainDetailRepository;
        private readonly OrderInvoiceRepository _orderInvoiceRepository;
        private readonly ShopCartRepository _shopCartRepository;
        private readonly GoodsRepository _goodsRepository;
        private readonly ProductRepository _productRepository;
        private readonly CustomerRepository _customerRepository;
        private readonly CustomerAddressRepository _customerAddressRepository;
        private readonly ActivityRepository _activityRepository;
        private readonly TicketRepository _ticketRepository;

        public OrderServiceImpl()
        {
            this._orderMainRepository = new OrderMainRepository();
            _orderMainDetailRepository = new OrderMainDetailRepository();
            _orderInvoiceRepository = new OrderInvoiceRepository();
            _shopCartRepository = new ShopCartRepository();
            _goodsRepository = new GoodsRepository();
            _productRepository = new ProductRepository();
            _customerRepository = new CustomerRepository();
            _customerAddressRepository = new CustomerAddressRepository();
            _activityRepository = new ActivityRepository();
            _ticketRepository = new TicketRepository();
        }
        #endregion


        #region 购物车相关

        /// <summary>
        /// 获取购物车列表信息
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        public IList<ShopCartEntity> GetShopCartList(int customerId)
        {
            var shopCartList = _shopCartRepository.Query().Where(p => p.CustomerId == customerId).ToList();
            return shopCartList;
        }

        /// <summary>
        /// 获取购物车列表信息
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        public IList<ShopCartEntity> GetShopCartCheckList(int customerId)
        {
            var shopCartList = _shopCartRepository.Query().Where(p => p.CustomerId == customerId && p.IsCheck == 1).ToList();
            return shopCartList;
        }


        /// <summary>
        /// 购物车新增商品
        /// </summary>
        /// <param name="goodsId"></param>
        /// <param name="num"></param>
        /// <param name="customerId"></param>
        public Tuple<bool, string> AddCart(int goodsId, int num, int customerId)
        {

            var orgShopCartInfo = _shopCartRepository.Query().FirstOrDefault(p => p.GoodsId == goodsId && p.CustomerId == customerId);
            if (orgShopCartInfo != null)
            {
                num = orgShopCartInfo.Num + orgShopCartInfo.Num;
                _shopCartRepository.Delete(orgShopCartInfo);
            }

            var shopCartInfo = new OrderServiceImplHelp().CreateShopCartEntity(goodsId, num, customerId);

            var pkId = _shopCartRepository.Save(shopCartInfo);
            if (pkId > 0)
            {
                return new Tuple<bool, string>(true, "");
            }
            else
            {
                return new Tuple<bool, string>(false, "");
            }
        }


        /// <summary>
        /// 删除商品行项目
        /// </summary>
        public Tuple<bool, string> DelCart(int pkId, int customerId)
        {
            var shopCartInfo = _shopCartRepository.Query().FirstOrDefault(p => p.PkId == pkId && p.CustomerId == customerId);
            try
            {
                if (shopCartInfo != null)
                {
                    _shopCartRepository.Delete(shopCartInfo);
                    return new Tuple<bool, string>(true, "");
                }
                else
                {
                    return new Tuple<bool, string>(false, "");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        /// <summary>
        /// 更新购物车中的商品数量
        /// </summary>
        public Tuple<bool, string> UpdateCartNum(int pkId, int num, int customerId)
        {
            var shopCartInfo = _shopCartRepository.Query().FirstOrDefault(p => p.PkId == pkId && p.CustomerId == customerId);
            try
            {
                if (shopCartInfo != null)
                {
                    var goodsInfo = _goodsRepository.GetById(shopCartInfo.GoodsId);
                    if (num > goodsInfo.GoodsStock)
                    {
                        return new Tuple<bool, string>(false, "超出库存限制");
                    }
                    shopCartInfo.Num = num;
                    shopCartInfo.TotalAmount = shopCartInfo.LastPrice * num;
                    _shopCartRepository.Update(shopCartInfo);
                    return new Tuple<bool, string>(true, "");
                }
                else
                {
                    return new Tuple<bool, string>(false, "");
                }
            }
            catch (Exception e)
            {

                throw e;
            }


        }

        /// <summary>
        /// 更新购物车中的商品行项目信息  有些促销过期的情况
        /// </summary>
        public Tuple<bool, string> UpdateCartState(int customerId)
        {
            var list = _shopCartRepository.Query().Where(p => p.CustomerId == customerId);

            try
            {
                list.ForEach(p =>
            {
                var goodInfo = _goodsRepository.GetById(p.GoodsId);

                if (p.Price != goodInfo.GoodsPrice || p.RuleId != goodInfo.RuleId || p.PromotionPrice != goodInfo.PromotionPrice)
                {
                    p.IsExpire = 1;
                    p.IsCheck = 2;
                }
                _shopCartRepository.Update(p);

            });
                return new Tuple<bool, string>(true, "");
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        /// <summary>
        /// 更新购物车中的是否勾选
        /// </summary>
        public Tuple<bool, string> UpdateCartCheck(int pkId, int isCheck, int customerId)
        {
            var shopCartInfo = _shopCartRepository.Query().FirstOrDefault(p => p.PkId == pkId && p.CustomerId == customerId);
            try
            {
                if (shopCartInfo != null)
                {
                    shopCartInfo.IsCheck = isCheck;
                    _shopCartRepository.Update(shopCartInfo);
                    return new Tuple<bool, string>(true, "");
                }
                else
                {
                    return new Tuple<bool, string>(false, "");
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        /// <summary>
        /// 批量选择
        /// </summary>
        /// <param name="isCheck"></param>
        /// <param name="customerId"></param>
        /// <returns></returns>
        public Tuple<bool, string> CheckBatch(int isCheck, int customerId)
        {
            try
            {
                var shopCartList = _shopCartRepository.Query().Where(p => p.CustomerId == customerId && p.IsExpire == 0).ToList();

                shopCartList.ForEach(p =>
                {
                    p.IsCheck = isCheck;
                    _shopCartRepository.Update(p);
                });
                return new Tuple<bool, string>(true, "");
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        #endregion

        #region 订单相关

        /// <summary>
        /// 获取订单信息
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="customerId"></param>
        /// <returns></returns>
        public OrderMainEntity GetOrderInfo(string orderNo, int customerId)
        {
            var orderInfo = _orderMainRepository.Query().FirstOrDefault(p => p.OrderNo == orderNo && p.CustomerId == customerId);
            return orderInfo;
        }


        /// <summary>
        /// 新增订单 并清空购物车
        /// </summary>
        /// <param name="request"></param>
        public Tuple<bool, string> AddOrder(AddOrderRequest request)
        {
            var customerInfo = _customerRepository.GetById(request.CustomerId);
            var customerAddressInfo = _customerAddressRepository.GetById(request.CustomerAddressId);

            //订单头
            var orderMainInfo = new OrderMainEntity();
            orderMainInfo.Totalamount = 0;//待计算
            orderMainInfo.CustomerId = customerInfo.PkId;
            orderMainInfo.CustomerName = customerInfo.CustomerName;
            orderMainInfo.Linkman = customerAddressInfo.ReceiverName;
            orderMainInfo.LinkmanTel = customerAddressInfo.FamilyTelephone;
            orderMainInfo.LinkmanMobilephone = customerAddressInfo.Mobilephone;
            orderMainInfo.LinkmanProvinceId = customerAddressInfo.ProvinceId;
            orderMainInfo.LinkmanCityId = customerAddressInfo.CityId;
            orderMainInfo.LinkmanAreaId = customerAddressInfo.AreaId;
            orderMainInfo.LinkmanAddress = customerAddressInfo.Address;
            orderMainInfo.LinkmanAddressfull = customerAddressInfo.AddressFull;
            orderMainInfo.LinkmanPostcode = customerAddressInfo.PostCode;
            orderMainInfo.LinkmanRemark = request.LinkmanRemark;
            orderMainInfo.CustomerAddressId = request.CustomerAddressId;
            orderMainInfo.CreationTime = DateTime.Now;
            orderMainInfo.State = (int)OrderStateEnum.待付款;
            orderMainInfo.UseTicketCodes = request.TicketCodes;

            //发票
            orderMainInfo.OrderInvoiceEntity = new OrderInvoiceEntity() { InvoiceTitle = request.InvoiceTitle };

            //商品信息

            orderMainInfo.OrderMainDetailEntityList = Mapper.Map<ISet<OrderMainDetailEntity>>(request.ShopCartEntityList);

            //促销处理

            //合计信息
            orderMainInfo.Totalamount = orderMainInfo.OrderMainDetailEntityList.Sum(p => p.TotalAmount);
            //orderMainInfo.Totalamount = 0;

            var result = OrderMainService.GetInstance().AddOrder(orderMainInfo);

            if (!result.Item1)
            {
                return result;
            }

            if (orderMainInfo.Totalamount == 0)
            {
                orderMainInfo.PayRemark = "折扣后价格为0不需要付款";
                orderMainInfo.PayType = "Discount";
                orderMainInfo.PaySerialNumber = "9999";
                OrderMainService.GetInstance().Pay(orderMainInfo);
            }

            //清空购物车
            request.ShopCartEntityList.ForEach(p =>
            {
                if (p.PkId > 0)
                {
                    _shopCartRepository.Delete(p);
                }
            });
            return new Tuple<bool, string>(true, result.Item2);
        }

        /// <summary>
        /// 开始订单支付
        /// </summary>
        public void UpdateOrderPay(string orderNo, string payType, int customerId)
        {
            var orderInfo = _orderMainRepository.Query().FirstOrDefault(p => p.OrderNo == orderNo && p.CustomerId == customerId);
            orderInfo.BeginPayTime = DateTime.Now;
            orderInfo.PayType = payType;
            _orderMainRepository.Update(orderInfo);
        }


        /// <summary>
        /// 确认订单支付 支付返回
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="paySerialNumber"></param>
        /// <param name="payRemark"></param>
        public Tuple<bool, string> ConfirmOrderPay(string orderNo, string payType, string paySerialNumber, string payRemark)
        {
            var orderInfo = _orderMainRepository.Query().FirstOrDefault(p => p.OrderNo == orderNo);
            orderInfo.PaySerialNumber = paySerialNumber;
            orderInfo.PayRemark = payRemark;
            orderInfo.PayType = payType;
            orderInfo.PayTime = DateTime.Now;
            try
            {
                OrderMainService.GetInstance().Pay(orderInfo);
                return new Tuple<bool, string>(true, "");
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// 订单搜索
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public Tuple<IList<OrderMainEntity>, int> SearchOrderList(SearchOrderListRequest request)
        {
            var expr = PredicateBuilder.True<OrderMainEntity>();

            expr = expr.And(p => p.CustomerId == request.CustomerId);

            if (!string.IsNullOrEmpty(request.OrderNo))
                expr = expr.And(p => p.OrderNo == request.OrderNo);

            if (!string.IsNullOrEmpty(request.CreateStart))
            {
                expr = expr.And(p => p.CreationTime >= DateTime.Parse(request.CreateStart));
            }

            if (!string.IsNullOrEmpty(request.CreateEnd))
            {
                expr = expr.And(p => p.CreationTime <= DateTime.Parse(request.CreateEnd));
            }

            if (request.State > 0)
            {
                expr = expr.And(p => p.State == request.State);
            }

            var list = _orderMainRepository.Query().Where(expr).OrderByDescending(p => p.PkId).Skip(request.skipResults).Take(request.maxResults).ToList();
            var count = _orderMainRepository.Query().Where(expr).Count();
            return new System.Tuple<IList<OrderMainEntity>, int>(list, count);
        }


        /// <summary>
        /// 取消订单
        /// </summary>
        public Tuple<bool, string> Cancel(string orderNo, int customerId)
        {
            var orderInfo = _orderMainRepository.Query().FirstOrDefault(p => p.OrderNo == orderNo && p.CustomerId == customerId);
            if (orderInfo == null)
            {
                return new Tuple<bool, string>(false, "操作失败");
            }


            return new Tuple<bool, string>(OrderMainService.GetInstance().Cancel(orderInfo), "");
        }

        /// <summary>
        /// 订单完结
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="customerId"></param>
        public Tuple<bool, string> OrderFinsh(string orderNo, int customerId)
        {
            var orderInfo = _orderMainRepository.Query().FirstOrDefault(p => p.OrderNo == orderNo && p.CustomerId == customerId);
            if (orderInfo == null)
            {
                return new Tuple<bool, string>(false, "操作失败");
            }

            return new Tuple<bool, string>(OrderMainService.GetInstance().Confirm(orderInfo), "");
        }

        /// <summary>
        /// 退款申请
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="returnPayNoSendReason"></param>
        /// <param name="returnPayNoSendRemark"></param>
        /// <param name="customerId"></param>
        /// <returns></returns>
        public Tuple<bool, string> ApplyReturnMoney(string orderNo, string returnPayNoSendReason, string returnPayNoSendRemark, int customerId)
        {

            var orderInfo = _orderMainRepository.Query().FirstOrDefault(p => p.OrderNo == orderNo && p.CustomerId == customerId);
            if (orderInfo == null || orderInfo.State != (int)OrderStateEnum.已付款)
            {
                return new Tuple<bool, string>(false, "操作失败");
            }
            orderInfo.ReturnPayNoSendReason = returnPayNoSendReason;
            orderInfo.ReturnPayNoSendRemark = returnPayNoSendRemark;

            return new Tuple<bool, string>(OrderMainService.GetInstance().ReturnPayNoSend(orderInfo), "");
        }


        /// <summary>
        /// 退货申请
        /// </summary>
        public Tuple<bool, string> ApplyReturnProduct(string orderNo, string returnPrdAfterSendReason, string returnPrdAfterSendRemark, int customerId)
        {
            var orderInfo = _orderMainRepository.Query().FirstOrDefault(p => p.OrderNo == orderNo && p.CustomerId == customerId);
            if (orderInfo == null || orderInfo.State != (int)OrderStateEnum.已发货)
            {
                return new Tuple<bool, string>(false, "操作失败");
            }
            orderInfo.ReturnPrdAfterSendReason = returnPrdAfterSendReason;
            orderInfo.ReturnPrdAfterSendRemark = returnPrdAfterSendRemark;

            return new Tuple<bool, string>(OrderMainService.GetInstance().ReturnPrdAfterSend(orderInfo), "");

        }


        /// <summary>
        /// 填写物流单号
        /// </summary>
        public Tuple<bool, string> OrderReturnInfoWrite(string orderNo, string returnPrdSendNo, string returnPrdSendRemak, int customerId)
        {
            var orderInfo = _orderMainRepository.Query().FirstOrDefault(p => p.OrderNo == orderNo && p.CustomerId == customerId);
            if (orderInfo == null || orderInfo.State != (int)OrderStateEnum.已发货)
            {
                return new Tuple<bool, string>(false, "操作失败");
            }
            orderInfo.ReturnPrdSendNo = returnPrdSendNo;
            orderInfo.ReturnPrdSendRemak = returnPrdSendRemak;

            return new Tuple<bool, string>(OrderMainService.GetInstance().ReturnPrdSend(orderInfo), "");
        }


        /// <summary>
        /// 订单支付检查并修改支付方式
        /// </summary>
        /// <param name="customerId"></param>
        /// <param name="orderNo"></param>
        /// <param name="payCode"></param>ConfirmPay
        /// <returns></returns>
        public Tuple<bool, string> CheckPay(string orderNo, string payCode, int customerId)
        {

            var orderMain = _orderMainRepository.Query().FirstOrDefault(p => p.OrderNo == orderNo && p.CustomerId == customerId);
            if (orderMain == null)
                return new Tuple<bool, string>(false, "该订单不存在");

            //if (orderMain.State == "-1")
            //    return new Tuple<bool, bool, string>(false, false, "该订单已作废");
            //if (orderMain.State == "1")
            //    return new Tuple<bool, bool, string>(false, false, "该订单已付款");
            //if (orderMain.State == "T")
            //    return new Tuple<bool, bool, string>(false, false, "该订单已退货");

            //库存检查
            //var stockCheck = new StockService().StockCheck(orderMain);
            //if (!stockCheck.Item1)
            //    return new Tuple<bool, string>(false, "库存不足，请您联系客服。");

            if (orderMain.Totalamount == 0)
            {
                return new Tuple<bool, string>(true, "noneedpay");
            }
            return new Tuple<bool, string>(true, string.Empty);
        }

        #endregion

        #region 促销信息相关

        /// <summary>
        /// 获取运费和促销信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public CountYfAndPromotionResponse CountYfAndPromotion(CountYfAndPromotionRequest request)
        {

            if (!new TicketHelp().TicketValidate(request.TicketCodes, request.CustomerId))
            {
                return null;
            }


            var result = new CountYfAndPromotionResponse();

            var orderMainInfo = new OrderMainEntity();
            orderMainInfo.LinkmanAreaId = request.LinkmanAreaId;
            orderMainInfo.OrderMainDetailEntityList = Mapper.Map<ISet<OrderMainDetailEntity>>(request.ShopCartEntityList);


            //券
            var useTicketList = new List<TicketEntity>();
            if (!string.IsNullOrWhiteSpace(request.TicketCodes))
            {
                var ticketCodes = request.TicketCodes.Split(',').Where(p => !string.IsNullOrWhiteSpace(p));
                foreach (var ticketCode in ticketCodes)
                {
                    useTicketList.Add(_ticketRepository.Query().FirstOrDefault(p => p.TicketCode == ticketCode && p.CustomerId == request.CustomerId));
                }

                var ticketRow = new TicketHelp().CountTicketDetailEntity(orderMainInfo, useTicketList);
                orderMainInfo.OrderMainDetailEntityList.Add(ticketRow);
            }


            //运费信息
            var yfRow = new YfHelp().GetYf(orderMainInfo);
            if (yfRow != null)
            {
                orderMainInfo.OrderMainDetailEntityList.Add(yfRow);
                result.Yf = yfRow.TotalAmount;
            }

            //活动信息
            var activityList = _activityRepository.Query().Where(p => p.State == 1 && p.StartDate <= DateTime.Now && p.EndDate > DateTime.Now);
            if (activityList.Any())
            {
                var discountMoneyRow = new PromotionHelp().GetDiscountMoney(activityList.ToList(), orderMainInfo);//满减
                if (discountMoneyRow != null)
                {
                    orderMainInfo.OrderMainDetailEntityList.Add(discountMoneyRow);
                    result.DiscountMoney = discountMoneyRow.TotalAmount;
                }

                var ticketList = new PromotionHelp().GetSendTicketList(activityList.ToList(), orderMainInfo);//发放券列表
                if (ticketList != null)
                {
                    result.TicketNum = ticketList.Count();
                    result.TicketValue = ticketList.FirstOrDefault().TicketValue;
                }
            }

            result.TotalMoney = orderMainInfo.OrderMainDetailEntityList.Sum(p => p.TotalAmount);

            return result;
        }



        #endregion

        #region 获取运费

        /// <summary>
        /// 运费计算
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public decimal CountYf(GetYfRequest request)
        {
            var customerInfo = _customerRepository.GetById(request.CustomerId);
            var customerAddressInfo = _customerAddressRepository.GetById(request.CustomerAddressId);

            //订单头
            var orderMainInfo = new OrderMainEntity();
            orderMainInfo.Totalamount = 0;//待计算
            orderMainInfo.CustomerId = customerInfo.PkId;
            orderMainInfo.CustomerName = customerInfo.CustomerName;
            orderMainInfo.Linkman = customerAddressInfo.ReceiverName;
            orderMainInfo.LinkmanTel = customerAddressInfo.FamilyTelephone;
            orderMainInfo.LinkmanMobilephone = customerAddressInfo.Mobilephone;
            orderMainInfo.LinkmanProvinceId = customerAddressInfo.ProvinceId;
            orderMainInfo.LinkmanCityId = customerAddressInfo.CityId;
            orderMainInfo.LinkmanAreaId = customerAddressInfo.AreaId;
            orderMainInfo.LinkmanAddress = customerAddressInfo.Address;
            orderMainInfo.LinkmanAddressfull = customerAddressInfo.AddressFull;
            orderMainInfo.LinkmanPostcode = customerAddressInfo.PostCode;
            orderMainInfo.LinkmanRemark = request.LinkmanRemark;
            orderMainInfo.CustomerAddressId = request.CustomerAddressId;
            orderMainInfo.CreationTime = DateTime.Now;

            //发票
            orderMainInfo.OrderInvoiceEntity = new OrderInvoiceEntity() { InvoiceTitle = request.InvoiceTitle };

            //商品信息
            orderMainInfo.OrderMainDetailEntityList = Mapper.Map<ISet<OrderMainDetailEntity>>(request.ShopCartEntityList);

            var yfRow = new YfHelp().GetYf(orderMainInfo);
            if (yfRow != null)
            {
                return yfRow.TotalAmount;
            }
            else
            {
                return 0;
            }

        }

        #endregion


        #region 测试远程调用

        public string Test(string ddd,string zzz)
        {
            return "";
        }

        [NeedAuthorizationAttribute]
        public AddOrderRequest Test2(AddOrderRequest ddd)
        {
            return new AddOrderRequest()
            {
                TicketCodes="2222222222"
            };
        }


        public AddOrderRequest Test3(int ddd)
        {
            return new AddOrderRequest()
            {
                TicketCodes = "2222222222"
            };
        }

        #endregion

    }
}
