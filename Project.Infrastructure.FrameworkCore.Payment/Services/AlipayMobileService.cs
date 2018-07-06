using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using Project.Infrastructure.FrameworkCore.Logging;
using Project.Infrastructure.FrameworkCore.Payment.Alipay;
using Project.Infrastructure.FrameworkCore.Payment.Base;
using Project.Infrastructure.FrameworkCore.Payment.Interfaces;
using Project.Infrastructure.FrameworkCore.Payment.Model;

namespace Project.Infrastructure.FrameworkCore.Payment.Services
{
    /// <summary>
    /// 支付宝付款服务
    /// </summary>
    internal class AlipayMobileService : BaseService, IPayService
    {
        private readonly AlipayModel _alipayModel;

        /// <summary>
        /// 初始化
        /// </summary>
        public AlipayMobileService()
        {
            _alipayModel = new AlipayModel
            {
                Key = ConfigurationManager.AppSettings["AlipayKey"],
                Partner = ConfigurationManager.AppSettings["AlipayPartner"],
                NotifyUrl = HostDomain + ConfigurationManager.AppSettings["AlipayNotifyUrl"],
                ReturnUrl = HostDomain + ConfigurationManager.AppSettings["AlipayReturnUrl"],
                ShowUrl = HostDomain + ConfigurationManager.AppSettings["AlipayShowUrl"],
                SellerEmail = ConfigurationManager.AppSettings["AlipaySellerEmail"],
                Remark = ConfigurationManager.AppSettings["PaymentRemark"]
            };
        }

        /// <summary>
        /// 发送支付请求
        /// </summary>
        /// <param name="orderPay">订单支付信息</param>
        /// <returns></returns>
        public string SubmitRequest(OrderPay orderPay)
        {
            //把请求参数打包成数组 
            var sParaTemp = new SortedDictionary<string, string>();
            sParaTemp.Add("partner", Config.Partner);
            sParaTemp.Add("seller_id", Config.Partner);
            sParaTemp.Add("_input_charset", Config.Input_charset.ToLower());
            sParaTemp.Add("service", "alipay.wap.create.direct.pay.by.user"); //标准双接口接入页
            sParaTemp.Add("payment_type", "1"); //支付类型 不能修改
            //页面跳转同步通知页面路径
          //  var payParmeter = JsonConvert.DeserializeObject<Dictionary<string, string>>(orderPay.PayParameter);
            var returnId ="";// payParmeter["userid"] + "-" + payParmeter["token"] + "-" + payParmeter["NoLoginUserId"];
            sParaTemp.Add("return_url", _alipayModel.ReturnUrl + "/" + returnId);
            //服务器异步通知页面路径
            sParaTemp.Add("notify_url", _alipayModel.NotifyUrl + "/" + returnId);
            sParaTemp.Add("out_trade_no", orderPay.OrderNo); //商户订单号
            sParaTemp.Add("subject", _alipayModel.Remark); //订单名称
            sParaTemp.Add("total_fee", orderPay.TotalAmount.ToString("f2")); //付款金额
            sParaTemp.Add("show_url", string.Format(_alipayModel.ShowUrl, orderPay.OrderNo));
            sParaTemp.Add("body", _alipayModel.Remark);
            sParaTemp.Add("it_b_pay", "3d");
            //公用回传参数
            //sParaTemp.Add("extra_common_param", orderPay.PayParameter);
            //建立请求
            var sHtmlText = Submit.BuildRequest(sParaTemp, "get", "确认");

            LoggerHelper.InfoFormat(LogType.PaymentLogger,"支付宝支付请求：订单号：{0}\r\n请求内容：{1}\r\n", orderPay.OrderNo, sHtmlText);
            return sHtmlText;
        }

        /// <summary>
        /// 处理支付返回信息
        /// </summary>
        /// <param name="notifyType">通知类型</param>
        /// <returns></returns>
        public PayResult CheckNotifyData(NotifyEnum notifyType)
        {
            PayResult result;
            switch (notifyType)
            {
                case NotifyEnum.GET:
                    result = CheckRequestGet();
                    break;
                case NotifyEnum.POST:
                    result = CheckRequestPost();
                    break;
                default:
                    throw new InvalidOperationException("无效的通知类型，支付宝支付异常。");
            }
            return result;
        }

