using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using Project.Infrastructure.FrameworkCore.Logging;
using Senparc.Weixin.MP;
using Senparc.Weixin.MP.TenPayLib;
using Senparc.Weixin.MP.TenPayLibV3;
using Project.Infrastructure.FrameworkCore.Payment.Alipay;
using Project.Infrastructure.FrameworkCore.Payment.Base;
using Project.Infrastructure.FrameworkCore.Payment.Interfaces;
using Project.Infrastructure.FrameworkCore.Payment.Model;
using Project.Infrastructure.FrameworkCore.ToolKit;
using ThoughtWorks.QRCode.Codec;
using RequestHandler = Senparc.Weixin.MP.TenPayLibV3.RequestHandler;

namespace Project.Infrastructure.FrameworkCore.Payment.Services
{
    public class WechatPayService : BaseService
    {
        public static readonly WechatPayService Instance = new WechatPayService();

        private readonly WechatPayModel _wechatpayModel;

        /// <summary>
        /// 初始化
        /// </summary>
        public WechatPayService()
        {
            try
            {
                _wechatpayModel = new WechatPayModel
                {
                    AppID = ConfigurationManager.AppSettings["WechatAppID"],
                    AppSecret = ConfigurationManager.AppSettings["WechatAppSecret"],
                    MCHID = ConfigurationManager.AppSettings["WechatMCHID"],
                    Key = ConfigurationManager.AppSettings["WechatKey"],
                    NotifyUrl = HostDomain + ConfigurationManager.AppSettings["WechatNotifyUrl"],
                    IP = ConfigurationManager.AppSettings["WechatIP"],
                    LogLevel = ConfigurationManager.AppSettings["WechatLogLevel"],
                    Remark = ConfigurationManager.AppSettings["PaymentRemark"]
                };
            }
            catch (Exception e)
            {
                throw new Exception("配置信息缺失");
            }
        }

        /// <summary>
        /// 公众号支付，发送支付请求
        /// </summary>
        /// <param name="orderPay">订单支付信息</param>
        /// <returns></returns>
        public Hashtable GetWechatPayParameter4JsApi(OrderPay orderPay, string openId)
        {
            string timeStamp = TenPayV3Util.GetTimestamp();
            string nonceStr = TenPayV3Util.GetNoncestr();
            string body = _wechatpayModel.Remark;//商品或支付单简要描述
            string out_trade_no = orderPay.OrderNo + DateTime.Now.ToString("yyyyMMddHHmmssff");//商户系统内部的订单号，32个字符内，可包含字母，其他说明见商户订单号
            int total_fee = Convert.ToInt32(orderPay.TotalAmount * 100);//订单总金额，只能是整数。

            string spbill_create_ip = _wechatpayModel.IP;//APP和网页支付提交用户端IP，Native支付填调用微信支付API的机器IP
            string notify_url = _wechatpayModel.NotifyUrl;//接收微信支付异步通知回调地址
            string openid = openId;//trade_type=JSAPI,此参数必传，用户在商户appid下的唯一标识。必传，这里需要将去获取openid赋值上去

            string attach = orderPay.PayParameter;

            var orderData = new TenPayV3UnifiedorderRequestData(_wechatpayModel.AppID, _wechatpayModel.MCHID, body, out_trade_no, total_fee, spbill_create_ip, notify_url, TenPayV3Type.JSAPI, openid, _wechatpayModel.Key, nonceStr, null, DateTime.Now, null, null, attach);

            var result = TenPayV3.Unifiedorder(orderData);

            if (result.return_code == "FAIL")
            {
                 LoggerHelper.InfoFormat(LogType.PaymentLogger,"return_msg:{0}", result.return_msg);
                throw new Exception(result.return_msg);
            }

            timeStamp = TenPayV3Util.GetTimestamp();
            nonceStr = TenPayV3Util.GetNoncestr();

            RequestHandler paysignReqHandler = new RequestHandler(null);

            paysignReqHandler.Init();

            //设置支付参数
            paysignReqHandler.SetParameter("appId", _wechatpayModel.AppID);
            paysignReqHandler.SetParameter("timeStamp", timeStamp);
            paysignReqHandler.SetParameter("nonceStr", nonceStr);
            paysignReqHandler.SetParameter("package", string.Format("prepay_id={0}", result.prepay_id));
            paysignReqHandler.SetParameter("signType", "MD5");

            string paysign = paysignReqHandler.CreateMd5Sign("key", _wechatpayModel.Key);

            paysignReqHandler.SetParameter("paysign", paysign);
            paysignReqHandler.SetParameter("out_trade_no", out_trade_no);

            return paysignReqHandler.GetAllParameters();
        }

