using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Project.Config.OrderEnum;
using Project.Infrastructure.FrameworkCore.Payment.ChinaPay;
using Project.Infrastructure.FrameworkCore.Payment.Configs;
using Project.Infrastructure.FrameworkCore.Payment.Factory;
using Project.Infrastructure.FrameworkCore.Payment.Model;
using Project.Infrastructure.FrameworkCore.Payment.Services;
using Project.Model.OrderManager;
using Project.Wap.Common;
using Project.Wap.Models;
using Senparc.Weixin.MP.Helpers;

namespace Project.Wap.Controllers
{
    public class PaymentController : BaseController
    {

        public ActionResult GetOpenId()
        {

            return View();
        }

        // GET: Payment
     
        public ActionResult Index()
        {
            var model = new PaymentVM();
            //base.UpdateBaseModel(model);

            this.UpdateModel(model);

            return View(model);
        }

        [WechatAuthorize(true)]
        public ActionResult WechatPay()
        {
            var model = new PaymentVM();
           // base.UpdateBaseModel(model);

            this.UpdateModel(model);

            model.IsWechatAutoPay = true;

            return View("Index", model);
        }

        private PaymentVM UpdateModel(PaymentVM model)
        {
            var orderNo = Request["OrderNo"];
            var orderDetail =new OrderMainEntity();
            model.OrderNo = "9000420808";
            model.ProductNum = 1;
            model.TotalAmount =200;
            model.IsWechat = this.IsWechatApp();

            try
            {
                if (model.IsWechat)
                {
                    var jssdkUiPackage = JSSDKHelper.GetJsSdkUiPackage(WechatAppID, WechatAppSecret, Request.Url.AbsoluteUri);

                    model.WxJsApiParam = JsonConvert.SerializeObject(new
                    {
                        AppId = WechatAppID,
                        Timestamp = jssdkUiPackage.Timestamp,
                        NonceStr = jssdkUiPackage.NonceStr,
                        Signature = jssdkUiPackage.Signature
                    });
                }
            }
            catch { }

            return model;
        }


        /// <summary>
        /// 是否微信浏览器
        /// </summary>
        /// <returns></returns>
        private bool IsWechatApp()
        {
            return (Request.UserAgent ?? string.Empty).ToLower().Contains("micromessenger");
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
            //if (string.IsNullOrEmpty(orderNo) || string.IsNullOrEmpty(payCode))
            //    return RedirectToAction("List", "Order");

            ////无效的请求
            //if (Request.HttpMethod.ToUpper() == "GET")
            //    return RedirectToAction("List", "Order");

            var order = new OrderMainEntity() { Totalamount = 0.01m, State = (int)OrderStateEnum.待付款 };//new OrderServiceImpl().GetOrderInfo(orderNo, CustomerDto.CustomerId);
            if (order == null)
                return RedirectToAction("List", "Order");

            if (order.State != (int)OrderStateEnum.待付款 || order.Totalamount == 0)
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
            //公众号支付
            if (payment.PayCode + payment.SubPayCode == NetPayConfig.WechatJsApiPayCode)
            {
                try
                {
                    if (this.IsWechatApp())
                    {
                        if (string.IsNullOrEmpty(base.WechatOpenId))
                            throw new Exception("微信未授权登录！");

                        var param = WechatPayService.Instance.GetWechatPayParameter4JsApi(payment, base.WechatOpenId);

                        return Json(new { IsError = false, data = param });
                    }
                    else
                    {
                        //H5支付，需要单独申请开通权限
                        var url = WechatPayService.Instance.GetMWebUrl(payment);

                        return Json(new { IsError = false, data = new { Url = url } });
                    }
                }
                catch (Exception ex)
                {
                    return Json(new { IsError = true, message = ex.Message });
                }
            }


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

    }
}