        /// <summary>
        /// 签名验证
        /// </summary>
        /// <returns></returns>
        public bool SignVerify(Dictionary<string, string> dicParams)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 支付宝同步通知处理
        /// </summary>
        /// <returns></returns>
        private PayResult CheckRequestGet()
        {
            var result = new PayResult
            {
                MerchantAccount = _alipayModel.SellerEmail,
                PayEnum = PayEnum.AlipayForMobile
            };
            var getParams = GetRequestGet();
            //判断是否有带返回参数
            if (getParams.Count > 0)
            {
                LoggerHelper.InfoFormat(LogType.PaymentLogger,"支付宝同步通知，Request:{0}。\r\n", HttpContext.Current.Request.Url.ToString());
                LoggerHelper.InfoFormat(LogType.PaymentLogger,"支付宝同步通知，Params:{0}。\r\n", JsonConvert.SerializeObject(getParams));
                //签名验证
                var aliNotify = new Notify();
                var notifyId = HttpContext.Current.Request.QueryString["notify_id"];
                var sign = HttpContext.Current.Request.QueryString["sign"];
                var verifyResult = aliNotify.Verify(getParams, notifyId, sign);
                if (verifyResult) //验证成功
                {
                    result.Message = "验证成功";
                    result.OrderNo = HttpContext.Current.Request.QueryString["out_trade_no"];//商户订单号
                    result.MerchantAccount = HttpContext.Current.Request.QueryString["seller_email"];
                    result.SerialNumber = HttpContext.Current.Request.QueryString["trade_no"];//支付宝交易号
                    result.PayDate = HttpContext.Current.Request.QueryString["gmt_payment"];
                    result.TotalAmount = HttpContext.Current.Request.QueryString["total_fee"];
                    //result.PayParameter = HttpContext.Current.Request.QueryString["extra_common_param"];

                    var tradeStatus = HttpContext.Current.Request.QueryString["trade_status"];//交易状态
                    if (tradeStatus == "WAIT_SELLER_SEND_GOODS" || tradeStatus == "TRADE_FINISHED" ||
                        tradeStatus == "TRADE_SUCCESS")
                    {
                        result.Status = true;
                    }
                }
                else
                {
                    result.Message = "验证失败";
                    result.OrderNo = HttpContext.Current.Request.QueryString["out_trade_no"];//商户订单号
                }
            }
            else
            {
                result.Message = "无返回参数";
            }
            LoggerHelper.InfoFormat(LogType.PaymentLogger,"支付宝同步通知，{0}。\r\n", result.ToString());
            return result;
        }

        /// <summary>
        /// 支付宝异步通知处理
        /// </summary>
        /// <returns></returns>
        private PayResult CheckRequestPost()
        {
            var result = new PayResult
            {
                MerchantAccount = _alipayModel.SellerEmail,
                PayEnum = PayEnum.Alipay
            };
            var sPara = GetRequestPost();
            if (sPara.Count > 0) //判断是否有带返回参数
            {
                LoggerHelper.InfoFormat(LogType.PaymentLogger,"支付宝异步通知，Request:{0}。\r\n", HttpContext.Current.Request.Url.ToString());
                LoggerHelper.InfoFormat(LogType.PaymentLogger,"支付宝异步通知，Params:{0}。\r\n", JsonConvert.SerializeObject(sPara));

                var aliNotify = new Notify();
                var sign = HttpContext.Current.Request.Form["sign"];
                var notifyId = HttpContext.Current.Request.Form["notify_id"];
                var verifyResult = aliNotify.Verify(sPara, notifyId, sign);
                if (verifyResult) //验证成功
                {
                    result.Message = "success";
                    result.OrderNo = HttpContext.Current.Request.Form["out_trade_no"];//商户订单号
                    result.SerialNumber = HttpContext.Current.Request.Form["trade_no"];//支付宝交易号
                    result.MerchantAccount = HttpContext.Current.Request.Form["seller_email"];
                    result.PayDate = HttpContext.Current.Request.Form["gmt_payment"];
                    result.TotalAmount = HttpContext.Current.Request.Form["total_fee"];
                    result.PayParameter = HttpContext.Current.Request.Form["extra_common_param"];

                    var tradeStatus = HttpContext.Current.Request.Form["trade_status"];//交易状态
                    if (tradeStatus == "WAIT_SELLER_SEND_GOODS" || tradeStatus == "TRADE_FINISHED" ||
                        tradeStatus == "TRADE_SUCCESS")
                    {
                        result.Status = true;
                    }
                }
                else
                {
                    result.Message = "fail";
                }
            }
            else
            {
                result.Message = "无通知参数";
            }
            LoggerHelper.InfoFormat(LogType.PaymentLogger,"支付宝异步通知，{0}。\r\n", JsonConvert.SerializeObject(result));
            return result;
        }

        /// <summary>
        /// 获取支付宝POST过来通知消息，并以“参数名=参数值”的形式组成数组
        /// </summary>
        /// <returns>request回来的信息组成的数组</returns>
        public SortedDictionary<string, string> GetRequestPost()
        {
            int i = 0;
            SortedDictionary<string, string> sArray = new SortedDictionary<string, string>();
            NameValueCollection coll;
            //Load Form variables into NameValueCollection variable.
            coll = HttpContext.Current.Request.Form;
            // Get names of all forms into a string array.
            String[] requestItem = coll.AllKeys;
            for (i = 0; i < requestItem.Length; i++)
            {
                sArray.Add(requestItem[i], HttpContext.Current.Request.Form[requestItem[i]]);
            }
            return sArray;
        }

        /// <summary>
        /// 获取支付宝GET过来通知消息，并以“参数名=参数值”的形式组成数组
        /// </summary>
        /// <returns>request回来的信息组成的数组</returns>
        public SortedDictionary<string, string> GetRequestGet()
        {
            int i = 0;
            SortedDictionary<string, string> sArray = new SortedDictionary<string, string>();
            NameValueCollection coll;
            //Load Form variables into NameValueCollection variable.
            coll = HttpContext.Current.Request.QueryString;
            // Get names of all forms into a string array.
            String[] requestItem = coll.AllKeys;

            for (i = 0; i < requestItem.Length; i++)
            {
                sArray.Add(requestItem[i], HttpContext.Current.Request.QueryString[requestItem[i]]);
            }
            return sArray;
        }
    }
}