        /// <summary>
        /// 扫描支付，获取微信支付二维码
        /// </summary>
        /// <param name="orderPay"></param>
        /// <returns>二维码图片的base64</returns>
        public string GetWechatPayQRCode(OrderPay orderPay)
        {
            string timeStamp = TenPayV3Util.GetTimestamp();
            string nonceStr = TenPayV3Util.GetNoncestr();
            string body = _wechatpayModel.Remark;//商品或支付单简要描述
            string out_trade_no = orderPay.OrderNo + DateTime.Now.ToString("yyyyMMddHHmmssff");//商户系统内部的订单号，32个字符内，可包含字母，其他说明见商户订单号
            int total_fee = Convert.ToInt32(orderPay.TotalAmount * 100);//订单总金额，只能是整数。

            string spbill_create_ip = _wechatpayModel.IP;//APP和网页支付提交用户端IP，Native支付填调用微信支付API的机器IP
            string notify_url = _wechatpayModel.NotifyUrl;//接收微信支付异步通知回调地址
            string openid = string.Empty;//trade_type=JSAPI,此参数必传，用户在商户appid下的唯一标识。必传，这里需要将去获取openid赋值上去

            string attach = orderPay.PayParameter;

            var orderData = new TenPayV3UnifiedorderRequestData(_wechatpayModel.AppID, _wechatpayModel.MCHID, body, out_trade_no, total_fee, spbill_create_ip, notify_url, TenPayV3Type.NATIVE, openid, _wechatpayModel.Key, nonceStr, null, DateTime.Now, null, null, attach, "CNY", null, orderPay.OrderNo);

            var result = TenPayV3.Unifiedorder(orderData);

            if (result.return_code == "FAIL")
            {
                LoggerHelper.InfoFormat(LogType.PaymentLogger, "return_msg:{0}", result.return_msg);
                throw new Exception(result.return_msg);
            }

            try
            {
                string code_url = result.code_url;

                //初始化二维码生成工具
                QRCodeEncoder qrCodeEncoder = new QRCodeEncoder();
                qrCodeEncoder.QRCodeEncodeMode = QRCodeEncoder.ENCODE_MODE.BYTE;
                qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.M;
                qrCodeEncoder.QRCodeVersion = 0;
                qrCodeEncoder.QRCodeScale = 4;

                //将字符串生成二维码图片
                Bitmap image = qrCodeEncoder.Encode(code_url, Encoding.Default);

                //保存为PNG到内存流  
                MemoryStream ms = new MemoryStream();
                image.Save(ms, ImageFormat.Png);

                byte[] arr = new byte[ms.Length];
                ms.Position = 0;
                ms.Read(arr, 0, (int)ms.Length);
                ms.Close();

                var base64 = Convert.ToBase64String(arr);

                return base64;
            }
            catch (Exception ex)
            {
                LoggerHelper.InfoFormat(LogType.PaymentLogger, "生成二维码，转Base64失败:{0}", ex.ToString());
                throw new Exception(ex.ToString());
            }
        }

