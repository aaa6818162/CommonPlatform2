using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using PagedList;
using Project.Application.Service.AccountManager;
using Project.Application.Service.OrderManager;
using Project.Application.Service.OrderManager.Help;
using Project.Application.Service.OrderManager.Request;
using Project.Application.Service.OrderManager.Response;
using Project.Config;
using Project.Config.OrderEnum;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.Payment.ChinaPay;
using Project.Infrastructure.FrameworkCore.Payment.Configs;
using Project.Infrastructure.FrameworkCore.Payment.Factory;
using Project.Infrastructure.FrameworkCore.Payment.Model;
using Project.Infrastructure.FrameworkCore.Payment.Services;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.ToolKit.JsonHandler;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.OrderManager;
using Project.Service.OrderManager;
using Project.WebSite.Extend;
using Project.WebSite.Models.OrderProcess;
using Project.WebSite.Models.UserCenter;

namespace Project.WebSite.Controllers
{
    public class OrderController : AuthorizeController
    {

        #region 视图
        // GET: Order
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult List()
        {
            var pageIndex = RequestHelper.GetInt("page") == 0 ? 1 : RequestHelper.GetInt("page");

            var request = new SearchOrderListRequest();
            request.OrderNo = RequestHelper.GetString("OrderNo");
            request.CreateEnd = RequestHelper.GetString("CreateEnd");
            request.CreateStart = RequestHelper.GetString("CreateStart");
            request.State = RequestHelper.GetInt("State");
            request.maxResults =SiteConfig.GetConfig().PageSize;
            request.CustomerId =CustomerDto.CustomerId;
            request.skipResults = (pageIndex - 1) * request.maxResults;

            var searchList = new OrderServiceImpl().SearchOrderList(request);
            var viewModel = new OrderListView();
            viewModel.OrderList = searchList.Item1;
            viewModel.PageInfo = new MyPagedList(pageIndex, request.maxResults, searchList.Item2);
            viewModel.SearchOrderListRequest = request;
            return View(viewModel);
        }


        public ActionResult Error()
        {
            return View();
        }

        public ActionResult Success()
        {
            return View();
        }

        public ActionResult Confirm(int goodsId = 0, string goodsCode = "", int num = 1)
        {
            var outPut = new ConfirmOutput();
            outPut.CustomerAddressEntityList = new AccountServiceImpl().GetCustomerAddressList(CustomerDto.CustomerId).OrderBy(p => p.IsDefault).ToList();

            if (goodsId > 0)
            {
                outPut.ShopCartEntityList = new List<ShopCartEntity>();
                var cart = new OrderServiceImplHelp().CreateShopCartEntity(goodsId, num, CustomerDto.CustomerId);
                if (cart!=null)
                {
                    outPut.ShopCartEntityList.Add(cart);
                }

            }
            else if (!string.IsNullOrWhiteSpace(goodsCode))
            {
                outPut.ShopCartEntityList = new List<ShopCartEntity>();
                var cart = new OrderServiceImplHelp().CreateShopCartEntity(goodsCode, num, CustomerDto.CustomerId);
                if (cart != null)
                {
                    outPut.ShopCartEntityList.Add(cart);
                }
            }
            else
            {
                outPut.ShopCartEntityList = new OrderServiceImpl().GetShopCartCheckList(CustomerDto.CustomerId);
            }

            outPut.TicketEntityList = new AccountServiceImpl().GetTicketList(CustomerDto.CustomerId);

            return View(outPut);
        }


        public ActionResult Pay(string orderNo)
        {
            if (string.IsNullOrEmpty(orderNo))
                return RedirectToAction("List", "Order");

            var dto = new OrderServiceImpl().GetOrderInfo(orderNo, CustomerDto.CustomerId);

            if (dto == null|| !string.IsNullOrWhiteSpace(dto.PaySerialNumber))
                return RedirectToAction("List", "Order");

            if (dto.Totalamount == 0)
                return RedirectToAction("Success", "Order");


            var model = new PayVm()
            {
                OrderNo = dto.OrderNo,
                Totalamount = dto.Totalamount
            };

            //var json = JsonConvert.SerializeObject(temp);
            //ViewBag.Json = json;
            return View(model);
        }


        public ActionResult GetAddressList()
        {
            var outPut = new ConfirmOutput();
            outPut.CustomerAddressEntityList = new AccountServiceImpl().GetCustomerAddressList(CustomerDto.CustomerId);

            return View(outPut);
        }


        public ActionResult Detail(string orderNo)
        {
            if (string.IsNullOrEmpty(orderNo))
                return RedirectToAction("List", "Order");

            var dto = new OrderServiceImpl().GetOrderInfo(orderNo, CustomerDto.CustomerId);

            if (dto == null || !string.IsNullOrWhiteSpace(dto.PaySerialNumber))
                return RedirectToAction("List", "Order");

           

           
            return View(dto);
        }

        #endregion


        #region 操作

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddOrder(AjaxRequest<AddOrderRequest> request)
        {
            request.RequestEntity.CustomerId = CustomerDto.CustomerId;
            request.RequestEntity.LinkmanRemark = Base64Helper.DecodeBase64(request.RequestEntity.LinkmanRemark);

            if (request.RequestEntity.GoodsId > 0)
            {
                request.RequestEntity.ShopCartEntityList = new List<ShopCartEntity>();
                var cart = new OrderServiceImplHelp().CreateShopCartEntity(request.RequestEntity.GoodsId,
                    request.RequestEntity.Num, CustomerDto.CustomerId);
                if (cart!=null)
                {
                    request.RequestEntity.ShopCartEntityList.Add(cart);
                }
            }
            else if (!string.IsNullOrWhiteSpace(request.RequestEntity.GoodsCode))
            {
                request.RequestEntity.ShopCartEntityList = new List<ShopCartEntity>();
                var cart = new OrderServiceImplHelp().CreateShopCartEntity(request.RequestEntity.GoodsCode,
                    request.RequestEntity.Num, CustomerDto.CustomerId);
                if (cart != null)
                {
                    request.RequestEntity.ShopCartEntityList.Add(cart);
                }
            }
            else
            {
                request.RequestEntity.ShopCartEntityList = new OrderServiceImpl().GetShopCartCheckList(CustomerDto.CustomerId);
            }

            if (!request.RequestEntity.ShopCartEntityList.Any())
            {
                return new MvcJsonResult(new AjaxResponse<object>()
                {
                    Success = false,
                    Error = new ErrorInfo("商品信息有误")
                });
            }

            var registResult = new OrderServiceImpl().AddOrder(request.RequestEntity);

            var result = new AjaxResponse<object>()
            {
                Success = registResult.Item1,
                Result = registResult.Item2,
                Error = new ErrorInfo(registResult.Item2)
            };
            return new MvcJsonResult(result);
        }