        public string GetMWebUrl(OrderPay orderPay)
        {
            var outTradeNo = orderPay.OrderNo + DateTime.Now.ToString("yyyyMMddHHmmssff");

            RequestHandler requestHandler = new RequestHandler(HttpContext.Current);
            //微信分配的公众账号ID（企业号corpid即为此appId）
            requestHandler.SetParameter("appid", _wechatpayModel.AppID);
            //附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
            requestHandler.SetParameter("attach", orderPay.PayParameter);
            //商品或支付单简要描述
            requestHandler.SetParameter("body", _wechatpayModel.Remark);
            //微信支付分配的商户号
            requestHandler.SetParameter("mch_id", _wechatpayModel.MCHID);
            //随机字符串，不长于32位。
            requestHandler.SetParameter("nonce_str", TenPayUtil.GetNoncestr());
            //接收微信支付异步通知回调地址，通知url必须为直接可访问的url，不能携带参数。
            requestHandler.SetParameter("notify_url", _wechatpayModel.NotifyUrl);
            //商户系统内部的订单号,32个字符内、可包含字母，自己生成
            requestHandler.SetParameter("out_trade_no", outTradeNo);
            //APP和网页支付提交用户端ip，Native支付填调用微信支付API的机器IP。
            requestHandler.SetParameter("spbill_create_ip", _wechatpayModel.IP);
            //订单总金额，单位为分，做过银联支付的朋友应该知道，代表金额为12位，末位分分
            requestHandler.SetParameter("total_fee", Convert.ToInt32(orderPay.TotalAmount * 100).ToString());
            //取值如下：JSAPI，NATIVE，APP，我们这里使用JSAPI
            requestHandler.SetParameter("trade_type", "MWEB");
            //trade_type=JSAPI，此参数必传，用户在商户公众号appid下的唯一标识。
            //requestHandler.SetParameter("openid", openId);
            //设置KEY
            requestHandler.SetKey(_wechatpayModel.Key);

            var sign = requestHandler.CreateMd5Sign("", "");
            requestHandler.SetParameter("sign", sign);
            //requestHandler.GetRequestURL();
            //requestHandler.CreateSHA1Sign();
            string data = requestHandler.ParseXML();
            requestHandler.GetDebugInfo();

            //获取并返回预支付XML信息
            var result = TenPayV3.Unifiedorder(data);

            LoggerHelper.InfoFormat(LogType.PaymentLogger, "request:{0} \r\n result:{1}", data, result);

            //var result = JsonConvert.DeserializeObject<UnifiedorderResult>();
            UnifiedorderResult orderResult = new UnifiedorderResult(result);

            if (orderResult.return_code == "FAIL")
            {
                LoggerHelper.InfoFormat(LogType.PaymentLogger, "return_msg:{0}", orderResult.return_msg);
                throw new Exception(orderResult.return_msg);
            }

            return orderResult.GetXmlValue("mweb_url") + string.Format("&return_url={0}/trading/payment/unpay?orderno={1}", HostDomain, orderPay.OrderNo);
        }

        /// <summary>
        /// 处理支付返回信息
        /// </summary>
        /// <param name="notifyType">通知类型</param>
        /// <returns></returns>
        public PayResult CheckNotifyData()
        {
            PayResult result = new PayResult()
            {
                PayEnum = PayEnum.WechatPayForJsApi
            };

            try
            {
                var resHandler = new Senparc.Weixin.MP.TenPayLibV3.ResponseHandler(null);
                resHandler.SetKey(_wechatpayModel.Key);

                LoggerHelper.InfoFormat(LogType.PaymentLogger,"ParseXML:{0}", resHandler.ParseXML());

                //返回的参数
                string return_code = resHandler.GetParameter("return_code");//返回状态码
                string return_msg = resHandler.GetParameter("return_msg");//返回信息

                //支付失败直接返回
                if (return_code.ToUpper() != "SUCCESS")
                {
                     LoggerHelper.InfoFormat(LogType.PaymentLogger,"return_code:{0},return_msg:{1}", return_code, return_msg);
                    result.Message = return_code + " " + return_msg;
                    return result;
                }

                //因为微信服务器会多次推送通知到这里，所以需要在这里判断订单是否已经完成支付，如果完成，则不进行下面操作
                var outTradeNo = resHandler.GetParameter("out_trade_no");//商户订单号

                //验证请求是否从微信发过来（安全）
                if (resHandler.IsTenpaySign())
                {
                    //正确的订单处理
                    var orderSn = outTradeNo.Substring(0, 10);
                    result.Status = true;
                    result.OrderNo = orderSn;
                    result.MerchantAccount = resHandler.GetParameter("mch_id");//商户号
                    result.SerialNumber = resHandler.GetParameter("transaction_id"); ;//微信支付订单号
                    result.PayDate = resHandler.GetParameter("time_end");//支付完成时间 20141030133525
                    result.TotalAmount = ConvertHelper.ToString(ConvertHelper.ToDecimal(resHandler.GetParameter("total_fee")) / 100m);
                    result.PayParameter = resHandler.GetParameter("attach");//商家数据包，原样返回 String(128)

                    LoggerHelper.InfoFormat(LogType.PaymentLogger,"PayOrder:OrderSn={0}，Result={1}", orderSn, JsonConvert.SerializeObject(result));
                }
                else
                {
                    //错误的订单处理
                    result.Message = "支付结果验证失败";
                }

                return result;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                 LoggerHelper.InfoFormat(LogType.PaymentLogger,ex.ToString());
                return result;
            }
        }
    }
}