        /// <summary>
        /// 订单取消
        /// </summary>
        /// <param name="orderNo"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult Cancel(string orderNo)
        {
            var opResult = new OrderServiceImpl().Cancel(orderNo, CustomerDto.CustomerId);
            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = opResult.Item1,
                Error = new ErrorInfo(opResult.Item2)
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


        /// <summary>
        /// 订单完结
        /// </summary>
        /// <param name="orderNo"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult Confirm(string orderNo)
        {
            var opResult = new OrderServiceImpl().OrderFinsh(orderNo, CustomerDto.CustomerId);
            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = opResult.Item1,
                Error = new ErrorInfo(opResult.Item2)
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


        /// <summary>
        /// 检查支付
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult CheckPay(string orderNo, string payCode)
        {
            var registResult = new OrderServiceImpl().CheckPay(orderNo, payCode, CustomerDto.CustomerId);

            var result = new AjaxResponse<object>()
            {
                Success = registResult.Item1,
                Result = registResult.Item1 ? registResult.Item2 : "",
                Error = new ErrorInfo(registResult.Item2)
            };
            return new MvcJsonResult(result);
        }


        /// <summary>
        /// 确认支付
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="payCode"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult ConfirmPay(string orderNo, string payCode, string subPayCode = "")
        {
            if (string.IsNullOrEmpty(orderNo) || string.IsNullOrEmpty(payCode))
                return RedirectToAction("List", "Order");

            //无效的请求
            if (Request.HttpMethod.ToUpper() == "GET")
                return RedirectToAction("List", "Order");

            var order = new OrderServiceImpl().GetOrderInfo(orderNo, CustomerDto.CustomerId);
            if (order == null)
                return RedirectToAction("List", "Order");

            if (order.State !=(int)OrderStateEnum.待付款|| order.Totalamount==0)
                return RedirectToAction("List", "Order");

#if DEBUG
            order.Totalamount = 0.01m;
#endif


            var payment = new OrderPay
            {
                OrderNo = orderNo,
                TotalAmount = order.Totalamount,
                PayCode = payCode,
                SubPayCode = subPayCode,
                ReceiveName = order.Linkman,
                ReceivePhone = order.LinkmanTel,
                ReceiveMobile = order.LinkmanMobilephone,
                ReceiveZip = order.LinkmanPostcode,
                ReceiveAddress = order.LinkmanAddressfull
            };


            #region 银联支付
            if (payCode == NetPayConfig.ChinaPayCode)
            {
                Dictionary<string, string> param = new Dictionary<string, string>();

                //以下信息非特殊情况不需要改动
                param["version"] = "5.0.0";//版本号
                param["encoding"] = "UTF-8";//编码方式
                param["txnType"] = "01";//交易类型
                param["txnSubType"] = "01";//交易子类
                param["bizType"] = "000202";//业务类型
                param["signMethod"] = "01";//签名方法
                param["channelType"] = "07";//渠道类型
                param["accessType"] = "0";//接入类型
                param["frontUrl"] = SDKConfig.FrontUrl;  //前台通知地址      
                param["backUrl"] = SDKConfig.BackUrl;  //后台通知地址
                param["currencyCode"] = "156";//交易币种

                //TODO 以下信息需要填写
                param["merId"] = System.Configuration.ConfigurationManager.AppSettings["ChinaPayMerId"];//商户号，请改自己的测试商户号，此处默认取demo演示页面传递的参数
                param["orderId"] = orderNo;//商户订单号，8-32位数字字母，不能含“-”或“_”，此处默认取demo演示页面传递的参数，可以自行定制规则
                param["txnTime"] = DateTime.Now.ToString("yyyyMMddHHmmss");//订单发送时间，格式为YYYYMMDDhhmmss，取北京时间，此处默认取demo演示页面传递的参数，参考取法： DateTime.Now.ToString("yyyyMMddHHmmss")
                param["txnAmt"] = ((int)(order.Totalamount * 100)).ToString();//交易金额，单位分，此处默认取demo演示页面传递的参数
                                                                              //param["reqReserved"] = "透传信息";//请求方保留域，透传字段，查询、通知、对账文件中均会原样出现，如有需要请启用并修改自己希望透传的数据

                //TODO 其他特殊用法：
                //【直接跳转发卡行网银】
                //（因测试环境所有商户号都默认不允许开通网银支付权限，所以要实现此功能需要使用正式申请的商户号去生产环境测试）：
                //1）联系银联业务运营部门开通商户号的网银前置权限
                //2）上送issInsCode字段，该字段的值参考《平台接入接口规范-第5部分-附录》（全渠道平台银行名称-简码对照表）
                //param["issInsCode"] = Request.Form["ABC"].ToString();

                AcpService.Sign(param, System.Text.Encoding.UTF8);
                string html = AcpService.CreateAutoFormHtml(SDKConfig.FrontTransUrl, param, System.Text.Encoding.UTF8);// 将SDKUtil产生的Html文档写入页面，从而引导用户浏览器重定向   
                Response.ContentEncoding = Encoding.UTF8; // 指定输出编码
                Response.Write(html);

                return null;
            }

            #endregion

            #region 微信支付

            //扫码支付
            if (payment.PayCode + payment.SubPayCode == NetPayConfig.WechatNativePayCode)
            {
                try
                {
                    //二维码
                    var qrcode = WechatPayService.Instance.GetWechatPayQRCode(payment);

                    return Json(new { IsError = false, data = new { QRCode = qrcode } });
                }
                catch (Exception ex)
                {
                    return Json(new { IsError = true, message = ex.Message });
                }
            }

            #endregion

            var requestFrom = new PayFactory().SubmitRequest(payment);
            if (string.IsNullOrEmpty(requestFrom))
            {
                //无效的支付方式
                return RedirectToAction("Error", "Order");
            }
            if (payCode == NetPayConfig.TenpayCode)
            {
                return Redirect(requestFrom);
            }
            return Content(requestFrom);
        }


        /// <summary>
        /// 运费计算
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult CountYfAndPromotion(int linkmanAreaId, int goodsId = 0, string goodsCode = "", int num = 1,string ticketCodes="")
        {

            var ShopCartEntityList = new List<ShopCartEntity>();
            if (goodsId > 0)
            {
                ShopCartEntityList.Add(new OrderServiceImplHelp().CreateShopCartEntity(goodsId, num, CustomerDto.CustomerId));
            }
            else if (!string.IsNullOrWhiteSpace(goodsCode))
            {

                ShopCartEntityList.Add(new OrderServiceImplHelp().CreateShopCartEntity(goodsCode, num, CustomerDto.CustomerId));
            }
            else
            {
                ShopCartEntityList = new OrderServiceImpl().GetShopCartCheckList(CustomerDto.CustomerId).ToList();
            }

            var returnResult = new OrderServiceImpl().CountYfAndPromotion(new CountYfAndPromotionRequest()
            {
                CustomerId = CustomerDto.CustomerId,
                LinkmanAreaId = linkmanAreaId.ToString(),
                TicketCodes = ticketCodes,
                ShopCartEntityList = ShopCartEntityList
            });

            var result = new AjaxResponse<CountYfAndPromotionResponse>()
            {
                Success = returnResult!=null,
                Result = returnResult
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }
        #endregion





    }
}